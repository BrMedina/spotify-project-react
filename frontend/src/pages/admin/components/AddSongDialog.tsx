import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMusicStore } from "@/stores/useMusicStore"
import { Plus, Upload, UploadIcon } from "lucide-react";

import { useRef, useState } from "react";

const AddSongDialog = () => {
    const {albums} = useMusicStore();
const [songDialogOpen, setSongDialogOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const [newSong, setNewSong] = useState({
    title: "",
    artist: "",
    album: undefined,
    duration: 0
});

const [files, setFiles] = useState<{audio: File | null, image: File | null}>({
    audio: null,
    image: null
});

const audioInputRef = useRef<HTMLInputElement>(null);
const imageInputRef = useRef<HTMLInputElement>(null);

const handleSubmit = async () => {

};


  return (
    <Dialog open = {songDialogOpen} onOpenChange={setSongDialogOpen}>
        <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                <Plus className="mr-4 h-4 w-4" />
                Add Song
            </Button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
            <DialogHeader>
                <DialogTitle>Add New Song</DialogTitle>
                <DialogDescription>Add a new song to your music library.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
                <input type="file"
                    accept="audio/*"
                    ref={audioInputRef}
                    hidden
                    onChange={(e) => setFiles((prev) => ({...prev, audio: e.target.files![0]}))}
                />

                <input type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    hidden
                    onChange={(e) => setFiles((prev) => ({...prev, image: e.target.files![0]}))}
                />

                {/* image upload area */}
                <div
                className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
                onClick={() => imageInputRef.current?.click()}
                >
                    <div className="text-center">
                        {files.image ? (
                            <div className="space-y-2">
                                <div className="text-sm text-yellow-500">Image Selected:</div>
                                <div className="text-xs text-zinc-400">
                                    {files.image.name.slice(0, 20)}
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                                    <UploadIcon className="h-6 w-6 text-zinc-400" />
                                </div>
                                <div className="text-sm text-zinc-400 mb-2">Upload Artwork</div>
                                <Button variant='outline' size='sm' className="text-xs">
                                    ChooseFile
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

        </DialogContent>
    </Dialog>
  )
}

export default AddSongDialog