import mongoose from "mongoose"

const mockClientData = {
  _id: new mongoose.Types.ObjectId(),
  name: "example string",
  email: "example string",
  phone: "example string",
  address: {},
  birthDate: new Date(),
  tags: null,
  active: true,
  score: 123,
  preferences: {},
  lastLogin: new Date(),
  notes: null,
}

export default mockClientData
