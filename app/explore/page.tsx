"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";

interface Pokemon {
  name: string;
  url: string;
}

export default function ExplorePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAPI = async () => {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20", {
        cache: "no-store",
      });
      const data = await res.json();
      setPokemons(data.results);
    } catch (error) {
      console.error("Gagal fetch PokeAPI:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="py-4">
      <h2>Explore Public Pokémon API</h2>

      {pokemons.map((p) => (
        <Card key={p.name} className="p-3 my-2 shadow-sm">
          <h5>{p.name.toUpperCase()}</h5>
          <small>API URL: {p.url}</small>
        </Card>
      ))}

      <Link href="/" className="btn btn-secondary mt-3">
        Kembali ke Home
      </Link>
    </Container>
  );
}
