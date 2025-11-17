"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Button } from "react-bootstrap";

interface Favorite {
  id: number;
  title: string;
  content: string;
}

export default function EditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        console.log("Fetching favorite for edit with id:", id);
        const res = await fetch(`/api/favorites/${id}`);
        if (!res.ok) {
          alert("Data tidak ditemukan");
          setLoading(false);
          return;
        }
        const data: Favorite = await res.json();
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const res = await fetch(`/api/favorites/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Update gagal");
        return;
      }

      router.push(`/detail/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      alert("Terjadi kesalahan saat update data.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="py-4">
      <h2>Edit Favorite</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="btn btn-warning">
          Update
        </Button>
      </Form>
    </Container>
  );
}
