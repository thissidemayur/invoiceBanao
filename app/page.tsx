import Image from "next/image";
import Navbar from "./componets/Navbar";
import Hero from "./componets/Hero";
import Footer from "./componets/Footer";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <Navbar />
      <Hero />
      <Footer />
    </main>
  );
}
