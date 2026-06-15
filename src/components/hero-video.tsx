"use client";

import { useEffect, useRef } from "react";

/**
 * Hero-Hintergrundvideo. iOS zeigt sonst einen Play-Button, wenn das Autoplay
 * blockiert wird — daher setzen wir `muted` zusätzlich per Property und rufen
 * play() aktiv auf, sodass es überall (auch mobil) ohne Button autoplayt.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => {
      v.play().catch(() => {});
    };
    play();
    v.addEventListener("canplay", play, { once: true });
    v.addEventListener("loadeddata", play, { once: true });
    return () => {
      v.removeEventListener("canplay", play);
      v.removeEventListener("loadeddata", play);
    };
  }, []);

  // Linker Auslauf-Verlauf (mask-image): Video läuft links in Weiß aus.
  return (
    <video
      ref={ref}
      className="is-grayscale h-full w-full object-cover [-webkit-mask-image:linear-gradient(to_right,transparent,#000_38%)] [mask-image:linear-gradient(to_right,transparent,#000_38%)]"
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      poster="/img/erol-key.jpg"
    >
      <source src="/media/hero.mp4" type="video/mp4" />
    </video>
  );
}
