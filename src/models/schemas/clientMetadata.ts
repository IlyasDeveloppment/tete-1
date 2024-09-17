import mongoose from "mongoose"
import { Client } from "../client"

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  address: { type: mongoose.Schema.Types.Mixed, required: false },
  birthDate: { type: Date, required: false },
  tags: { type: mongoose.Schema.Types.Mixed, required: false },
  active: { type: Boolean, required: false },
  score: { type: Number, required: false },
  preferences: { type: mongoose.Schema.Types.Mixed, required: false },
  lastLogin: { type: Date, required: false },
  notes: { type: mongoose.Schema.Types.Mixed, required: false },
})

const clientMetadata = mongoose.model<Client>("ClientMetadata", clientSchema)

export default clientMetadata
