"use client"

import React, { useState } from "react"
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  DollarSign,
  Download,
  Eye,
  FileSpreadsheet,
  Filter,
  Grid3X3,
  History,
  Layers,
  ListFilter,
  MoreHorizontal,
  RefreshCw,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  TrendingDown,
  TrendingUp,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { DataTable, type DataTableColumn } from "@/components/ui/data-table"
import { List, ListItem, ListHeader, ListDivider } from "@/components/ui/list"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { StatCard } from "@/components/ui/stat-card"
import { Rating } from "@/components/ui/rating"
import { Chip } from "@/components/ui/chip"
import {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/description-list"
import { KeyValueList, KeyValueRow } from "@/components/ui/key-value-list"
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid"

/* ========================================================================== */
/* 1 · Table Preview                                                          */
/* ========================================================================== */
export function TablePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedRow, setSelectedRow] = useState<string | null>("INV-102")

  const invoices = [
    { id: "INV-101", client: "Acme Logistics", date: "Sep 28, 2026", status: "Paid", amount: "$1,450.00" },
    { id: "INV-102", client: "Vanguard Studio", date: "Sep 25, 2026", status: "Pending", amount: "$2,890.50" },
    { id: "INV-103", client: "Hyperion Labs", date: "Sep 21, 2026", status: "Paid", amount: "$840.00" },
    { id: "INV-104", client: "Solis Dynamics", date: "Sep 14, 2026", status: "Overdue", amount: "$3,120.00" },
  ]

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Invoices & Billings
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          {selectedRow ? `Selected: ${selectedRow}` : "Click row to select"}
        </span>
      </div>

      <div className={cn("border overflow-hidden shadow-xs", k.panel, k.radius)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead align="right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => {
              const isSelected = selectedRow === inv.id
              return (
                <TableRow
                  key={inv.id}
                  isSelected={isSelected}
                  onClick={() => setSelectedRow(inv.id)}
                  className="cursor-pointer"
                >
                  <TableCell className={cn("font-mono font-bold", k.strong)}>
                    {inv.id}
                  </TableCell>
                  <TableCell className="font-medium">{inv.client}</TableCell>
                  <TableCell className={k.muted}>{inv.date}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                        inv.status === "Paid" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                        inv.status === "Pending" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
                        inv.status === "Overdue" && "bg-rose-500/15 text-rose-700 dark:text-rose-300"
                      )}
                    >
                      {inv.status}
                    </span>
                  </TableCell>
                  <TableCell align="right" className={cn("font-mono font-semibold", k.strong)}>
                    {inv.amount}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-semibold">
                Total Outstanding
              </TableCell>
              <TableCell align="right" className="font-mono font-bold">
                $8,300.50
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 2 · Data Table Preview                                                     */
/* ========================================================================== */
interface TeamMember {
  id: string
  name: string
  role: string
  team: string
  status: "Active" | "Away" | "Offline"
  joined: string
}

export function DataTablePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>(["usr-1"])

  const teamData: TeamMember[] = [
    { id: "usr-1", name: "Elena Rostova", role: "Principal Architect", team: "Core Platform", status: "Active", joined: "2024" },
    { id: "usr-2", name: "Marcus Vance", role: "Systems Engineer", team: "Infrastructure", status: "Active", joined: "2023" },
    { id: "usr-3", name: "Sarah Chen", role: "Product Designer", team: "Design Systems", status: "Away", joined: "2025" },
    { id: "usr-4", name: "Lucas Duarte", role: "Frontend Lead", team: "Web Client", status: "Active", joined: "2024" },
    { id: "usr-5", name: "Aria Thorne", role: "Security Engineer", team: "SecOps", status: "Offline", joined: "2023" },
    { id: "usr-6", name: "Devon Miller", role: "QA Engineer", team: "Verification", status: "Active", joined: "2025" },
  ]

  const columns: DataTableColumn<TeamMember>[] = [
    {
      id: "name",
      header: "Member",
      accessorKey: "name",
      sortable: true,
      cell: (item) => (
        <div className="font-semibold text-xs text-foreground">
          {item.name}
        </div>
      ),
    },
    {
      id: "role",
      header: "Role",
      accessorKey: "role",
      sortable: true,
      cell: (item) => <div className={cn("text-xs", k.muted)}>{item.role}</div>,
    },
    {
      id: "team",
      header: "Team",
      accessorKey: "team",
      sortable: true,
      cell: (item) => <span className="font-mono text-[11px]">{item.team}</span>,
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      sortable: true,
      cell: (item) => (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold",
            item.status === "Active" && "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
            item.status === "Away" && "bg-amber-500/15 text-amber-700 dark:text-amber-300",
            item.status === "Offline" && "bg-muted text-muted-foreground"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              item.status === "Active" && "bg-emerald-500",
              item.status === "Away" && "bg-amber-500",
              item.status === "Offline" && "bg-muted-foreground/60"
            )}
          />
          {item.status}
        </span>
      ),
    },
    {
      id: "joined",
      header: "Joined",
      accessorKey: "joined",
      sortable: true,
      align: "right",
      cell: (item) => <span className={cn("font-mono text-xs", k.muted)}>{item.joined}</span>,
    },
  ]

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Team Directory ({selectedIds.length} selected)
        </span>
      </div>

      <DataTable
        data={teamData}
        columns={columns}
        searchable={true}
        searchPlaceholder="Filter members by name or role..."
        pageSize={4}
        selectable={true}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </div>
  )
}

