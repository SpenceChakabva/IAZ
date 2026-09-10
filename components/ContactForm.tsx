"use client";

import { useState } from "react";
import Button from "./Button";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", org: "", msg: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const emailBad = touched.email && v.email.length > 0 && !EMAIL.test(v.email);
  const valid = v.name.trim() && EMAIL.test(v.email) && v.msg.trim().length > 4;

  const field = (
    key: keyof typeof v,
    label: string,
    type = "text",
    area = false
  ) => {
    const Tag = area ? "textarea" : "input";
    return (
      <div className={`form-row${v[key] ? " filled" : ""}`}>
        <Tag
          {...(area ? { rows: 3 } : { type })}
          value={v[key]}
          onChange={(e) => setV({ ...v, [key]: e.target.value })}
          onBlur={() => setTouched({ ...touched, [key]: true })}
          aria-label={label}
          data-cursor=""
        />
        <label>{label}</label>
      </div>
    );
  };

  if (sent) {
    return (
      <div className="form-success">
        <h3>Thanks for reaching out.</h3>
        <p style={{ color: "var(--ink-2)", maxWidth: "44ch" }}>
          We&#39;ve received your message. The Registrar&#39;s office will reply
          within two working days.
        </p>
      </div>
    );
  }

  return (
    <form
      className="form-rows"
      onSubmit={(e) => {
        e.preventDefault();
        setTouched({ name: true, email: true, msg: true });
        if (valid) setSent(true);
      }}
      noValidate
    >
      {field("name", "Your name")}
      {field("email", "Email", "email")}
      {emailBad && (
        <p
          className="mono"
          style={{ color: "var(--accent)", padding: "0.4rem var(--gutter)" }}
        >
          Wrong format
        </p>
      )}
      {field("org", "Practice or organisation (optional)")}
      {field("msg", "How can the Institute help?", "text", true)}
      <div className="form-actions">
        <Button
          submit
          variant="fill"
          className="btn-fill--brand"
          cursor={valid ? "Send" : ""}
          arrow
        >
          Send message
        </Button>
      </div>
    </form>
  );
}
