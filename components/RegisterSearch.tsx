"use client";

import { useMemo, useState, useId } from "react";
import { REGISTER_ROWS, type RegisterRow } from "@/lib/content";

const cls: Record<RegisterRow["status"], string> = {
  Registered: "ok",
  Candidate: "cand",
  "Non-practising": "np",
};
const STATUSES = ["All", "Registered", "Candidate", "Non-practising"] as const;

export default function RegisterSearch() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const qid = useId();

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return REGISTER_ROWS.filter((r) => {
      if (status !== "All" && r.status !== status) return false;
      if (!needle) return true;
      return (
        r.name.toLowerCase().includes(needle) ||
        r.firm.toLowerCase().includes(needle) ||
        r.town.toLowerCase().includes(needle) ||
        r.prn.toLowerCase().includes(needle)
      );
    });
  }, [q, status]);

  return (
    <div className="reg-panel" data-reveal>
      <div className="reg-bar">
        <label className="f f-input" htmlFor={qid}>
          <span className="f-lbl">Search</span>
          <input
            id={qid}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, practice, town or PRN"
            autoComplete="off"
          />
        </label>
        <label className="f f-select">
          <span className="f-lbl">Status</span>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as (typeof STATUSES)[number])
            }
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <span className="f f-count" aria-live="polite">
          {rows.length} {rows.length === 1 ? "match" : "matches"}
        </span>
      </div>

      <table className="reg">
        <thead>
          <tr>
            <th>Name</th>
            <th>Practice</th>
            <th>PRN</th>
            <th>Town</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prn}>
              <td className="nm">{r.name}</td>
              <td>{r.firm}</td>
              <td className="prn">{r.prn}</td>
              <td>{r.town}</td>
              <td>
                <span className={`pill ${cls[r.status]}`}>{r.status}</span>
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="reg-empty">
                No one on the register matches that. If a person told you they
                are registered and they don&#39;t appear here, ask for their PRN
                and check again — or report it to the ACZ.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
