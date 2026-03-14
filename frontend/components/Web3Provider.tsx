"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Web3Provider({ children }: Props) {
  return <>{children}</>;
}