"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Container, Button } from "react-bootstrap";

interface Favorite {
  id: number;
  title: string;
  content: string;
}

export default function DetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Favorite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        console.log("Fetching favorite with id:", id);
        const res = await fetch(`/api/favorites/${id}`);
        if (!res.ok) {
          setItem(null);
          return;
        }
        const data: Favorite = await res.json();
        setItem(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete gagal");
      router.push("/list");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!item) return <p>Data tidak ditemukan.</p>;

  return (
    <Container className="py-4">
      <h2>{item.title}</h2>
      <p>{item.content}</p>

      <Link href={`/edit/${item.id}`} className="btn btn-warning me-2">
        Edit
      </Link>

      <Button variant="danger" onClick={handleDelete}>
        Hapus
      </Button>

      <br />
      <br />
      <Link href="/list" className="btn btn-secondary">
        Kembali
      </Link>
    </Container>
  );
}