/* ========================================================================== */
/* 3 · List Preview                                                           */
/* ========================================================================== */
export function ListPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedId, setSelectedId] = useState<string>("item-1")

  const items = [
    {
      id: "item-1",
      initials: "ER",
      title: "Elena Rostova deployed commit 8f3b92a",
      desc: "Production release v2.4.0 verified across all edge clusters.",
      time: "5m ago",
      badge: "Release",
    },
    {
      id: "item-2",
      initials: "MV",
      title: "Marcus Vance merged branch feat/tokens",
      desc: "Updated design system primitives and responsive token registry.",
      time: "22m ago",
      badge: "PR #348",
    },
    {
      id: "item-3",
      initials: "SC",
      title: "Sarah Chen commented on issue #412",
      desc: "Requested higher contrast ratio for dark-mode toggle components.",
      time: "1h ago",
      badge: "Review",
    },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Activity Feed
        </span>
        <span className={cn("text-xs", k.muted)}>Interactive item list</span>
      </div>

      <div className={cn("border overflow-hidden", k.panel, k.radius)}>
        <ListHeader action={<span className="text-[10px] font-mono">LIVE SYNC</span>}>
          Recent Changes
        </ListHeader>
        <List variant="divided">
          {items.map((item) => (
            <ListItem
              key={item.id}
              interactive
              selected={selectedId === item.id}
              onClick={() => setSelectedId(item.id)}
              leading={
                <div className={cn("h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary/10 text-primary")}>
                  {item.initials}
                </div>
              }
              title={<span className="text-xs font-semibold">{item.title}</span>}
              description={<span className="text-[11px]">{item.desc}</span>}
              trailing={
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono opacity-70">{item.time}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border/50">
                    {item.badge}
                  </span>
                </div>
              }
            />
          ))}
        </List>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 4 · Timeline Preview                                                       */
/* ========================================================================== */
export function TimelinePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [step, setStep] = useState(2)

  const steps = [
    { title: "Source Build", desc: "Compiled Next.js application artifacts with 0 errors.", time: "14:02 UTC" },
    { title: "Automated Test Suite", desc: "Ran 48 unit and integration tests successfully.", time: "14:05 UTC" },
    { title: "Canary Deployment", desc: "Routing 10% live traffic to canary pod instances.", time: "14:08 UTC" },
    { title: "Global CDN Edge Propagation", desc: "Invalidate edge cache across 32 geographic points of presence.", time: "Pending" },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Deployment Pipeline
        </span>
        <button
          type="button"
          onClick={() => setStep((s) => (s >= 3 ? 0 : s + 1))}
          className={cn("px-2.5 py-1 text-xs rounded border border-border flex items-center gap-1.5 hover:bg-muted transition-colors", k.radius)}
        >
          <RefreshCw className="h-3 w-3" />
          <span>Advance Step ({step + 1}/4)</span>
        </button>
      </div>

      <div className={cn("p-5 border", k.panel, k.radius)}>
        <Timeline>
          {steps.map((st, i) => {
            const status =
              i < step ? "completed" : i === step ? "current" : "upcoming"
            return (
              <TimelineItem
                key={i}
                status={status}
                title={st.title}
                description={st.desc}
                timestamp={st.time}
                isLast={i === steps.length - 1}
              />
            )
          })}
        </Timeline>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 5 · Stat / Metric Card Preview                                             */
/* ========================================================================== */
export function StatCardPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  return (
    <div className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Key Performance Indicators
        </span>
        <span className={cn("text-xs", k.muted)}>Live Telemetry</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <StatCard
          label="Total Revenue"
          value="$84,250"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: "+14.2%", direction: "up" }}
          description="+$10.4k vs previous mo."
          className={cn(k.panel, k.radius)}
        />
        <StatCard
          label="Active Users"
          value="14,890"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: "+8.6%", direction: "up" }}
          description="In 52 geographic regions"
          className={cn(k.panel, k.radius)}
        />
        <StatCard
          label="Avg Latency"
          value="42ms"
          icon={<Server className="h-4 w-4" />}
          trend={{ value: "-4.1%", direction: "down" }}
          description="P99 response time"
          className={cn(k.panel, k.radius)}
        />
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 6 · Rating Preview                                                         */
/* ========================================================================== */
export function RatingPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [rating, setRating] = useState(4)
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Review & Scoring
        </span>
        {submitted && (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold animate-in fade-in-0">
            Rating saved!
          </span>
        )}
      </div>

      <div className={cn("p-5 border space-y-4 text-center", k.panel, k.radius)}>
        <div className="space-y-1">
          <h4 className={cn("text-sm font-bold", k.strong)}>How would you rate this component kit?</h4>
          <p className={cn("text-xs", k.muted)}>Interactive star rating with keyboard arrows & hover states.</p>
        </div>

        <div className="flex justify-center py-2">
          <Rating
            value={rating}
            onChange={(val) => {
              setRating(val)
              setSubmitted(true)
              setTimeout(() => setSubmitted(false), 2500)
            }}
            size="lg"
            showValue
          />
        </div>

        <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs">
          <span className={k.muted}>Read-only Benchmark:</span>
          <div className="flex items-center gap-1.5">
            <Rating value={4.8} precision={0.5} readOnly size="sm" />
            <span className="font-mono font-bold text-xs">4.8 (1,420 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 7 · Chip Preview                                                           */
/* ========================================================================== */
export function ChipPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [tags, setTags] = useState([
    "Next.js 16",
    "TailwindCSS",
    "Design Tokens",
    "Radix Primitives",
    "Turbopack",
  ])

  const filterOptions = [
    { id: "all", label: "All Items" },
    { id: "design", label: "Design Systems" },
    { id: "dev", label: "Dev Tools" },
    { id: "mobile", label: "Mobile" },
  ]

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove))
  }

  const resetTags = () => {
    setTags(["Next.js 16", "TailwindCSS", "Design Tokens", "Radix Primitives", "Turbopack"])
  }

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Chips & Filter Tags
        </span>
        {tags.length < 5 && (
          <button
            type="button"
            onClick={resetTags}
            className="text-xs text-primary hover:underline font-medium"
          >
            Reset tags
          </button>
        )}
      </div>

      <div className={cn("p-5 border space-y-4", k.panel, k.radius)}>
        <div className="space-y-2">
          <div className={cn("text-xs font-semibold", k.muted)}>Filter Mode (Selectable):</div>
          <div className="flex flex-wrap gap-1.5">
            {filterOptions.map((opt) => (
              <Chip
                key={opt.id}
                selected={selectedFilter === opt.id}
                onClick={() => setSelectedFilter(opt.id)}
              >
                {opt.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t border-border/50">
          <div className={cn("text-xs font-semibold", k.muted)}>Dismissible Tags:</div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Chip
                key={tag}
                variant="outline"
                removable
                onRemove={() => removeTag(tag)}
              >
                {tag}
              </Chip>
            ))}
            {tags.length === 0 && (
              <span className={cn("text-xs italic", k.muted)}>No tags remaining. Click reset above.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 8 · Description List Preview                                               */
/* ========================================================================== */
export function DescriptionListPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [layout, setLayout] = useState<"horizontal" | "grid">("horizontal")

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          System Specifications
        </span>
        <div className="flex items-center gap-1 text-xs">
          <button
            type="button"
            onClick={() => setLayout("horizontal")}
            className={cn(
              "px-2 py-0.5 rounded text-xs transition-colors",
              layout === "horizontal" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
            )}
          >
            Horizontal
          </button>
          <button
            type="button"
            onClick={() => setLayout("grid")}
            className={cn(
              "px-2 py-0.5 rounded text-xs transition-colors",
              layout === "grid" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
            )}
          >
            Grid
          </button>
        </div>
      </div>

      <div className={cn("p-5 border", k.panel, k.radius)}>
        <DescriptionList layout={layout} columns={2}>
          <DescriptionItem layout={layout === "grid" ? "vertical" : "horizontal"}>
            <DescriptionTerm>Cluster Name</DescriptionTerm>
            <DescriptionDetails className="font-mono font-semibold">
              us-east-prod-04
            </DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem layout={layout === "grid" ? "vertical" : "horizontal"}>
            <DescriptionTerm>Runtime Engine</DescriptionTerm>
            <DescriptionDetails>Node.js v20.12 (Turbopack)</DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem layout={layout === "grid" ? "vertical" : "horizontal"}>
            <DescriptionTerm>Security Status</DescriptionTerm>
            <DescriptionDetails>
              <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Zero Vulnerabilities Detected</span>
              </span>
            </DescriptionDetails>
          </DescriptionItem>
          <DescriptionItem layout={layout === "grid" ? "vertical" : "horizontal"}>
            <DescriptionTerm>Public IP Range</DescriptionTerm>
            <DescriptionDetails className="font-mono text-xs">
              198.51.100.0/24
            </DescriptionDetails>
          </DescriptionItem>
        </DescriptionList>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 9 · Key-Value List Preview                                                 */
/* ========================================================================== */
export function KeyValueListPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)

  const items = [
    {
      key: "Project ID",
      value: "prj_hub_9042a8b",
      mono: true,
      copyable: true,
      copyText: "prj_hub_9042a8b",
    },
    {
      key: "API Endpoint",
      value: "https://api.hub.dev/v2/stream",
      mono: true,
      copyable: true,
      copyText: "https://api.hub.dev/v2/stream",
    },
    {
      key: "Environment Key",
      value: "sk_live_9f02••••••••••3b",
      mono: true,
      copyable: true,
      copyText: "sk_live_9f02b1c4e9083b",
    },
    {
      key: "Access Tier",
      value: "Enterprise Dedicated",
      badge: (
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          Verified
        </span>
      ),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Environment & Credentials
        </span>
        <span className={cn("text-xs", k.muted)}>Click 📋 to copy</span>
      </div>

      <KeyValueList items={items} className={cn(k.panel, k.radius)} />
    </div>
  )
}

/* ========================================================================== */
/* 10 · Data Grid Preview                                                     */
/* ========================================================================== */
interface MatrixRecord {
  region: string
  q1: string
  q2: string
  q3: string
  q4: string
  growth: string
}

export function DataGridPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [activeCell, setActiveCell] = useState<{ row: number; col: number; val: string }>({
    row: 0,
    col: 1,
    val: "$124,500",
  })

  const gridData: MatrixRecord[] = [
    { region: "North America", q1: "$124,500", q2: "$138,200", q3: "$149,000", q4: "$162,400", growth: "+30.4%" },
    { region: "Europe / EMEA", q1: "$89,200", q2: "$94,100", q3: "$102,600", q4: "$114,000", growth: "+27.8%" },
    { region: "Asia Pacific", q1: "$68,400", q2: "$78,900", q3: "$91,500", q4: "$106,200", growth: "+55.2%" },
    { region: "Latin America", q1: "$32,100", q2: "$36,400", q3: "$41,000", q4: "$48,900", growth: "+52.3%" },
  ]

  const gridColumns: DataGridColumn<MatrixRecord>[] = [
    {
      id: "region",
      header: "Region",
      accessorKey: "region",
      width: "160px",
      cell: (item) => <span className="font-semibold text-foreground">{item.region}</span>,
    },
    {
      id: "q1",
      header: "Q1",
      accessorKey: "q1",
      align: "right",
    },
    {
      id: "q2",
      header: "Q2",
      accessorKey: "q2",
      align: "right",
    },
    {
      id: "q3",
      header: "Q3",
      accessorKey: "q3",
      align: "right",
    },
    {
      id: "q4",
      header: "Q4",
      accessorKey: "q4",
      align: "right",
    },
    {
      id: "growth",
      header: "YoY Growth",
      accessorKey: "growth",
      align: "right",
      cell: (item) => (
        <span className="font-bold text-emerald-600 dark:text-emerald-400">
          {item.growth}
        </span>
      ),
    },
  ]

  return (
    <div className="mx-auto w-full max-w-xl space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Regional Matrix (Arrow keys to navigate)
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Row {activeCell.row + 1}, Col {activeCell.col + 1}: <strong className={k.strong}>{activeCell.val}</strong>
        </span>
      </div>

      <DataGrid
        data={gridData}
        columns={gridColumns}
        caption="Regional Financial Performance Matrix"
        className={cn(k.panel, k.radius)}
        onCellClick={(r, c, item) => {
          const keys: (keyof MatrixRecord)[] = ["region", "q1", "q2", "q3", "q4", "growth"]
          const val = String(item[keys[c]] ?? "")
          setActiveCell({ row: r, col: c, val })
        }}
      />
    </div>
  )
}
