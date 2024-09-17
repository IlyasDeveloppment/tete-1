import clientMetadataDao from "../dao/clientMetadataDao"
import { type Document } from "mongoose"
import createLogger from "dev.linkopus.logger"
import { ApiError, ErrorTypes, StatusCode } from "dev.linkopus.commonmessages"
import { Client } from "../models/client"

const logger = createLogger(module)

class ClientMetadataService {
  async createClient(clientData: Client): Promise<Document> {
    const client = await clientMetadataDao.createClient(clientData)
    logger.info("Client created successfully.")
    return client
  }

  async getAllClients(): Promise<Document[]> {
    const clients = await clientMetadataDao.getAllClients()
    logger.info("All clients retrieved successfully.")
    return clients
  }

  async getClientById(id: string): Promise<Document | null> {
    const client = await clientMetadataDao.getClientById(id)
    if (client) {
      logger.info("Client retrieved successfully by ID.")
      return client
    } else {
      throw new ApiError(
        {
          name: ErrorTypes.USER_NOT_FOUND,
          status: StatusCode.NOT_FOUND,
          details: `Client not found with ID: ${id}`,
        },
        logger,
      )
    }
  }

  async updateClient(
    id: string,
    updateData: Partial<Client>,
  ): Promise<Document | null> {
    const client = await clientMetadataDao.updateClient(id, updateData)
    if (client) {
      logger.info("Client updated successfully.")
      return client
    } else {
      throw new ApiError(
        {
          name: ErrorTypes.USER_NOT_FOUND,
          status: StatusCode.NOT_FOUND,
          details: `Client not found with ID: ${id}`,
        },
        logger,
      )
    }
  }

  async deleteClientById(id: string): Promise<{ deletedCount?: number }> {
    const result = await clientMetadataDao.deleteClientById(id)
    if (result.deletedCount) {
      logger.info("Client deleted successfully.")
    } else {
      logger.warn("No client found to delete with ID:", id)
    }
    return result
  }
}

export default new ClientMetadataService()
