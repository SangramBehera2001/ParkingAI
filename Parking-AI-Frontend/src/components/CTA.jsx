const CTA = () => {
  return (
    <section className="py-16 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          Generate Your Secure QR Today
        </h2>

        {/* Description */}
        <p className="mt-4 text-blue-100 text-sm sm:text-base">
          Protect your privacy while making your vehicle reachable when it
          matters. Simple, fast, and secure.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Get Started
          </button>

          <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
