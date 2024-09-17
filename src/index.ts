import express from "express"
import clientRoutes from "./routes/clientRoutes"
import SupervisionRouter from "./routes/supervisionRoutes"
import swaggerUi from "swagger-ui-express"
import * as swaggerDocument from "./swagger.json"
import createLogger from "dev.linkopus.logger"
import {
  errorHandlerMiddleware,
  routeNotFoundHandlerMiddleware,
  connectDB,
  roleGuard,
  roles,
  requestLoggerMw,
} from "dev.linkopus.commonmessages"
import config from "./config/config"

const logger = createLogger(module)
const { server } = config
const app = express()
const guard = roleGuard(logger)
const admins = Object.values(roles.SYSTEM_ADMINS)
connectDB(logger).catch((err) => {
  logger.error(`Failed to connect to database, Error: ${err}`)
})

app.use(express.json())
app.use("/", clientRoutes)
app.use(requestLoggerMw(logger))
app.use("/supervision", guard(admins), SupervisionRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.all("*", routeNotFoundHandlerMiddleware(logger))
app.use(errorHandlerMiddleware(logger))

app.listen(server.port, () => {
  logger.info(`Server running on port ${server.port}`)
})
