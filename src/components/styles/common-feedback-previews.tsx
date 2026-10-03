"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cookie,
  FolderOpen,
  Inbox,
  Info,
  Lightbulb,
  Loader2,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mode, StyleSlug } from "@/lib/styles/types";
import { getStyleFormKit } from "./common-form-kit";

/* ========================================================================== */
/* 1 · Alert / Banner Preview                                                 */
/* ========================================================================== */
export function AlertPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [dismissed, setDismissed] = useState(false);
  const [format, setFormat] = useState<"card" | "banner">("card");

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Alert Variants
        </span>
        <div className="flex items-center gap-1.5 text-[11px]">
          <button
            type="button"
            onClick={() => setFormat("card")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              format === "card" ? k.btnPrimarySm : k.muted
            )}
          >
            Card
          </button>
          <button
            type="button"
            onClick={() => setFormat("banner")}
            className={cn(
              "px-2 py-0.5 rounded transition-colors",
              format === "banner" ? k.btnPrimarySm : k.muted
            )}
          >
            Banner
          </button>
        </div>
      </div>

      {/* 1. Informational */}
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 p-3.5 border transition-all",
          k.radius,
          k.panelSoft,
          format === "banner" && "border-x-0 rounded-none -mx-4 sm:-mx-6 px-4 sm:px-6"
        )}
      >
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-sky-500" />
        <div className="flex-1 min-w-0 space-y-0.5">
          <h5 className={cn("text-xs font-bold leading-tight", k.strong)}>
            Design Tokens Synchronized
          </h5>
          <p className={cn("text-[11px] leading-relaxed", k.muted)}>
            Connected with remote Figma variables. 14 color tokens and 8 typography ramps updated.
          </p>
        </div>
      </div>

      {/* 2. Success */}
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 p-3.5 border transition-all",
          k.radius,
          k.panelSoft,
          format === "banner" && "border-x-0 rounded-none -mx-4 sm:-mx-6 px-4 sm:px-6"
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-500" />
        <div className="flex-1 min-w-0 space-y-0.5">
          <h5 className={cn("text-xs font-bold leading-tight", k.strong)}>
            Production Bundle Shipped
          </h5>
          <p className={cn("text-[11px] leading-relaxed", k.muted)}>
            Release v2.4.0 deployed to global edge network with zero downtime.
          </p>
        </div>
      </div>

      {/* 3. Warning */}
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 p-3.5 border transition-all",
          k.radius,
          k.panelSoft,
          format === "banner" && "border-x-0 rounded-none -mx-4 sm:-mx-6 px-4 sm:px-6"
        )}
      >
        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-500" />
        <div className="flex-1 min-w-0 space-y-0.5">
          <h5 className={cn("text-xs font-bold leading-tight", k.strong)}>
            API Rate Limit Notice
          </h5>
          <p className={cn("text-[11px] leading-relaxed", k.muted)}>
            Your workspace has reached 85% of monthly request quota. Resets in 4 days.
          </p>
        </div>
      </div>

      {/* 4. Destructive / Dismissible */}
      {!dismissed ? (
        <div
          role="alert"
          aria-live="assertive"
          className={cn(
            "flex items-start gap-3 p-3.5 border border-rose-500/40 bg-rose-500/10 transition-all",
            k.radius,
            format === "banner" && "border-x-0 rounded-none -mx-4 sm:-mx-6 px-4 sm:px-6"
          )}
        >
          <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-500" />
          <div className="flex-1 min-w-0 space-y-0.5">
            <h5 className={cn("text-xs font-bold leading-tight text-rose-600 dark:text-rose-400")}>
              SSL Certificate Expiration Warning
            </h5>
            <p className={cn("text-[11px] leading-relaxed text-rose-700 dark:text-rose-300")}>
              The TLS certificate for your custom apex domain will expire in 48 hours.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss alert"
            className="p-1 rounded opacity-70 hover:opacity-100 transition-opacity text-rose-500"
            title="Dismiss alert"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setDismissed(false)}
            className={cn("text-[11px] font-mono underline", k.muted)}
          >
            Reset Dismissed Alert
          </button>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* 2 · Confirmation Dialog Preview                                            */
/* ========================================================================== */
export function ConfirmationDialogPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleConfirm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(false);
      setStatusMsg("Configuration changes published successfully!");
      setTimeout(() => setStatusMsg(null), 3500);
    }, 1000);
  };

  return (
    <div className="mx-auto w-full max-w-sm text-center space-y-4">
      <p className={cn("text-xs leading-relaxed", k.muted)}>
        Modal confirmation with focus management, backdrop dismissal, keyboard Escape, and loading lock.
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={k.btnPrimary}
      >
        Publish Architecture Changes
      </button>

      {statusMsg && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-600 font-medium animate-in fade-in-50">
          <CheckCircle2 className="h-4 w-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in-0"
        >
          <div
            className={cn(
              "w-full max-w-md p-6 border shadow-2xl space-y-4 text-left animate-in zoom-in-95",
              k.panel,
              k.radius
            )}
          >
            <div className="border-b border-current/10 pb-3">
              <h4 className={cn("text-sm font-bold tracking-tight", k.strong)}>
                Confirm Deployment to Production?
              </h4>
              <p className={cn("mt-1 text-xs leading-relaxed", k.muted)}>
                This action will propagate 25 new design styles and tokens to the live public CDN.
                Active sessions will automatically revalidate cache headers.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
                className={k.btnSecondary}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={handleConfirm}
                className={cn(k.btnPrimary, "min-w-[100px]")}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Yes, Publish"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* 3 · Alert Dialog Preview                                                   */
/* ========================================================================== */
export function AlertDialogPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedMsg, setDeletedMsg] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      setIsOpen(false);
      setDeletedMsg(true);
      setTimeout(() => setDeletedMsg(false), 4000);
    }, 1200);
  };

  return (
    <div className="mx-auto w-full max-w-sm text-center space-y-4">
      <p className={cn("text-xs leading-relaxed", k.muted)}>
        Destructive alert modal with <code>role=&quot;alertdialog&quot;</code> and safe cancel-first focus default.
      </p>

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase rounded border border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete Project Workspace
      </button>

      {deletedMsg && (
        <div className="flex items-center justify-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium animate-in fade-in-50">
          <Trash2 className="h-4 w-4" />
          <span>Workspace purged permanently.</span>
        </div>
      )}

      {isOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in-0"
        >
          <div
            className={cn(
              "w-full max-w-md p-6 border shadow-2xl space-y-4 text-left animate-in zoom-in-95",
              k.panel,
              k.radius
            )}
          >
            <div className="flex items-start gap-3 border-b border-current/10 pb-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <div>
                <h4 className={cn("text-sm font-bold tracking-tight text-rose-600 dark:text-rose-400")}>
                  Are you absolutely certain?
                </h4>
                <p className={cn("mt-1 text-xs leading-relaxed", k.muted)}>
                  This action cannot be reversed. This will permanently delete the{" "}
                  <strong className="font-mono text-foreground">acme-production-v3</strong> repository,
                  invalidate API credentials, and destroy backup snapshots.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                autoFocus
                disabled={isDeleting}
                onClick={() => setIsOpen(false)}
                className={k.btnSecondary}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeleting}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold uppercase rounded bg-rose-600 text-white hover:bg-rose-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Destroying...
                  </>
                ) : (
                  "Delete Workspace"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ========================================================================== */
/* 4 · Loading Overlay Preview                                                */
/* ========================================================================== */
export function LoadingOverlayPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isLoading, setIsLoading] = useState(false);

  const triggerLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Container Simulation
        </span>
        <button
          type="button"
          onClick={triggerLoading}
          className={k.btnPrimarySm}
        >
          {isLoading ? "Running..." : "Simulate Loading Overlay"}
        </button>
      </div>

      {/* Simulated container with overlay */}
      <div className={cn("relative p-6 border min-h-[160px] flex flex-col justify-between overflow-hidden", k.panel, k.radius)}>
        <div className="space-y-1">
          <h4 className={cn("text-sm font-bold tracking-tight", k.strong)}>
            Database Cluster Metrics
          </h4>
          <p className={cn("text-xs leading-relaxed", k.muted)}>
            Active read replicas: 4 · Query latency: 12ms · Memory cache hit ratio: 98.4%
          </p>
        </div>

        <div className="flex items-center justify-between text-[11px] pt-4 border-t border-current/10">
          <span className={k.faint}>Region: us-east-1 (N. Virginia)</span>
          <span className="font-mono text-emerald-500 font-bold">HEALTHY</span>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div
            role="status"
            aria-live="polite"
            aria-busy="true"
            className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/60 backdrop-blur-xs select-none animate-in fade-in-0"
          >
            <Loader2 className="h-7 w-7 animate-spin text-primary mb-2 text-white" />
            <h5 className="text-xs font-bold text-white tracking-wide">
              Syncing Cluster Shards...
            </h5>
            <p className="text-[11px] text-white/70 mt-0.5">
              Rebalancing partitions across 4 availability zones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 5 · Empty State Preview                                                    */
