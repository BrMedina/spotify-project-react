import { useMusicStore } from "@/stores/useMusicStore";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect } from "react";
import { useParams } from "react-router-dom";


const AlbumPage = () => {
    const {albumId} = useParams();
    const { fetchAlbumById, currentAlbum, isLoading} = useMusicStore()

    useEffect(() => {
        if (albumId) fetchAlbumById(albumId)
    },[fetchAlbumById,albumId])

    if(isLoading) return null 

    return <div className="h-full">
        <ScrollArea className="h-full">
            {/* main content */}
            <div className="relative min-h-full">
                {/* bg gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
                aria-hidden='true' 
                />

                {/* content */}
                <div className="relative z-10">
                    <div className="flex p-6 gap-6 pb-8">
                        <img src={currentAlbum?.imageURL}
                        alt={currentAlbum?.title}
                        className="w-60 h-60 shadow-xl rounded"
                        />
                    </div>

                </div>
            </div>
        </ScrollArea>
    </div>
}

export default AlbumPage