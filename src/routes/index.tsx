import { createFileRoute, Link } from '@tanstack/react-router'
import * as React from 'react'
import Login from '@/components/Login'

export const Route = createFileRoute('/')({
  component: () => <LoginPage />,
})

function LoginPage() {
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='h-max w-1/4'>
        <Login />
      </div>
    </div>
  )
}