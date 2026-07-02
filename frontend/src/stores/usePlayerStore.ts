import {create} from "zustand";
import type {Song} from "@/types";

interface PlayerStore {
    currentSong: Song | null;
    isPlaying: boolean;
    queue: Song[];
    currentIndex: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], StartIndex?:number) => void;
    setCurrentSong: (songs: Song[] | null) => void;
    togglePlay: () => void
    playNext: () => void
    playPrevious: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIndex: -1,

    initializeQueue: (songs: Song[]) => {},
    playAlbum: (songs: Song[], StartIndex?: number) => {},
    setCurrentSong: (songs: Song | null) => {},
    togglePlay: () => {},
    playNext: () => {},
    playPrevious: () => {},
}))