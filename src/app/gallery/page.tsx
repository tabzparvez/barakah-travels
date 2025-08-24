"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type GalleryItem = {
	_id: string;
	title: string;
	url: string;
	type: "image" | "video";
};

function useGallery() {
	const [items, setItems] = useState<GalleryItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/gallery")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch gallery");
				return res.json();
			})
			.then((data) => {
				setItems(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	return { items, loading, error };
}

export default function Gallery() {
	const fallbackImages = [
		"/umrah2.png",
		"/dubai.jpg",
		"/thailand.jpg",
		"https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80",
		"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400&q=80",
	];
	const { items, loading, error } = useGallery();
	const [selected, setSelected] = useState<string | null>(null);
	const galleryImages = items.length > 0 ? items.map((i) => i.url) : fallbackImages;

	return (
		<main className="max-w-5xl mx-auto py-12">
			<h1 className="text-3xl font-bold text-center mb-8 text-primary font-heading">Gallery</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div className="text-red-600">{error}</div>
			) : (
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{galleryImages.map((src, i) => (
						<div key={i} className="relative group cursor-pointer" onClick={() => setSelected(src)}>
							<Image
								src={src}
								alt="Gallery"
								width={400}
								height={300}
								className="rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-200 object-cover w-full h-48"
							/>
						</div>
					))}
				</div>
			)}
			{selected && (
				<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
					<div className="bg-white rounded-xl p-4 shadow-xl max-w-lg w-full relative">
						<Image src={selected} alt="Large" width={800} height={600} className="rounded-xl object-contain w-full h-auto" />
						<button className="absolute top-2 right-2 text-xl font-bold text-primary" onClick={() => setSelected(null)}>
							×
						</button>
					</div>
				</div>
			)}
		</main>
	);
}
