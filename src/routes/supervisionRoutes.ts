import { Router } from "express"
import { handleAsync, roleGuard, roles } from "dev.linkopus.commonmessages"
import GetSupervisionController, {
  type ConnectivityChecks,
} from "dev.linkopus.supervision"
import createLogger from "dev.linkopus.logger"

const logger = createLogger(module)
const Guard = roleGuard(logger)
const admins = [roles.SYSTEM_ADMINS.ADMIN, roles.SYSTEM_ADMINS.SUPER_ADMIN]
const SupervisionController = GetSupervisionController(logger)
const router = Router()
const connectionsToChecks: ConnectivityChecks = {
  mongoDb: true,
  rabbitMq: true,
  redis: false,
}

router.get("/healthcheck", Guard(admins), SupervisionController.healthCheck)
router.get(
  "/connectivity",
  Guard(admins),
  handleAsync(SupervisionController.getConnectivityCheck(connectionsToChecks)),
)
router.get(
  "/logs/:date",
  Guard(admins),
  handleAsync(SupervisionController.getLogFileByDate),
)

export default router
