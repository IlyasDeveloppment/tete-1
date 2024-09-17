import {
  ApiError,
  ErrorTypes,
  StatusCode,
  SuccessTypes,
  validateSchema,
} from "dev.linkopus.commonmessages"
import { type Request, type Response } from "express"
import clientMetadataService from "../services/clientMetadataService"
import createLogger from "dev.linkopus.logger"
import { Client } from "../models/client"
import { clientJoiSchema } from "../validators/clientValidator"

const logger = createLogger(module)
const validate = validateSchema(logger)

class ClientController {
  getAllClients = async (req: Request, res: Response): Promise<void> => {
    const clients = await clientMetadataService.getAllClients()
    logger.info("Fetched all clients successfully.")
    res.status(StatusCode.OK).json(clients)
  }

  createClient = async (req: Request, res: Response): Promise<void> => {
    const isValidBody = validate(req.body, clientJoiSchema)
    if (isValidBody instanceof ApiError) throw isValidBody

    const client = await clientMetadataService.createClient(req.body as Client)
    logger.info("Created new client successfully.")
    res.status(StatusCode.CREATED).json(client)
  }

  getClientById = async (req: Request, res: Response): Promise<void> => {
    const client = await clientMetadataService.getClientById(req.params.id)
    if (client !== null) {
      logger.info(`Client with ID ${req.params.id} fetched successfully.`)
      res.status(StatusCode.OK).json(client)
    } else {
      logger.warn(`Client with ID ${req.params.id} not found.`)
      res
        .status(StatusCode.NOT_FOUND)
        .json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  }

  updateClient = async (req: Request, res: Response): Promise<void> => {
    const isValidBody = validate(req.body, clientJoiSchema)
    if (isValidBody instanceof ApiError) throw isValidBody

    const updatedClient = await clientMetadataService.updateClient(
      req.params.id,
      req.body as Partial<Client>,
    )
    if (updatedClient !== null) {
      logger.info(`Client with ID ${req.params.id} updated successfully.`)
      res.status(StatusCode.OK).json(updatedClient)
    } else {
      logger.warn(`Client with ID ${req.params.id} not found for update.`)
      res
        .status(StatusCode.NOT_FOUND)
        .json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  }

  deleteClientById = async (req: Request, res: Response): Promise<void> => {
    const result = await clientMetadataService.deleteClientById(req.params.id)
    if (result.deletedCount !== undefined) {
      logger.info(`Client with ID ${req.params.id} deleted successfully.`)
      res
        .status(StatusCode.OK)
        .json({ message: SuccessTypes.USERS_DELETED_SUCCESSFULLY })
    } else {
      logger.warn(`Client with ID ${req.params.id} not found for deletion.`)
      res
        .status(StatusCode.NOT_FOUND)
        .json({ message: ErrorTypes.USER_NOT_FOUND })
    }
  }
}

export default new ClientController()
