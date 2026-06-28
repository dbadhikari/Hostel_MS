import Room from "../models/rooms.js";

// Add Room
export const addRoom = async (req, res) => {
  try {
    const { roomNumber, roomType, floor, price, image } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomNumber,
      roomType,
      floor,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Room added successfully",
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Rooms
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Room
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Room
export const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      room: updatedRoom,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    await Room.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};