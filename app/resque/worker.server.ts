import Redis from 'ioredis'
import { Worker } from 'node-resque'
import { jobs } from '~/resque/jobs.server'
import { connectionDetails } from '~/resque/main.server'

export type InitWorkerProps = {
    schedule: boolean
}

export const queueTitles = {
    schedule: {
        queue: `${process.env.REDIS_QUEUE}-schedule`,
    },
    template: {
        queue: `${process.env.REDIS_QUEUE}-template`,
    },
}

const globalWorkerRegistry: Record<string, Worker> = {}
const WORKER_TIMEOUT = 300000 // 300 seconds
const fileName = 'resque/worker.server.ts'

async function cleanupStaleWorkers(queueName: string) {
    try {
        const redis = new Redis(connectionDetails.host)

        // Only clean up workers that have been inactive for more than WORKER_TIMEOUT
        const cutoffTime = Date.now() - WORKER_TIMEOUT

        // Get all workers and check their last activity
        const workers = await redis.smembers('resque:workers')
        const staleWorkers = []

        for (const workerName of workers) {
            if (workerName.includes(`:${queueName}`)) {
                const workerKey = `resque:worker:${workerName}`
                const lastSeen = await redis.get(`${workerKey}:started`)

                if (!lastSeen || parseInt(lastSeen) < cutoffTime) {
                    staleWorkers.push(workerName)
                    await redis.del(workerKey)
                    await redis.del(`${workerKey}:started`)
                }
            }
        }

        if (staleWorkers.length > 0) {
            await redis.srem('resque:workers', ...staleWorkers)
        }

        await redis.quit()
    } catch (error) {
        console.log(
            `Error cleaning up stale workers for ${queueName}: ${error}`
        )
    }
}

export const initWorker = async ({ schedule }: InitWorkerProps) => {
    const activeWorkers: Worker[] = []

    const queues: InitWorkerProps = { schedule }

    for (const [jobType, isEnabled] of Object.entries(queues)) {
        if (isEnabled) {
            const queueTitle =
                queueTitles[jobType as keyof typeof queueTitles]?.queue

            if (!queueTitle) {
                console.log(`Invalid job type: ${jobType}`)
                continue
            }

            // Check if worker already exists
            if (globalWorkerRegistry[queueTitle]) {
                console.log(`Worker for ${queueTitle} already exists`)
                activeWorkers.push(globalWorkerRegistry[queueTitle])
                continue
            }

            // Clean up stale workers before starting new one
            await cleanupStaleWorkers(queueTitle)

            const worker = new Worker(
                {
                    connection: connectionDetails,
                    queues: [queueTitle],
                    timeout: WORKER_TIMEOUT,
                    looping: true,
                    name: `${process.env.NODE_ENV}-${jobType}-${
                        process.pid
                    }-${Date.now()}`,
                },
                jobs
            )

            // Enhanced error handling
            worker.on('start', () => {
                console.log(`Worker started for ${queueTitle}`)
            })

            worker.on('end', async () => {
                console.log(`Worker ended for ${queueTitle}`)

                // Clean up registry
                if (globalWorkerRegistry[queueTitle] === worker) {
                    delete globalWorkerRegistry[queueTitle]
                }

                const index = activeWorkers.indexOf(worker)
                if (index !== -1) {
                    activeWorkers.splice(index, 1)
                }
            })

            worker.on('success', (queue, job, result, duration) => {
                console.log(
                    `Job success ${queue} ${job.class} >> completed (${duration}ms)`
                )
            })

            worker.on('failure', (queue, job, failure, duration) => {
                console.log(
                    `Job failure ${queue} ${job.class} >> ${failure} (${duration}ms)`
                )
            })

            worker.on('error', (error, queue, job) => {
                console.log(
                    `Worker error ${queue} ${
                        job?.class || 'unknown'
                    } >> ${error}`
                )
            })

            // Add polling event to track worker activity - CHANGED TO INFO
            worker.on('poll', (queue) => {
                console.log(`Worker polling ${queue}`)
            })

            try {
                await worker.connect()
                await worker.start()

                // ADD THESE DEBUG LINES:
                const queues = worker.options.queues
                console.log(`Worker queues: ${JSON.stringify(queues)}`)
                console.log(
                    `Worker connection: ${JSON.stringify(
                        worker.connection.options
                    )}`
                )

                // Force check if worker is actually connected
                const isConnected = worker.connection.connected
                console.log(`Worker Redis connected: ${isConnected}`)

                activeWorkers.push(worker)
                globalWorkerRegistry[queueTitle] = worker

                console.log(
                    fileName,
                    `Worker successfully initialized for ${queueTitle}`
                )

                // ADD THIS - force check queue length
                setTimeout(async () => {
                    try {
                        const redis = new Redis(connectionDetails.host)
                        const queueLength = await redis.llen(
                            `resque:queue:${queueTitle}`
                        )
                        console.log(
                            `Queue ${queueTitle} has ${queueLength} jobs waiting`
                        )
                        await redis.quit()
                    } catch (error) {
                        console.log(`Error checking queue length: ${error}`)
                    }
                }, 1000)
            } catch (error) {
                console.log(
                    `Failed to start worker for ${queueTitle}: ${error}`
                )
            }
        }
    }

    // Set up graceful shutdown
    if (!process.listenerCount('SIGTERM')) {
        process.on('SIGTERM', shutdown)
    }
    if (!process.listenerCount('SIGINT')) {
        process.on('SIGINT', shutdown)
    }

    return activeWorkers
}

async function shutdown() {
    console.log(
        `Gracefully shutting down ${
            Object.keys(globalWorkerRegistry).length
        } workers...`
    )

    try {
        // Give workers time to finish current jobs
        await Promise.all(
            Object.values(globalWorkerRegistry).map(async (worker) => {
                try {
                    await worker.end()
                } catch (error) {
                    console.log(`Error ending worker: ${error}`)
                }
            })
        )

        // Clear registry
        Object.keys(globalWorkerRegistry).forEach(
            (key) => delete globalWorkerRegistry[key]
        )

        console.log('All workers shut down successfully')
        process.exit(0)
    } catch (error) {
        console.log(`Error during shutdown: ${error}`)
        process.exit(1)
    }
}
