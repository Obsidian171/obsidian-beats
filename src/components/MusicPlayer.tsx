import { useState } from "react";
import { Play, Pause, SkipForward, Volume2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Song } from "@/data/mockData";

interface MusicPlayerProps {
  currentSong: Song | null;
  onClose: () => void;
}

const MusicPlayer = ({ currentSong, onClose }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(true);

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border"
      >
        <div className="container mx-auto px-4 h-20 flex items-center gap-4">
          {/* Cover */}
          <div className="w-12 h-12 rounded-md bg-obsidian-light flex items-center justify-center flex-shrink-0">
            <span className="font-display text-lg text-primary/30">♪</span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h4 className="font-display text-sm font-semibold tracking-wider text-foreground truncate">
              {currentSong.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">{currentSong.artistName}</p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full gradient-neon flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={18} className="text-primary-foreground" />
              ) : (
                <Play size={18} className="text-primary-foreground ml-0.5" />
              )}
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <SkipForward size={18} />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <Volume2 size={18} />
            </button>
          </div>

          {/* Progress bar placeholder */}
          <div className="hidden md:block flex-1 max-w-xs">
            <div className="h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-neon rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: isPlaying ? "65%" : "65%" }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors text-xs ml-2"
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MusicPlayer;
