import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentToken, amount } = body ?? {};

    if (!paymentToken || typeof amount !== "number") {
      return NextResponse.json(
        { ok: false, error: "Invalid payment payload" },
        { status: 400 }
      );
    }

    const expectedSecret = process.env.X402_SHARED_SECRET;
    const isVerified = Boolean(expectedSecret) && paymentToken === expectedSecret;

    if (!isVerified) {
      return NextResponse.json(
        { ok: false, verified: false, error: "Payment verification failed" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      ok: true,
      verified: true,
      amount,
      message: "x402 payment verified",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body" },
      { status: 400 }
    );
  }
}
