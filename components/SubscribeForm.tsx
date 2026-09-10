"use client";

import { useState } from "react";
import PixelSweep from "./PixelSweep";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * heronaiapp.com's footer subscribe: the submit is inert (grey border, no
 * pointer) until the email validates, then `.is-valid` → the pixel fill sweeps
 * in on hover and the arrow rolls on the shared roll ease.
 */
export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [hover, setHover] = useState(false);

  const valid = EMAIL.test(email);

  if (done) {
    return <p className="sub-done mono">Subscribed &mdash; watch for the next notice.</p>;
  }

  return (
    <form
      className="sub"
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) setDone(true);
      }}
      noValidate
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Notices by email"
        aria-label="Email"
      />
      <button
        type="submit"
        className={`sub-btn btn-fill${valid ? " is-valid" : ""}`}
        aria-label="Subscribe"
        data-cursor={valid ? "Send" : ""}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        <PixelSweep active={valid && hover} />
        <span className="btn-fill-icon">
          <span className="btn-roll">
            <span>&rarr;</span>
            <span aria-hidden="true">&rarr;</span>
          </span>
        </span>
      </button>
    </form>
  );
}
