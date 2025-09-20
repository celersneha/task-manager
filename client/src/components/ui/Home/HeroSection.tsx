const HeroSection = ({ onAuthOpen }: { onAuthOpen?: () => void }) => (
  <section className="flex flex-col items-center justify-center py-24 min-h-screen bg-gradient-to-b from-[var(--chart-2)] via-[var(--secondary)] to-[var(--card)]">
    <div className="bg-[color:var(--card)]/80 rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center max-w-2xl w-full border border-[color:var(--border)]">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[color:var(--accent)] text-center drop-shadow">
        Welcome to{" "}
        <span className="text-[color:var(--primary)]">TaskManager</span>
      </h1>
      <p className="text-lg md:text-xl text-[color:var(--foreground)] mb-8 text-center max-w-xl font-medium">
        Organize your tasks, boost your productivity, and never miss a deadline.
        <br />
        <span className="text-[color:var(--accent)] font-semibold">
          Sign up now
        </span>{" "}
        to get started!
      </p>
      <button
        className="bg-[color:var(--primary)] hover:bg-[color:var(--accent)] transition-colors text-[color:var(--primary-foreground)] px-10 py-4 rounded-xl text-lg font-bold shadow-lg shadow-[color:var(--primary)]/30"
        onClick={onAuthOpen}
      >
        Get Started
      </button>
    </div>
    <div className="mt-12 flex gap-4">
      <span className="w-4 h-4 rounded-full bg-[color:var(--primary)] animate-bounce" />
      <span className="w-4 h-4 rounded-full bg-[color:var(--chart-3)] animate-bounce delay-150" />
      <span className="w-4 h-4 rounded-full bg-[color:var(--accent)] animate-bounce delay-300" />
    </div>
  </section>
);

export default HeroSection;
