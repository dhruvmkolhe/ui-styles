"use client"

import * as React from "react"
import { Search, Smile, Heart, Flame, Compass, Bell, Coffee, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmojiData {
  emoji: string
  name: string
  category: string
  keywords: string[]
}

const EMOJI_DATABASE: EmojiData[] = [
  // Smileys & Emotion
  { emoji: "😀", name: "Grinning face", category: "smileys", keywords: ["smile", "happy", "joy", "grin"] },
  { emoji: "😃", name: "Smiling face with big eyes", category: "smileys", keywords: ["happy", "joy", "smile"] },
  { emoji: "😄", name: "Smiling face with smiling eyes", category: "smileys", keywords: ["happy", "laugh", "smile"] },
  { emoji: "😁", name: "Beaming face", category: "smileys", keywords: ["grin", "happy", "teeth"] },
  { emoji: "😆", name: "Grinning squinting face", category: "smileys", keywords: ["laugh", "lol", "haha"] },
  { emoji: "😂", name: "Face with tears of joy", category: "smileys", keywords: ["crying", "tears", "laugh", "lmao"] },
  { emoji: "🤣", name: "Rolling on floor laughing", category: "smileys", keywords: ["rofl", "lol", "laugh"] },
  { emoji: "🥹", name: "Face holding back tears", category: "smileys", keywords: ["emotional", "proud", "gratitude"] },
  { emoji: "😊", name: "Smiling face with blush", category: "smileys", keywords: ["blush", "proud", "warm"] },
  { emoji: "😇", name: "Smiling face with halo", category: "smileys", keywords: ["angel", "innocent", "halo"] },
  { emoji: "🙂", name: "Slightly smiling face", category: "smileys", keywords: ["smile", "polite", "fine"] },
  { emoji: "😉", name: "Winking face", category: "smileys", keywords: ["wink", "flirt", "joke"] },
  { emoji: "😍", name: "Heart eyes", category: "smileys", keywords: ["love", "heart", "crush"] },
  { emoji: "🥰", name: "Smiling face with hearts", category: "smileys", keywords: ["love", "adore", "warm"] },
  { emoji: "😘", name: "Face blowing a kiss", category: "smileys", keywords: ["kiss", "love", "smooch"] },
  { emoji: "😋", name: "Yum face", category: "smileys", keywords: ["delicious", "silly", "tongue"] },
  { emoji: "😎", name: "Sunglasses face", category: "smileys", keywords: ["cool", "shades", "boss"] },
  { emoji: "🥳", name: "Partying face", category: "smileys", keywords: ["party", "celebrate", "birthday"] },
  { emoji: "🤔", name: "Thinking face", category: "smileys", keywords: ["think", "curious", "wonder"] },
  { emoji: "🤫", name: "Shushing face", category: "smileys", keywords: ["quiet", "secret", "hush"] },
  { emoji: "🤯", name: "Exploding head", category: "smileys", keywords: ["mindblown", "shocked", "wow"] },
  { emoji: "😴", name: "Sleeping face", category: "smileys", keywords: ["sleep", "tired", "zzz"] },

  // Gestures & People
  { emoji: "👍", name: "Thumbs up", category: "people", keywords: ["like", "yes", "approve", "good"] },
  { emoji: "👎", name: "Thumbs down", category: "people", keywords: ["dislike", "no", "bad"] },
  { emoji: "👏", name: "Clapping hands", category: "people", keywords: ["bravo", "applause", "praise"] },
  { emoji: "🙌", name: "Raising hands", category: "people", keywords: ["celebrate", "hurray", "yay"] },
  { emoji: "🤝", name: "Handshake", category: "people", keywords: ["deal", "agree", "partner"] },
  { emoji: "✌️", name: "Victory hand", category: "people", keywords: ["peace", "two", "victory"] },
  { emoji: "🤞", name: "Crossed fingers", category: "people", keywords: ["luck", "hope", "wish"] },
  { emoji: "👌", name: "OK hand", category: "people", keywords: ["perfect", "ok", "fine"] },
  { emoji: "👋", name: "Waving hand", category: "people", keywords: ["hello", "bye", "wave"] },
  { emoji: "🙏", name: "Folded hands", category: "people", keywords: ["please", "thank you", "pray", "namaste"] },
  { emoji: "💪", name: "Flexed biceps", category: "people", keywords: ["strong", "power", "muscle", "workout"] },

  // Hearts & Symbols
  { emoji: "❤️", name: "Red heart", category: "symbols", keywords: ["love", "heart", "like"] },
  { emoji: "💖", name: "Sparkling heart", category: "symbols", keywords: ["love", "sparkle", "glitter"] },
  { emoji: "💙", name: "Blue heart", category: "symbols", keywords: ["blue", "heart", "peace"] },
  { emoji: "💜", name: "Purple heart", category: "symbols", keywords: ["purple", "heart", "bts"] },
  { emoji: "✨", name: "Sparkles", category: "symbols", keywords: ["shine", "magic", "clean", "star"] },
  { emoji: "🔥", name: "Fire", category: "symbols", keywords: ["lit", "hot", "flame", "trending"] },
  { emoji: "⚡", name: "High voltage", category: "symbols", keywords: ["fast", "lightning", "electric", "power"] },
  { emoji: "💯", name: "Hundred points", category: "symbols", keywords: ["score", "perfect", "100"] },
  { emoji: "🎉", name: "Party popper", category: "symbols", keywords: ["celebrate", "tada", "congrats"] },
  { emoji: "🚀", name: "Rocket", category: "symbols", keywords: ["launch", "fast", "moon", "ship"] },
  { emoji: "⭐", name: "Star", category: "symbols", keywords: ["favorite", "glow", "night"] },
  { emoji: "✅", name: "Check mark button", category: "symbols", keywords: ["done", "complete", "yes"] },

  // Food & Drinks
  { emoji: "☕", name: "Hot beverage", category: "food", keywords: ["coffee", "tea", "cafe"] },
  { emoji: "🍕", name: "Pizza", category: "food", keywords: ["food", "cheese", "slice"] },
  { emoji: "🍔", name: "Hamburger", category: "food", keywords: ["burger", "fastfood", "beef"] },
  { emoji: "🍣", name: "Sushi", category: "food", keywords: ["japanese", "fish", "roll"] },
  { emoji: "🥑", name: "Avocado", category: "food", keywords: ["healthy", "fruit", "green"] },
  { emoji: "🍩", name: "Doughnut", category: "food", keywords: ["donut", "sweet", "dessert"] },
  { emoji: "🍷", name: "Wine glass", category: "food", keywords: ["drink", "alcohol", "cheers"] },
  { emoji: "🍺", name: "Beer mug", category: "food", keywords: ["cheers", "brewery", "drink"] },

  // Objects & Tech
  { emoji: "💻", name: "Laptop", category: "objects", keywords: ["computer", "code", "tech", "macbook"] },
  { emoji: "📱", name: "Mobile phone", category: "objects", keywords: ["iphone", "smartphone", "call"] },
  { emoji: "💡", name: "Light bulb", category: "objects", keywords: ["idea", "smart", "bright"] },
  { emoji: "📚", name: "Books", category: "objects", keywords: ["study", "read", "library"] },
  { emoji: "🔒", name: "Locked", category: "objects", keywords: ["security", "safe", "privacy"] },
  { emoji: "⚙️", name: "Gear", category: "objects", keywords: ["settings", "config", "tool"] },
]

const CATEGORIES = [
  { id: "all", name: "All", icon: Smile },
  { id: "smileys", name: "Smileys", icon: Smile },
  { id: "people", name: "People", icon: Flame },
  { id: "symbols", name: "Symbols", icon: Heart },
  { id: "food", name: "Food", icon: Coffee },
  { id: "objects", name: "Tech", icon: Bell },
]

export interface EmojiPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  onSelect?: (emoji: string, emojiData?: EmojiData) => void
  showSearch?: boolean
  showCategories?: boolean
  showPreview?: boolean
  columns?: number
}

