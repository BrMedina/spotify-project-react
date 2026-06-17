export interface Song {
    _id: string;
    title: string;
    artist: string;
    albumId: string | null;
    imageURL: string;
    audioUrl: string;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Album {
    _id: string;
    title: string;
    artist: string;
    imageURL: string;
    releaseYear: number;
    songs: Song[];
}