import * as React from "react"

import {
  education,
  relief_food,
  slum_team,
  ayiera_initiative,
  education_program,
} from "@/assets/projects";

const callouts = [
  {
    name: "Kid in school",
    description: "Empowering children through education",
    imageSrc: education,
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "https://ayiera-initiative.org/2024/07/27/slum-footie-tournament-2024/",
  },
  {
    name: "Home visits",
    description: "Feeding the needy in our community",
    imageSrc: relief_food,
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "https://ayiera-initiative.org/2024/07/02/tag-fur-korogocho-2024/",
  },
  {
    name: "Education",
    description: "Providing civic education about health",
    imageSrc: slum_team,
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "https://ayiera-initiative.org/2024/01/20/we-are-100-energy-efficient/",
  },
];

export default function Projects() {
  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-lg font-light text-gray-400">
            Get to know more about what we do
          </p>

          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={callout.imageAlt}
                    src={callout.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a
                    href={callout.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
