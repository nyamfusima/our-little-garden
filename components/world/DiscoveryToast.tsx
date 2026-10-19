"use client";

import { ThingIcon } from "../art/Decor";
import { useWorld } from "./WorldProvider";

/** The little card that flies in when she finds something. */
export default function DiscoveryToast() {
  const { discovery, dismissDiscovery, setJournalOpen } = useWorld();
  if (!discovery) return null;

  return (
    <div className="discovery" role="status">
      <span className="discovery-icon" aria-hidden="true">
        <ThingIcon icon={discovery.icon} size={34} />
      </span>
      <div className="discovery-copy">
        <p className="discovery-name">{discovery.name}</p>
        <p className="discovery-note">{discovery.note}</p>
        <button
          type="button"
          className="discovery-link"
          onClick={() => {
            dismissDiscovery();
            setJournalOpen(true);
          }}
        >
          put it in the journal
        </button>
      </div>
      <button type="button" className="icon-button discovery-close" onClick={dismissDiscovery} aria-label="Dismiss">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
