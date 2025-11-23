// Declare global environment variables
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            SESSION_SECRET: string
            NODE_ENV: 'development' | 'production' | 'test'
            DATABASE_URL: string
            PORT: string
            REDIS_QUEUE: string
            REDIS_PORT: string
            REDIS_USERNAME: string
            REDIS_HOST: string
            REDIS_PASSWORD: string
        }
    }
}

export {}