/* ========================================================================== */
export function EmptyStatePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [preset, setPreset] = useState<"search" | "data" | "inbox">("search");

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* Preset pills */}
      <div className="flex items-center justify-center gap-1.5 text-[11px]">
        <button
          type="button"
          onClick={() => setPreset("search")}
          className={cn(
            "px-2.5 py-1 rounded transition-colors",
            preset === "search" ? k.btnPrimarySm : k.muted
          )}
        >
          No Search Results
        </button>
        <button
          type="button"
          onClick={() => setPreset("data")}
          className={cn(
            "px-2.5 py-1 rounded transition-colors",
            preset === "data" ? k.btnPrimarySm : k.muted
          )}
        >
          No Records
        </button>
        <button
          type="button"
          onClick={() => setPreset("inbox")}
          className={cn(
            "px-2.5 py-1 rounded transition-colors",
            preset === "inbox" ? k.btnPrimarySm : k.muted
          )}
        >
          Empty Inbox
        </button>
      </div>

      <div className={cn("p-8 border text-center flex flex-col items-center justify-center", k.panel, k.radius)}>
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-current/10 ring-8 ring-current/5">
          {preset === "search" && <Search className="h-6 w-6 opacity-75" />}
          {preset === "data" && <FolderOpen className="h-6 w-6 opacity-75" />}
          {preset === "inbox" && <Inbox className="h-6 w-6 opacity-75" />}
        </div>

        <h4 className={cn("text-sm font-bold tracking-tight", k.strong)}>
          {preset === "search" && "No components found"}
          {preset === "data" && "No design records yet"}
          {preset === "inbox" && "All notifications cleared"}
        </h4>

        <p className={cn("mt-1.5 max-w-xs text-xs leading-relaxed", k.muted)}>
          {preset === "search" && "We couldn't find any tokens matching your search term. Try checking spelling."}
          {preset === "data" && "Your workspace is pristine. Create your first palette or import from code."}
          {preset === "inbox" && "You're all caught up! No pending review requests or token synchronization tasks."}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={k.btnPrimarySm}>
            {preset === "search" ? "Clear Search Filter" : "Create New Token"}
          </button>
          <button type="button" className={k.btnSecondary}>
            Documentation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 6 · Error State Preview                                                    */
