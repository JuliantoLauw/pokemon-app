"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonAPIResponse {
  results: Pokemon[];
}

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAPI(): Promise<void> {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!res.ok) return;

        const data: PokemonAPIResponse = await res.json();
        setPokemons(data.results);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
        console.error("Fetch error:", error);
      }
    }

    fetchAPI();

    return () => controller.abort();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    alert("Berhasil disimpan!");
    setTitle("");
    setContent("");
  };

  return (
    <Container className="py-4">
      <h2>Tambah Pokemon Favorite</h2>

      <Form.Group className="mb-3">
        <Form.Label>Pilih Pokémon</Form.Label>
        <Form.Select
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        >
          <option value="">-- Pilih Pokemon --</option>
          {pokemons.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name.toUpperCase()}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Deskripsi</Form.Label>
          <Form.Control
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit" className="btn btn-success">
          Simpan
        </Button>

        <Link href="/list" className="btn btn-secondary ms-2">
          Kembali
        </Link>
      </Form>
    </Container>
  );
}
