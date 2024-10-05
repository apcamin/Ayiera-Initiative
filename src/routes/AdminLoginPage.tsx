import * as React from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import AdminLogin from '@/components/AdminLogin'
import Logo from '@/components/ui/logo'

export const Route = createFileRoute('/AdminLoginPage')({
  component: () => <AdminLoginPage />,
})

function AdminLoginPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="absolute top-10 left-10">
        <Link to="/" className="flex gap-2 items-center">
          <span>&larr;</span>
          <Logo />
        </Link>
      </div>
      <div className="h-max w-1/4">
        <AdminLogin />
      </div>
    </div>
  );
}
