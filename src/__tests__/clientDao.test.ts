// tests/ClientMetadataDao.test.ts
import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import ClientMetadataDao from "../dao/clientMetadataDao"
import ClientMetadata from "../models/schemas/clientMetadata"
import mockClientData from "../mocks/mockClientData"

describe("ClientMetadataDao", () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" })
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    jest.clearAllMocks()
    await ClientMetadata.deleteMany({})
  })

  it("should create a new client", async () => {
    const result = await ClientMetadataDao.createClient(mockClientData)
    expect(result).toHaveProperty("_id")
  })

  it("should get client by ID", async () => {
    const createdClient = await ClientMetadata.create(mockClientData)
    const result = await ClientMetadataDao.getClientById(
      createdClient._id.toString(),
    )
    expect(result).toHaveProperty("_id", mockClientData._id)
  })

  it("should return null if client is not found by ID", async () => {
    const fakeId = new mongoose.Types.ObjectId().toString()
    const result = await ClientMetadataDao.getClientById(fakeId)
    expect(result).toBeNull()
  })

  it("should get all clients", async () => {
    await ClientMetadata.create(mockClientData)
    const result = await ClientMetadataDao.getAllClients()
    expect(result).toHaveLength(1)
  })

  it("should update client by ID", async () => {
    const createdClient = await ClientMetadata.create(mockClientData)
    const updatedData = { name: "Jane Doe" }
    const result = await ClientMetadataDao.updateClient(
      createdClient._id.toString(),
      updatedData,
    )
    expect(result).toHaveProperty("name", updatedData.name)
  })

  it("should return null if client to update is not found by ID", async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const updatedData = { name: "Jane Doe" }
    const result = await ClientMetadataDao.updateClient(
      fakeId.toString(),
      updatedData,
    )
    expect(result).toBeNull()
  })

  it("should delete client by ID", async () => {
    const createdClient = await ClientMetadata.create(mockClientData)
    const result = await ClientMetadataDao.deleteClientById(
      createdClient._id.toString(),
    )
    expect(result.deletedCount).toBe(1)
  })

  it("should return 0 deletedCount if client to delete is not found by ID", async () => {
    const fakeId = new mongoose.Types.ObjectId()
    const result = await ClientMetadataDao.deleteClientById(fakeId.toString())
    expect(result.deletedCount).toBe(0)
  })
})
