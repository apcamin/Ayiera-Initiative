import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { Component } from 'lucide-react'

export const Route = createRootRoute({
  component: () => <Outlet />,
})
