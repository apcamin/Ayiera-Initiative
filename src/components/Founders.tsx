import * as React from "react"

import { brian, eric, george, isaiah, judy, teddy } from "@/assets/team";

const people = [
  {
    name: "Eric Michael Onyango",
    role: "Chairman of AYiERA iNiTiATiVE",
    imageUrl: eric,
  },
  {
    name: "Isaiah Onyango",
    role: "Head of events",
    imageUrl: isaiah,
  },
  {
    name: "Judy",
    role: "The secretary",
    imageUrl: judy,
  },
  {
    name: "George Omondi",
    role: "Team supporter since 2007",
    imageUrl: george,
  },
  {
    name: "Brian Onyango",
    role: "Accountant & communications coordinator",
    imageUrl: brian,
  },
  {
    name: "Teddy Omondi",
    role: "Head of sports",
    imageUrl: teddy,
  },
];

export default function Founders() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our leadership
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The following are individuals that make all this happen with their
            constant support and dedication.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
