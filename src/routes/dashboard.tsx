import Header from '@/components/Header'
import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"
import {supabase} from "@/backend/client.js"

export const Route = createFileRoute('/dashboard')({
  component: () => <AdminDashboard />,
})

const fetchAdminUser = async ()  => {
    const { data, error } = await supabase.from("administrator").select("*");
    if (error) {
        console.error(error)
        return;
    }
    console.log(data)
}

fetchAdminUser()

function AdminDashboard() {
    return (
        <main>
            <section>
                <Header />
            </section>
        </main>
    )
}