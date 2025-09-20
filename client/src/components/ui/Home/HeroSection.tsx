const HeroSection = ({ onAuthOpen }: { onAuthOpen?: () => void }) => (
  <section className="flex flex-col items-center justify-center py-24 bg-gradient-to-b from-blue-50 to-white">
    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-700 text-center">
      Welcome to TaskManager
    </h1>
    <p className="text-lg md:text-xl text-gray-600 mb-8 text-center max-w-xl">
      Organize your tasks, boost your productivity, and never miss a deadline.
      Sign up now to get started!
    </p>
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow"
      onClick={onAuthOpen}
    >
      Get Started
    </button>
  </section>
);

export default HeroSection;
