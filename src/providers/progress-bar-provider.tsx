'use client';
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import React from "react";

const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
  return <ProgressProvider>{children}</ProgressProvider>;
};
export default ProgressBarProvider;
