import express from "express";
import {
  addRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} from "../controller/roomController.js";

const roomRoutes = express.Router();

// Add Room
roomRoutes.post("/", addRoom);

// Get All Rooms
roomRoutes.get("/", getRooms);

// Get Single Room
roomRoutes.get("/:id", getRoomById);

// Update Room
roomRoutes.put("/:id", updateRoom);

// Delete Room
roomRoutes.delete("/:id", deleteRoom);

export default roomRoutes;