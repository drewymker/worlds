"use client"

import { use, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play, Calendar, Users } from "lucide-react"
import matchesData from "@/data/videos.json"

const dayInfo: Record<number, { date: string; description: string }> = {
  1: { date: "April 23, 2025", description: "Practice Matches & Opening Qualifications" },
  2: { date: "April 24, 2025", description: "Qualification Rounds Continue" },
  3: { date: "April 25, 2025", description: "Elimination Rounds & Quarterfinals" },
  4: { date: "April 26, 2025", description: "Semifinals & Championship Finals" },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function DayPage({ params }: { params: Promise<{ day: string }> }) {
  const resolvedParams = use(params)
  const dayNumber = parseInt(resolvedParams.day)

  const matches = useMemo(() => {
    return matchesData.videos.filter((video) => video.day === dayNumber)
  }, [dayNumber])

  const info = dayInfo[dayNumber] || { date: "Unknown Date", description: "Competition Day" }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Day {dayNumber}</h1>
              <p className="text-xs text-muted-foreground">{info.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Day Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium">{info.date}</span>
            </div>
            <p className="text-muted-foreground">{info.description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </p>
          </motion.div>

          {/* Matches Grid */}
          {matches.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {matches.map((match) => (
                <motion.div key={match.id} variants={itemVariants}>
                  <Link href={`/match/${match.id}`}>
                    <div className="group relative overflow-hidden rounded-xl bg-card border border-border transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={match.thumbnail}
                          alt={match.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-8 h-8 text-primary-foreground ml-1" />
                          </div>
                        </div>

                        {/* Match Type Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm text-xs font-medium text-foreground">
                            {match.matchType}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
                          {match.title}
                        </h3>

                        {/* Teams */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-red-500" />
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {match.redTeams.map((team) => (
                                <span
                                  key={team}
                                  className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-medium"
                                >
                                  {team}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-sm bg-blue-500" />
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {match.blueTeams.map((team) => (
                                <span
                                  key={team}
                                  className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-xs font-medium"
                                >
                                  {team}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <Users className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No matches found</h3>
              <p className="text-muted-foreground">
                No matches available for this day yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  )
}
