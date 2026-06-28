import { type Song} from "@/types";
import SectionGridSkeleton from "./SectionGridSkeleton";
import { Button } from "@/components/ui/button";

type SectionGridProps = {
  title: string;
  songs:Song[];
  isLoading: boolean;
};

const SectionGrid = ({ title, songs, isLoading}:SectionGridProps) => {
  
  if (isLoading) return <SectionGridSkeleton/>
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xil sm:text-2xl font-bold">{title}</h2>
        <Button variant='link' className="text-sm text-zinc-400 hover:text-white">
        Show all
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {songs.map((song) => (
          <div key={song._id} 
          className="bg-zinc-800/40 p-4 rounded-mb hover:bg-zinc-700/40 transition-all group cursor-pointer">
            <div className="relative-mb">
              <div className="aspect-square rounded-md shadow-lg overflow-hidden">
                <img src={song.imageURL} alt={song.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              </div>

            </div>

          </div>
        ))}

      </div>
    

    </div>
  );
};

export default SectionGrid;