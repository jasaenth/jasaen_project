"use client";

import { Cloud } from "lucide-react";

export default function CloudbedsHero() {
  return (
    <div
      className="
        rounded-3xl
        bg-gradient-to-br
        from-charcoal
        to-[oklch(0.16_0.01_285)]
        text-ivory
        p-8
        shadow-luxe
      "
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <span
            className="
              h-16
              w-16
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-gold/20
              text-gold
            "
          >
            <Cloud size={28} />
          </span>

          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />

              <span
                className="
                  text-xs
                  uppercase
                  tracking-[0.3em]
                  text-gold
                "
              >
                Connected
              </span>
            </div>

            <h2 className="font-display text-3xl mt-1">
              Cloudbeds PMS
            </h2>

            <p className="text-ivory/60 text-sm mt-1">
              Last full sync 2 minutes ago ·
              Account JSN-PROD-01
            </p>
          </div>
        </div>

        <div className="flex gap-8 flex-wrap">
          <div>
            <div className="font-display text-3xl text-gold">
              99.8%
            </div>

            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-ivory/60
              "
            >
              Uptime 30d
            </div>
          </div>

          <div>
            <div className="font-display text-3xl text-gold">
              1,284
            </div>

            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-ivory/60
              "
            >
              Synced Records
            </div>
          </div>

          <div>
            <div className="font-display text-3xl text-gold">
              42
            </div>

            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-ivory/60
              "
            >
              Rooms Managed
            </div>
          </div>

          <div>
            <div className="font-display text-3xl text-gold">
              8
            </div>

            <div
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                text-ivory/60
              "
            >
              Channels Live
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}