/* ========================================================================== */
export function ErrorStatePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isRetrying, setIsRetrying] = useState(false);
  const [showStack, setShowStack] = useState(false);
  const [recovered, setRecovered] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setRecovered(true);
      setTimeout(() => setRecovered(false), 3000);
    }, 1500);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className={cn("p-8 border text-center flex flex-col items-center justify-center", k.panel, k.radius)}>
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/15 text-rose-500 ring-8 ring-rose-500/10">
          <AlertCircle className="h-6 w-6 stroke-[2]" />
        </div>

        <h4 className={cn("text-sm font-bold tracking-tight text-rose-600 dark:text-rose-400")}>
          Failed to Load Style Manifest
        </h4>

        <p className={cn("mt-1.5 max-w-xs text-xs leading-relaxed", k.muted)}>
          {recovered
            ? "Manifest recovered successfully!"
            : "Remote token endpoint returned an upstream timeout (504 Gateway Timeout)."}
        </p>

        <div className="mt-5 flex items-center justify-center gap-2.5">
          <button
            type="button"
            disabled={isRetrying}
            onClick={handleRetry}
            className={cn(k.btnPrimarySm, "min-w-[110px]")}
          >
            {isRetrying ? (
              <>
                <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Retry Sync
              </>
            )}
          </button>
          <button type="button" className={k.btnSecondary}>
            View Status Page
          </button>
        </div>

        <div className="mt-5 w-full pt-3 border-t border-current/10">
          <button
            type="button"
            onClick={() => setShowStack(!showStack)}
            className={cn("flex items-center gap-1 text-[11px] font-mono mx-auto opacity-70 hover:opacity-100", k.muted)}
          >
            <span>{showStack ? "Hide Diagnostic Log" : "View Diagnostic Log"}</span>
            {showStack ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </button>

          {showStack && (
            <pre className={cn("mt-2 p-3 text-left font-mono text-[10px] rounded border overflow-x-auto leading-relaxed", k.panelSoft)}>
{`Error: Gateway Timeout (504)
  at fetchTokens (registry.ts:182:9)
  at async loadStyleBundle (style-gallery.tsx:43:12)
  status: 504 (Origin Unreachable)`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 7 · Success State Preview                                                  */
/* ========================================================================== */
export function SuccessStatePreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className={cn("p-8 border text-center flex flex-col items-center justify-center", k.panel, k.radius)}>
        <div className="mb-3.5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500 ring-8 ring-emerald-500/10">
          <CheckCircle2 className="h-6 w-6 stroke-[2.25]" />
        </div>

        <h4 className={cn("text-sm font-bold tracking-tight text-emerald-600 dark:text-emerald-400")}>
          Component Export Ready
        </h4>

        <p className={cn("mt-1.5 max-w-xs text-xs leading-relaxed", k.muted)}>
          Your customized 25-style design package has been compiled, minified, and verified.
        </p>

        {/* Receipt / Details summary */}
        <div className={cn("mt-5 w-full max-w-xs rounded border p-3 text-xs text-left divide-y divide-current/10", k.panelSoft)}>
          <div className="flex justify-between items-center py-1.5 first:pt-0">
            <span className={k.faint}>Export Hash</span>
            <span className="font-mono font-bold">#ui-0x92f8a1</span>
          </div>
          <div className="flex justify-between items-center py-1.5">
            <span className={k.faint}>Components</span>
            <span className="font-mono font-bold">35 items</span>
          </div>
          <div className="flex justify-between items-center py-1.5 last:pb-0">
            <span className={k.faint}>Styles Included</span>
            <span className="font-mono font-bold">25 aesthetics</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button type="button" className={k.btnPrimarySm}>
            Download Archive (.zip)
          </button>
          <button type="button" className={k.btnSecondary}>
            Open Component Vault
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 8 · Callout Preview                                                        */
/* ========================================================================== */
export function CalloutPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);

  return (
    <div className="mx-auto w-full max-w-lg space-y-4">
      {/* 1. Tip / Info */}
      <aside className={cn("rounded-r border-l-4 border-l-sky-500 bg-sky-500/10 p-3.5 text-xs", k.radius)}>
        <div className="flex items-start gap-3">
          <Lightbulb className="h-4 w-4 shrink-0 text-sky-500 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="font-bold text-[11px] uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Pro-Tip · Zero CSS Overhead
            </h5>
            <p className={cn("leading-relaxed", k.text)}>
              Every style in Chameleon UI is generated exclusively with utility classes. No external stylesheets or runtime CSS-in-JS overhead are required.
            </p>
          </div>
        </div>
      </aside>

      {/* 2. Warning Note */}
      <aside className={cn("rounded-r border-l-4 border-l-amber-500 bg-amber-500/10 p-3.5 text-xs", k.radius)}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-0.5">
            <h5 className="font-bold text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Architecture Consideration
            </h5>
            <p className={cn("leading-relaxed", k.text)}>
              When combining heavy backdrop-blur with 3D canvas layers, ensure hardware acceleration is enabled to prevent frame drops on mobile viewports.
            </p>
          </div>
        </div>
      </aside>

      {/* 3. Style Specific Accent */}
      <aside className={cn("rounded-r border-l-4 border-l-current p-3.5 text-xs", k.panelSoft, k.radius)}>
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 shrink-0 mt-0.5 opacity-70" />
          <div className="space-y-0.5">
            <h5 className={cn("font-bold text-[11px] uppercase tracking-wider", k.strong)}>
              {k.styleName} Palette Rules
            </h5>
            <p className={cn("leading-relaxed", k.muted)}>
              Designed specifically with high-contrast rules, accessible focus boundaries, and strict typographical alignment.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ========================================================================== */
/* 9 · Notification Center Preview                                            */
/* ========================================================================== */
export function NotificationCenterPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const [items, setItems] = useState([
    {
      id: "1",
      title: "New Token Sync",
      desc: "Typography tokens updated across Japandi and Brutalist.",
      time: "5m ago",
      read: false,
      type: "info" as const,
    },
    {
      id: "2",
      title: "Build Succeeded",
      desc: "SSG static export completed with 31 static routes.",
      time: "24m ago",
      read: false,
      type: "success" as const,
    },
    {
      id: "3",
      title: "Rate Limit Approaching",
      desc: "85% of monthly request quota consumed.",
      time: "2h ago",
      read: true,
      type: "warning" as const,
    },
  ]);

  const unreadCount = items.filter((i) => !i.read).length;

  const markAllRead = () => {
    setItems((prev) => prev.map((i) => ({ ...i, read: true })));
  };

  const dismissItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = items.filter((i) => (filter === "unread" ? !i.read : true));

  return (
    <div className="mx-auto w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between pb-1">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Notification Drawer
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border transition-colors",
            k.panelSoft,
            k.radius
          )}
        >
          <Bell className="h-3.5 w-3.5" />
          <span>Alerts</span>
          {unreadCount > 0 && (
            <span className="ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Embedded Drawer */}
      <div className={cn("border shadow-md overflow-hidden", k.panel, k.radius)}>
        <div className="flex items-center justify-between p-3 border-b border-current/10 bg-current/[0.03]">
          <div className="flex items-center gap-2">
            <h5 className={cn("text-xs font-bold uppercase tracking-wider", k.strong)}>
              Activity Feed
            </h5>
            {unreadCount > 0 && (
              <span className="rounded-full bg-current/10 px-2 py-0.5 text-[10px] font-bold">
                {unreadCount} unread
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground font-medium"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 p-2 border-b border-current/10 text-[11px]">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={cn(
              "px-2 py-0.5 rounded font-medium",
              filter === "all" ? k.btnPrimarySm : k.muted
            )}
          >
            All ({items.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={cn(
              "px-2 py-0.5 rounded font-medium",
              filter === "unread" ? k.btnPrimarySm : k.muted
            )}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Items */}
        <div className="divide-y divide-current/10 max-h-60 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs opacity-60">
              <Inbox className="h-6 w-6 mx-auto mb-1.5 opacity-50" />
              No notifications in this view
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "p-3 flex items-start gap-2.5 transition-colors hover:bg-current/[0.03]",
                  !item.read && "bg-current/[0.05]"
                )}
              >
                <div className="relative mt-0.5 shrink-0">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-current/10 text-xs">
                    {item.type === "info" && <Info className="h-3 w-3" />}
                    {item.type === "success" && <Check className="h-3 w-3 text-emerald-500" />}
                    {item.type === "warning" && <AlertTriangle className="h-3 w-3 text-amber-500" />}
                  </span>
                  {!item.read && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>

                <div className="flex-1 min-w-0 space-y-0.5">
                  <div className="flex items-center justify-between gap-1">
                    <h6 className={cn("text-xs font-semibold truncate", k.strong)}>
                      {item.title}
                    </h6>
                    <span className={cn("text-[10px] font-mono shrink-0", k.faint)}>
                      {item.time}
                    </span>
                  </div>
                  <p className={cn("text-[11px] leading-tight", k.muted)}>
                    {item.desc}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => dismissItem(item.id)}
                  className="p-1 rounded opacity-50 hover:opacity-100"
                  title="Dismiss"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================== */
/* 10 · Cookie Banner Preview                                                 */
/* ========================================================================== */
export function CookieBannerPreview({ slug, mode }: { slug: StyleSlug; mode: Mode }) {
  const k = getStyleFormKit(slug, mode);
  const [consented, setConsented] = useState<"accepted" | "essential" | null>(null);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <div className="mx-auto w-full max-w-lg space-y-3">
      <div className="flex items-center justify-between">
        <span className={cn("text-xs font-mono tracking-wider uppercase", k.muted)}>
          Consent Banner Preview
        </span>
        {consented && (
          <button
            type="button"
            onClick={() => setConsented(null)}
            className={cn("text-[11px] font-mono underline", k.muted)}
          >
            Reset Consent State
          </button>
        )}
      </div>

      {!consented ? (
        <div className={cn("p-5 border shadow-xl space-y-4", k.panel, k.radius)}>
          {!showPreferences ? (
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
                  <Cookie className="h-5 w-5" />
                </span>
                <div className="space-y-1">
                  <h4 className={cn("text-sm font-bold tracking-tight", k.strong)}>
                    Privacy &amp; Cookie Compliance
                  </h4>
                  <p className={cn("text-xs leading-relaxed", k.muted)}>
                    We use strictly essential cookies for secure sessions, plus optional analytics
                    to measure component copy rates and render performance across {k.styleName}.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-current/10">
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className={k.btnSecondary}
                >
                  <Sliders className="h-3 w-3 mr-1 inline" />
                  Customize
                </button>
                <button
                  type="button"
                  onClick={() => setConsented("essential")}
                  className={k.btnSecondary}
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={() => setConsented("accepted")}
                  className={k.btnPrimarySm}
                >
                  Accept All
                </button>
              </div>
            </div>
          ) : (
            /* Preferences Drawer */
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-current/10 pb-2">
                <h5 className={cn("font-bold text-sm", k.strong)}>Cookie Preferences</h5>
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="p-1 opacity-70 hover:opacity-100"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                <label htmlFor="cookie-essential" className="flex items-start gap-2.5 opacity-60 cursor-not-allowed">
                  <input
                    id="cookie-essential"
                    name="cookieEssential"
                    aria-label="Essential System Storage"
                    type="checkbox"
                    suppressHydrationWarning
                    checked
                    disabled
                    className="mt-0.5"
                  />
                  <div>
                    <strong className="block font-semibold">Essential System Storage</strong>
                    <span className={k.faint}>Required for CSRF protection and theme switching.</span>
                  </div>
                </label>

                <label htmlFor="cookie-analytics" className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    id="cookie-analytics"
                    name="cookieAnalytics"
                    aria-label="Analytics Telemetry"
                    type="checkbox"
                    suppressHydrationWarning
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <strong className="block font-semibold">Analytics Telemetry</strong>
                    <span className={k.muted}>Anonymous interaction metrics and bundle latency profiling.</span>
                  </div>
                </label>

                <label htmlFor="cookie-marketing" className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    id="cookie-marketing"
                    name="cookieMarketing"
                    aria-label="Custom Preferences"
                    type="checkbox"
                    suppressHydrationWarning
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="mt-0.5"
                  />
                  <div>
                    <strong className="block font-semibold">Custom Preferences</strong>
                    <span className={k.muted}>Stores your active design style preferences across sessions.</span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-current/10">
                <button
                  type="button"
                  onClick={() => setConsented("essential")}
                  className={k.btnSecondary}
                >
                  Decline Optional
                </button>
                <button
                  type="button"
                  onClick={() => setConsented("accepted")}
                  className={k.btnPrimarySm}
                >
                  Save Choices
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={cn("p-4 border rounded text-xs flex items-center justify-between", k.panelSoft, k.radius)}>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span className={k.strong}>
              Consent saved: {consented === "accepted" ? "All categories authorized" : "Essential only"}
            </span>
          </div>
          <span className="font-mono text-[10px] opacity-60">localStorage sync</span>
        </div>
      )}
    </div>
  );
}
