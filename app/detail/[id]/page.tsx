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

  const fetchDetail = async () => {
    const res = await fetch(`/api/favorites/${id}`);
    const data = await res.json();
    setItem(data);
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (!item) return <p>Loading...</p>;

  return (
    <Container className='py-4'>
      <h2>{item.title}</h2>
      <p>{item.content}</p>

      <Link href={`/edit/${item.id}`} className='btn btn-warning me-2'>
        Edit
      </Link>

      <Button
        variant='danger'
        onClick={async () => {
          await fetch(`/api/favorites/${id}`, { method: "DELETE" });
          router.push("/list");
        }}
      >
        Hapus
      </Button>

      <br /><br />
      <Link href='/list' className='btn btn-secondary'>
        Kembali
      </Link>
    </Container>
  );
}
