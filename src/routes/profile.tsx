import { createFileRoute } from '@tanstack/react-router'
import * as React from 'react'

export const Route = createFileRoute('/profile')({
  component: () => <div>Hello /profile!</div>,
})