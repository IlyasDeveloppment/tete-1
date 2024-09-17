// tests/clientMetadataService.test.ts
import clientMetadataService from "../services/clientMetadataService"
import clientMetadataDao from "../dao/clientMetadataDao"
import { ApiError } from "dev.linkopus.commonmessages"
import mockClientData from "../mocks/mockClientData"

jest.mock("../dao/clientMetadataDao", () => ({
  createClient: jest.fn(),
  getAllClients: jest.fn(),
  getClientById: jest.fn(),
  updateClient: jest.fn(),
  deleteClientById: jest.fn(),
}))

describe("ClientMetadataService", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("getAllClients", () => {
    it("should return all clients", async () => {
      const clients = [mockClientData]
      ;(clientMetadataDao.getAllClients as jest.Mock).mockResolvedValue(clients)
      const result = await clientMetadataService.getAllClients()
      expect(result).toEqual(clients)
    })
  })

  describe("createClient", () => {
    it("should create a new client", async () => {
      ;(clientMetadataDao.createClient as jest.Mock).mockResolvedValue(
        mockClientData,
      )
      const result = await clientMetadataService.createClient(mockClientData)
      expect(result).toEqual(mockClientData)
    })
  })

  describe("getClientById", () => {
    it("should return client by ID", async () => {
      ;(clientMetadataDao.getClientById as jest.Mock).mockResolvedValue(
        mockClientData,
      )
      const result = await clientMetadataService.getClientById("1234567890")
      expect(result).toEqual(mockClientData)
    })

    it("should throw an error if client not found", async () => {
      ;(clientMetadataDao.getClientById as jest.Mock).mockResolvedValue(null)
      await expect(
        clientMetadataService.getClientById("notfoundID"),
      ).rejects.toThrowError(ApiError)
    })
  })

  describe("updateClient", () => {
    it("should update client details", async () => {
      const updatedClient = { ...mockClientData, name: "John Doe Updated" }
      ;(clientMetadataDao.updateClient as jest.Mock).mockResolvedValue(
        updatedClient,
      )
      const result = await clientMetadataService.updateClient(
        "1234567890",
        updatedClient,
      )
      expect(result).toEqual(updatedClient)
    })

    it("should throw an error if client not found", async () => {
      ;(clientMetadataDao.updateClient as jest.Mock).mockResolvedValue(null)
      await expect(
        clientMetadataService.updateClient("notfoundID", {}),
      ).rejects.toThrowError(ApiError)
    })
  })

  describe("deleteClientById", () => {
    it("should delete client by ID", async () => {
      ;(clientMetadataDao.deleteClientById as jest.Mock).mockResolvedValue({
        deletedCount: 1,
      })
      const result = await clientMetadataService.deleteClientById("1234567890")
      expect(result.deletedCount).toBe(1)
    })

    it("should return 0 deletedCount if client not found", async () => {
      ;(clientMetadataDao.deleteClientById as jest.Mock).mockResolvedValue({
        deletedCount: 0,
      })
      const result = await clientMetadataService.deleteClientById("notfoundID")
      expect(result.deletedCount).toBe(0)
    })
  })
})
