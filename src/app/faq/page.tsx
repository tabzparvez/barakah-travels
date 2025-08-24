"use client";
import { useState, useEffect } from "react";

type Faq = {
	_id?: string;
	question: string;
	answer: string;
};

function useFaqs() {
	const [faqs, setFaqs] = useState<Faq[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetch("/api/faq")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch FAQs");
				return res.json();
			})
			.then((data) => {
				setFaqs(Array.isArray(data) ? data : []);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	return { faqs, loading, error };
}

export default function Faq() {
	const { faqs, loading, error } = useFaqs();
	const fallbackFaqs: Faq[] = [
		{
			question: "What documents are required for Umrah visa?",
			answer: "Passport, photographs, CNIC, and vaccination certificate are required for Umrah visa processing.",
		},
		{
			question: "Can I book flights and hotels with Barakah Travels?",
			answer: "Yes, we offer complete packages including flights, hotels, and transport.",
		},
		{
			question: "How do I get a custom quote?",
			answer: "Fill out the quote form on our homepage or contact us via WhatsApp for a personalized package.",
		},
		{
			question: "Is there support during travel?",
			answer: "Our team is available 24/7 for support during your journey.",
		},
		{
			question: "Can I pay online?",
			answer: "Yes, we accept online payments and bank transfers.",
		},
	];
	const [open, setOpen] = useState<number | null>(null);
	const faqList = faqs.length > 0 ? faqs : fallbackFaqs;

	return (
		<main className="max-w-2xl mx-auto py-12">
			<h1 className="text-3xl font-bold text-center mb-8 text-primary font-heading">Frequently Asked Questions</h1>
			{loading ? (
				<div>Loading...</div>
			) : error ? (
				<div className="text-red-600">{error}</div>
			) : (
				<div className="space-y-4">
					{faqList.map((faq, i) => (
						<div key={faq._id ?? i} className="border rounded-xl shadow p-4 bg-white">
							<button
								className="w-full text-left font-bold text-lg text-primary flex justify-between items-center"
								onClick={() => setOpen(open === i ? null : i)}
							>
								{faq.question}
								<span className="ml-2 text-xl">{open === i ? "−" : "+"}</span>
							</button>
							{open === i && (
								<div className="mt-2 text-secondary-dark animate-fade-in">
									{faq.answer}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</main>
	);
}
