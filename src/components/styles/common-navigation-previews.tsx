"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  CreditCard,
  ExternalLink,
  FolderKanban,
  Home,
  Layers,
  LayoutGrid,
  ListOrdered,
  Milestone,
  MoreHorizontal,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  ShieldCheck,
  Sliders,
  Sparkles,
  User,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Mode, StyleSlug } from "@/lib/styles/types"
import { getStyleFormKit } from "./common-form-kit"
import { BreadcrumbNav } from "@/components/ui/breadcrumb"
import { PaginationNav } from "@/components/ui/pagination"
import { CommandMenu, CommandGroup } from "@/components/ui/command-menu"
import { Stepper } from "@/components/ui/stepper"
import { BottomNavigation } from "@/components/ui/bottom-navigation"
import { Link } from "@/components/ui/link"

/* ========================================================================== */
/* 1 · Breadcrumb Preview                                                     */
/* ========================================================================== */
export function BreadcrumbPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [activeItem, setActiveItem] = useState("Breadcrumb")
  const [separatorType, setSeparatorType] = useState<"chevron" | "slash" | "dot">("chevron")
  const [collapsed, setCollapsed] = useState(false)

  const separator =
    separatorType === "slash" ? (
      <span className="opacity-40 select-none">/</span>
    ) : separatorType === "dot" ? (
      <span className="opacity-40 select-none">•</span>
    ) : undefined

  const items = [
    { label: "Home", href: "#", icon: <Home className="h-3.5 w-3.5" /> },
    { label: "Design System", href: "#" },
    { label: "Components", href: "#", icon: <Layers className="h-3.5 w-3.5" /> },
    { label: "Navigation", href: "#" },
    { label: "Breadcrumb", isCurrent: true },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {/* Controls header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Breadcrumb Trail
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <span className={cn("text-[10px] uppercase font-mono mr-1", k.faint)}>Sep:</span>
          {(["chevron", "slash", "dot"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeparatorType(s)}
              className={cn(
                "px-2 py-0.5 rounded capitalize transition-colors",
                separatorType === s ? k.btnPrimarySm : k.muted
              )}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "ml-2 px-2 py-0.5 rounded transition-colors text-[10px] font-mono",
              collapsed ? k.btnPrimarySm : k.btnSecondary
            )}
          >
            {collapsed ? "Expand" : "Collapse Trail"}
          </button>
        </div>
      </div>

      {/* Breadcrumb Display */}
      <div className={cn("p-4 border", k.panel, k.radius)}>
        <BreadcrumbNav
          items={items}
          separator={separator}
          maxItems={collapsed ? 3 : 5}
          onItemClick={(item) => setActiveItem(item.label)}
        />
      </div>

      <div className={cn("text-xs flex items-center justify-between px-1", k.muted)}>
        <span>Last clicked: <strong className={k.strong}>{activeItem}</strong></span>
        <span className="text-[10px] font-mono">ARIA: aria-current=&quot;page&quot;</span>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 2 · Pagination Preview                                                     */
/* ========================================================================== */
export function PaginationPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [currentPage, setCurrentPage] = useState(3)
  const totalPages = 12

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Interactive Pagination
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Page <strong className={k.strong}>{currentPage}</strong> of {totalPages}
        </span>
      </div>

      <div className={cn("p-4 border flex flex-col items-center justify-center gap-3", k.panel, k.radius)}>
        <PaginationNav
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          siblingCount={1}
          showFirstLast={true}
        />
      </div>

      {/* Quick Jump Buttons */}
      <div className="flex items-center justify-center gap-2 pt-1">
        <span className={cn("text-[11px]", k.muted)}>Jump to:</span>
        {[1, 5, 8, 12].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setCurrentPage(p)}
            className={cn(
              "px-2 py-0.5 text-xs rounded transition-colors",
              currentPage === p ? k.btnPrimarySm : k.btnSecondary
            )}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 3 · Sidebar Preview                                                        */
/* ========================================================================== */
export function SidebarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("components")
  const [projectsOpen, setProjectsOpen] = useState(true)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "components", label: "Components", icon: <Layers className="h-4 w-4" />, badge: "45" },
    { id: "analytics", label: "Analytics", icon: <Compass className="h-4 w-4" /> },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Sidebar Panel ({isCollapsed ? "Collapsed Icon-Only" : "Expanded"})
        </span>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn("px-2.5 py-1 text-xs rounded flex items-center gap-1.5 transition-colors", k.btnSecondary)}
        >
          {isCollapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
          <span>{isCollapsed ? "Expand" : "Collapse"}</span>
        </button>
      </div>

      {/* Simulated Sidebar Stage */}
      <div className="flex justify-center">
        <div
          className={cn(
            "border transition-all duration-300 flex flex-col h-[340px] select-none shadow-md",
            k.panel,
            k.radius,
            isCollapsed ? "w-16" : "w-64"
          )}
        >
          {/* Header */}
          <div className={cn("h-12 border-b border-current/10 flex items-center px-3 gap-2 shrink-0", isCollapsed && "justify-center")}>
            <div className={cn("h-7 w-7 flex items-center justify-center font-bold text-xs shrink-0", k.radius, k.btnPrimarySm)}>
              UI
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className={cn("text-xs font-bold truncate", k.strong)}>UI Hub Studio</div>
                <div className={cn("text-[10px] font-mono", k.muted)}>v2.4.0</div>
              </div>
            )}
          </div>

          {/* Nav Items */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {!isCollapsed && (
              <div className={cn("px-2 text-[10px] font-bold uppercase tracking-wider", k.muted)}>
                Workspace
              </div>
            )}
            <div className="space-y-0.5">
              {navItems.map((item) => {
                const isActive = activeItem === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveItem(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors text-left",
                      isActive ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted} hover:${k.strong}`,
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {!isCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                    {!isCollapsed && item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-current/10">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Nested Submenu */}
            {!isCollapsed && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className={cn("w-full flex items-center justify-between px-2 py-1 text-xs rounded hover:bg-current/10 transition-colors", k.muted)}
                >
                  <span className="flex items-center gap-2">
                    <FolderKanban className="h-3.5 w-3.5" />
                    <span>Projects</span>
                  </span>
                  <ChevronDown className={cn("h-3 w-3 transition-transform", projectsOpen && "rotate-180")} />
                </button>
                {projectsOpen && (
                  <div className="pl-6 pr-1 space-y-0.5 pt-1 border-l border-current/10 ml-3.5">
                    {["Design System", "Mobile App", "Landing Page"].map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setActiveItem(p)}
                        className={cn(
                          "w-full text-left px-2 py-1 text-[11px] rounded transition-colors truncate",
                          activeItem === p ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted}`
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer User */}
          <div className={cn("border-t border-current/10 p-2 flex items-center gap-2 shrink-0", isCollapsed && "justify-center")}>
            <div className="h-6 w-6 rounded-full bg-current/10 flex items-center justify-center font-bold text-[10px] shrink-0">
              JD
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 text-left">
                <div className={cn("text-xs font-medium truncate", k.strong)}>Jane Doe</div>
                <div className={cn("text-[9px] truncate", k.muted)}>Administrator</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 4 · Navigation Menu Preview                                                */
/* ========================================================================== */
export function NavigationMenuPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [selectedDest, setSelectedDest] = useState("Home")
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggle = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id)
  }

  return (
    <div ref={navRef} className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Top Navigation Bar
        </span>
        <span className={cn("text-xs", k.muted)}>
          Selected: <strong className={k.strong}>{selectedDest}</strong>
        </span>
      </div>

      <div className={cn("p-2 border relative shadow-xs", k.panel, k.radius)}>
        <nav aria-label="Demo Main Navigation" className="flex items-center justify-between gap-2">
          {/* Brand */}
          <div className="flex items-center gap-2 pl-2">
            <Compass className={cn("h-5 w-5", k.strong)} />
            <span className={cn("font-bold text-xs tracking-tight", k.strong)}>HUB</span>
          </div>

          {/* Links & Dropdown items */}
          <div className="flex items-center gap-1 text-xs">
            {/* Products Dropdown Trigger */}
            <div className="relative">
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={openDropdown === "products"}
                onClick={() => toggle("products")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1.5 rounded-md font-medium transition-colors",
                  openDropdown === "products" ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted}`
                )}
              >
                <span>Products</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform", openDropdown === "products" && "rotate-180")} />
              </button>

              {/* Flyout panel */}
              {openDropdown === "products" && (
                <div
                  role="region"
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56 p-2 border shadow-xl z-20 animate-in fade-in-0 zoom-in-95",
                    k.panel,
                    k.radius
                  )}
                >
                  <div className="space-y-1">
                    {[
                      { title: "UI Components", desc: "45 accessible building blocks" },
                      { title: "Design Styles", desc: "25 curated aesthetic systems" },
                      { title: "CLI Generator", desc: "Zero-dependency scaffolding" },
                    ].map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => {
                          setSelectedDest(item.title)
                          setOpenDropdown(null)
                        }}
                        className={cn(
                          "w-full text-left p-2 rounded hover:bg-current/10 transition-colors block",
                          selectedDest === item.title && "bg-current/10"
                        )}
                      >
                        <div className={cn("font-semibold text-xs", k.strong)}>{item.title}</div>
                        <div className={cn("text-[10px]", k.muted)}>{item.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Standard Links */}
            <button
              type="button"
              onClick={() => {
                setSelectedDest("Showcase")
                setOpenDropdown(null)
              }}
              className={cn(
                "px-2.5 py-1.5 rounded-md font-medium transition-colors",
                selectedDest === "Showcase" ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted}`
              )}
            >
              Showcase
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedDest("Docs")
                setOpenDropdown(null)
              }}
              className={cn(
                "px-2.5 py-1.5 rounded-md font-medium transition-colors",
                selectedDest === "Docs" ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted}`
              )}
            >
              Docs
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedDest("Sign In")}
            className={cn("px-3 py-1 text-xs font-semibold rounded shadow-xs", k.btnPrimarySm)}
          >
            Sign In
          </button>
        </nav>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 5 · Menu Bar Preview                                                       */
/* ========================================================================== */
export function MenuBarPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [lastAction, setLastAction] = useState("Ready")
  const menuBarRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const execute = (action: string) => {
    setLastAction(action)
    setOpenMenu(null)
  }

  return (
    <div ref={menuBarRef} className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Desktop Application Menubar
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Action: <strong className={k.strong}>{lastAction}</strong>
        </span>
      </div>

      <div className={cn("p-1.5 border relative", k.panel, k.radius)}>
        <div role="menubar" aria-orientation="horizontal" className="flex items-center gap-1 text-xs">
          {["File", "Edit", "View", "Help"].map((menu) => {
            const isOpen = openMenu === menu
            return (
              <div key={menu} className="relative">
                <button
                  type="button"
                  role="menuitem"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={() => setOpenMenu(isOpen ? null : menu)}
                  className={cn(
                    "px-3 py-1 rounded font-medium transition-colors outline-none",
                    isOpen ? k.btnPrimarySm : `hover:bg-current/10 ${k.muted} hover:${k.strong}`
                  )}
                >
                  {menu}
                </button>

                {isOpen && (
                  <div
                    role="menu"
                    className={cn(
                      "absolute left-0 top-full mt-1 w-48 p-1 border shadow-xl z-20 animate-in fade-in-0 zoom-in-95 space-y-0.5",
                      k.panel,
                      k.radius
                    )}
                  >
                    {menu === "File" && (
                      <>
                        <button
                          type="button"
                          onClick={() => execute("New File created")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>New Project</span>
                          <kbd className="text-[10px] font-mono opacity-60">⌘N</kbd>
                        </button>
                        <button
                          type="button"
                          onClick={() => execute("Save triggered")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>Save As...</span>
                          <kbd className="text-[10px] font-mono opacity-60">⌘S</kbd>
                        </button>
                      </>
                    )}

                    {menu === "Edit" && (
                      <>
                        <button
                          type="button"
                          onClick={() => execute("Undo operation")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>Undo</span>
                          <kbd className="text-[10px] font-mono opacity-60">⌘Z</kbd>
                        </button>
                        <button
                          type="button"
                          onClick={() => execute("Redo operation")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>Redo</span>
                          <kbd className="text-[10px] font-mono opacity-60">⇧⌘Z</kbd>
                        </button>
                        <div className="h-px bg-current/10 my-1" />
                        <button
                          type="button"
                          disabled
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded opacity-40 cursor-not-allowed text-left"
                        >
                          <span>Paste Special</span>
                          <kbd className="text-[10px] font-mono">⌘V</kbd>
                        </button>
                      </>
                    )}

                    {menu === "View" && (
                      <>
                        <button
                          type="button"
                          onClick={() => execute("Toggled Grid")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>Show Grid</span>
                          <kbd className="text-[10px] font-mono opacity-60">⌘&#39;</kbd>
                        </button>
                        <button
                          type="button"
                          onClick={() => execute("Zoom 100%")}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                        >
                          <span>Actual Size</span>
                          <kbd className="text-[10px] font-mono opacity-60">⌘0</kbd>
                        </button>
                      </>
                    )}

                    {menu === "Help" && (
                      <button
                        type="button"
                        onClick={() => execute("Opened Docs")}
                        className="w-full flex items-center justify-between px-2 py-1.5 text-xs rounded hover:bg-current/10 text-left"
                      >
                        <span>Documentation</span>
                        <kbd className="text-[10px] font-mono opacity-60">F1</kbd>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 6 · Stepper Preview                                                        */
/* ========================================================================== */
export function StepperPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [currentStep, setCurrentStep] = useState(1) // 0-indexed (1 is Billing)
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal")

  const steps = [
    { id: 1, title: "Account", description: "Email & security" },
    { id: 2, title: "Billing", description: "Credit card info" },
    { id: 3, title: "Configuration", description: "Project tokens", optional: true },
    { id: 4, title: "Review", description: "Deploy setup" },
  ]

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Multi-Step Process Stepper
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setOrientation("horizontal")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              orientation === "horizontal" ? k.btnPrimarySm : k.muted
            )}
          >
            Horizontal
          </button>
          <button
            type="button"
            onClick={() => setOrientation("vertical")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              orientation === "vertical" ? k.btnPrimarySm : k.muted
            )}
          >
            Vertical
          </button>
        </div>
      </div>

      <div className={cn("p-4 sm:p-5 border overflow-x-auto", k.panel, k.radius)}>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation={orientation}
          onStepClick={setCurrentStep}
        />
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          className={cn("px-3 py-1.5 text-xs rounded font-medium flex items-center gap-1.5 transition-colors", k.btnSecondary, currentStep === 0 && "opacity-40 pointer-events-none")}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Previous Step</span>
        </button>

        <span className={cn("text-xs font-mono", k.muted)}>
          Step {currentStep + 1} of {steps.length}
        </span>

        <button
          type="button"
          disabled={currentStep >= steps.length - 1}
          onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
          className={cn("px-3 py-1.5 text-xs rounded font-semibold flex items-center gap-1.5 transition-colors shadow-xs", k.btnPrimarySm, currentStep >= steps.length - 1 && "opacity-40 pointer-events-none")}
        >
          <span>Next Step</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 7 · Bottom Navigation Preview                                              */
/* ========================================================================== */
export function BottomNavigationPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [activeTab, setActiveTab] = useState("home")

  const items = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "search", label: "Search", icon: <Search className="h-4 w-4" /> },
    { id: "activity", label: "Activity", icon: <Bell className="h-4 w-4" />, badge: "3" },
    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
  ]

  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Mobile App Bottom Dock
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Active: <strong className={k.strong}>{activeTab}</strong>
        </span>
      </div>

      {/* Simulated Mobile Container Frame */}
      <div className={cn("border overflow-hidden rounded-2xl shadow-lg flex flex-col h-[220px]", k.panel)}>
        {/* Mock Screen Content */}
        <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
          <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-2">
            {items.find((i) => i.id === activeTab)?.icon}
          </div>
          <div className={cn("text-xs font-bold capitalize", k.strong)}>
            {activeTab} Screen View
          </div>
          <p className={cn("text-[11px] mt-1 max-w-[200px]", k.muted)}>
            Touch-first bottom bar with active indicator and badge count.
          </p>
        </div>

        {/* Embedded Bottom Navigation Component */}
        <BottomNavigation
          items={items}
          value={activeTab}
          onValueChange={setActiveTab}
          className={cn("border-t border-current/10", k.panelSoft)}
        />
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 8 · Command Menu Preview                                                   */
/* ========================================================================== */
export function CommandMenuPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const commandGroups: CommandGroup[] = [
    {
      heading: "Navigation",
      items: [
        {
          id: "nav-components",
          label: "Go to Component Catalog",
          shortcut: "G C",
          icon: <Layers className="h-4 w-4" />,
          onSelect: () => setSelectedAction("Navigated to Component Catalog"),
        },
        {
          id: "nav-docs",
          label: "View Documentation & API",
          shortcut: "G D",
          icon: <Milestone className="h-4 w-4" />,
          onSelect: () => setSelectedAction("Opened Documentation"),
        },
      ],
    },
    {
      heading: "Actions",
      items: [
        {
          id: "action-theme",
          label: "Toggle Color Scheme",
          shortcut: "⌘T",
          icon: <Sparkles className="h-4 w-4" />,
          onSelect: () => setSelectedAction("Toggled Color Theme"),
        },
        {
          id: "action-copy",
          label: "Copy Production Tokens",
          shortcut: "⌘C",
          icon: <Package className="h-4 w-4" />,
          onSelect: () => setSelectedAction("Tokens copied to clipboard"),
        },
      ],
    },
  ]

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Command Menu / Palette
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Press <kbd className="px-1.5 py-0.5 rounded border border-current/20 bg-current/5">⌘K</kbd>
        </span>
      </div>

      <div className={cn("p-6 border flex flex-col items-center justify-center gap-3 text-center", k.panel, k.radius)}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={cn(
            "w-full max-w-sm flex items-center justify-between px-3.5 py-2.5 border text-xs font-medium transition-all shadow-xs hover:border-primary",
            k.input,
            k.radius
          )}
        >
          <span className="flex items-center gap-2 text-muted-foreground">
            <Search className={cn("h-4 w-4", k.strong)} />
            <span>Search commands or jump to...</span>
          </span>
          <kbd className={cn("border border-current/20 bg-current/10 px-1.5 py-0.5 font-mono text-[10px]", k.radius)}>
            ⌘K
          </kbd>
        </button>

        {selectedAction && (
          <div className={cn("text-xs font-semibold flex items-center gap-1.5 animate-in fade-in-0", k.strong)}>
            <Check className="h-3.5 w-3.5" />
            <span>Executed: {selectedAction}</span>
          </div>
        )}
      </div>

      {/* Render CommandMenu Modal */}
      <CommandMenu
        open={isOpen}
        onOpenChange={setIsOpen}
        groups={commandGroups}
        placeholder="Type a command or filter..."
      />
    </div>
  )
}

/* ========================================================================== */
/* 9 · Link Preview                                                           */
/* ========================================================================== */
export function LinkPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const [clickedMessage, setClickedMessage] = useState<string | null>(null)

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Link Variants &amp; Semantics
        </span>
        {clickedMessage && (
          <span className={cn("text-xs font-medium", k.strong)}>
            {clickedMessage}
          </span>
        )}
      </div>

      <div className={cn("p-5 border space-y-3.5 text-xs", k.panel, k.radius)}>
        {/* Default Colored Link */}
        <div className="flex items-center justify-between">
          <span className={k.muted}>Default Accent Link:</span>
          <Link
            href="#"
            variant="default"
            onClick={(e) => {
              e.preventDefault()
              setClickedMessage("Clicked: Default Link")
            }}
          >
            Explore Design Tokens
          </Link>
        </div>

        {/* Subtle Muted Link */}
        <div className="flex items-center justify-between">
          <span className={k.muted}>Subtle Link:</span>
          <Link
            href="#"
            variant="subtle"
            className={cn(k.muted, "hover:opacity-100 transition-opacity")}
            onClick={(e) => {
              e.preventDefault()
              setClickedMessage("Clicked: Subtle Link")
            }}
          >
            View Changelog
          </Link>
        </div>

        {/* External Link with Icon */}
        <div className="flex items-center justify-between">
          <span className={k.muted}>External Destination:</span>
          <Link
            href="https://github.com"
            isExternal
            showExternalIcon
            onClick={(e) => {
              e.preventDefault()
              setClickedMessage("External link detected: target='_blank'")
            }}
          >
            GitHub Repository
          </Link>
        </div>

        {/* Always Underlined */}
        <div className="flex items-center justify-between">
          <span className={k.muted}>Always Underline:</span>
          <Link
            href="#"
            variant="underline"
            underline="always"
            className={cn("underline font-medium hover:opacity-80 transition-opacity", k.strong)}
            onClick={(e) => {
              e.preventDefault()
              setClickedMessage("Clicked: Underlined Link")
            }}
          >
            Privacy Policy
          </Link>
        </div>

        {/* Disabled State */}
        <div className="flex items-center justify-between">
          <span className={k.muted}>Disabled Link:</span>
          <Link href="#" disabled className={k.muted}>
            Pro Features (Locked)
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ========================================================================== */
/* 10 · Back to Top Preview                                                   */
/* ========================================================================== */
export function BackToTopPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [scrollY, setScrollY] = useState(0)
  const threshold = 80

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollY(containerRef.current.scrollTop)
    }
  }

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isVisible = scrollY > threshold

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Back to Top (Scroll Container Demo)
        </span>
        <span className={cn("text-xs font-mono", k.muted)}>
          Scroll: <strong className={k.strong}>{Math.round(scrollY)}px</strong> / {threshold}px threshold
        </span>
      </div>

      {/* Scrollable Container with Floating BackToTop inside */}
      <div className="relative">
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={cn(
            "h-48 overflow-y-auto p-4 border space-y-3 text-xs shadow-inner",
            k.panel,
            k.radius
          )}
        >
          <div className="p-3 rounded bg-current/5 border border-current/10">
            <h5 className={cn("font-bold", k.strong)}>Top of Document</h5>
            <p className={cn("text-[11px] mt-1", k.muted)}>
              Scroll down inside this box to trigger the floating Back to Top button.
            </p>
          </div>

          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="p-2.5 rounded bg-current/5 border border-current/10 space-y-1">
              <div className={cn("font-semibold text-[11px]", k.strong)}>
                Section Item #{i + 1}
              </div>
              <p className={cn("text-[10px]", k.muted)}>
                Accessible scroll listener monitors threshold dynamically.
              </p>
            </div>
          ))}

          <div className="p-3 rounded bg-current/5 border border-current/10 text-center">
            <span className={cn("font-bold text-[11px]", k.strong)}>End of Content</span>
          </div>
        </div>

        {/* Floating Action Button inside Container */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top of section"
          className={cn(
            "absolute bottom-3 right-3 p-2.5 rounded-full shadow-lg transition-all duration-300 flex items-center gap-1.5 text-xs font-bold outline-none",
            k.btnPrimarySm,
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-3 pointer-events-none"
          )}
        >
          <ArrowUp className="h-3.5 w-3.5" />
          <span className="hidden sm:inline text-[11px]">Top</span>
        </button>
      </div>
    </div>
  )
}
