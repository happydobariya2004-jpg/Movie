import React from "react";

const trending = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
  "https://images.unsplash.com/photo-1495567720989-cebdbdd97913",
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759"
];

const continueWatch = [
  {
    title: "Oppenheimer",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
  },
  {
    title: "The Killer",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
  },
  {
    title: "The Sound of Magic",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
  }
];

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
    

      {/* Hero Section */}
      

      {/* Trending */}
      <section className="p-6">
        <h2 className="text-lg mb-4">Trending Now</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {trending.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="rounded-xl h-40 w-full object-cover hover:scale-105 transition"
            />
          ))}
        </div>
      </section>

      {/* Continue Watching */}
      <section className="p-6">
        <h2 className="text-lg mb-4">Continue Watching</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {continueWatch.map((item, i) => (
            <div key={i} className="bg-gray-900 rounded-xl overflow-hidden">
              <img
                src={item.img}
                alt=""
                className="h-40 w-full object-cover"
              />
              <div className="p-3">
                <h3>{item.title}</h3>
                <div className="h-1 bg-yellow-500 mt-2 w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-gray-500 text-center p-6 border-t border-gray-800">
        © 2024 CineVault. All rights reserved.
      </footer>
    </div>
  );
};

export default App;