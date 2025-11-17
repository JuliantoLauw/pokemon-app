"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

interface Favorite {
  id: number;
  title: string;
  content: string;
}

export default function ListPage() {
  const [items, setItems] = useState<Favorite[]>([]);

  const fetchItems = async (): Promise<void> => {
    const res = await fetch("/api/favorites", { cache: "no-store" });
    const data: Favorite[] = await res.json();
    setItems(data);
  };

  useEffect(() => {
    async function load() {
      await fetchItems();
    }
    load();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-3">List Pokemon Favorite</h2>

      <Link href="/create" className="btn btn-success mb-3">
        Tambah Pokemon Favorite
      </Link>

      {items.map((item) => (
        <Card key={item.id} className="mb-3">
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.content}</Card.Text>

            <Link href={`/detail/${item.id}`} className="btn btn-primary">
              Detail
            </Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
