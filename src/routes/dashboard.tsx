import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"

export const Route = createFileRoute('/dashboard')({
  component: () => <AdminDashboard />,
})

function AdminDashboard() {
    return (
        <main>
            <section>
                <Header />
            </section>
        </main>
    )
}