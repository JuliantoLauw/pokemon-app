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

  const fetchDetail = async () => {
    const res = await fetch(`/api/favorites/${id}`);
    const data: Favorite = await res.json();
    setTitle(data.title);
    setContent(data.content);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(`/api/favorites/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
    });

    router.push("/list");
  };

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
