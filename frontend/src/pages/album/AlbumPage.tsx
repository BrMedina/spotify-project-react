import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";
import { Clock } from "lucide-react";
import { usePlayerStore } from "@/stores/usePlayerStore";


const formatDuration = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

const getAlbumGradientFromImage = (imageUrl: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageUrl;

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            if (!ctx) {
                resolve("linear-gradient(to bottom, rgba(80,56,160,0.8) 0%, rgba(24,24,27,0.9) 100%)");
                return;
            }

            const size = 64;
            canvas.width = size;
            canvas.height = size;
            ctx.drawImage(img, 0, 0, size, size);

            const imageData = ctx.getImageData(0, 0, size, size).data;
            const colorMap = new Map<string, number>();

            for (let i = 0; i < imageData.length; i += 16) {
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const a = imageData[i + 3];

                if (a < 120) continue;

                const quantized = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
                colorMap.set(quantized, (colorMap.get(quantized) ?? 0) + 1);
            }

            const dominantColors = Array.from(colorMap.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 2)
                .map(([color]) => color);

            if (dominantColors.length === 0) {
                resolve("linear-gradient(to bottom, rgba(80,56,160,0.8) 0%, rgba(24,24,27,0.9) 100%)");
                return;
            }

            const [topColor] = dominantColors;
            const [topR, topG, topB] = topColor.split(",").map(Number);

            resolve(`linear-gradient(to bottom, rgba(${topR}, ${topG}, ${topB}, 0.9) 0%, rgba(24, 24, 27, 0.95) 100%)`);
        };

        img.onerror = () => {
            resolve("linear-gradient(to bottom, rgba(80,56,160,0.8) 0%, rgba(24,24,27,0.9) 100%)");
        };
    });
};

const AlbumPage = () => {
    const {albumId} = useParams();
    const { fetchAlbumById, currentAlbum, isLoading} = useMusicStore( )
    const {currentSong, isPlaying, playAlbum, togglePlay} = usePlayerStore()
    const [backgroundImage, setBackgroundImage] = useState("linear-gradient(to bottom, rgba(80,56,160,0.8) 0%, rgba(24,24,27,0.9) 100%)");

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId)
    },[fetchAlbumById,albumId])

    useEffect(() => {
        let isCancelled = false;

        if (!currentAlbum?.imageURL) {
            setBackgroundImage("linear-gradient(to bottom, rgba(80,56,160,0.8) 0%, rgba(24,24,27,0.9) 100%)");
            return;
        }

        getAlbumGradientFromImage(currentAlbum.imageURL).then((gradient) => {
            if (!isCancelled) {
                setBackgroundImage(gradient);
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [currentAlbum?.imageURL]);

    if(isLoading) return null 

    const handlePlayAlbum = () => {
        if (!currentAlbum) return;

        const isCurrentAlbumPlaying = currentAlbum?.songs.some(song => song._id === currentSong?._id);
        if (isCurrentAlbumPlaying) togglePlay();
        else {
            //start playing the album from the beginning
            playAlbum(currentAlbum?.songs, 0)
        }
    } 

    const handlePlaySong = (index: number) => {
        if (!currentAlbum) return;
        playAlbum(currentAlbum?.songs, index);
    }

    return <div className="h-full">
        <ScrollArea className="h-full rounded-md">
            {/* main content */}
            <div className="relative min-h-full">
                {/* bg gradient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage }}
                    aria-hidden='true'
                />

                {/* content */}
                <div className="relative z-10">
                    <div className="flex p-6 gap-6 pb-8">
                        <img src={currentAlbum?.imageURL}
                        alt={currentAlbum?.title}
                        className="w-60 h-60 shadow-xl rounded"
                        draggable='false'
                        />
                        <div className="flex flex-col justify-end">
                            <p className="text-sm font-medium">
                                Playlist
                            </p>
                            <h1
                                className={currentAlbum?.title === "Cyberpunk" ? "album-title-glitch text-7xl font-bold my-4" : "text-7xl font-bold my-4"}
                                data-text={currentAlbum?.title ?? ""}
                            >
                                {currentAlbum?.title}
                            </h1>
                            <div className="flex items-center gap-2 text-sm text-zinc-100">
                                <span className="font-medium text-white">{currentAlbum?.artist}</span>
                                <span>• {currentAlbum?.songs.length} songs</span>
                                <span>• {currentAlbum?.releaseYear}</span>
                            </div>

                        </div>
                    </div>

                {/* play button */}
                <div className="px-6 pb-4 flex items-center gap-6">
                    <Button 
                    onClick={handlePlayAlbum}
                    size='icon'
                    className="w-14 h-14 rounded-full bg-yellow-500 hover:bg-yellow-400 hover:scale-105 transition-all">
                        {isPlaying && currentAlbum?.songs.some((song) => song._id === currentSong?._id) ? (
                            <Pause className="h-7 w-7 text-black" fill="currentColor" stroke="none"/>
                        ): (
                            <Play className="h-7 w-7 text-black" fill="currentColor" stroke="none"/>
                        )}
                    </Button>
                </div>

                {/* table section */}
                <div className="bg-black/20 backdrop-blur-sm">
                    {/* table header */}
                    <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm 
                    text-zinc-400 border-b border-white/5">
                        <div>#</div>
                        <div>Title</div>
                        <div>Release date</div>
                        <div>
                            <Clock className="h-4 w-4"/>
                        </div>
                    </div>

                    {/* songs list */}
                    <div className="px-6">
                        <div className="space-y-2 py-4">
                            {currentAlbum?.songs.map((song, index) => {
                                const isCurrentSong = currentSong?._id === song._id;

                                return (
                                <div 
                                key={song._id}
                                onClick={() => handlePlaySong(index)}

                                className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 hover:bg-white/5 rounded-md
                                group cursor-pointer`}>

                                    <div className="flex items-center justify-center">
                                        {isCurrentSong && isPlaying ? (
                                            <div className="size-4 text-yellow-500">♬</div>
                                        ): (
                                            <span className="group-hover:hidden">{index + 1}</span>
                                        )}
                                        {!isCurrentSong && (
                                            <Play className="h-4 w-4 hidden group-hover:block" />
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <img src={song.imageURL} alt={song.title}
                                        className="size-10 " draggable='false' />

                                        <div>
                                            <div className={`font-medium text-white`}> {song.title} </div>
                                            <div>{song.artist}</div>
                                        </div>

                                        
                                    </div>
                                    
                                    <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                                    <div className="flex items-center">{formatDuration(song.duration)}</div>

                                </div>
                            ) 
                            }
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </ScrollArea>
    </div>
}

export default AlbumPage