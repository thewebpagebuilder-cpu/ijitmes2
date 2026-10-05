"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type GalleryItem = { src: string; alt: string; caption: string; remote?: boolean };

export default function GalleryMarquee({
  rows,
}: {
  rows: [GalleryItem[], GalleryItem[]];
}) {
  return (
    <div className="space-y-5 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {rows.map((row, r) => {
        const doubled = [...row, ...row];
        return (
          <div key={r} className="overflow-hidden">
            <div
              className={`flex w-max gap-5 ${r === 0 ? "animate-ticker-slow" : "animate-ticker-rev"}`}
            >
              {doubled.map((item, i) => (
                <motion.figure
                  key={`${item.src}-${i}`}
                  whileHover={{ scale: 1.04, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="img-shine group relative h-44 w-72 shrink-0 overflow-hidden rounded-xl bg-paper-200 shadow-[0_18px_40px_-20px_rgb(var(--tint)/0.5)] sm:h-52 sm:w-80"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="320px"
                    unoptimized={item.remote}
                    className="object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <figcaption className="absolute inset-x-0 bottom-0 translate-y-1 p-4 text-[0.8rem] font-semibold text-white transition-transform duration-500 group-hover:translate-y-0">
                    <span className="mb-1.5 block h-[2px] w-6 bg-gold-400 transition-all duration-500 group-hover:w-12" />
                    {item.caption}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
