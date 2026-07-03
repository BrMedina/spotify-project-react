import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore"
import type { Song } from "@/types";
import { Pause, Play } from "lucide-react";


const PlayButton = ({song} : {song:Song}) => {
    const {isPlaying, currentSong, togglePlay, setCurrentSong} = usePlayerStore()
    const isCurrentSong = currentSong?._id === song._id

    const handlePlay = () => {
        if (currentSong) togglePlay();
        else setCurrentSong(song)
    };
  return (
    <Button
    onClick={handlePlay}
    className={`ml-auto w-11 h-11 rounded-full bg-yellow-500 hover:bg-yellow-400 hover:scale-105 transition-all ${
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    }`}
    >
        {isCurrentSong && isPlaying ? (
            <Pause className="size-4 text-black" fill="currentColor"/>
        ) : (
            <Play className="size-4 text-black" fill="currentColor" />
        )}
    </Button>
  )
}

export default PlayButton