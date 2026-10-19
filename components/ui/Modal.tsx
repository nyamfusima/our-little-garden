"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion, useScrollLock } from "@/lib/hooks";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog. */
  labelledBy: string;
  children: ReactNode;
  className?: string;
  /** Extra class on the backdrop, for per-dialog styling. */
  backdropClassName?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell: portalled to the body, closes on Escape
 * and on backdrop click, traps Tab inside itself, restores focus to
 * whatever opened it, and locks page scrolling while open.
 */
export default function Modal({
  open,
  onClose,
  labelledBy,
  children,
  className = "",
  backdropClassName = "",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [present, setPresent] = useState(open);
  const [closing, setClosing] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const exitTimer = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  // Mount on open; keep mounted briefly on close so it can animate out.
  useEffect(() => {
    if (open) {
      if (exitTimer.current !== null) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
      restoreTo.current = (document.activeElement as HTMLElement) ?? null;
      setPresent(true);
      setClosing(false);
      return;
    }

    setClosing(true);
    exitTimer.current = window.setTimeout(
      () => {
        setPresent(false);
        exitTimer.current = null;
      },
      reduced ? 0 : 260,
    );

    return () => {
      if (exitTimer.current !== null) {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = null;
      }
    };
  }, [open, reduced]);

  useScrollLock(present);

  // Move focus in on open, and hand it back on close.
  useEffect(() => {
    if (!present) return;
    const panel = panelRef.current;
    const target = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel;
    target?.focus({ preventScroll: true });

    return () => {
      const previous = restoreTo.current;
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [present]);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (node) => node.offsetParent !== null || node === document.activeElement,
      );
      if (items.length === 0) {
        event.preventDefault();
        panel.focus({ preventScroll: true });
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  if (!mounted || !present) return null;

  return createPortal(
    <div
      className={`modal-backdrop ${backdropClassName}`.trim()}
      data-state={closing ? "closing" : "open"}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className={`modal-panel ${className}`.trim()}
        data-state={closing ? "closing" : "open"}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}
