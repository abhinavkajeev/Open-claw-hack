type Props = {
  score: number;
  verdict: "approved" | "rejected";
};

export default function VibeCertificate({ score, verdict }: Props) {
  const approved = verdict === "approved";

  return (
    <div
      className={`rounded-xl border p-6 ${
        approved ? "border-green-300 bg-green-50" : "border-red-300 bg-red-50"
      }`}
    >
      <p className="text-xs uppercase tracking-wider text-gray-700">Vibe Certificate</p>
      <h3 className="mt-2 text-2xl font-bold">{approved ? "Seal of Approval" : "Not Approved"}</h3>
      <p className="mt-1 text-sm text-gray-700">Score: {score}/100</p>
    </div>
  );
}
