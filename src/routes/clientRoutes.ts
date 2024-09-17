import { Router } from "express"
import clientController from "../controllers/clientController"
import { handleAsync } from "dev.linkopus.commonmessages"

const router = Router()

router.get("/clients", handleAsync(clientController.getAllClients))
router.post("/clients", handleAsync(clientController.createClient))
router.get("/clients/:id", handleAsync(clientController.getClientById))
router.put("/clients/:id", handleAsync(clientController.updateClient))
router.delete("/clients/:id", handleAsync(clientController.deleteClientById))

export default router
