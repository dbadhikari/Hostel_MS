import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Bed,
  DoorOpen,
  Hash,
  DollarSign,
  Layers,
  AlertCircle
} from "lucide-react";

const BackendUrl = import.meta.env.VITE_BACKEND_URL;

const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/rooms`);
      setRooms(res.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const deleteRoom = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      await axios.delete(`${BackendUrl}/rooms/${id}`);
      fetchRooms();
    } catch (error) {
      console.log(error);
    }
  };

  const statusOptions = [
    { value: "Available", label: "Available", color: "bg-green-100 text-green-800" },
    { value: "Full", label: "Full", color: "bg-red-100 text-red-800" },
    { value: "Maintenance", label: "Maintenance", color: "bg-yellow-100 text-yellow-800" },
  ];

  const roomTypeOptions = [
    { value: "", label: "Select Room Type" },
    { value: "2 Seater", label: "2 Seater" },
    { value: "3 Seater", label: "3 Seater" },
    { value: "4 Seater", label: "4 Seater" },
    { value: "Suite", label: "Suite" },
    { value: "Deluxe", label: "Deluxe" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-25">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Room Management</h1>
            <p className="text-gray-500 mt-1">Manage all rooms and their availability</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {rooms.length} Rooms
            </span>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              {editingRoom ? (
                <>
                  <Pencil size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Edit Room</h3>
                  <span className="text-sm text-gray-500 ml-2">
                    #{editingRoom.roomNumber}
                  </span>
                </>
              ) : (
                <>
                  <Plus size={20} className="text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Add New Room</h3>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            <Formik
              enableReinitialize
              initialValues={{
                roomNumber: editingRoom?.roomNumber || "",
                roomType: editingRoom?.roomType || "",
                floor: editingRoom?.floor || "",
                price: editingRoom?.price || "",
                image: editingRoom?.image || "",
                status: editingRoom?.status || "Available",
              }}
              onSubmit={async (values, { resetForm }) => {
                setIsSubmitting(true);
                try {
                  if (editingRoom) {
                    await axios.put(
                      `${BackendUrl}/rooms/${editingRoom._id}`,
                      values
                    );
                  } else {
                    await axios.post(`${BackendUrl}/rooms`, values);
                  }

                  fetchRooms();
                  resetForm();
                  setEditingRoom(null);
                } catch (error) {
                  console.log(error);
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              {({ values, handleChange, handleBlur }) => (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Room Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Hash size={16} className="text-gray-400" />
                          Room Number <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Field
                        name="roomNumber"
                        placeholder="e.g. 101, 202, 305"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                      />
                    </div>

                    {/* Room Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Bed size={16} className="text-gray-400" />
                          Room Type <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Field
                        as="select"
                        name="roomType"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-white"
                      >
                        {roomTypeOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {/* Floor */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <Layers size={16} className="text-gray-400" />
                          Floor <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Field
                        name="floor"
                        type="number"
                        placeholder="e.g. 1, 2, 3"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <DollarSign size={16} className="text-gray-400" />
                          Price (per bed) <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Field
                        name="price"
                        type="number"
                        placeholder="e.g. 5000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                      />
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <ImageIcon size={16} className="text-gray-400" />
                          Image URL
                        </div>
                      </label>
                      <Field
                        name="image"
                        placeholder="https://example.com/room.jpg"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle size={16} className="text-gray-400" />
                          Status <span className="text-red-500">*</span>
                        </div>
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-white"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                          {editingRoom ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        <>
                          {editingRoom ? <Pencil size={18} /> : <Plus size={18} />}
                          {editingRoom ? "Update Room" : "Add Room"}
                        </>
                      )}
                    </button>

                    {editingRoom && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingRoom(null);
                          // Reset form via Formik's resetForm would be handled by enableReinitialize
                        }}
                        className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-6 py-2.5 rounded-lg transition"
                      >
                        <X size={18} />
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Room List</h3>
            <span className="text-sm text-gray-500">
              {rooms.length} room{rooms.length !== 1 ? "s" : ""} found
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Occupied
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <DoorOpen size={40} className="text-gray-300" />
                        <p>No rooms added yet</p>
                        <p className="text-sm text-gray-400">Add your first room using the form above</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <img
                          src={room.image || "https://via.placeholder.com/64x64?text=No+Image"}
                          alt={room.roomNumber}
                          className="w-14 h-14 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64x64?text=No+Image";
                          }}
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        #{room.roomNumber}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {room.roomType}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        Floor {room.floor}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        Rs. {room.price.toLocaleString()}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {room.occupiedBeds || 0} / {room.roomType?.split(" ")[0] || 0}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          room.status === "Available" 
                            ? "bg-green-100 text-green-800" 
                            : room.status === "Full" 
                            ? "bg-red-100 text-red-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {room.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setEditingRoom(room)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="Edit room"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => deleteRoom(room._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete room"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRooms;