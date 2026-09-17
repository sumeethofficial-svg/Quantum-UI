function UnderDevelopment() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <section className="w-full max-w-2xl rounded-[28px] border border-white/[0.08] bg-white/[0.02] p-8 text-center backdrop-blur-xl sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.03]">
          <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
        </div>

        <p className="mt-7 font-mono text-xs uppercase tracking-[0.28em] text-white/30">
          Quantum UI
        </p>

        <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
          Under Development
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/40 sm:text-base">
          The component library is actively being built and refined.
          Contributors are welcome to help shape what comes next.
        </p>

        <div className="mt-9 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 text-left">
          <p className="text-sm font-medium text-white/75">
            Want to contribute?
          </p>
          <p className="mt-2 text-sm leading-6 text-white/35">
            Submit a component, improvement, or feature through GitHub.
            Contributions will be reviewed and updated into Quantum UI when
            they match the project&apos;s design and quality standards.
          </p>
        </div>

        <div className="mt-7 flex justify-center">
          <a
            href="https://github.com/sumeethofficial-svg/Quantum-UI"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.04] px-6 text-sm font-medium text-white/75 transition-all duration-300 hover:border-white/[0.22] hover:bg-white/[0.08] hover:text-white"
          >
            Contribute on GitHub
            <span className="ml-2">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default UnderDevelopment;
