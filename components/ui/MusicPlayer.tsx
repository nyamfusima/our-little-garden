"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

/**
 * Ambient music. Never autoplays, remembers nothing, and quietly
 * disappears if the file is missing or the browser refuses to play.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [broken, setBroken] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
    };
  }, []);

  if (!site.music.src || broken) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      audio.volume = volume;
      await audio.play();
      setPlaying(true);
    } catch {
      setBroken(true);
    }
  };

  return (
    <div className="music" data-open={open ? "true" : "false"}>
      <audio
        ref={audioRef}
        src={site.music.src}
        loop
        preload="none"
        onError={() => setBroken(true)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <button
        type="button"
        className="bar-button"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? `Pause ${site.music.title}` : `Play ${site.music.title}`}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {playing ? (
            <path d="M9 6v12M15 6v12" strokeLinecap="round" />
          ) : (
            <path d="M8 18V6l10 6-10 6Z" strokeLinejoin="round" />
          )}
        </svg>
        <span className="bar-button-text">{site.music.title}</span>
      </button>

      <button
        type="button"
        className="music-volume-toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Volume"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M5 10v4h3l4 3V7L8 10H5Z" strokeLinejoin="round" />
          <path d="M16 9.5a3.5 3.5 0 0 1 0 5" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <label className="music-volume">
          <span className="sr-only">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>
      ) : null}
    </div>
  );
}
