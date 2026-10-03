"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  ThumbsUp,
  MessageSquare,
  RefreshCw,
} from "lucide-react"

export interface FeedbackSubmission {
  id: string
  rating: number
  categoryRatings?: Record<string, number>
  comment: string
  tags: string[]
  authorName?: string
  createdAt: string
}

export interface ReviewFeedbackPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  title?: string
  description?: string
  onSubmitFeedback?: (feedback: FeedbackSubmission) => void
  categories?: { id: string; label: string }[]
  availableTags?: string[]
  allowCategoryRatings?: boolean
}

const DEFAULT_CATEGORIES = [
  { id: "usability", label: "Usability & Ergonomics" },
  { id: "performance", label: "Runtime Speed" },
  { id: "aesthetics", label: "Visual Aesthetics" },
]

const DEFAULT_TAGS = [
  "Production Ready",
  "Great Accessibility",
  "Crisp Typography",
  "Needs Better Docs",
  "Responsive Edge Cases",
]

export const ReviewFeedbackPanel = React.forwardRef<HTMLDivElement, ReviewFeedbackPanelProps>(
  (
    {
      className,
      title = "Leave Review & Feedback",
      description = "Help improve this component suite by submitting your rating and technical feedback.",
      onSubmitFeedback,
      categories = DEFAULT_CATEGORIES,
      availableTags = DEFAULT_TAGS,
      allowCategoryRatings = true,
      ...props
    },
    ref
  ) => {
    const [overallRating, setOverallRating] = React.useState(0)
    const [hoverRating, setHoverRating] = React.useState<number | null>(null)
    const [categoryScores, setCategoryScores] = React.useState<Record<string, number>>({})
    const [comment, setComment] = React.useState("")
    const [selectedTags, setSelectedTags] = React.useState<string[]>([])
    const [authorName, setAuthorName] = React.useState("")
    const [errors, setErrors] = React.useState<{ rating?: string; comment?: string }>({})
    const [submittedData, setSubmittedData] = React.useState<FeedbackSubmission | null>(null)

    const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
      )
    }

    const setCategoryScore = (catId: string, score: number) => {
      setCategoryScores((prev) => ({ ...prev, [catId]: score }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const newErrors: { rating?: string; comment?: string } = {}

      if (overallRating === 0) {
        newErrors.rating = "Please select a star rating."
      }
      if (comment.trim().length < 5) {
        newErrors.comment = "Please provide at least 5 characters of feedback."
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
      }

      setErrors({})
      const submission: FeedbackSubmission = {
        id: `fb-${Date.now()}`,
        rating: overallRating,
        categoryRatings: categoryScores,
        comment: comment.trim(),
        tags: selectedTags,
        authorName: authorName.trim() || "Anonymous Contributor",
        createdAt: "Just now",
      }

      setSubmittedData(submission)
      onSubmitFeedback?.(submission)
    }

    const handleReset = () => {
      setOverallRating(0)
      setCategoryScores({})
      setComment("")
      setSelectedTags([])
      setErrors({})
      setSubmittedData(null)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-xl mx-auto rounded-xl border border-border bg-card shadow-sm p-5 sm:p-6 space-y-6 text-card-foreground",
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h3 className="text-base font-bold tracking-tight text-foreground">{title}</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {submittedData ? (
          /* Submission Feedback Alert State */
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 space-y-4 animate-in fade-in-50">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
                  Feedback Submitted Successfully!
                </h4>
                <p className="text-xs text-emerald-700/90 dark:text-emerald-300/80 leading-relaxed">
                  Thank you for contributing. Your review has been recorded in the local simulation
                  session.
                </p>
              </div>
            </div>

            {/* Echo review details */}
            <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-background/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {submittedData.authorName}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  <span>{submittedData.rating} / 5</span>
                </div>
              </div>

              <p className="text-muted-foreground italic">&ldquo;{submittedData.comment}&rdquo;</p>

              {submittedData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {submittedData.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Submit Another Review</span>
            </button>
          </div>
        ) : (
          /* Main Input Form */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Overall Star Rating */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  Overall Rating <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs font-mono font-bold text-amber-500">
                  {overallRating > 0 ? `${overallRating} of 5 Stars` : "Select stars"}
                </span>
              </div>

              <div
                className="flex items-center gap-1"
                role="radiogroup"
                aria-label="Overall rating"
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoverRating !== null ? hoverRating : overallRating) >= star
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setOverallRating(star)
                        if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }))
                      }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 rounded text-muted-foreground hover:scale-110 transition-transform focus:outline-hidden"
                      aria-label={`${star} star`}
                    >
                      <Star
                        className={cn(
                          "h-6 w-6 transition-colors",
                          active
                            ? "fill-amber-400 text-amber-500"
                            : "text-muted-foreground/40"
                        )}
                      />
                    </button>
                  )
                })}
              </div>
              {errors.rating && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.rating}</span>
                </p>
              )}
            </div>

            {/* Sub-category breakdown ratings */}
            {allowCategoryRatings && (
              <div className="p-3 rounded-lg border border-border bg-muted/20 space-y-2.5">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Detailed Criteria (Optional)
                </span>
                {categories.map((cat) => {
                  const score = categoryScores[cat.id] || 0
                  return (
                    <div key={cat.id} className="flex items-center justify-between text-xs">
                      <span className="text-foreground">{cat.label}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setCategoryScore(cat.id, val)}
                            className={cn(
                              "h-5 w-5 rounded text-[10px] font-mono font-bold transition-colors",
                              score >= val
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground hover:bg-accent"
                            )}
                          >
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Satisfaction Tags */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Feedback Highlights</label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => {
                  const selected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium border transition-colors",
                        selected
                          ? "bg-primary text-primary-foreground border-primary shadow-2xs font-semibold"
                          : "border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Comment Textarea */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-foreground">
                  Written Feedback <span className="text-rose-500">*</span>
                </label>
                <span className="text-[10px] font-mono text-muted-foreground">
                  {comment.length} characters
                </span>
              </div>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value)
                  if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }))
                }}
                rows={3}
                placeholder="What did you like? What could be improved for production use?"
                className={cn(
                  "w-full p-2.5 text-xs rounded-lg border bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring transition-all",
                  errors.comment ? "border-rose-500 ring-rose-500" : "border-input"
                )}
              />
              {errors.comment && (
                <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
                  <AlertCircle className="h-3 w-3" />
                  <span>{errors.comment}</span>
                </p>
              )}
            </div>

            {/* Contributor Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">
                Your Name / Handle (Optional)
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Alex Rivera or @alexr"
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus:outline-hidden focus:ring-1 focus:ring-ring"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                Submissions validated on client
              </span>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        )}
      </div>
    )
  }
)

ReviewFeedbackPanel.displayName = "ReviewFeedbackPanel"
