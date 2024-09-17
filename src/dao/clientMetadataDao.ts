import { Client } from "../models/client"
import ClientMetadata from "../models/schemas/clientMetadata"
import { type Document } from "mongoose"

class ClientMetadataDao {
  async createClient(clientData: Client): Promise<Document> {
    const client = new ClientMetadata(clientData)
    await client.save()
    return client
  }

  async getAllClients(): Promise<Document[]> {
    return await ClientMetadata.find()
  }

  async getClientById(id: string): Promise<Document | null> {
    return await ClientMetadata.findById(id)
  }

  async updateClient(
    id: string,
    updateData: Partial<Client>,
  ): Promise<Document | null> {
    return await ClientMetadata.findByIdAndUpdate(id, updateData, {
      new: true,
    })
  }

  async deleteClientById(id: string): Promise<{ deletedCount?: number }> {
    return await ClientMetadata.deleteOne({ _id: id })
  }
}

export default new ClientMetadataDao()
