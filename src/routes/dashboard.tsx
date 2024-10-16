import { ChartComponent } from "@/components/ChartComponent";
import Header from '@/components/Header';
import { LineGraph } from "@/components/LineGraph";
import { Badge } from "@/components/ui/badge";
import { addToLocalStorage, fetchLocalStorage } from "@/helpers/localStorage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createFileRoute } from '@tanstack/react-router';
import * as React from "react";

export const Route = createFileRoute("/dashboard")({
  component: () => <Dashboard />,
});

function CardComponent({
  title,
  content,
  footer,
  badgeText,
}: {
  title: string;
  content: string;
  footer?: string;
  badgeText?: string;
}) {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <h1 className="text-4xl">{content}</h1>
        {badgeText == "increase" ? (
          <Badge className="bg-green-600">Increase ↗</Badge>
        ) : (
            <Badge className="bg-red-600">Decrease ↙</Badge>
        )}
      </CardContent>
      <CardFooter>
        <p className="text-zinc-400 py-[-6rem] text-sm">{footer}</p>
      </CardFooter>
    </Card>
  );
}

function Dashboard() {
  return (
    <main>
      <section className="sticky top-0 bg-white">
        <Header />
      </section>
      <section className="px-6 pt-6 flex flex-col gap-4">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <div className="grid md:grid-cols-3 gap-6 overflow-auto">
          <CardComponent
            title="Total Users"
            content="12,000"
            footer="A 10% net increase"
          />
          <CardComponent
            title="Administrators"
            content="2,000"
            footer="A 10% net increase"
          />
          <CardComponent
            title="Total Awards"
            content="1,200"
            footer="A 10% net increase"
            badgeText="increase"
          />
        </div>
        <div className='grid md:grid-cols-3 gap-6'>
          <div className="col-span-2">
            <ChartComponent />
          </div>
          <LineGraph/>
        </div>
      </section>
    </main>
  );
}