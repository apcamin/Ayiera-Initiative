import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import {Footer, SupportUs, Projects, Founders, LandingPage} from '@/components'

export const Route = createFileRoute("/")({
  component: () => (
    <>
      <LandingPage />
      <Projects />
      <Founders />
      <SupportUs />
      <Footer />
    </>
  ),
});