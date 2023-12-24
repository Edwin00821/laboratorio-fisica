import { Balancer } from 'react-wrap-balancer';

import { Shell } from '@/app/components/shells/shell';

export default function Home() {
  return (
    <Shell className="max-w-6xl pt-0 md:pt-0">
      <Shell
        id="hero"
        variant="scroll"
        aria-labelledby="hero-heading"
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <Balancer
          as="h1"
          className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text font-heading text-5xl text-transparent md:text-6xl lg:text-8xl dark:to-cyan-300"
        >
          Laboratorio de Física
        </Balancer>
        <div className="w-full max-w-2xl">
          <img
            className="w-full object-cover"
            src="images/hero.png"
            alt="Next.js Logo"
            fetchPriority="high"
          />
        </div>
      </Shell>
    </Shell>
  );
}
