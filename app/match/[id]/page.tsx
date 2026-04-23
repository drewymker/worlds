"use client"

import { use, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Calendar, ExternalLink, Play, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import matchesData from "@/data/videos.json"

function getEmbedUrl(url: string): string {
  // YouTube
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : url.includes("embed")
      ? url.split("embed/")[1]?.split("?")[0]
      : new URL(url).searchParams.get("v")
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
  }

  // Google Drive
  if (url.includes("drive.google.com")) {
    const fileId = url.match(/[-\w]{25,}/)?.[0]
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  return url
}

export default function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const matchId = resolvedParams.id

  const match = useMemo(() => {
    return matchesData.videos.find((video) => video.id === matchId)
  }, [matchId])

  if (!match) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Match not found</h1>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  const embedUrl = getEmbedUrl(match.videoUrl)
  const formattedDate = new Date(match.dateAdded).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href={`/day/${match.day}`}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Day {match.day}</span>
              </Link>
            </div>
            <a
              href={match.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open Original</span>
            </a>
          </div>
        </div>
      </header>

      {/* Video Player */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Video Container */}
            <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-card border border-border shadow-2xl">
              <iframe
                src={embedUrl}
                title={match.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Match Info */}
            <div className="max-w-5xl mx-auto mt-8">
              {/* Title and Badge */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-md bg-primary/20 text-primary text-sm font-medium">
                      {match.matchType}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-secondary text-muted-foreground text-sm">
                      Day {match.day}
                    </span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {match.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
              </div>

              {/* Teams Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Red Alliance */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-xl bg-red-500/10 border border-red-500/30 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded bg-red-500" />
                    <h3 className="text-lg font-semibold text-red-400">Red Alliance</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {match.redTeams.map((team) => (
                      <div
                        key={team}
                        className="px-4 py-2 rounded-lg bg-red-500/20 text-red-300 font-medium"
                      >
                        {team}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Blue Alliance */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="rounded-xl bg-blue-500/10 border border-blue-500/30 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-4 h-4 rounded bg-blue-500" />
                    <h3 className="text-lg font-semibold text-blue-400">Blue Alliance</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {match.blueTeams.map((team) => (
                      <div
                        key={team}
                        className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 font-medium"
                      >
                        {team}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link href={`/day/${match.day}`}>
                  <Button variant="outline" className="gap-2">
                    <Play className="w-4 h-4" />
                    More Day {match.day} Matches
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="gap-2">
                    <Trophy className="w-4 h-4" />
                    All Competition Days
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
