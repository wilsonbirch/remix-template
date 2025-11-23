import { Queue } from 'node-resque'
import { jobs } from '~/resque/jobs.server'
import { queueTitles } from '~/resque/worker.server'

export type ResqueTaskInput = {
    job: 'template'
    templateProps?: TemplateJobProps
}

export type TemplateJobProps = {}

export const connectionDetails = {
    pkg: 'ioredis',
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: Number(process.env.REDIS_PORT),
    username: process.env.REDIS_USERNAME,
    database: 0,
}

const fileName = 'resque/main.server.ts'

export async function resqueTask({ job, templateProps }: ResqueTaskInput) {
    const jobDetails = {
        template: {
            queue: queueTitles['template'].queue,
            props: templateProps,
        },
    }
    const props = jobDetails[job].props
    const queueTitle = jobDetails[job].queue

    if (!queueTitle || !props) {
        throw new Error('Invalid job type')
    }

    const redisQueue = new Queue({ connection: connectionDetails }, jobs)

    // Add queue event listeners for debugging
    redisQueue.on('error', function (error) {
        console.log(`resque:queue error: ${error}`)
    })
    try {
        await redisQueue.connect()

        // Log the enqueue attempt
        console.log(`Enqueueing job: ${job} to queue: ${queueTitle}`)

        await redisQueue.enqueue(queueTitle, job, [props])

        console.log(`Successfully enqueued job: ${job}`)
    } catch (error) {
        console.log(`Failed to enqueue job ${job}: ${error}`)
        throw error
    } finally {
        await redisQueue.end()
    }
}

// Helper function to check queue status
export async function getQueueStatus(queueName: string) {
    const redisQueue = new Queue({ connection: connectionDetails }, jobs)

    try {
        await redisQueue.connect()

        const queueLength = await redisQueue.length(queueName)

        console.log(`Queue ${queueName} - Pending: ${queueLength}`)

        return { pending: queueLength }
    } finally {
        await redisQueue.end()
    }
}
