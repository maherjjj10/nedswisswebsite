"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

interface TestimonialsSimpleProps {
  testimonials: Testimonial[];
}

export function TestimonialsSimple({ testimonials }: TestimonialsSimpleProps) {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [index, testimonials.length])

  return (
    <section className="bg-background relative flex flex-col items-center py-16">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center px-4">
        <div className="min-h-[120px] w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="text-foreground mb-8 text-center text-2xl leading-tight font-semibold md:text-4xl"
            >
              “{testimonials[index].quote}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="flex w-full max-w-lg items-center justify-center gap-8 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ type: "spring", duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="text-left">
                <div className="text-foreground text-lg font-medium italic">
                  {testimonials[index].name}
                </div>
                <div className="text-muted-foreground text-base">
                  {testimonials[index].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Progress Bar & Circles Indicator */}
        <div className="mx-auto mt-8 flex w-full max-w-lg justify-center gap-3">
          {testimonials.map((_, i) => {
            const isActive = i === index
            return (
              <motion.span
                key={i}
                layout
                initial={false}
                animate={{
                  width: isActive ? 120 : 12,
                  height: 12,
                  borderRadius: isActive ? 8 : 999,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="bg-foreground/10 relative block overflow-hidden"
                style={{
                  minWidth: 12,
                  maxWidth: 120,
                  border: "none",
                }}
              >
                {isActive && (
                  <motion.div
                    key={index}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    exit={{ width: 0 }}
                    transition={{ duration: 5000 / 1000, ease: "linear" }}
                    className="bg-red-600 absolute top-0 left-0 h-full rounded-lg"
                  />
                )}
              </motion.span>
            )
          })}
        </div>
      </div>
    </section>
  )
}
