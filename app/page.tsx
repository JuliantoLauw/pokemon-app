"use client";
import Link from "next/link";
import { Container, Card } from "react-bootstrap";

export default function HomePage() {
  return (
    <Container className="py-5">
      <Card className="p-4 shadow-sm">
        <h1 className="mb-3">Julianto Lauw</h1>
        <h4 className="mb-2">NIM: 535240174</h4>
        <h5 className="text-primary">Topik Project: Pokemon Favorite</h5>
        <p className="mt-3">
          Selamat datang di project Next.js saya. Silakan mulai eksplorasi fitur
          menggunakan menu navigasi.
        </p>
        <Link href="/list" className="btn btn-primary mt-3">
          Pergi ke List Pokemon
        </Link>
        <Link href="/explore" className="btn btn-secondary mt-3">
          Explore Public Pokemon API
        </Link>
      </Card>
    </Container>
  );
}
