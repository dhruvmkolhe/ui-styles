import React, { Component, type ErrorInfo, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";

type Loader = () => Promise<Record<string, unknown>>;
// liveModules will be populated as components are rebuilt
const liveModules: Record<string, { load: Loader; exportName?: string; props?: Record<string, unknown> }> = {};

class PreviewErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode; onError?: (error: Error) => void }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Live component preview failed", error, info); this.props.onError?.(error); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

const roots = new WeakMap<HTMLElement, Root>();
const constructors = new Map<string, Promise<React.ComponentType<Record<string, unknown>> | null>>();

async function resolveComponent(source: string) {
  const config = liveModules[source];
  if (!config) return null;
  let promise = constructors.get(source);
  if (!promise) {
    promise = config.load().then((mod) => {
      const isComponent = (value: unknown) => typeof value === "function" || (typeof value === "object" && value !== null && "$$typeof" in value);
      const nestedDefault = (mod.default as { default?: unknown } | undefined)?.default;
      const candidates = config.exportName ? [mod[config.exportName]] : [mod.default, nestedDefault, ...Object.values(mod)];
      const candidate = candidates.find(isComponent);
      if (!candidate) throw new Error(`No React export detected. Exports: ${Object.keys(mod).join(", ") || "none"}; default: ${typeof mod.default}; nested default: ${typeof nestedDefault}`);
      return candidate ? candidate as React.ComponentType<Record<string, unknown>> : null;
    });
    constructors.set(source, promise);
  }
  return promise;
}

export async function mountLivePreview(host: HTMLElement, source: string, fallbackHtml: string) {
  const fallback = <div dangerouslySetInnerHTML={{ __html: fallbackHtml }} />;
  const config = liveModules[source];
  roots.get(host)?.unmount();
  roots.delete(host);
  const mountPoint = document.createElement("div");
  mountPoint.className = "react-preview-root";
  host.replaceChildren(mountPoint);
  const root = createRoot(mountPoint);
  roots.set(host, root);
  host.dataset.source = source;
  if (!config) { root.render(fallback); delete host.dataset.previewMode; host.dataset.previewError = "No live renderer registered"; host.setAttribute("aria-description", "Visual study; this source is not currently mounted as a live React component."); return false; }
  delete host.dataset.previewError;
  try {
    const Component = await resolveComponent(source);
    if (host.dataset.source !== source) return false;
    if (!Component) { root.render(fallback); host.dataset.previewError = "No component export detected"; return false; }
    root.render(<PreviewErrorBoundary fallback={fallback} onError={(error) => { host.dataset.previewError = error.message; host.setAttribute("aria-description", `Live component failed: ${error.message}`); host.dispatchEvent(new CustomEvent("live-preview-error", { detail: error.message })); }}><div className="live-runtime"><Component {...(config.props || {})} /></div></PreviewErrorBoundary>);
    host.dataset.previewMode = "live";
    return true;
  } catch (error) {
    if (host.dataset.source !== source) return false;
    console.warn(`Using visual study for ${source}; live preview dependencies are incomplete.`, error);
    root.render(fallback);
    delete host.dataset.previewMode;
    host.dataset.previewError = error instanceof Error ? error.message : String(error);
    host.setAttribute("aria-description", `Live component could not load: ${error instanceof Error ? error.message : String(error)}`);
    return false;
  }
}
