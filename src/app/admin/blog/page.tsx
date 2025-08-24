'use client';

import { useEffect, useState } from 'react';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author?: string;
  createdAt: string;
};

export default function AdminBlog() {

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', content: '', author: '' });

  useEffect(() => {
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({ title: '', content: '', author: '' });
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setLoading(true);
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    setLoading(false);
    setEditingId(null);
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }

  function handleEdit(post: BlogPost) {
    setEditingId(post._id);
    setEditForm({ title: post.title, content: post.content, author: post.author || '' });
  }

  async function handleEditSubmit(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    setLoading(true);
    await fetch(`/api/blog?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    setLoading(false);
    setEditingId(null);
    fetch('/api/blog').then(res => res.json()).then(setPosts);
  }

  return (
    <main className="section max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Blog</h1>
      <form className="form mb-8" onSubmit={handleSubmit}>
        <input className="input mb-2" placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <input className="input mb-2" placeholder="Author" value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} />
        <textarea className="input mb-2" placeholder="Content" value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Post'}</button>
      </form>
      <h2 className="text-xl font-bold mb-2">All Blog Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id} className="card mb-2">
            {editingId === post._id ? (
              <form onSubmit={e => handleEditSubmit(e, post._id)}>
                <input className="input mb-2" placeholder="Title" value={editForm.title} onChange={e => setEditForm(f => ({ ...f, title: e.target.value }))} required />
                <input className="input mb-2" placeholder="Author" value={editForm.author} onChange={e => setEditForm(f => ({ ...f, author: e.target.value }))} />
                <textarea className="input mb-2" placeholder="Content" value={editForm.content} onChange={e => setEditForm(f => ({ ...f, content: e.target.value }))} required />
                <div className="flex gap-2 mt-2">
                  <button className="btn bg-green-600 hover:bg-green-700 text-white" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                  <button className="btn bg-gray-400 hover:bg-gray-500 text-white" type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <div className="font-bold">{post.title}</div>
                <div className="text-xs text-gray-500">By {post.author} — {new Date(post.createdAt).toLocaleString()}</div>
                <div>{post.content}</div>
                <div className="flex gap-2 mt-2">
                  <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => handleEdit(post)}>Edit</button>
                  <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => handleDelete(post._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
