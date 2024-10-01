import * as React from "react"
import { Link } from "@tanstack/react-router";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Subscribe to our newsletter.
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Stay updated with our latest news, events, and initiatives. Join
              our community and help us make a difference.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-gray-600">Quick Links</p>
            <div className="grid grid-cols-2 w-max gap-x-8 gap-y-4">
              <a
                href="https://ayiera-initiative.org/about-us/"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                About Us
              </a>
              <a
                href="https://ayiera-initiative.org/programs/"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                Programs
              </a>
              <a
                href="https://ayiera-initiative.org/news/"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                News
              </a>
              <a
                href="https://ayiera-initiative.org/contact/"
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                Contact
              </a>
              <a
                href=""
                className="text-sm font-semibold leading-6 text-gray-300 hover:text-white"
              >
                <Link to="/adminLogin">Admin Portal</Link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
