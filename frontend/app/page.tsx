"use client";

import { useMemo, useState } from "react";
import ImageUploader from "@/components/ImageUploader";
import VibeCertificate from "@/components/VibeCertificate";
import WalletConnect from "@/components/WalletConnect";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState(0);
  const [verdict, setVerdict] = useState<"approved" | "rejected">("rejected");
  const [status, setStatus] = useState("Awaiting upload");

  const certificateReady = useMemo(() => score > 0, [score]);

  const runVibeCheck = async () => {
    if (!selectedFile) {
      setStatus("Please upload an image first.");
      return;
    }

    setIsChecking(true);
    setStatus("Verifying payment and scoring image...");

    try {
      const payRes = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentToken: process.env.NEXT_PUBLIC_X402_TOKEN ?? "",
          amount: 1,
        }),
      });

      if (!payRes.ok) {
        setStatus("Payment verification failed.");
        setScore(0);
        setVerdict("rejected");
        return;
      }

      const seeded = (selectedFile.name.length * 13) % 100;
      const nextScore = Math.max(35, seeded);
      const nextVerdict = nextScore >= 70 ? "approved" : "rejected";

      setScore(nextScore);
      setVerdict(nextVerdict);
      setStatus(nextVerdict === "approved" ? "Approved and certified." : "Rejected by judge.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f6f8ff_0%,#e5eef8_36%,#d8e2f2_100%)] px-5 py-10 text-slate-900 sm:px-8 md:px-14">
      <main className="mx-auto max-w-6xl">
        <section className="rounded-2xl border border-slate-900/10 bg-white/85 p-6 shadow-[0_14px_45px_rgba(15,23,42,0.10)] backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">OpenClaw Judge</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Vibe Architect Dashboard</h1>
          <p className="mt-3 max-w-2xl text-slate-700">
            Connect wallet, upload creative, and request a vibe judgment with a certificate-ready outcome.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
            <h2 className="text-xl font-semibold">Upload For Judgment</h2>
            <p className="mt-1 text-sm text-slate-600">Accepted formats: PNG, JPG, WEBP.</p>
            <div className="mt-4">
              <ImageUploader onSelected={setSelectedFile} />
            </div>
            <button
              type="button"
              className="mt-4 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isChecking}
              onClick={runVibeCheck}
            >
              {isChecking ? "Checking..." : "Run Vibe Check"}
            </button>
            <p className="mt-3 text-sm text-slate-700">Status: {status}</p>
          </div>

          <div className="space-y-6">
            <WalletConnect />
            {certificateReady ? <VibeCertificate score={score} verdict={verdict} /> : null}
          </div>
        </section>
      </main>
    </div>
  );
}