export const EmojiPicker = React.forwardRef<HTMLDivElement, EmojiPickerProps>(
  (
    {
      className,
      onSelect,
      showSearch = true,
      showCategories = true,
      showPreview = true,
      columns = 8,
      ...props
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("")
    const [activeCategory, setActiveCategory] = React.useState("all")
    const [hoveredEmoji, setHoveredEmoji] = React.useState<EmojiData | null>(
      EMOJI_DATABASE[0]
    )
    const [recentEmojis, setRecentEmojis] = React.useState<string[]>([
      "😀",
      "🚀",
      "✨",
      "👍",
      "❤️",
      "🔥",
    ])

    const filteredEmojis = React.useMemo(() => {
      let list = EMOJI_DATABASE
      if (activeCategory !== "all") {
        list = list.filter((e) => e.category === activeCategory)
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        list = list.filter(
          (e) =>
            e.name.toLowerCase().includes(q) ||
            e.keywords.some((k) => k.toLowerCase().includes(q))
        )
      }
      return list
    }, [activeCategory, searchQuery])

    const handleEmojiClick = (item: EmojiData) => {
      // Add to recent
      setRecentEmojis((prev) => [
        item.emoji,
        ...prev.filter((e) => e !== item.emoji).slice(0, 7),
      ])
      onSelect?.(item.emoji, item)
    }

    return (
      <div
        ref={ref}
        role="dialog"
        aria-label="Emoji picker"
        className={cn(
          "flex w-72 flex-col rounded-xl border border-border bg-card p-2 text-card-foreground shadow-lg select-none",
          className
        )}
        {...props}
      >
        {/* Search Bar */}
        {showSearch && (
          <div className="relative mb-2">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search emoji..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full rounded-md border border-input bg-muted/40 pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        )}

        {/* Category Tabs */}
        {showCategories && (
          <div className="mb-2 flex items-center justify-between border-b border-border pb-1 px-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  type="button"
                  title={cat.name}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    setSearchQuery("")
                  }}
                  className={cn(
                    "inline-flex h-6 w-6 items-center justify-center rounded-md text-xs transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              )
            })}
          </div>
        )}

        {/* Recent Emojis strip */}
        {!searchQuery && activeCategory === "all" && recentEmojis.length > 0 && (
          <div className="mb-2">
            <div className="flex items-center gap-1 px-1 pb-1 text-[10px] font-semibold text-muted-foreground uppercase">
              <Clock className="h-3 w-3" /> Recent
            </div>
            <div className="flex items-center gap-1 px-1">
              {recentEmojis.map((emoji) => {
                const data = EMOJI_DATABASE.find((e) => e.emoji === emoji)
                return (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() =>
                      handleEmojiClick(data || { emoji, name: "Recent", category: "recent", keywords: [] })
                    }
                    className="flex h-7 w-7 items-center justify-center rounded text-base hover:bg-muted"
                  >
                    {emoji}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Emoji Grid */}
        <div
          role="grid"
          tabIndex={0}
          className="max-h-48 overflow-y-auto pr-1 scrollbar-thin"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "2px",
          }}
        >
          {filteredEmojis.map((item) => (
            <button
              key={item.emoji}
              type="button"
              title={item.name}
              onClick={() => handleEmojiClick(item)}
              onMouseEnter={() => setHoveredEmoji(item)}
              className="flex h-8 w-8 items-center justify-center rounded text-lg transition-transform hover:scale-125 hover:bg-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {item.emoji}
            </button>
          ))}
          {filteredEmojis.length === 0 && (
            <div
              className="col-span-full py-6 text-center text-xs text-muted-foreground"
            >
              No matching emojis found
            </div>
          )}
        </div>

        {/* Preview Footer */}
        {showPreview && hoveredEmoji && (
          <div className="mt-2 flex items-center gap-2 border-t border-border pt-2 px-1">
            <span className="text-2xl">{hoveredEmoji.emoji}</span>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold capitalize truncate">
                {hoveredEmoji.name}
              </span>
              <span className="text-[10px] text-muted-foreground truncate">
                :{hoveredEmoji.keywords[0] || hoveredEmoji.name.toLowerCase().replace(/\s+/g, "_")}:
              </span>
            </div>
          </div>
        )}
      </div>
    )
  }
)
EmojiPicker.displayName = "EmojiPicker"
