import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import Login from '@/components/Login'
import Logo from '@/components/ui/logo'

export const Route = createFileRoute('/adminLogin')({
  component: () => <LoginPage />,
})

function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-10 left-10">
        <Logo />
      </div>
      <div className="h-max w-1/4">
        <Login />
      </div>
    </div>
  )
}
