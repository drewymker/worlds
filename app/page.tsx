"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Trophy, Users, Play } from "lucide-react"

const days = [
  {
    day: 1,
    date: "April 21, 2026",
    title: "Day 1",
    description: "Practice Matches & Opening Qualifications",
    icon: Users,
    matchCount: 3,
  },
  {
    day: 2,
    date: "April 22, 2026",
    title: "Day 2",
    description: "Qualification Rounds Continue",
    icon: Play,
    matchCount: 2,
  },
  {
    day: 3,
    date: "April 23, 2026",
    title: "Day 3",
    description: "Qualification Rounds Continue",
    icon: Calendar,
    matchCount: 2,
  },
  {
    day: 4,
    date: "April 24, 2026",
    title: "Day 4",
    description: "Qualification and Elimination Rounds",
    icon: Trophy,
    matchCount: 2,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center justify-center w-24 h-24 mb-8 rounded-2xl bg-primary/20 border border-primary/30 animate-pulse-glow"
            >
              <Trophy className="w-12 h-12 text-primary" />
            </motion.div>

            {/* Team Branding */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-semibold tracking-wide">
                TEAM 36620B
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="text-foreground">Blue Crew</span>
            </h1>

            <div className="inline-block">
              <p className="text-xl lg:text-2xl text-primary font-semibold mb-2 animate-shimmer bg-clip-text">
                VEX WORLDS 2025 - PUSH BACK
              </p>
            </div>

            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Watch all the action from our VEX Worlds competition journey.
              Select a day to view matches.
            </p>
          </motion.div>

          {/* Day Selection Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {days.map((day) => {
              const Icon = day.icon
              return (
                <motion.div key={day.day} variants={itemVariants}>
                  <Link href={`/day/${day.day}`}>
                    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border p-6 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-500" />

                      <div className="relative">
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-secondary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                          <Icon className="w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>

                        {/* Content */}
                        <h2 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                          {day.title}
                        </h2>
                        <p className="text-sm text-primary/80 font-medium mb-3">
                          {day.date}
                        </p>
                        <p className="text-muted-foreground text-sm mb-4">
                          {day.description}
                        </p>

                        {/* Match Count Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-xs font-medium text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all duration-300">
                          <Play className="w-3 h-3" />
                          {day.matchCount} matches
                        </div>

                        {/* Arrow */}
                        <div className="absolute top-6 right-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all duration-300">
                          <svg
                            className="w-6 h-6 text-primary"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            Team 36620B Blue Crew - VEX Worlds 2025
          </p>
        </div>
      </footer>
    </main>
  )
}
