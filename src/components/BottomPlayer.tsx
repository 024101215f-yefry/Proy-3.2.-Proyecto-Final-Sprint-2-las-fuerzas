import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, VolumeX, Heart, Maximize2, ListMusic } from 'lucide-react';
import { Track } from '../types';

interface BottomPlayerProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  activeCoverUrl?: string;
}

export default function BottomPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  activeCoverUrl,
}: BottomPlayerProps) {
  const [liked, setLiked] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(30); // scale 0-100
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  // Auto increment progress when playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const defaultTrack: Track = {
    id: 'default',
    title: 'MONACO',
    artist: 'Bad Bunny',
    duration: '4:27',
    price: 3.99,
  };

  const track = currentTrack || defaultTrack;
  const cover = activeCoverUrl || 'https://images.unsplash.com/photo-1614680376593-902f74fa0d41?w=100&q=80';

  // Calculate current timestamp of progress
  const parseTimeToSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    }
    return 240; // 4 mins
  };

  const formatSecondsToTime = (secondsNum: number) => {
    const mins = Math.floor(secondsNum / 60);
    const secs = Math.floor(secondsNum % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalSecs = parseTimeToSeconds(track.duration);
  const elapsedSecs = Math.floor((progress / 100) * totalSecs);

  return (
    <div className="fixed bottom-0 left-0 right-0 h-24 bg-white/95 backdrop-blur-xl border-t border-purple-100 z-50 px-6 py-4 flex flex-col justify-center shadow-[0_-8px_30px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
        
        {/* Left: Track Information with heart */}
        <div className="flex items-center gap-3 w-1/4 min-w-[150px]">
          <img
            src={cover}
            alt={track.title}
            className={`w-12 h-12 rounded-md object-cover border border-purple-100 shadow-sm ${isPlaying ? 'animate-pulse' : ''}`}
          />
          <div className="overflow-hidden hidden sm:block">
            <h4 className="text-[#0F172A] text-xs sm:text-sm font-semibold truncate">{track.title}</h4>
            <p className="text-[#64748B] text-xxs sm:text-xs truncate">{track.artist}</p>
          </div>
          <button
            onClick={() => setLiked(!liked)}
            className={`p-1.5 rounded-full transition-colors ${liked ? 'text-pink-500' : 'text-slate-400 hover:text-purple-600'}`}
          >
            <Heart className="w-4 h-4 fill-current transition-transform duration-300 active:scale-150" />
          </button>
        </div>

        {/* Center: Controls & Audio Progress */}
        <div className="flex flex-col items-center gap-1.5 flex-1 max-w-lg">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setShuffle(!shuffle)}
              className={`p-1.5 rounded-full transition-colors ${shuffle ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-[#0F172A]'}`}
              title="Aleatorio"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button onClick={onPrev} className="p-1.5 text-slate-400 hover:text-[#0F172A] transition-colors" title="Anterior">
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={onTogglePlay}
              className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full hover:scale-105 transition-transform duration-200 shadow-md shadow-pink-500/20"
              title={isPlaying ? 'Pausa' : 'Reproducir'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
            </button>

            <button onClick={onNext} className="p-1.5 text-slate-400 hover:text-[#0F172A] transition-colors" title="Siguiente">
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => setRepeat(!repeat)}
              className={`p-1.5 rounded-full transition-colors ${repeat ? 'text-purple-600 font-bold' : 'text-slate-400 hover:text-[#0F172A]'}`}
              title="Repetir"
            >
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full text-xxs sm:text-xs text-[#64748B]">
            <span>{formatSecondsToTime(elapsedSecs)}</span>
            <div className="relative flex-1 group h-4 flex items-center cursor-pointer">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
              />
              <div
                className="absolute left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg pointer-events-none"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>{track.duration}</span>
          </div>
        </div>

        {/* Right: Extra controls & volume */}
        <div className="flex items-center justify-end gap-3 w-1/4 min-w-[120px]">
          <button className="p-1.5 text-slate-400 hover:text-[#0F172A] transition-colors hidden md:block" title="Cola de reproducción">
            <ListMusic className="w-4 h-4" />
          </button>

          <button onClick={() => setIsMuted(!isMuted)} className="p-1.5 text-slate-400 hover:text-[#0F172A] transition-colors" title="Silenciar">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-pink-500" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-16 sm:w-20 h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
          />

          <button className="p-1.5 text-slate-400 hover:text-[#0F172A] transition-colors hidden sm:block" title="Pantalla Completa">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
