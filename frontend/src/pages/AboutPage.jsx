import React from "react";

const About = () => {
return ( <div className="bg-slate-950 text-white min-h-screen">


  {/* Hero Section */}
  <section className="py-20 text-center">
    <div className="max-w-4xl mx-auto px-6">
      <h1 className="text-5xl font-bold mb-6">
        About <span className="text-amber-400">Classic Boys Hostel</span>
      </h1>

      <p className="text-gray-300 text-lg">
        Providing a safe, comfortable, and affordable living
        environment for students and working professionals.
      </p>
    </div>
  </section>

  {/* About Content */}
  <section className="py-16">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

      <div>
        <img
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
          alt="Hostel Building"
          className="rounded-xl shadow-lg"
        />
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6 text-amber-400">
          Who We Are
        </h2>

        <p className="text-gray-300 mb-4">
          Classic Boys Hostel is dedicated to providing quality
          accommodation for students and professionals seeking
          a peaceful and secure place to stay.
        </p>

        <p className="text-gray-300 mb-4">
          Our hostel offers clean rooms, reliable internet,
          24/7 security, study-friendly spaces, and essential
          facilities designed to make residents feel at home.
        </p>

        <p className="text-gray-300">
          We strive to create a supportive environment where
          residents can focus on their studies, careers, and
          personal growth.
        </p>
      </div>

    </div>
  </section>

  {/* Mission & Vision */}
  <section className="py-20 bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">

      <div className="grid md:grid-cols-2 gap-8">

        <div className="bg-slate-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-amber-400 mb-4">
            Our Mission
          </h3>

          <p className="text-gray-300">
            To provide safe, affordable, and comfortable
            accommodation while fostering a positive and
            productive living environment.
          </p>
        </div>

        <div className="bg-slate-800 p-8 rounded-xl">
          <h3 className="text-2xl font-bold text-amber-400 mb-4">
            Our Vision
          </h3>

          <p className="text-gray-300">
            To become one of the most trusted hostel
            communities by delivering excellent facilities
            and resident satisfaction.
          </p>
        </div>

      </div>

    </div>
  </section>

  {/* Facilities */}
  <section className="py-20">
    <div className="max-w-7xl mx-auto px-6">

      <h2 className="text-4xl font-bold text-center mb-12">
        What We Offer
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-slate-800 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            Free WiFi
          </h3>
          <p className="text-gray-300">
            High-speed internet access throughout the hostel.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            24/7 Security
          </h3>
          <p className="text-gray-300">
            CCTV monitoring and secure hostel premises.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl text-center">
          <h3 className="text-xl font-semibold text-amber-400 mb-3">
            Clean Environment
          </h3>
          <p className="text-gray-300">
            Regular maintenance and hygiene-focused facilities.
          </p>
        </div>

      </div>

    </div>
  </section>

</div>


);
};

export default About;
