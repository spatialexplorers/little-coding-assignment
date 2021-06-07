import Link from "next/link";
import { MainLayout } from "../layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout title="home">
      <h1>Welcome to a little coding assignment</h1>
      <Link href="/list">
        <a>Go to the Pokedex!</a>
      </Link>
    </MainLayout>
  );
}
