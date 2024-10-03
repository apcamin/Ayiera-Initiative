import * as React from "react"

import {
  education,
  relief_food,
  slum_team,
  ayiera_initiative,
  education_program,
  Slum_Footie_Tournament_2024,
  coach,
  comedy_break,
} from "@/assets/projects";

const callouts = [
  {
    name: "Football Tournament",
    description: "Annual football tournament for community engagement",
    imageSrc: Slum_Footie_Tournament_2024,
    imageAlt: "Players in action during a football match.",
    href: "https://ayiera-initiative.org/2024/07/27/slum-footie-tournament-2024/",
  },
  {
    name: "Football Coaching Clinic",
    description: "Training sessions for aspiring football players",
    imageSrc: coach,
    imageAlt: "Coach instructing young football players.",
    href: "https://ayiera-initiative.org/2024/07/02/football-coaching-clinic-2024/",
  },
  {
    name: "Comedy Break",
    description: "Comedy sessions to keep attendants occupied during the match half-time break",
    imageSrc: comedy_break,
    imageAlt: "Comedian performing during a break.",
    href: "https://ayiera-initiative.org/2024/01/20/comedy-break-2024/",
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
