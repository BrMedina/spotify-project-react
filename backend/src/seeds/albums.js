import mongoose from "mongoose";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { config } from "dotenv";

config();

const seedDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);

		// Clear existing data
		await Album.deleteMany({});
		await Song.deleteMany({});

		// First, create all songs
		const createdSongs = await Song.insertMany([
			{
				title: "City Rain",
				artist: "Urban Echo",
				imageURL: "/cover-images/7.jpg",
				audioUrl: "/songs/7.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Neon Lights",
				artist: "Night Runners",
				imageURL: "/cover-images/5.jpg",
				audioUrl: "/songs/5.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Urban Jungle",
				artist: "City Lights",
				imageURL: "/cover-images/15.jpg",
				audioUrl: "/songs/15.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 36, // 0:36
			},
			{
				title: "Neon Dreams",
				artist: "Cyber Pulse",
				imageURL: "/cover-images/13.jpg",
				audioUrl: "/songs/13.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Summer Daze",
				artist: "Coastal Kids",
				imageURL: "/cover-images/4.jpg",
				audioUrl: "/songs/4.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Ocean Waves",
				artist: "Coastal Drift",
				imageURL: "/cover-images/9.jpg",
				audioUrl: "/songs/9.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 28, // 0:28
			},
			{
				title: "Crystal Rain",
				artist: "Echo Valley",
				imageURL: "/cover-images/16.jpg",
				audioUrl: "/songs/16.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Starlight",
				artist: "Luna Bay",
				imageURL: "/cover-images/10.jpg",
				audioUrl: "/songs/10.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 30, // 0:30
			},
			{
				title: "Stay With Me",
				artist: "Sarah Mitchell",
				imageURL: "/cover-images/1.jpg",
				audioUrl: "/songs/1.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 46, // 0:46
			},
			{
				title: "Midnight Drive",
				artist: "The Wanderers",
				imageURL: "/cover-images/2.jpg",
				audioUrl: "/songs/2.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 41, // 0:41
			},
			{
				title: "Moonlight Dance",
				artist: "Silver Shadows",
				imageURL: "/cover-images/14.jpg",
				audioUrl: "/songs/14.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 27, // 0:27
			},
			{
				title: "Lost in Tokyo",
				artist: "Electric Dreams",
				imageURL: "/cover-images/3.jpg",
				audioUrl: "/songs/3.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 24, // 0:24
			},
			{
				title: "Neon Tokyo",
				artist: "Future Pulse",
				imageURL: "/cover-images/17.jpg",
				audioUrl: "/songs/17.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 39, // 0:39
			},
			{
				title: "Purple Sunset",
				artist: "Dream Valley",
				imageURL: "/cover-images/12.jpg",
				audioUrl: "/songs/12.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 17, // 0:17
			},
			{
				title: "Tahimik",
				artist: "leaf",
				imageURL: "/cover-images/leaf-tahimik.jpg",
				audioUrl: "/songs/leafTahimik.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 199, // 0:29
			},
			{
				title: "Maymagagawapaba",
				artist: "leaf",
				imageURL: "/cover-images/leaf-maymagagawapaba.jpg",
				audioUrl: "/songs/leafMaymagagawapaba.mp3",
				plays: Math.floor(Math.random() * 5000),
				duration: 216, // 0:29
			},
		]);

		const leafSongs = createdSongs.filter((song) => song.artist === "leaf");
		
		// Create albums with references to song IDs
		const albums = [
			{
				title: "Urban Nights",
				artist: "Various Artists",
				imageURL: "/albums/1.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(0, 4).map((song) => song._id),
			},
			{
				title: "Coastal Dreaming",
				artist: "Various Artists",
				imageURL: "/albums/2.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(4, 8).map((song) => song._id),
			},
			{
				title: "Midnight Sessions",
				artist: "Various Artists",
				imageURL: "/albums/3.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(8, 11).map((song) => song._id),
			},
			{
				title: "Eastern Dreams",
				artist: "Various Artists",
				imageURL: "/albums/4.jpg",
				releaseYear: 2024,
				songs: createdSongs.slice(11, 14).map((song) => song._id),
			},
			{
				title: "leaf songs",
				artist: "leaf",
				imageURL: "/cover-images/leaf-logo.jpg",
				releaseYear: 2025,
				songs: leafSongs.map((song) => song._id),
			},
		];

		// Insert all albums
		const createdAlbums = await Album.insertMany(albums);

		// Update songs with their album references
		for (let i = 0; i < createdAlbums.length; i++) {
			const album = createdAlbums[i];
			const albumSongs = albums[i].songs;

			await Song.updateMany({ _id: { $in: albumSongs } }, { albumId: album._id });
		}

		console.log("Database seeded successfully!");
	} catch (error) {
		console.error("Error seeding database:", error);
	} finally {
		mongoose.connection.close();
	}
};

seedDatabase();