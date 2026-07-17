import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMusicStore } from "@/stores/useMusicStore"


const SongsTable = () => {
    const {songs, isLoading, error} = useMusicStore();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-8">
                <div className="text-zinc-400">Loading Songs...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex- items-center justify-center py-8">
                <div className="text-red-400">{error}</div>
            </div>
        )
    }

  return (
    <Table>
        <TableHeader>
            <TableRow className="hover:bg-zinc-800/50">
                <TableHead className="w-12.5"></TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
    </Table>
  )
}

export default SongsTable