import dotenv from "dotenv"
dotenv.config()

interface Config {
  server: {
    port: string | number
    mongodbUri: string
  }
}

const config: Config = {
  server: {
    port: process.env.PORT ?? 3001,
    mongodbUri:
      process.env.MONGODB_URI ?? "mongodb://localhost:27017/defaultDb",
  },
}

export default config
