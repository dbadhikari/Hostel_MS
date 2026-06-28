import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },

    roomType: {
      type: String,
      required: true,
    },

    floor: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    occupiedBeds: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Full"],
      default: "Available",
    },

    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);