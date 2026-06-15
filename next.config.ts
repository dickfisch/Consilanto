import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workspace-Root explizit auf dieses Projekt setzen
  // (im Home-Verzeichnis liegt eine weitere package-lock.json).
  turbopack: {
    root: __dirname,
  },
  // Zugriff auf /_next/*-Dev-Ressourcen (JS, HMR) über fremde Hosts erlauben,
  // damit die Seite per Cloudflare-Tunnel auf dem Handy korrekt lädt.
  // Wildcard deckt auch die wechselnden trycloudflare-Zufalls-URLs ab.
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Next.js-Dev-Indikator ("N"-Badge unten links) ausblenden — kollidiert
  // sonst mit dem Kontakt-Button und ist in Produktion ohnehin nicht da.
  devIndicators: false,
};

export default nextConfig;
