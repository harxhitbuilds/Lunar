import { ChevronRight, Star, UserCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GlowingStarsBackground } from "@/components/ui/glowing-stars";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import Navbar from "./components/Navbar";

const Land = () => {
  const hero = " Where every moment finds its perfect beat.";

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <GlowingStarsBackground className="absolute inset-0 -z-10" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />

        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-32 sm:px-6 sm:pb-8 lg:px-8">
          <Button className="flex items-center gap-2 rounded-full border border-zinc-600 bg-transparent px-3 hover:bg-transparent">
            <span className="poppins text-xs font-light text-white">
              🎵 Welcome to Lunar
            </span>
            <ChevronRight className="h-4 w-4 text-white" />
          </Button>

          <div className="mx-auto mb-8 w-full max-w-6xl space-y-6 text-center">
            <TextGenerateEffect
              words={hero}
              className="michroma bg-gradient-to-r from-white via-gray-200 to-zinc-400 bg-clip-text px-2 text-3xl leading-tight text-transparent sm:text-3xl md:text-4xl lg:text-6xl"
            />

            <p className="inter mx-auto max-w-xs px-4 text-sm text-zinc-400 italic sm:max-w-md sm:text-base md:max-w-2xl md:text-sm lg:max-w-3xl">
              Listen to the music you love, without interruptions. Search, play
              and explore, all in one place.
            </p>
          </div>

          <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
            <div className="rounded-sm border border-zinc-800 p-1">
              <a
                href="https://github.com/Harshit-Parmar555/"
                target="_blank"
                className="flex items-center gap-2 rounded-sm bg-black px-4 py-2 text-xs font-light text-white shadow-[0_4px_14px_rgba(0,118,255,0.35)] transition duration-200 ease-linear hover:bg-black/80 hover:shadow-[0_6px_20px_rgba(0,118,255,0.5)]"
              >
                <UserCog className="h-4 w-4" />
                Meet Developer
              </a>
            </div>

            <div className="rounded-sm border border-zinc-800 p-1">
              <a
                href="https://github.com/Harshit-Parmar555/"
                target="_blank"
                className="flex items-center gap-2 rounded-sm bg-white px-4 py-2 text-xs font-light text-black shadow-[0_4px_14px_rgba(0,118,255,0.35)] transition duration-200 ease-linear hover:bg-white hover:shadow-[0_6px_20px_rgba(0,118,255,0.5)]"
              >
                <Star className="h-4 w-4" />
                Star on Github
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Land;
