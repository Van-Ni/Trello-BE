import 'dotenv/config'

// #pattern: organize environment variables for common use 
//           Avoid import multiple times
export const env = {
    LOCAL_DEV_APP_HOST: process.env.LOCAL_DEV_APP_HOST,
    LOCAL_DEV_APP_PORT: process.env.LOCAL_DEV_APP_PORT,

    MONGODB_URL: process.env.MONGODB_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
    AUTHOR: process.env.AUTHOR,

    BUILD_MODE: process.env.BUILD_MODE
}