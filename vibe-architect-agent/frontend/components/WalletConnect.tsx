"use client";

import { useState } from "react";

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold">Wallet</h3>
      <p className="text-sm text-gray-600">Connect to GOAT Testnet to continue.</p>
      <button
        className="mt-3 rounded-md bg-black px-4 py-2 text-white"
        onClick={() => setConnected((v) => !v)}
        type="button"
      >
        {connected ? "Disconnect" : "Connect Wallet"}
      </button>
    </div>
  );
}
