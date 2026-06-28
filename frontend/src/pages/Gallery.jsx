import React from "react";

const galleryImages = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1200",
    title: "2 Seater Room",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    title: "4 Seater Room",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    title: "Study Area",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200",
    title: "Dining Hall",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    title: "Common Area",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
    title: "Hostel Building",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-14 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Hostel Gallery
          </h1>

          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Take a look at our rooms, facilities, study areas, dining hall,
            and hostel environment.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group overflow-hidden rounded-2xl shadow-md bg-white"
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-3xl font-bold text-blue-600">100+</h2>
            <p className="text-gray-600 mt-2">Residents</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-3xl font-bold text-green-600">50+</h2>
            <p className="text-gray-600 mt-2">Rooms</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-3xl font-bold text-purple-600">24/7</h2>
            <p className="text-gray-600 mt-2">Security</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h2 className="text-3xl font-bold text-orange-600">High Speed</h2>
            <p className="text-gray-600 mt-2">WiFi</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Gallery;