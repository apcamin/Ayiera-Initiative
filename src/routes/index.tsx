import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import {Footer, SupportUs, Projects, Founders, LandingPage} from '@/components'
import {LoginPage} from "@/routes/LoginPage"

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <HomePage />
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