"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch blog posts');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const demoPosts: BlogPost[] = [
    {
      _id: 'demo2',
      title: 'How to Choose the Best Umrah Package',
      content: 'Compare hotels, transport, and visa options. Always check reviews and ask for WhatsApp support before booking.',
      author: 'Admin',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'demo3',
      title: 'Travel Tips for First-Time Pilgrims',
      content: 'Pack light, keep documents safe, and use local SIM cards for easy communication. Stay hydrated and follow group instructions.',
      author: 'Admin',
      createdAt: new Date().toISOString(),
    },
  ];

  const showPosts = posts && posts.length > 0 ? posts : demoPosts;

  return (
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Blog & News</h1>
      {/* Featured static blog card with background image */}
      <div className="card mb-8 p-6 relative overflow-hidden">
  <Image src="/kaaba.jpg" alt="Kaaba" fill className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none select-none" />
        <div className="relative z-10">
          <div className="text-2xl font-bold mb-2">🕌 Step-by-Step Guide to Performing Umrah</div>
          <div className="mb-2">Performing Umrah is a spiritual journey that every Muslim dreams of. If you’re going for the first time, this simple step-by-step guide will help you understand the process clearly:</div>
          <ol className="list-decimal pl-6 mb-2">
            <li><b>Preparation</b> – Before leaving home, make niyyah (intention) for Umrah. Carry Ihram clothing and travel essentials.</li>
            <li><b>Miqat</b> – At the Miqat, change into Ihram, recite Talbiyah, and enter the state of Ihram.</li>
            <li><b>Tawaf</b> – Upon reaching Masjid al-Haram, perform 7 rounds (anti-clockwise) around the Kaaba.</li>
            <li><b>Sa’i</b> – Walk 7 times between Safa and Marwah, starting at Safa and ending at Marwah.</li>
            <li><b>Halq/Taqsir</b> – Men should shave or trim hair; women trim a small portion.</li>
            <li><b>Completion</b> – Congratulations! You have completed Umrah.</li>
          </ol>
          <div className="mb-2">📌 <b>Tip:</b> Always keep Zamzam water, stay hydrated, and use apps like Haramain Train for easy city transfers.</div>
        </div>
      </div>
      {/* Admin-posted blogs from database or demo */}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        showPosts.map((post) => (
          <div className="card mb-8 p-6" key={post._id}>
            <div className="text-2xl font-bold mb-2">{post.title}</div>
            <div className="mb-2 whitespace-pre-line">{post.content}</div>
            <div className="text-sm text-gray-500">By {post.author || 'Admin'} on {new Date(post.createdAt).toLocaleDateString()}</div>
          </div>
        ))
      )}
    </main>
  );
}