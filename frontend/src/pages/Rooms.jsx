import React from "react";

const rooms = [
  {
    id: 1,
    type: "2 Seater",
    price: 12000,
    totalBeds: 20,
    availableBeds: 5,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
  },
  {
    id: 2,
    type: "3 Seater",
    price: 11000,
    totalBeds: 30,
    availableBeds: 8,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  },
  {
    id: 3,
    type: "4 Seater",
    price: 10000,
    totalBeds: 40,
    availableBeds: 0,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
  },
];

const Rooms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Available Rooms
          </h1>
          <p className="text-gray-500 mt-3">
            Choose the room type that best suits your needs.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* Image */}
              <img
                src={room.image}
                alt={room.type}
                className="h-56 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {room.type}
                </h2>

                <p className="text-green-600 font-semibold text-xl mt-2">
                  NPR {room.price.toLocaleString()}/month
                </p>

                <div className="mt-4 space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Total Beds:</span>{" "}
                    {room.totalBeds}
                  </p>

                  <p>
                    <span className="font-medium">Available Beds:</span>{" "}
                    {room.availableBeds}
                  </p>
                </div>

                {/* Availability Badge */}
                <div className="mt-4">
                  {room.availableBeds > 0 ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Available
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Full
                    </span>
                  )}
                </div>

                {/* Button */}
                <button
                  disabled={room.availableBeds === 0}
                  className={`w-full mt-6 py-3 rounded-lg font-semibold transition ${
                    room.availableBeds > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {room.availableBeds > 0
                    ? "Apply Now"
                    : "No Vacancy"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Rooms;