import {
  Footer,
  Founders,
  LandingPage,
  Projects,
  SupportUs,
} from "@/components";
import AdminLogin from "@/components/AdminLogin";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import {AdminLoginPage} from "@/routes/AdminLoginPage";

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <AdminLoginPage />
    </>
  ),
});

function HomePage() {
  return (
    <>
      <LandingPage />
      <Projects />
      <Founders />
      <SupportUs />
      <Footer />
    </>
  );
}
