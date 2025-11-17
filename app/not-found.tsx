import Link from "next/link";
import { Container } from "react-bootstrap";

export default function NotFound() {
  return (
    <Container className="text-center py-5">
      <h1 className="display-4 text-danger">404</h1>
      <h3>Halaman tidak ditemukan</h3>
      <p>Mungkin alamatnya salah, atau halaman sudah dihapus.</p>

      <Link href="/" className="btn btn-primary mt-3">
        Kembali ke Home
      </Link>
    </Container>
  );
}
