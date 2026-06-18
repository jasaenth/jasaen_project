"use client";

import {
  RefreshCw,
  Settings,
} from "lucide-react";

export default function CloudbedsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <span className="gold-divider mb-3">
          Integrations
        </span>

        <h1 className="font-display text-4xl text-maroon">
          Cloudbeds Control
        </h1>

        <p className="text-muted-foreground mt-2">
          Sync rates, availability and reservations
          with the Cloudbeds PMS.
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-full
            border
            border-border
            bg-card
            px-5
            py-2.5
            text-sm
            hover:border-gold
            transition
          "
        >
          <Settings size={15} />
          Settings
        </button>

        <button
  onClick={() =>
    window.location.href =
      "/api/cloudbeds/connect"
  }
  className="px-4 py-2 bg-primary text-white rounded-lg"
>
  Connect Cloudbeds
</button>
      </div>
    </div>
  );
}