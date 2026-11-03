import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.24;
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => setAutoplayBlocked(true);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true));

    return () => {
      audio.pause();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setAutoplayBlocked(false)).catch(() => setAutoplayBlocked(true));
    } else {
      audio.pause();
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/portfolio-soundtrack.mp3" loop preload="none" />
      <button
        className="background-music"
        type="button"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause background music' : 'Play background music'}
        aria-pressed={playing}
      >
        {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        <Music2 size={14} aria-hidden="true" />
        <span>{playing ? 'MUSIC ON' : autoplayBlocked ? 'PLAY MUSIC' : 'MUSIC OFF'}</span>
      </button>
    </>
  );
}
