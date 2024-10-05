import { createFileRoute } from '@tanstack/react-router'
import * as React from "react"
import { Header } from '@/components';
import { Textarea, Button, Input } from "@/components/ui";

export const Route = createFileRoute('/feedback')({
  component: () => <FeedbackPage />
})

export default function FeedbackPage() {
    return (
      <main>
        <section className="sticky top-0 bg-white">
          <Header />
        </section>
        <section className="px-6 pt-6 flex flex-col gap-4 w-full max-w-md mx-auto">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            We value your feedback
          </h1>
          <p className="text-gray-600">
            Please rate your experience on a scale of 1 to 5.
          </p>
          <div className="flex flex-col gap-2">
            {[
              { value: 1, label: "Not the best" },
              { value: 2, label: "Below Average" },
              { value: 3, label: "Average" },
              { value: 4, label: "Good" },
              { value: 5, label: "Excellent" }
            ].map((rating) => (
              <label key={rating.value} className="flex items-center gap-1">
                <input type="radio" name="rating" value={rating.value} className="form-radio" />
                {rating.label}
              </label>
            ))}
          </div>
          <p className="text-gray-600">
            Additional Information
          </p>
          <Textarea placeholder="Type your message here..." className="resize-none h-32" />
            <p className="text-gray-600">
            Your Name
            </p>
            <Input type="text" placeholder="Enter your name" className="border p-2 rounded" />
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            Send Feedback
          </Button>
        </section>
      </main>
    );
}