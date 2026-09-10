import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Stakes from "@/components/Stakes";
import Register from "@/components/Register";
import Institute from "@/components/Institute";
import RouteToReg from "@/components/RouteToReg";
import Membership from "@/components/Membership";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";

export default function Home() {
  return (
    <>
      <a className="skip" href="#stakes">
        Skip to content
      </a>
      <Nav />
      <main className="shell">
        <div className="ruler" aria-hidden="true" />
        <Hero />
        <Marquee />
        <Statement />
        <Clients />
        <Stakes />
        <Register />
        <Institute />
        <RouteToReg />
        <Membership />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
