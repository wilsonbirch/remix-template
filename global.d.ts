// Declare global environment variables
declare global {
	namespace NodeJS {
		interface ProcessEnv {
			SESSION_SECRET: string
			NODE_ENV: 'development' | 'production' | 'test'
			DATABASE_URL: string
		}
	}
}

export {}
