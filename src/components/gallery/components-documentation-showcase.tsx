"use client";

import React, { useState } from "react";
import {
  Check,
  Minus,
  Copy,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  Cookie,
  X,
  Plus,
  Info,
  ChevronDown,
  ShieldCheck,
  Keyboard,
  Layers,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Clock,
  CalendarDays,
  Compass,
  FolderKanban,
  Home,
  LayoutGrid,
  ListOrdered,
  Milestone,
  MousePointer,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRight,
  Search,
  Settings,
  Share2,
  Sliders,
  Smartphone,
  Split,
  Trash2,
  User,
  Users,
  Waypoints,
  ExternalLink,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Server,
  Star,
  Table as TableIcon,
  History,
  BarChart3,
  AlignJustify,
  KeyRound,
  Grid3X3,
  Columns2,
  Terminal,
  GripHorizontal,
  GripVertical,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { copyCode } from "@/lib/copy";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, NativeSelect } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormErrorSummary, FormSuccessAlert } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { FormField } from "@/components/ui/form-field";
import { DateInput } from "@/components/ui/date-input";
import { NumberInput } from "@/components/ui/number-input";
import { Image } from "@/components/ui/image";
import { ImageGallery, ImageGalleryItem } from "@/components/ui/image-gallery";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { VideoPlayer } from "@/components/ui/video-player";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Lightbox } from "@/components/ui/lightbox";
import { MediaCard, MediaCardImage, MediaCardContent } from "@/components/ui/media-card";
import { CodeBlock } from "@/components/ui/code-block";
import { MarkdownPreview } from "@/components/ui/markdown-preview";
import { FilePreview } from "@/components/ui/file-preview";
import { SearchBar } from "@/components/ui/search-bar";
import { Filter } from "@/components/ui/filter";
import { SortMenu } from "@/components/ui/sort-menu";
import { RangeSlider } from "@/components/ui/range-slider";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import { Combobox } from "@/components/ui/combobox";
import { MultiSelect } from "@/components/ui/multi-select";
import { OtpInput } from "@/components/ui/otp-input";
import { CommandButtonGroup, CommandButton } from "@/components/ui/command-button-group";
import { ButtonGroup } from "@/components/ui/button-group";
import { SplitButton } from "@/components/ui/split-button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
} from "@/components/ui/toolbar";
import { FloatingToolbar } from "@/components/ui/floating-toolbar";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { MentionInput } from "@/components/ui/mention-input";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { TagEditor } from "@/components/ui/tag-editor";
import { FileUploadDropzone } from "@/components/ui/file-upload-dropzone";
import { FileUploadProgressList, type UploadFileItem } from "@/components/ui/file-upload-progress-list";
import { FileManager, type FSItem } from "@/components/ui/file-manager";
import { FolderTree, type FolderNode } from "@/components/ui/folder-tree";
import { TreeView, type TreeNode } from "@/components/ui/tree-view";
import { OrganizationChart, type OrgNode } from "@/components/ui/organization-chart";
import { KanbanBoard, type KanbanColumn } from "@/components/ui/kanban-board";
import { DragAndDropList, type DndListItem } from "@/components/ui/drag-and-drop-list";
import { TaskBoardCard, type TaskCardData } from "@/components/ui/task-board-card";
import { CalendarEventCard, type CalendarEvent } from "@/components/ui/calendar-event-card";
import { AgendaView, type AgendaEvent } from "@/components/ui/agenda-view";
import { GanttChart, type GanttTask } from "@/components/ui/gantt-chart";
import { DependencyGraph, type DependencyNode, type DependencyEdge } from "@/components/ui/dependency-graph";
import { FlowchartEditor, type FlowNode, type FlowEdge } from "@/components/ui/flowchart-editor";
import { NodeBasedEditor, type GraphEditorNode, type NodeConnection } from "@/components/ui/node-based-editor";
import { WorkflowBuilder, type WorkflowStep } from "@/components/ui/workflow-builder";
import { ChatMessage, type ChatMessageData } from "@/components/ui/chat-message";
import { ChatWindow } from "@/components/ui/chat-window";
import { ChatComposer } from "@/components/ui/chat-composer";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import { ConversationList, type ConversationItem } from "@/components/ui/conversation-list";
import { UserPresence, type PresenceStatus } from "@/components/ui/user-presence";
import { VideoCallControls } from "@/components/ui/video-call-controls";
import { ActivityFeed, type ActivityEvent } from "@/components/ui/activity-feed";
import { CommentThread, type CommentItem } from "@/components/ui/comment-thread";
import { ReviewFeedbackPanel, type FeedbackSubmission } from "@/components/ui/review-feedback-panel";
import { DiffViewer } from "@/components/ui/diff-viewer";
import { TerminalEmulator } from "@/components/ui/terminal-emulator";
import { LogViewer } from "@/components/ui/log-viewer";
import { JSONViewer } from "@/components/ui/json-viewer";
import { APIRequestBuilder, type APIRequestConfig } from "@/components/ui/api-request-builder";
import { APIResponseViewer, type APIResponseData } from "@/components/ui/api-response-viewer";
import { RegexTester } from "@/components/ui/regex-tester";
import { CronExpressionBuilder } from "@/components/ui/cron-expression-builder";
import { QueryBuilder, type QueryGroup } from "@/components/ui/query-builder";
import { FormulaEditor } from "@/components/ui/formula-editor";
import { SpreadsheetGrid } from "@/components/ui/spreadsheet-grid";
import { ChartLegend, type ChartSeriesItem } from "@/components/ui/chart-legend";
import { ChartCrosshairTooltip } from "@/components/ui/chart-crosshair-tooltip";
import { Heatmap } from "@/components/ui/heatmap";
import { Treemap } from "@/components/ui/treemap";
import { SankeyDiagram } from "@/components/ui/sankey-diagram";
import { NetworkGraph } from "@/components/ui/network-graph";
import { MapMarkerCluster } from "@/components/ui/map-marker-cluster";
import { OnboardingTour } from "@/components/ui/onboarding-tour";
import { SpotlightSearch } from "@/components/ui/spotlight-search";
import { ApplicationSearch } from "@/components/ui/application-search";
import { PermissionMatrix } from "@/components/ui/permission-matrix";
import { AuditLog } from "@/components/ui/audit-log";
import { FeatureFlagManager } from "@/components/ui/feature-flag-manager";
import { VersionHistory } from "@/components/ui/version-history";
import { DesignTokenEditor } from "@/components/ui/design-token-editor";
import { ResponsivePreviewSwitcher } from "@/components/ui/responsive-preview-switcher";
import { AccessibilityAuditPanel } from "@/components/ui/accessibility-audit-panel";
import { ContrastPairTester } from "@/components/ui/contrast-pair-tester";
import { VisualRegressionComparator } from "@/components/ui/visual-regression-comparator";
import { LiveComponentPlayground } from "@/components/ui/live-component-playground";
import { ComponentDependencyGraph } from "@/components/ui/component-dependency-graph";
import { StateMachineVisualizer } from "@/components/ui/state-machine-visualizer";
import { MockApiResponseGenerator } from "@/components/ui/mock-api-response-generator";
import { FormValidationPlayground } from "@/components/ui/form-validation-playground";
import { KeyboardShortcutEditor } from "@/components/ui/keyboard-shortcut-editor";
import { ThemeTokenDiff } from "@/components/ui/theme-token-diff";
import { RtlLayoutPreview } from "@/components/ui/rtl-layout-preview";
import { LocalizationPreview } from "@/components/ui/localization-preview";
import { AnimationTimelineEditor } from "@/components/ui/animation-timeline-editor";
import { ComponentUsageAnalytics } from "@/components/ui/component-usage-analytics";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { SuccessState } from "@/components/ui/success-state";
import { Callout } from "@/components/ui/callout";
import { NotificationCenter } from "@/components/ui/notification-center";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { BreadcrumbNav } from "@/components/ui/breadcrumb";
import { PaginationNav } from "@/components/ui/pagination";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem as NavMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  MenuBar,
  MenuBarMenu,
  MenuBarItem,
  MenuBarSeparator,
} from "@/components/ui/menu-bar";
import { Stepper } from "@/components/ui/stepper";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { CommandMenu } from "@/components/ui/command-menu";
import { Link as CustomLink } from "@/components/ui/link";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { CommandPalette } from "@/components/ui/command-palette";
import { DatePicker, formatDate } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import { Calendar } from "@/components/ui/calendar";
import { MegaMenu } from "@/components/ui/mega-menu";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { List, ListItem, ListHeader, ListDivider } from "@/components/ui/list";
import { Timeline, TimelineItem } from "@/components/ui/timeline";
import { StatCard } from "@/components/ui/stat-card";
import { Rating } from "@/components/ui/rating";
import { Chip } from "@/components/ui/chip";
import {
  DescriptionList,
  DescriptionItem,
  DescriptionTerm,
  DescriptionDetails,
} from "@/components/ui/description-list";
import { KeyValueList, KeyValueRow } from "@/components/ui/key-value-list";
import { DataGrid, type DataGridColumn } from "@/components/ui/data-grid";
import { Faq } from "@/components/ui/faq";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Divider, Separator } from "@/components/ui/divider";
import { Container } from "@/components/ui/container";
import { Grid, GridItem } from "@/components/ui/grid";
import { Stack } from "@/components/ui/stack";
import { SplitPane } from "@/components/ui/split-pane";
import { AspectRatio, type AspectRatioPreset } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable-panel";
import { Masonry } from "@/components/ui/masonry";
import { Spinner } from "@/components/ui/spinner";
import { LoadingButton } from "@/components/ui/loading-button";
import { StatusIndicator, type StatusType } from "@/components/ui/status-indicator";
import { StepProgress } from "@/components/ui/step-progress";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Shimmer } from "@/components/ui/shimmer";
import { ConnectionStatus, type ConnectionState } from "@/components/ui/connection-status";
import { SkeletonText } from "@/components/ui/skeleton-text";
import { LoadingBar } from "@/components/ui/loading-bar";
import { ProcessingIndicator, type ProcessingStatus } from "@/components/ui/processing-indicator";
import { COMPONENTS_CATALOG } from "@/lib/components-catalog";

const COMPONENTS_DOCS = [
  { id: "checkbox", name: "Checkbox", category: "Form" },
  { id: "radio-group", name: "Radio Group", category: "Form" },
  { id: "select", name: "Select", category: "Form" },
  { id: "textarea", name: "Textarea", category: "Form" },
  { id: "form", name: "Form", category: "Form" },
  { id: "label", name: "Label", category: "Form" },
  { id: "form-field", name: "Form Field", category: "Form" },
  { id: "date-input", name: "Date Input", category: "Form" },
  { id: "number-input", name: "Number Input", category: "Form" },
  { id: "alert", name: "Alert / Banner", category: "Feedback" },
  { id: "confirmation-dialog", name: "Confirmation Dialog", category: "Feedback" },
  { id: "alert-dialog", name: "Alert Dialog", category: "Feedback" },
  { id: "loading-overlay", name: "Loading Overlay", category: "Feedback" },
  { id: "empty-state", name: "Empty State", category: "Feedback" },
  { id: "error-state", name: "Error State", category: "Feedback" },
  { id: "success-state", name: "Success State", category: "Feedback" },
  { id: "callout", name: "Callout", category: "Feedback" },
  { id: "notification-center", name: "Notification Center", category: "Feedback" },
  { id: "cookie-banner", name: "Cookie Banner", category: "Feedback" },
  { id: "breadcrumb", name: "Breadcrumb", category: "Navigation" },
  { id: "pagination", name: "Pagination", category: "Navigation" },
  { id: "sidebar", name: "Sidebar", category: "Navigation" },
  { id: "navigation-menu", name: "Navigation Menu", category: "Navigation" },
  { id: "menu-bar", name: "Menu Bar", category: "Navigation" },
  { id: "stepper", name: "Stepper", category: "Navigation" },
  { id: "bottom-navigation", name: "Bottom Navigation", category: "Navigation" },
  { id: "command-menu", name: "Command Menu", category: "Navigation" },
  { id: "link", name: "Link", category: "Navigation" },
  { id: "back-to-top", name: "Back to Top", category: "Navigation" },
  { id: "popover", name: "Popover", category: "Overlays" },
  { id: "context-menu", name: "Context Menu", category: "Overlays" },
  { id: "hover-card", name: "Hover Card", category: "Overlays" },
  { id: "drawer", name: "Drawer / Sheet", category: "Overlays" },
  { id: "command-palette", name: "Command Palette", category: "Overlays" },
  { id: "date-picker", name: "Date Picker", category: "Overlays" },
  { id: "time-picker", name: "Time Picker", category: "Overlays" },
  { id: "calendar", name: "Calendar", category: "Overlays" },
  { id: "mega-menu", name: "Mega Menu", category: "Overlays" },
  { id: "floating-action-button", name: "Floating Action Button", category: "Overlays" },
  { id: "table", name: "Table", category: "Data Display" },
  { id: "data-table", name: "Data Table", category: "Data Display" },
  { id: "list", name: "List", category: "Data Display" },
  { id: "timeline", name: "Timeline", category: "Data Display" },
  { id: "stat-card", name: "Stat / Metric Card", category: "Data Display" },
  { id: "rating", name: "Rating", category: "Data Display" },
  { id: "chip", name: "Chip", category: "Data Display" },
  { id: "description-list", name: "Description List", category: "Data Display" },
  { id: "key-value-list", name: "Key-Value List", category: "Data Display" },
  { id: "data-grid", name: "Data Grid", category: "Data Display" },
  { id: "faq", name: "FAQ Section", category: "Data Display" },
  { id: "collapsible", name: "Collapsible", category: "Layout" },
  { id: "divider", name: "Divider / Separator", category: "Layout" },
  { id: "container", name: "Container", category: "Layout" },
  { id: "grid", name: "Grid", category: "Layout" },
  { id: "stack", name: "Stack", category: "Layout" },
  { id: "split-pane", name: "Split Pane", category: "Layout" },
  { id: "aspect-ratio", name: "Aspect Ratio", category: "Layout" },
  { id: "scroll-area", name: "Scroll Area", category: "Layout" },
  { id: "resizable-panel", name: "Resizable Panel", category: "Layout" },
  { id: "masonry", name: "Masonry", category: "Layout" },
  { id: "spinner", name: "Spinner / Loader", category: "Loading & Status" },
  { id: "loading-button", name: "Loading Button", category: "Loading & Status" },
  { id: "status-indicator", name: "Status Indicator", category: "Loading & Status" },
  { id: "step-progress", name: "Step Progress", category: "Loading & Status" },
  { id: "circular-progress", name: "Circular Progress", category: "Loading & Status" },
  { id: "shimmer", name: "Shimmer", category: "Loading & Status" },
  { id: "connection-status", name: "Connection Status", category: "Loading & Status" },
  { id: "skeleton-text", name: "Skeleton Text", category: "Loading & Status" },
  { id: "loading-bar", name: "Loading Bar", category: "Loading & Status" },
  { id: "processing-indicator", name: "Processing Indicator", category: "Loading & Status" },
  { id: "image", name: "Image", category: "Media & Content" },
  { id: "image-gallery", name: "Image Gallery", category: "Media & Content" },
  { id: "carousel", name: "Carousel", category: "Media & Content" },
  { id: "video-player", name: "Video Player", category: "Media & Content" },
  { id: "audio-player", name: "Audio Player", category: "Media & Content" },
  { id: "lightbox", name: "Lightbox", category: "Media & Content" },
  { id: "media-card", name: "Media Card", category: "Media & Content" },
  { id: "code-block", name: "Code Block", category: "Media & Content" },
  { id: "markdown-preview", name: "Markdown Preview", category: "Media & Content" },
  { id: "file-preview", name: "File Preview", category: "Media & Content" },
  { id: "search-bar", name: "Search Bar", category: "Advanced / Utility" },
  { id: "filter", name: "Filter", category: "Advanced / Utility" },
  { id: "sort-menu", name: "Sort Menu", category: "Advanced / Utility" },
  { id: "range-slider", name: "Range Slider", category: "Advanced / Utility" },
  { id: "slider", name: "Slider", category: "Advanced / Utility" },
  { id: "color-picker", name: "Color Picker", category: "Advanced / Utility" },
  { id: "combobox", name: "Combobox", category: "Advanced / Utility" },
  { id: "multi-select", name: "Multi-Select", category: "Advanced / Utility" },
  { id: "otp-input", name: "OTP / PIN Input", category: "Advanced / Utility" },
  { id: "command-button-group", name: "Command Button Group", category: "Actions & Rich Text" },
  { id: "button-group", name: "Button Group", category: "Actions & Rich Text" },
  { id: "split-button", name: "Split Button", category: "Actions & Rich Text" },
  { id: "segmented-control", name: "Segmented Control", category: "Actions & Rich Text" },
  { id: "toolbar", name: "Toolbar", category: "Actions & Rich Text" },
  { id: "floating-toolbar", name: "Floating Toolbar", category: "Actions & Rich Text" },
  { id: "rich-text-editor", name: "Rich Text Editor", category: "Actions & Rich Text" },
  { id: "mention-input", name: "Mention Input", category: "Actions & Rich Text" },
  { id: "emoji-picker", name: "Emoji Picker", category: "Actions & Rich Text" },
  { id: "tag-editor", name: "Mention / Tag Editor", category: "Actions & Rich Text" },
  { id: "file-upload-dropzone", name: "File Upload Dropzone", category: "Files & Hierarchy" },
  { id: "file-upload-progress", name: "File Upload Progress List", category: "Files & Hierarchy" },
  { id: "file-manager", name: "File Manager", category: "Files & Hierarchy" },
  { id: "folder-tree", name: "Folder Tree", category: "Files & Hierarchy" },
  { id: "tree-view", name: "Tree View", category: "Files & Hierarchy" },
  { id: "organization-chart", name: "Organization Chart", category: "Files & Hierarchy" },
  { id: "kanban-board", name: "Kanban Board", category: "Files & Hierarchy" },
  { id: "drag-and-drop-list", name: "Drag-and-Drop List", category: "Files & Hierarchy" },
  { id: "task-board-card", name: "Task Board Card", category: "Files & Hierarchy" },
  { id: "calendar-event-card", name: "Calendar Event Card", category: "Files & Hierarchy" },
  { id: "agenda-view", name: "Agenda View", category: "Scheduling & Workflows" },
  { id: "gantt-chart", name: "Gantt Chart", category: "Scheduling & Workflows" },
  { id: "dependency-graph", name: "Dependency Graph", category: "Scheduling & Workflows" },
  { id: "flowchart-editor", name: "Flowchart Editor", category: "Scheduling & Workflows" },
  { id: "node-based-editor", name: "Node-Based Editor", category: "Scheduling & Workflows" },
  { id: "workflow-builder", name: "Workflow Builder", category: "Scheduling & Workflows" },
  { id: "chat-message", name: "Chat Message", category: "Scheduling & Workflows" },
  { id: "chat-window", name: "Chat Window", category: "Scheduling & Workflows" },
  { id: "chat-composer", name: "Chat Composer", category: "Scheduling & Workflows" },
  { id: "typing-indicator", name: "Typing Indicator", category: "Scheduling & Workflows" },
  { id: "conversation-list", name: "Conversation List", category: "Collaboration & DevTools" },
  { id: "user-presence", name: "User Presence", category: "Collaboration & DevTools" },
  { id: "video-call-controls", name: "Video Call Controls", category: "Collaboration & DevTools" },
  { id: "activity-feed", name: "Activity Feed", category: "Collaboration & DevTools" },
  { id: "comment-thread", name: "Comment Thread", category: "Collaboration & DevTools" },
  { id: "review-feedback-panel", name: "Review / Feedback Panel", category: "Collaboration & DevTools" },
  { id: "diff-viewer", name: "Diff Viewer", category: "Collaboration & DevTools" },
  { id: "terminal-emulator", name: "Terminal Emulator", category: "Collaboration & DevTools" },
  { id: "log-viewer", name: "Log Viewer", category: "Collaboration & DevTools" },
  { id: "json-viewer", name: "JSON Viewer", category: "Collaboration & DevTools" },
  { id: "api-request-builder", name: "API Request Builder", category: "API & Data Utilities" },
  { id: "api-response-viewer", name: "API Response Viewer", category: "API & Data Utilities" },
  { id: "regex-tester", name: "Regex Tester", category: "API & Data Utilities" },
  { id: "cron-expression-builder", name: "Cron Expression Builder", category: "API & Data Utilities" },
  { id: "query-builder", name: "Query Builder", category: "API & Data Utilities" },
  { id: "formula-editor", name: "Formula Editor", category: "API & Data Utilities" },
  { id: "spreadsheet-grid", name: "Spreadsheet Grid", category: "API & Data Utilities" },
  { id: "chart-legend", name: "Chart Legend", category: "API & Data Utilities" },
  { id: "chart-crosshair-tooltip", name: "Chart Crosshair / Tooltip", category: "API & Data Utilities" },
  { id: "heatmap", name: "Heatmap", category: "API & Data Utilities" },
  { id: "treemap", name: "Treemap", category: "Visualizations & Mapping" },
  { id: "sankey-diagram", name: "Sankey Diagram", category: "Visualizations & Mapping" },
  { id: "network-graph", name: "Network Graph", category: "Visualizations & Mapping" },
  { id: "map-marker-cluster", name: "Map Marker / Cluster", category: "Visualizations & Mapping" },
  { id: "onboarding-tour", name: "Onboarding Tour", category: "Visualizations & Mapping" },
  { id: "spotlight-search", name: "Spotlight Search", category: "Visualizations & Mapping" },
  { id: "application-search", name: "Application Search", category: "Visualizations & Mapping" },
  { id: "permission-matrix", name: "Permission Matrix", category: "Visualizations & Mapping" },
  { id: "audit-log", name: "Audit Log", category: "Visualizations & Mapping" },
  { id: "feature-flag-manager", name: "Feature Flag Manager", category: "Visualizations & Mapping" },
  { id: "version-history", name: "Version History", category: "Visualizations & Mapping" },
  { id: "design-token-editor", name: "Design Token Editor", category: "Design System & a11y" },
  { id: "responsive-preview-switcher", name: "Responsive Preview Switcher", category: "Design System & a11y" },
  { id: "accessibility-audit-panel", name: "Accessibility Audit Panel", category: "Design System & a11y" },
  { id: "contrast-pair-tester", name: "Contrast Pair Tester", category: "Design System & a11y" },
  { id: "visual-regression-comparator", name: "Visual Regression Comparator", category: "Design System & a11y" },
  { id: "live-component-playground", name: "Live Component Playground", category: "Design System & a11y" },
  { id: "component-dependency-graph", name: "Component Dependency Graph", category: "Design System & a11y" },
  { id: "state-machine-visualizer", name: "State Machine Visualizer", category: "Design System & a11y" },
  { id: "mock-api-response-generator", name: "Mock API Response Generator", category: "Design System & a11y" },
  { id: "form-validation-playground", name: "Form Validation Playground", category: "Design System & a11y" },
  { id: "keyboard-shortcut-editor", name: "Keyboard Shortcut Editor", category: "DevEx & Localization" },
  { id: "theme-token-diff", name: "Theme Token Diff", category: "DevEx & Localization" },
  { id: "rtl-layout-preview", name: "RTL Layout Preview", category: "DevEx & Localization" },
  { id: "localization-preview", name: "Localization Preview", category: "DevEx & Localization" },
  { id: "animation-timeline-editor", name: "Animation Timeline Editor", category: "DevEx & Localization" },
  { id: "component-usage-analytics", name: "Component Usage Analytics", category: "DevEx & Localization" },
  { id: "playground", name: "Full Suite Playground", category: "Integration" },
];

export function ComponentsDocumentationShowcase() {
  const [activeTab, setActiveTab] = useState("checkbox");
  const [copied, setCopied] = useState(false);

  // Global interactive modifiers
  const [isDisabled, setIsDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  // Batch 10 Actions & Rich Text interactive states
  const [demoCommandAction, setDemoCommandAction] = useState<string>("Ready");
  const [demoButtonGroupView, setDemoButtonGroupView] = useState("grid");
  const [demoSplitStatus, setDemoSplitStatus] = useState("Ready");
  const [demoSegmentedVal, setDemoSegmentedVal] = useState("week");
  const [demoToolbarFormats, setDemoToolbarFormats] = useState<string[]>(["bold"]);
  const [demoToolbarAlign, setDemoToolbarAlign] = useState("left");
  const [demoFloatingSelection, setDemoFloatingSelection] = useState<string | null>(null);
  const [demoRichTextVal, setDemoRichTextVal] = useState(
    "<p>Welcome to <strong>Chameleon UI</strong> rich text editing! Easily add <em>formatted paragraphs</em>, lists, and links.</p>"
  );
  const [demoMentionVal, setDemoMentionVal] = useState("Hello @dhruvmkolhe, the team review is ready!");
  const [demoEmojiVal, setDemoEmojiVal] = useState("🎉");
  const [demoTagsVal, setDemoTagsVal] = useState<string[]>([
    "react",
    "nextjs",
    "@dhruvmkolhe",
    "design-tokens",
  ]);

  // Batch 11 Files & Hierarchy interactive states
  const [demoDropzoneAccepted, setDemoDropzoneAccepted] = useState<number>(0);
  const [demoUploadItems, setDemoUploadItems] = useState<UploadFileItem[]>([
    { id: "u-1", name: "spec-document.pdf", size: 2450000, progress: 100, status: "completed" },
    { id: "u-2", name: "design-assets.zip", size: 8400000, progress: 54, status: "uploading" },
    { id: "u-3", name: "screencast.mp4", size: 18200000, progress: 20, status: "paused" },
  ]);
  const [demoFileManagerSelect, setDemoFileManagerSelect] = useState<string>("None");
  const [demoFolderTreeSelect, setDemoFolderTreeSelect] = useState<string>("src");
  const [demoTreeViewSelect, setDemoTreeViewSelect] = useState<string>("api");
  const [demoOrgSelect, setDemoOrgSelect] = useState<string>("Dhruv Kolhe");
  const [demoKanbanCols, setDemoKanbanCols] = useState<KanbanColumn[]>([
    { id: "todo", title: "To Do", color: "#64748b", taskIds: ["task-1", "task-2"] },
    { id: "progress", title: "In Progress", color: "#3b82f6", taskIds: ["task-3"] },
    { id: "done", title: "Completed", color: "#10b981", taskIds: ["task-4"] },
  ]);
  const [demoKanbanTasks, setDemoKanbanTasks] = useState<Record<string, TaskCardData>>({
    "task-1": { id: "task-1", title: "Implement Folder Navigation", priority: "high", labels: ["Files", "A11y"], dueDate: "Oct 24", subtasks: { completed: 1, total: 3 } },
    "task-2": { id: "task-2", title: "Tree View Roving Focus", priority: "medium", labels: ["Hierarchy"], dueDate: "Oct 25" },
    "task-3": { id: "task-3", title: "Kanban Board Drag & Drop", priority: "urgent", labels: ["Workflow"], dueDate: "Oct 22", subtasks: { completed: 3, total: 4 } },
    "task-4": { id: "task-4", title: "Batch 10 Polish & Tests", priority: "low", labels: ["Verified"], dueDate: "Oct 20", subtasks: { completed: 2, total: 2 } },
  });
  const [demoDndItems, setDemoDndItems] = useState<DndListItem[]>([
    { id: "d-1", label: "Architecture Review", description: "Verify zero foreign dependencies" },
    { id: "d-2", label: "Multi-Style Verification", description: "Audit all 25 design themes" },
    { id: "d-3", label: "Interactive Tests", description: "Exercise dropzone and tree nodes" },
  ]);

  // Batch 12 Scheduling & Workflows interactive states
  const [demoAgendaEvent, setDemoAgendaEvent] = useState<string>("Sprint Review");
  const [demoGanttTask, setDemoGanttTask] = useState<string>("Batch 12 Frontend");
  const [demoDepNode, setDemoDepNode] = useState<string>("Core Engine");
  const [demoComposerMsg, setDemoComposerMsg] = useState<string>("Ready");
  const [demoTypingActive, setDemoTypingActive] = useState<boolean>(true);

  // Component-specific interactive states
  const [cbChecked, setCbChecked] = useState(true);
  const [radioVal, setRadioVal] = useState("pro");
  const [radioVariant, setRadioVariant] = useState<"card" | "standard">("card");
  const [selectVal, setSelectVal] = useState("react");
  const [textareaVal, setTextareaVal] = useState("Antigravity Chameleon UI with clean Chakra-style ergonomics.");
  const [dateVal, setDateVal] = useState("2026-10-24");
  const [numberVal, setNumberVal] = useState<number | undefined>(24);
  const [numberStepper, setNumberStepper] = useState<"inline" | "buttons">("buttons");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Batch 2 interactive states
  const [alertFormat, setAlertFormat] = useState<"card" | "banner">("card");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmResult, setConfirmResult] = useState<string | null>(null);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [emptyPreset, setEmptyPreset] = useState<"search" | "data" | "inbox" | "generic">("search");
  const [isRetrying, setIsRetrying] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<string | null>(null);

  // Batch 3 Navigation interactive states
  const [breadcrumbSep, setBreadcrumbSep] = useState<"chevron" | "slash" | "dot">("chevron");
  const [navPage, setNavPage] = useState(3);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarActive, setSidebarActive] = useState("overview");
  const [stepperStep, setStepperStep] = useState(1);
  const [stepperOrientation, setStepperOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [bottomNavVal, setBottomNavVal] = useState("home");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdResult, setCmdResult] = useState<string | null>(null);
  const [navMenuVal, setNavMenuVal] = useState<string | null>(null);
  const [menuBarAction, setMenuBarAction] = useState<string | null>(null);

  // Batch 4 Overlays interactive states
  const [popoverW, setPopoverW] = useState("1280");
  const [popoverH, setPopoverH] = useState("800");
  const [contextAction, setContextAction] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteAction, setPaletteAction] = useState<string | null>(null);
  const [showcaseDate, setShowcaseDate] = useState<Date | undefined>(() => new Date(2026, 9, 24));
  const [showcaseTime, setShowcaseTime] = useState("02:30 PM");
  const [showcaseCalDate, setShowcaseCalDate] = useState<Date | undefined>(() => new Date(2026, 9, 24));
  const [fabAction, setFabAction] = useState<string | null>(null);

  // Batch 5 Data Display interactive states
  const [tableSelect, setTableSelect] = useState<string>("INV-102");
  const [dataTableIds, setDataTableIds] = useState<(string | number)[]>(["usr-1"]);
  const [listSelect, setListSelect] = useState("item-1");
  const [timelineStep, setTimelineStep] = useState(2);
  const [ratingVal, setRatingVal] = useState(4);
  const [ratingFeedback, setRatingFeedback] = useState<string | null>(null);
  const [chipSelected, setChipSelected] = useState("all");
  const [chipTags, setChipTags] = useState(["TypeScript", "TailwindCSS", "Next.js", "Radix Primitives"]);
  const [dlLayout, setDlLayout] = useState<"horizontal" | "grid">("horizontal");
  const [gridFocusCell, setGridFocusCell] = useState<{ r: number; c: number; v: string }>({ r: 0, c: 1, v: "$124,500" });

  // Batch 6 Layout interactive states
  const [collapsibleOpen, setCollapsibleOpen] = useState(true);
  const [containerSize, setContainerSize] = useState<"sm" | "md" | "lg" | "xl">("md");
  const [gridColsCount, setGridColsCount] = useState<number>(3);
  const [stackDirection, setStackDirection] = useState<"horizontal" | "vertical">("horizontal");
  const [stackWithDivider, setStackWithDivider] = useState(true);
  const [splitPanePos, setSplitPanePos] = useState(50);
  const [aspectRatioChoice, setAspectRatioChoice] = useState<AspectRatioPreset>("16:9");

  // Batch 7 Loading & Status interactive states
  const [spinnerSizeChoice, setSpinnerSizeChoice] = useState<"xs" | "sm" | "md" | "lg" | "xl">("md");
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnSuccess, setBtnSuccess] = useState(false);
  const [statusVal, setStatusVal] = useState<StatusType>("online");
  const [stepIdx, setStepIdx] = useState(1);
  const [circVal, setCircVal] = useState(68);
  const [circIndeterminate, setCircIndeterminate] = useState(false);
  const [connState, setConnState] = useState<ConnectionState>("connected");
  const [loadingBarValue, setLoadingBarValue] = useState(64);
  const [loadingBarIndet, setLoadingBarIndet] = useState(false);
  const [procStatus, setProcStatus] = useState<ProcessingStatus>("processing");

  // Batch 9 Advanced / Utility interactive states
  const [demoSearchQuery, setDemoSearchQuery] = useState("");
  const [demoSearchSubmitted, setDemoSearchSubmitted] = useState<string | null>(null);
  const [demoFilterValues, setDemoFilterValues] = useState<Record<string, any>>({ status: "active", rating: 75 });
  const [demoSortValue, setDemoSortValue] = useState("name-asc");
  const [demoRangeSliderVal, setDemoRangeSliderVal] = useState<[number, number]>([20, 80]);
  const [demoSliderVal, setDemoSliderVal] = useState(50);
  const [demoColorVal, setDemoColorVal] = useState("#3b82f6");
  const [demoComboboxVal, setDemoComboboxVal] = useState("nextjs");
  const [demoMultiSelectVal, setDemoMultiSelectVal] = useState<string[]>(["react", "typescript"]);
  const [demoOtpVal, setDemoOtpVal] = useState("");
  const [demoOtpCompleted, setDemoOtpCompleted] = useState<string | null>(null);

  // Batch 13 Collaboration & DevTools states
  const [demoSelectedConv, setDemoSelectedConv] = useState("conv-1");
  const [demoPresenceVal, setDemoPresenceVal] = useState<PresenceStatus>("online");
  const [demoFeedbackResult, setDemoFeedbackResult] = useState<string | null>(null);
  const [demoTerminalCmd, setDemoTerminalCmd] = useState<string | null>(null);

  // Batch 14 API & Data Utilities states
  const [demoSentRequest, setDemoSentRequest] = useState<string | null>(null);
  const [demoFormulaResult, setDemoFormulaResult] = useState<any>(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  // Esc key and scroll lock for full screen mode
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullScreen) {
        setIsFullScreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  React.useEffect(() => {
    if (!isFullScreen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isFullScreen]);

  const handleCopy = async (code: string, label: string) => {
    const ok = await copyCode(code, label);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      className={cn(
        "transition-all duration-200 overflow-hidden",
        isFullScreen
          ? "fixed inset-0 z-50 m-0 rounded-none border-none bg-background overflow-y-auto"
          : "mt-16 rounded-2xl border border-border bg-card shadow-sm"
      )}
    >
      {/* Header banner */}
      <div className="border-b border-border bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-md border border-teal-500/20 bg-teal-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
              Interactive Component Documentation &amp; Showcase
            </span>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-foreground">
              Production Component Suites
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Test states, variants, keyboard accessibility, and copy production React code across all {COMPONENTS_CATALOG.length} components.
            </p>
          </div>

          {/* Interactive modifiers */}
          <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-1.5 shadow-xs">
            <button
              type="button"
              onClick={() => setIsFullScreen(!isFullScreen)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isFullScreen ? "bg-teal-600 text-white font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
              title={isFullScreen ? "Exit full screen (Esc)" : "Expand to full screen"}
            >
              {isFullScreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              Full screen: {isFullScreen ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setIsError(!isError)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isError ? "bg-rose-500 text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <AlertCircle className="h-3.5 w-3.5" />
              Error: {isError ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setIsDisabled(!isDisabled)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isDisabled ? "bg-amber-500 text-black font-semibold" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Disabled: {isDisabled ? "ON" : "OFF"}
            </button>
            <button
              type="button"
              onClick={() => setIsRequired(!isRequired)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium transition-colors",
                isRequired ? "bg-teal-600 text-white" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Required: {isRequired ? "ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="mt-6 -mx-2 flex gap-1.5 overflow-x-auto px-2 pb-1 scrollbar-none">
          {COMPONENTS_DOCS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              className={cn(
                "whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all",
                activeTab === c.id
                  ? "bg-foreground text-background shadow-xs"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main interactive showcase canvas */}
      <div className="p-6 sm:p-10">
        {/* 1 · CHECKBOX */}
        {activeTab === "checkbox" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Checkbox</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Controlled and uncontrolled toggle with checked, indeterminate, disabled, and error states.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Checkbox\n  label="Subscribe to weekly releases"\n  description="Sent every Tuesday morning."\n  checked={checked}\n  onCheckedChange={setChecked}\n  error={${isError}}\n  disabled={${isDisabled}}\n  required={${isRequired}}\n/>`,
                    "Checkbox"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Live interactive playground */}
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Preview
                </span>

                <Checkbox
                  id="interactive-cb"
                  label="Subscribe to weekly Chameleon UI updates"
                  description="Curated components, tokens, and design recipes delivered straight to your inbox."
                  checked={cbChecked}
                  onCheckedChange={(val) => setCbChecked(val)}
                  disabled={isDisabled}
                  error={isError}
                  required={isRequired}
                />

                <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                  <Checkbox
                    id="indeterminate-cb"
                    label="Indeterminate selection state"
                    description="Useful for nested tree lists or partial select-all sets."
                    checked="indeterminate"
                    disabled={isDisabled}
                  />
                </div>
              </div>

              {/* State matrix */}
              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  States Matrix
                </span>
                <div className="grid gap-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Default Checked</span>
                    <Checkbox defaultChecked disabled={false} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Default Unchecked</span>
                    <Checkbox defaultChecked={false} />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Indeterminate</span>
                    <Checkbox checked="indeterminate" />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span>Disabled (Checked)</span>
                    <Checkbox checked disabled />
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-background border">
                    <span className="text-destructive font-medium">Validation Error</span>
                    <Checkbox error />
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility & Edge cases */}
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div className="rounded-lg border border-border p-4 space-y-1.5 bg-card">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <Keyboard className="h-4 w-4 text-teal-600" />
                  <span>Keyboard Navigation</span>
                </div>
                <p className="text-muted-foreground leading-normal">
                  Full keyboard control with <kbd className="px-1 py-0.5 border rounded bg-muted">Tab</kbd> to focus,{" "}
                  <kbd className="px-1 py-0.5 border rounded bg-muted">Space</kbd> or{" "}
                  <kbd className="px-1 py-0.5 border rounded bg-muted">Enter</kbd> to toggle. Focus ring adheres to WCAG 2.4.7.
                </p>
              </div>

              <div className="rounded-lg border border-border p-4 space-y-1.5 bg-card">
                <div className="flex items-center gap-1.5 font-bold text-foreground">
                  <ShieldCheck className="h-4 w-4 text-teal-600" />
                  <span>ARIA Compliance</span>
                </div>
                <p className="text-muted-foreground leading-normal">
                  Renders <code>role=&quot;checkbox&quot;</code> with dynamic <code>aria-checked=&quot;true | false | mixed&quot;</code>,{" "}
                  <code>aria-required</code>, and <code>aria-invalid</code> attributes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2 · RADIO GROUP */}
        {activeTab === "radio-group" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Radio Group</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Single-choice selection with keyboard arrow navigation, roving tabindex, and card layouts.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setRadioVariant(radioVariant === "card" ? "standard" : "card")}
                >
                  Layout: {radioVariant === "card" ? "Cards" : "Simple"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<RadioGroup value={plan} onValueChange={setPlan}>\n  <RadioGroupItem value="free" label="Hobbyist" description="For personal tools" />\n  <RadioGroupItem value="pro" label="Professional" description="Unlimited team access" />\n</RadioGroup>`,
                      "Radio Group"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Selection
                </span>

                <RadioGroup
                  value={radioVal}
                  onValueChange={setRadioVal}
                  disabled={isDisabled}
                  error={isError}
                >
                  <RadioGroupItem
                    value="starter"
                    label="Starter Tier"
                    description="Basic design kits, personal projects ($0/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="pro"
                    label="Professional Studio"
                    description="All 25 styles unlocked, unwatermarked exports ($24/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="enterprise"
                    label="Enterprise Scale"
                    description="Custom tokens, SLA, multi-seat team management ($99/mo)"
                    card={radioVariant === "card"}
                  />
                  <RadioGroupItem
                    value="disabled-opt"
                    label="Deprecated Tier"
                    description="Grandfathered licenses only"
                    disabled
                    card={radioVariant === "card"}
                  />
                </RadioGroup>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Keyboard &amp; Roving Focus
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Radio Group implements the W3C Roving Tabindex pattern. Only the selected radio button is reachable via Tab.
                  Once focused:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted-foreground">
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">→</kbd> selects the next item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">←</kbd> selects the previous item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">Home</kbd> jumps to the first active item</li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">End</kbd> jumps to the last active item</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3 · SELECT */}
        {activeTab === "select" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Select</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Single-choice dropdown with listbox popover, keyboard traps, and hidden native input integration.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Select\n  options={[\n    { value: "react", label: "React 19" },\n    { value: "next", label: "Next.js App Router" },\n  ]}\n  value={val}\n  onValueChange={setVal}\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "Select"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Custom Accessible Dropdown
                </span>

                <div className="space-y-1.5">
                  <Label required={isRequired} error={isError}>Framework Ecosystem</Label>
                  <Select
                    options={[
                      { value: "react", label: "React 19 (Server Components)", description: "Standard modern ecosystem" },
                      { value: "next", label: "Next.js (App Router)", description: "Fullstack production framework" },
                      { value: "vue", label: "Vue 3 (Composition API)", description: "Reactive declarative frontend" },
                      { value: "svelte", label: "Svelte 5 (Runes)", description: "Compiler-based reactivity" },
                      { value: "angular", label: "Angular 18", disabled: true, description: "Enterprise batteries-included (Disabled)" },
                    ]}
                    value={selectVal}
                    onValueChange={setSelectVal}
                    error={isError}
                    disabled={isDisabled}
                  />
                  <p className="text-xs text-muted-foreground">
                    Selected value: <strong className="font-mono text-foreground">{selectVal}</strong>
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-1.5">
                  <Label>Native Browser Fallback Select</Label>
                  <NativeSelect disabled={isDisabled} error={isError}>
                    <option value="light">Light Theme Mode</option>
                    <option value="dark">Dark Theme Mode</option>
                    <option value="system">System Preference</option>
                  </NativeSelect>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Keyboard &amp; Form Features
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">Space</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">Enter</kbd> to open/close popover</li>
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> or <kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> to cycle highlighted option</li>
                  <li>Press <kbd className="px-1 py-0.5 border rounded bg-background">Escape</kbd> to dismiss</li>
                  <li>Includes hidden <code>&lt;input type=&quot;hidden&quot;&gt;</code> ensuring standard HTML form submission compatibility</li>
                  <li>Clicking outside automatically closes listbox</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 4 · TEXTAREA */}
        {activeTab === "textarea" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Textarea</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-line input with character counter indicator, resize constraints, and error boundaries.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Textarea\n  value={bio}\n  onChange={(e) => setBio(e.target.value)}\n  maxLength={200}\n  showCount\n  resize="vertical"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "Textarea"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Textarea
                </span>

                <div className="space-y-1.5">
                  <Label htmlFor="demo-textarea" required={isRequired} error={isError}>
                    Style Philosophy &amp; Manifesto
                  </Label>
                  <Textarea
                    id="demo-textarea"
                    rows={4}
                    maxLength={160}
                    showCount
                    resize="vertical"
                    value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    error={isError}
                    disabled={isDisabled}
                    placeholder="Enter project rationale or notes..."
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Options &amp; Edge Cases
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li><strong>Resize props:</strong> <code>&quot;none&quot;</code>, <code>&quot;vertical&quot;</code>, <code>&quot;horizontal&quot;</code>, <code>&quot;both&quot;</code></li>
                  <li><strong>Character counter:</strong> Real-time <code>showCount</code> bound to <code>maxLength</code></li>
                  <li><strong>Overflow edge case:</strong> Automatically prevents input beyond limit when <code>maxLength</code> is set</li>
                  <li><strong>Screen readers:</strong> Receives <code>aria-invalid</code> when error is active</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 5 · FORM */}
        {activeTab === "form" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Form</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unified form wrapper managing submission state, error dictionaries, and accessible summaries.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Form onSubmitForm={async (data) => console.log(data)}>\n  <FormErrorSummary />\n  <FormField label="Full Name" name="name" required>\n    <Input name="name" />\n  </FormField>\n  <Button type="submit">Submit</Button>\n</Form>`,
                    "Form"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="max-w-xl mx-auto rounded-xl border border-border bg-background p-6 sm:p-8 space-y-5">
              <Form
                onSubmitForm={async () => {
                  setFormSubmitted(true);
                }}
              >
                {isError && (
                  <FormErrorSummary
                    errors={{
                      email: "Please provide a valid work address.",
                      terms: "You must accept terms of service.",
                    }}
                  />
                )}

                {formSubmitted && !isError && (
                  <FormSuccessAlert message="Form validation passed! Application submitted cleanly." />
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="First Name" required={isRequired} error={isError ? "First name required" : undefined}>
                    <input
                      name="firstName"
                      autoComplete="off"
                      suppressHydrationWarning
                      defaultValue="Margaret"
                      disabled={isDisabled}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                    />
                  </FormField>

                  <FormField label="Last Name" required={isRequired}>
                    <input
                      name="lastName"
                      autoComplete="off"
                      suppressHydrationWarning
                      defaultValue="Hamilton"
                      disabled={isDisabled}
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                    />
                  </FormField>
                </div>

                <FormField label="Email" description="Used strictly for account alerts." required>
                  <input
                    type="email"
                    name="email"
                    suppressHydrationWarning
                    defaultValue="margaret@apollo.nasa.gov"
                    disabled={isDisabled}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-xs outline-none focus:ring-1 focus:ring-ring"
                  />
                </FormField>

                <div className="pt-2 flex items-center justify-between">
                  <Button type="submit" disabled={isDisabled}>
                    Submit Application
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setFormSubmitted(false)}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}

        {/* 6 · LABEL */}
        {activeTab === "label" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Label</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic label component with required asterisk, optional badge, and tooltip hints.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Label htmlFor="email" required>Work Email</Label>\n<Label htmlFor="notes" optional>Project Notes</Label>`,
                    "Label"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">01 Standard</span>
                <div>
                  <Label htmlFor="ex-std">Standard Field</Label>
                </div>
                <p className="text-xs text-muted-foreground">Font-medium with muted fallback color.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">02 Required</span>
                <div>
                  <Label htmlFor="ex-req" required>Required Field</Label>
                </div>
                <p className="text-xs text-muted-foreground">Appends semantic asterisk with aria-hidden.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">03 Optional</span>
                <div>
                  <Label htmlFor="ex-opt" optional>Phone Extension</Label>
                </div>
                <p className="text-xs text-muted-foreground">Clarifies non-mandatory input cleanly.</p>
              </div>

              <div className="rounded-lg border border-border p-5 space-y-2 bg-background">
                <span className="text-[11px] font-mono text-muted-foreground">04 With Tooltip Hint</span>
                <div>
                  <Label htmlFor="ex-hint" hint="EIN or VAT number">Tax Identification</Label>
                </div>
                <p className="text-xs text-muted-foreground">Interactive contextual guidance.</p>
              </div>
            </div>
          </div>
        )}

        {/* 7 · FORM FIELD */}
        {activeTab === "form-field" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Form Field</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Integrated container binding Label, Input, Helper text, and Error alert with automatic ID generation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FormField\n  label="Domain Name"\n  description="Must be valid FQDN."\n  error={isError ? "Domain already registered." : undefined}\n  required\n>\n  <Input placeholder="acme.org" />\n</FormField>`,
                    "FormField"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-5">
                <FormField
                  label="API Token Key"
                  description="Found in developer settings under Credentials."
                  required={isRequired}
                  disabled={isDisabled}
                  error={isError ? "Token invalid or expired." : undefined}
                >
                  <input
                    name="apiTokenKey"
                    autoComplete="off"
                    suppressHydrationWarning
                    defaultValue="sec_live_94827103984"
                    disabled={isDisabled}
                    className={cn(
                      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 font-mono text-xs shadow-xs outline-none focus:ring-1 focus:ring-ring",
                      isError && "border-destructive text-destructive"
                    )}
                  />
                </FormField>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Automated ARIA Linking
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  FormField generates matching IDs and attaches <code>aria-describedby</code> to helper descriptions and{" "}
                  <code>role=&quot;alert&quot;</code> to validation error banners so screen readers announce changes immediately.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 8 · DATE INPUT */}
        {activeTab === "date-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Date Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic date picker with calendar trigger icon, clear action, and min/max limits.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DateInput\n  value={date}\n  onChange={setDate}\n  min="2026-01-01"\n  max="2030-12-31"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                    "DateInput"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Date Picker
                </span>

                <div className="space-y-1.5 max-w-sm">
                  <Label required={isRequired} error={isError}>Release Cutoff Date</Label>
                  <DateInput
                    value={dateVal}
                    onChange={setDateVal}
                    min="2026-01-01"
                    max="2030-12-31"
                    disabled={isDisabled}
                    error={isError}
                  />
                  <p className="text-xs text-muted-foreground">
                    Selected ISO date: <strong className="font-mono text-foreground">{dateVal || "none"}</strong>
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Features &amp; Edge Cases
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Integrated calendar icon prefix and one-click clear button</li>
                  <li>Cross-browser calendar picker indicator styling (supports dark mode invert)</li>
                  <li>Min/Max constraints clamp out-of-range dates natively</li>
                  <li>Supports standard ISO-8601 strings (YYYY-MM-DD)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 9 · NUMBER INPUT */}
        {activeTab === "number-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Number Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Numeric stepper with buttons (+ / -), arrow key navigation, Shift+Arrow 10x step, and bounds clamping.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNumberStepper(numberStepper === "buttons" ? "inline" : "buttons")}
                >
                  Stepper: {numberStepper === "buttons" ? "Buttons" : "Inline Chevrons"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<NumberInput\n  value={num}\n  onValueChange={setNum}\n  min={0}\n  max={100}\n  step={1}\n  stepperType="${numberStepper}"\n  error={${isError}}\n  disabled={${isDisabled}}\n/>`,
                      "NumberInput"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Stepper
                </span>

                <div className="space-y-1.5 max-w-xs">
                  <Label required={isRequired} error={isError}>Cache TTL (Seconds)</Label>
                  <NumberInput
                    value={numberVal}
                    onValueChange={setNumberVal}
                    min={0}
                    max={120}
                    step={1}
                    stepperType={numberStepper}
                    disabled={isDisabled}
                    error={isError}
                  />
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                    <span>Min: 0 · Max: 120</span>
                    <button
                      type="button"
                      onClick={() => setNumberVal(60)}
                      className="underline text-teal-600 hover:text-teal-700"
                    >
                      Set to 60s
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Controls &amp; Keyboard
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↑</kbd> increments by <code>step</code></li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">↓</kbd> decrements by <code>step</code></li>
                  <li><kbd className="px-1 py-0.5 border rounded bg-background">Shift + ↑ / ↓</kbd> steps by 10x</li>
                  <li>Typing invalid numbers automatically clamps to <code>min</code> / <code>max</code> upon blur</li>
                  <li>Buttons auto-disable when value reaches bounds</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 10 · ALERT / BANNER */}
        {activeTab === "alert" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Alert / Banner</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contextual messaging for informational, success, warning, and destructive situations with dismissibility.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setAlertFormat(alertFormat === "card" ? "banner" : "card")}
                >
                  Format: {alertFormat === "card" ? "Card" : "Banner"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<Alert\n  variant="info"\n  format="${alertFormat}"\n  title="Update Available"\n  description="New security patches are ready to apply."\n  dismissible\n/>`,
                      "Alert"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <Alert
                variant="info"
                format={alertFormat}
                title="Informational Notice"
                description="Your workspace configuration has been backed up to secondary storage."
                dismissible
              />
              <Alert
                variant="success"
                format={alertFormat}
                title="SSL Certificate Issued"
                description="Wildcard certificate verified and applied across all edge nodes."
                dismissible
              />
              <Alert
                variant="warning"
                format={alertFormat}
                title="Usage Threshold Approaching"
                description="85% of monthly bandwidth allowance consumed. Quota resets in 4 days."
                dismissible
              />
              <Alert
                variant="destructive"
                format={alertFormat}
                title="Database Connectivity Failure"
                description="Failed to contact primary replica. Swapping to hot standby pool."
                dismissible
              />
            </div>
          </div>
        )}

        {/* 11 · CONFIRMATION DIALOG */}
        {activeTab === "confirmation-dialog" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Confirmation Dialog</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modal confirmation flow with focus trapping, backdrop overlay, keyboard Escape, and loading lock.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ConfirmationDialog\n  trigger={<Button>Publish Changes</Button>}\n  title="Publish to Global CDN?"\n  description="This action will propagate tokens to 25 edge nodes."\n  confirmLabel="Confirm Publish"\n  onConfirm={async () => await syncTokens()}\n/>`,
                    "ConfirmationDialog"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block text-left">
                  Interactive Trigger
                </span>

                <div className="py-6">
                  <ConfirmationDialog
                    open={confirmOpen}
                    onOpenChange={setConfirmOpen}
                    trigger={<Button disabled={isDisabled}>Open Confirmation Flow</Button>}
                    title="Publish Design System to Production?"
                    description="This will deploy 35 components across all 25 design styles. Active sessions will automatically receive updated token manifests."
                    confirmLabel="Yes, Deploy Now"
                    cancelLabel="Return to Staging"
                    destructive={isError}
                    onConfirm={() => {
                      setConfirmResult("Confirmed! Deployment dispatched at " + new Date().toLocaleTimeString());
                    }}
                  />
                </div>

                {confirmResult && (
                  <p className="text-xs text-emerald-600 font-medium">
                    {confirmResult}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Focus Management &amp; Semantics
                </span>
                <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground leading-normal">
                  <li>Focus is trapped inside the dialog container while open.</li>
                  <li>Pressing <kbd className="px-1 py-0.5 border rounded bg-background">Escape</kbd> gracefully closes without submission.</li>
                  <li>Focus returns directly to triggering button upon dismissal.</li>
                  <li>Submit action disables buttons to prevent accidental double submissions.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 12 · ALERT DIALOG */}
        {activeTab === "alert-dialog" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Alert Dialog</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Critical modal dialog implementing role=&quot;alertdialog&quot; and safe cancel-first focus default.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AlertDialog\n  trigger={<Button variant="destructive">Purge Database</Button>}\n  title="Purge Entire Cluster?"\n  description="This action is irreversible and permanently deletes all tokens."\n  confirmLabel="Purge Everything"\n  destructive\n/>`,
                    "AlertDialog"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-xl border border-border bg-background p-6 text-center space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block text-left">
                  Destructive Action Simulation
                </span>

                <div className="py-6">
                  <AlertDialog
                    open={alertModalOpen}
                    onOpenChange={setAlertModalOpen}
                    trigger={
                      <Button variant="destructive" disabled={isDisabled}>
                        Purge Production Cluster
                      </Button>
                    }
                    title="Irreversible Action: Purge Cluster?"
                    description="Are you absolutely certain? This will delete all 35 component manifests and reset all theme tokens to factory defaults. This action cannot be undone."
                    confirmLabel="Confirm Permanent Purge"
                    cancelLabel="Abort Action"
                    destructive
                  />
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  WCAG Safe Focus Pattern
                </span>
                <p className="text-xs text-muted-foreground leading-normal">
                  In accordance with W3C guidelines for destructive actions, initial keyboard focus lands on the{" "}
                  <strong>Cancel button</strong> rather than the Destructive Confirm action, preventing accidental trigger on rapid keystrokes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 13 · LOADING OVERLAY */}
        {activeTab === "loading-overlay" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Loading Overlay</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Blocking indicator overlay with spinner, custom messages, aria-busy status, and backdrop blur.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LoadingOverlay\n  visible={isLoading}\n  message="Reindexing Search Shards..."\n  description="Please wait while document embeddings are regenerated."\n  blur\n/>`,
                    "LoadingOverlay"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Interactive Container Simulation</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setLoadingActive(true);
                    setTimeout(() => setLoadingActive(false), 2500);
                  }}
                >
                  {loadingActive ? "Processing..." : "Trigger 2.5s Loading Overlay"}
                </Button>
              </div>

              <div className="relative rounded-xl border border-border bg-background p-6 min-h-[180px] flex flex-col justify-between overflow-hidden shadow-xs">
                <div>
                  <h4 className="text-sm font-bold text-foreground">Edge Deployment Cluster</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Nodes: 24 active · Region: Global Anycast · Protocol: HTTP/3 enabled
                  </p>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                  <span>Status: Operational</span>
                  <span className="font-mono text-emerald-600 font-semibold">99.99% SLA</span>
                </div>

                <LoadingOverlay
                  visible={loadingActive}
                  message="Rebuilding Static Artifacts..."
                  description="Pre-rendering 35 components across 25 design styles."
                  blur
                />
              </div>
            </div>
          </div>
        )}

        {/* 14 · EMPTY STATE */}
        {activeTab === "empty-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Empty State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Zero-data states for search, datasets, inbox, and first-use onboarding.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setEmptyPreset(
                      emptyPreset === "search" ? "data" : emptyPreset === "data" ? "inbox" : "search"
                    )
                  }
                >
                  Preset: {emptyPreset.toUpperCase()}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleCopy(
                      `<EmptyState\n  preset="${emptyPreset}"\n  action={<Button size="sm">Create New Entry</Button>}\n/>`,
                      "EmptyState"
                    )
                  }
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                  {copied ? "Copied" : "Copy Code"}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <EmptyState
                preset={emptyPreset}
                action={<Button size="sm">Primary Action</Button>}
                secondaryAction={<Button size="sm" variant="outline">Learn More</Button>}
              />
            </div>
          </div>
        )}

        {/* 15 · ERROR STATE */}
        {activeTab === "error-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Error State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Failure boundary display with retry CTA, loading retry feedback, and technical diagnostics disclosure.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ErrorState\n  title="Connection Failure"\n  description="Failed to synchronize style tokens."\n  onRetry={async () => await retrySync()}\n  errorDetails="Error: 504 Gateway Timeout at api/tokens"\n/>`,
                    "ErrorState"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <ErrorState
                title="Remote Manifest Unreachable"
                description="Unable to establish secure handshake with upstream token repository."
                errorDetails="FetchError: connect ETIMEDOUT 198.51.100.42:443\n  at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1146:16)"
                isRetrying={isRetrying}
                onRetry={() => {
                  setIsRetrying(true);
                  setTimeout(() => setIsRetrying(false), 1500);
                }}
                secondaryAction={<Button size="sm" variant="outline">Status Page</Button>}
              />
            </div>
          </div>
        )}

        {/* 16 · SUCCESS STATE */}
        {activeTab === "success-state" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Success State</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Positive completion feedback with checkmark visual, receipt key-values, and primary actions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SuccessState\n  title="Export Complete"\n  description="35 components ready for download."\n  details={[\n    { label: "Batch", value: "Batch 2 Completed" },\n    { label: "Styles", value: "25 Styles Active" },\n  ]}\n  action={<Button size="sm">Download Bundle</Button>}\n/>`,
                    "SuccessState"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto">
              <SuccessState
                title="Design System Export Complete"
                description="All 35 components have been validated, bundled with Tailwind CSS, and verified against WCAG AAA contrast."
                details={[
                  { label: "Artifact", value: "chameleon-ui-batch-2.tar.gz" },
                  { label: "Components", value: "35 Components" },
                  { label: "Design Styles", value: "25 Aesthetics" },
                ]}
                action={<Button size="sm">Download Package</Button>}
                secondaryAction={<Button size="sm" variant="outline">Explore Vault</Button>}
              />
            </div>
          </div>
        )}

        {/* 17 · CALLOUT */}
        {activeTab === "callout" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Callout</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contextual editorial aside with left accent rule, tips, warning notes, and optional dismiss action.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Callout variant="info" title="Performance Optimization">\n  All components use native CSS variables for zero JavaScript runtime styling overhead.\n</Callout>`,
                    "Callout"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <Callout variant="info" title="Pro-Tip · Zero CSS Overhead">
                Every style in Chameleon UI is generated exclusively with utility classes. No external stylesheets or runtime CSS-in-JS dependencies are needed.
              </Callout>

              <Callout variant="success" title="Production Ready">
                Components comply with Section 508 and WCAG 2.2 AA / AAA keyboard focus guidelines.
              </Callout>

              <Callout variant="warning" title="Hydration Notice">
                When embedding custom dialogs inside server component pages, ensure client boundary declarations are preserved.
              </Callout>

              <Callout variant="neutral" title="Editorial Note" dismissible>
                Designed for high readability across both light and dark canvas modes.
              </Callout>
            </div>
          </div>
        )}

        {/* 18 · NOTIFICATION CENTER */}
        {activeTab === "notification-center" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Notification Center</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Notification drawer with read/unread tracking, filter tabs (All/Unread), mark all read, and badge counters.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NotificationCenter\n  notifications={[\n    {\n      id: "1",\n      title: "Tokens Updated",\n      description: "Updated 14 palette tokens.",\n      timestamp: "5m ago",\n      read: false,\n      type: "info",\n    },\n  ]}\n/>`,
                    "NotificationCenter"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto text-center space-y-4">
              <span className="text-xs text-muted-foreground block">
                Click bell trigger to test popover drawer:
              </span>

              <div className="flex justify-center py-4">
                <NotificationCenter
                  notifications={[
                    {
                      id: "n-1",
                      title: "Batch 2 Components Released",
                      description: "10 new feedback and dialog components now live.",
                      timestamp: "Just now",
                      read: false,
                      type: "success",
                    },
                    {
                      id: "n-2",
                      title: "Style Manifest Revalidated",
                      description: "All 25 design styles synchronized across edge nodes.",
                      timestamp: "12m ago",
                      read: false,
                      type: "info",
                    },
                    {
                      id: "n-3",
                      title: "Bandwidth Threshold Warning",
                      description: "Approaching 85% of monthly request quota.",
                      timestamp: "1h ago",
                      read: true,
                      type: "warning",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* 19 · COOKIE BANNER */}
        {activeTab === "cookie-banner" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Cookie Banner</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Privacy compliance banner with granular category preferences and persistent localStorage state.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CookieBanner\n  title="We respect your privacy"\n  description="We use cookies to analyze usage and customize themes."\n  onAcceptAll={(prefs) => console.log(prefs)}\n/>`,
                    "CookieBanner"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Embedded Consent Preview</span>
                {cookieConsent && (
                  <button
                    type="button"
                    onClick={() => setCookieConsent(null)}
                    className="underline text-teal-600 font-mono"
                  >
                    Reset Storage
                  </button>
                )}
              </div>

              {!cookieConsent ? (
                <div className="p-4 rounded-xl border border-border bg-card space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-600">
                      <Cookie className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">We value your privacy</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        We use essential cookies to maintain secure sessions, plus optional analytics to optimize UI component rendering.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border">
                    <Button size="sm" variant="outline" onClick={() => setCookieConsent("Custom Preferences Saved")}>
                      Customize
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => setCookieConsent("Essential Only Accepted")}>
                      Essential Only
                    </Button>
                    <Button size="sm" onClick={() => setCookieConsent("All Cookies Accepted")}>
                      Accept All
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-semibold">{cookieConsent}</span>
                  </div>
                  <span className="font-mono text-[11px] opacity-70">localStorage updated</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 20 · BREADCRUMB */}
        {activeTab === "breadcrumb" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Breadcrumb</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic trail navigation with icons, custom separators, responsive collapse, and active page semantics.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BreadcrumbNav\n  items={[\n    { label: "Home", href: "/", icon: <Home className="h-3.5 w-3.5" /> },\n    { label: "Settings", href: "/settings" },\n    { label: "Team", isCurrent: true },\n  ]}\n  separator="/"\n/>`,
                    "Breadcrumb"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              {/* Interactive Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4 text-xs">
                <span className="font-semibold text-muted-foreground">Separator Style:</span>
                <div className="flex items-center gap-1.5">
                  {(["chevron", "slash", "dot"] as const).map((sep) => (
                    <Button
                      key={sep}
                      size="sm"
                      variant={breadcrumbSep === sep ? "default" : "outline"}
                      onClick={() => setBreadcrumbSep(sep)}
                      className="h-7 text-xs capitalize"
                    >
                      {sep}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Breadcrumb Display */}
              <div className="p-4 rounded-xl border border-border bg-card">
                <BreadcrumbNav
                  items={[
                    { label: "Home", href: "#", icon: <Home className="h-3.5 w-3.5" /> },
                    { label: "Dashboard", href: "#" },
                    { label: "Components", href: "#", icon: <Layers className="h-3.5 w-3.5" /> },
                    { label: "Navigation", href: "#" },
                    { label: "Breadcrumb", isCurrent: true },
                  ]}
                  separator={
                    breadcrumbSep === "slash" ? (
                      <span className="opacity-40">/</span>
                    ) : breadcrumbSep === "dot" ? (
                      <span className="opacity-40">•</span>
                    ) : undefined
                  }
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Accessibility Specifications:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Wrapped in semantic <code className="font-mono text-[11px]">&lt;nav aria-label=&quot;Breadcrumb&quot;&gt;</code>.</li>
                  <li>Ordered list <code className="font-mono text-[11px]">&lt;ol&gt;</code> structure communicates chronological hierarchy.</li>
                  <li>Current destination marked with <code className="font-mono text-[11px]">aria-current=&quot;page&quot;</code> and disabled link cursor.</li>
                  <li>Separators marked with <code className="font-mono text-[11px]">aria-hidden=&quot;true&quot;</code> to prevent screen-reader clutter.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 21 · PAGINATION */}
        {activeTab === "pagination" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Pagination</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible page switcher with range ellipsis, jump controls, and mobile responsive layout.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<PaginationNav\n  page={currentPage}\n  totalPages={16}\n  onPageChange={setCurrentPage}\n  siblingCount={1}\n  showFirstLast\n/>`,
                    "Pagination"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Active Page: <strong className="text-foreground">{navPage}</strong> of 16</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px]">Jump:</span>
                  {[1, 5, 8, 16].map((p) => (
                    <Button
                      key={p}
                      size="sm"
                      variant={navPage === p ? "default" : "outline"}
                      onClick={() => setNavPage(p)}
                      className="h-6 w-7 text-[11px] p-0"
                    >
                      {p}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
                <PaginationNav
                  page={navPage}
                  totalPages={16}
                  onPageChange={setNavPage}
                  siblingCount={1}
                  showFirstLast
                  disabled={isDisabled}
                />
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Keyboard &amp; Assistive Controls:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Previous/Next buttons properly set <code className="font-mono text-[11px]">aria-disabled=&quot;true&quot;</code> at boundaries.</li>
                  <li>Active page communicates status via <code className="font-mono text-[11px]">aria-current=&quot;page&quot;</code>.</li>
                  <li>Responsive mobile mode collapses page numbers to <code className="font-mono text-[11px]">Page X of Y</code> automatically.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 22 · SIDEBAR */}
        {activeTab === "sidebar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Sidebar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Collapsible navigation drawer with nested submenus, mobile slide-out overlay, badges, and focus trap.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Sidebar collapsed={isCollapsed}>\n  <SidebarHeader>Chameleon UI</SidebarHeader>\n  <SidebarContent>\n    <SidebarMenu>\n      <SidebarMenuItem>\n        <SidebarMenuButton icon={<Home />} isActive>Overview</SidebarMenuButton>\n      </SidebarMenuItem>\n    </SidebarMenu>\n  </SidebarContent>\n</Sidebar>`,
                    "Sidebar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <span className="text-xs text-muted-foreground">
                  Mode: <strong className="text-foreground">{sidebarCollapsed ? "Collapsed (Icon-Only)" : "Expanded (Full)"}</strong>
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="h-7 text-xs flex items-center gap-1.5"
                >
                  {sidebarCollapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
                  <span>{sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}</span>
                </Button>
              </div>

              {/* Embedded Sidebar Demonstration */}
              <div className="flex justify-center p-2 rounded-xl bg-muted/20 border border-border">
                <div
                  className={cn(
                    "border border-border bg-card rounded-xl transition-all duration-300 flex flex-col h-[360px] select-none shadow-md",
                    sidebarCollapsed ? "w-16" : "w-64"
                  )}
                >
                  <div className={cn("h-14 border-b border-border flex items-center px-3.5 gap-2 shrink-0", sidebarCollapsed && "justify-center")}>
                    <div className="h-7 w-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      UI
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate text-foreground">Workspace Studio</div>
                        <div className="text-[10px] font-mono text-muted-foreground">Pro Tier</div>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 overflow-y-auto p-2 space-y-3">
                    {!sidebarCollapsed && (
                      <div className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Platform
                      </div>
                    )}
                    <div className="space-y-1">
                      {[
                        { id: "overview", label: "Overview", icon: <LayoutGrid className="h-4 w-4" /> },
                        { id: "components", label: "Components", icon: <Layers className="h-4 w-4" />, badge: "45" },
                        { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSidebarActive(item.id)}
                          title={sidebarCollapsed ? item.label : undefined}
                          className={cn(
                            "w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors text-left",
                            sidebarActive === item.id
                              ? "bg-teal-600 text-white font-semibold shadow-xs"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                            sidebarCollapsed && "justify-center px-0"
                          )}
                        >
                          <span className="shrink-0">{item.icon}</span>
                          {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                          {!sidebarCollapsed && item.badge && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/20">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className={cn("border-t border-border p-2.5 flex items-center gap-2.5 shrink-0", sidebarCollapsed && "justify-center")}>
                    <div className="h-7 w-7 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold text-xs shrink-0">
                      JD
                    </div>
                    {!sidebarCollapsed && (
                      <div className="flex-1 min-w-0 text-left">
                        <div className="text-xs font-semibold text-foreground truncate">Jane Doe</div>
                        <div className="text-[10px] text-muted-foreground truncate">admin@chameleon-ui.dev</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 23 · NAVIGATION MENU */}
        {activeTab === "navigation-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Navigation Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible site navigation with dropdown content panels, active state indicators, and keyboard arrows.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NavigationMenu>\n  <NavigationMenuList>\n    <NavigationMenuItem>\n      <NavigationMenuTrigger value="products">Products</NavigationMenuTrigger>\n      <NavigationMenuContent value="products">\n        <NavigationMenuLink href="/ui">Chameleon UI</NavigationMenuLink>\n      </NavigationMenuContent>\n    </NavigationMenuItem>\n  </NavigationMenuList>\n</NavigationMenu>`,
                    "NavigationMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="p-3 rounded-xl border border-border bg-card">
                <NavigationMenu value={navMenuVal} onValueChange={setNavMenuVal}>
                  <NavigationMenuList>
                    <NavMenuItem>
                      <NavigationMenuTrigger value="solutions">Solutions</NavigationMenuTrigger>
                      <NavigationMenuContent value="solutions">
                        <div className="grid gap-2 w-64 p-1">
                          <NavigationMenuLink href="#design-systems" isActive>
                            <div className="text-xs font-bold">25 Design Systems</div>
                            <div className="text-[11px] text-muted-foreground">Authentic design styles rendered live</div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#cli">
                            <div className="text-xs font-bold">CLI Code Generator</div>
                            <div className="text-[11px] text-muted-foreground">Zero-dependency component export</div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavMenuItem>

                    <NavMenuItem>
                      <NavigationMenuTrigger value="developers">Developers</NavigationMenuTrigger>
                      <NavigationMenuContent value="developers">
                        <div className="grid gap-2 w-64 p-1">
                          <NavigationMenuLink href="#api-reference">
                            <div className="text-xs font-bold">API Reference</div>
                            <div className="text-[11px] text-muted-foreground">Radix UI and Tailwind CSS bindings</div>
                          </NavigationMenuLink>
                          <NavigationMenuLink href="#github">
                            <div className="text-xs font-bold">Open Source Core</div>
                            <div className="text-[11px] text-muted-foreground">MIT Licensed components suite</div>
                          </NavigationMenuLink>
                        </div>
                      </NavigationMenuContent>
                    </NavMenuItem>

                    <NavMenuItem>
                      <NavigationMenuLink href="/components" isActive>
                        Components
                      </NavigationMenuLink>
                    </NavMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Interaction &amp; Accessibility Highlights:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Never depends solely on hover: operable via click, Space, or Enter key.</li>
                  <li>Pressing <code className="font-mono text-[11px]">Escape</code> closes active submenus and restores focus to the trigger.</li>
                  <li>Exposes <code className="font-mono text-[11px]">aria-expanded</code> and <code className="font-mono text-[11px]">aria-haspopup=&quot;true&quot;</code> states to screen readers.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 24 · MENU BAR */}
        {activeTab === "menu-bar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Menu Bar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Application-grade horizontal menu bar with nested cascading submenus, shortcuts, and ARIA menubar semantics.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MenuBar>\n  <MenuBarMenu id="file" label="File">\n    <MenuBarItem shortcut="⌘N">New Project</MenuBarItem>\n    <MenuBarSeparator />\n    <MenuBarItem shortcut="⌘S">Save</MenuBarItem>\n  </MenuBarMenu>\n</MenuBar>`,
                    "MenuBar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Application Menu</span>
                <span>Last Action: <strong className="text-foreground">{menuBarAction || "None"}</strong></span>
              </div>

              <div className="p-3 rounded-xl border border-border bg-card">
                <MenuBar>
                  <MenuBarMenu id="file" label="File">
                    <MenuBarItem shortcut="⌘N" onClick={() => setMenuBarAction("New File")}>New File</MenuBarItem>
                    <MenuBarItem shortcut="⌘O" onClick={() => setMenuBarAction("Open File")}>Open...</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘S" onClick={() => setMenuBarAction("Save File")}>Save</MenuBarItem>
                    <MenuBarItem disabled>Export as PDF</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="edit" label="Edit">
                    <MenuBarItem shortcut="⌘Z" onClick={() => setMenuBarAction("Undo")}>Undo</MenuBarItem>
                    <MenuBarItem shortcut="⇧⌘Z" onClick={() => setMenuBarAction("Redo")}>Redo</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘X" onClick={() => setMenuBarAction("Cut")}>Cut</MenuBarItem>
                    <MenuBarItem shortcut="⌘C" onClick={() => setMenuBarAction("Copy")}>Copy</MenuBarItem>
                    <MenuBarItem shortcut="⌘V" onClick={() => setMenuBarAction("Paste")}>Paste</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="view" label="View">
                    <MenuBarItem shortcut="⌘+" onClick={() => setMenuBarAction("Zoom In")}>Zoom In</MenuBarItem>
                    <MenuBarItem shortcut="⌘-" onClick={() => setMenuBarAction("Zoom Out")}>Zoom Out</MenuBarItem>
                    <MenuBarSeparator />
                    <MenuBarItem shortcut="⌘0" onClick={() => setMenuBarAction("Reset Zoom")}>Actual Size</MenuBarItem>
                  </MenuBarMenu>

                  <MenuBarMenu id="help" label="Help">
                    <MenuBarItem shortcut="F1" onClick={() => setMenuBarAction("Open Docs")}>Documentation</MenuBarItem>
                    <MenuBarItem onClick={() => setMenuBarAction("Release Notes")}>Release Notes</MenuBarItem>
                  </MenuBarMenu>
                </MenuBar>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">W3C Menubar Pattern Compliance:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Uses <code className="font-mono text-[11px]">role=&quot;menubar&quot;</code> and <code className="font-mono text-[11px]">role=&quot;menuitem&quot;</code> attributes.</li>
                  <li>Roving mouse enter opens adjacent menus when a menu is already active.</li>
                  <li>Keyboard shortcut indicators are visually aligned with monospace typography.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 25 · STEPPER */}
        {activeTab === "stepper" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Stepper</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Process wizard with completed checkmarks, current highlights, error states, and responsive orientation modes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Stepper\n  steps={[\n    { id: 1, title: "Account", description: "Email & security" },\n    { id: 2, title: "Billing", description: "Credit card info" },\n    { id: 3, title: "Confirm", description: "Review and launch" },\n  ]}\n  currentStep={currentStep}\n  onStepClick={setCurrentStep}\n/>`,
                    "Stepper"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-3 text-xs">
                <span className="text-muted-foreground">Orientation:</span>
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant={stepperOrientation === "horizontal" ? "default" : "outline"}
                    onClick={() => setStepperOrientation("horizontal")}
                    className="h-7 text-xs"
                  >
                    Horizontal
                  </Button>
                  <Button
                    size="sm"
                    variant={stepperOrientation === "vertical" ? "default" : "outline"}
                    onClick={() => setStepperOrientation("vertical")}
                    className="h-7 text-xs"
                  >
                    Vertical
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card">
                <Stepper
                  steps={[
                    { id: 1, title: "Account", description: "Identity verification" },
                    { id: 2, title: "Billing Details", description: "Invoice address" },
                    { id: 3, title: "Preferences", description: "Custom configurations", optional: true },
                    { id: 4, title: "Review", description: "Final confirmation" },
                  ]}
                  currentStep={stepperStep}
                  onStepClick={setStepperStep}
                  orientation={stepperOrientation}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={stepperStep === 0}
                  onClick={() => setStepperStep((p) => Math.max(0, p - 1))}
                  className="flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </Button>
                <span className="text-xs font-mono text-muted-foreground">
                  Step {stepperStep + 1} of 4
                </span>
                <Button
                  size="sm"
                  disabled={stepperStep >= 3}
                  onClick={() => setStepperStep((p) => Math.min(3, p + 1))}
                  className="flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 26 · BOTTOM NAVIGATION */}
        {activeTab === "bottom-navigation" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Bottom Navigation</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Mobile app bottom dock with badge indicators, safe-area padding, and accessible aria-current destination markers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BottomNavigation\n  items={[\n    { id: "home", label: "Home", icon: <Home /> },\n    { id: "search", label: "Search", icon: <Search /> },\n    { id: "activity", label: "Activity", icon: <Bell />, badge: "3" },\n    { id: "profile", label: "Profile", icon: <User /> },\n  ]}\n  value={activeTab}\n  onValueChange={setActiveTab}\n/>`,
                    "BottomNavigation"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-sm mx-auto space-y-4">
              <div className="border border-border overflow-hidden rounded-2xl shadow-lg flex flex-col h-[240px] bg-card">
                <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
                  <div className="h-10 w-10 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mb-2">
                    {bottomNavVal === "home" && <Home className="h-5 w-5" />}
                    {bottomNavVal === "search" && <Search className="h-5 w-5" />}
                    {bottomNavVal === "activity" && <Bell className="h-5 w-5" />}
                    {bottomNavVal === "profile" && <User className="h-5 w-5" />}
                  </div>
                  <div className="text-sm font-bold capitalize text-foreground">
                    {bottomNavVal} Destination
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Touch-friendly targets with active indicator pill.
                  </p>
                </div>

                <BottomNavigation
                  items={[
                    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
                    { id: "search", label: "Search", icon: <Search className="h-4 w-4" /> },
                    { id: "activity", label: "Activity", icon: <Bell className="h-4 w-4" />, badge: "3" },
                    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
                  ]}
                  value={bottomNavVal}
                  onValueChange={setBottomNavVal}
                />
              </div>
            </div>
          </div>
        )}

        {/* 27 · COMMAND MENU */}
        {activeTab === "command-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Command Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Command palette modal with instant search filtering, keyboard roving focus, categories, and shortcut triggers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CommandMenu\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  groups={[\n    {\n      heading: "Navigation",\n      items: [\n        { id: "home", label: "Go to Home", shortcut: "G H" },\n      ],\n    },\n  ]}\n/>`,
                    "CommandMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6 text-center">
              <p className="text-xs text-muted-foreground">
                Click below to launch the modal command palette or test keyboard shortcuts.
              </p>

              <Button
                onClick={() => setCmdOpen(true)}
                className="mx-auto flex items-center gap-2 h-10 px-6"
              >
                <Search className="h-4 w-4" />
                <span>Open Command Palette</span>
                <kbd className="ml-2 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </Button>

              {cmdResult && (
                <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center justify-center gap-1.5 animate-in fade-in-0">
                  <Check className="h-4 w-4" />
                  <span>Executed: {cmdResult}</span>
                </div>
              )}

              <CommandMenu
                open={cmdOpen}
                onOpenChange={setCmdOpen}
                groups={[
                  {
                    heading: "Navigation",
                    items: [
                      {
                        id: "components",
                        label: "Go to Component Catalog",
                        shortcut: "G C",
                        icon: <Layers className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Navigated to Components"),
                      },
                      {
                        id: "docs",
                        label: "View Style Guides",
                        shortcut: "G S",
                        icon: <Milestone className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Opened Style Guides"),
                      },
                    ],
                  },
                  {
                    heading: "Quick Actions",
                    items: [
                      {
                        id: "copy-all",
                        label: "Copy React Import Syntax",
                        shortcut: "⌘I",
                        icon: <Copy className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Copied React Import Syntax"),
                      },
                      {
                        id: "report",
                        label: "Send User Feedback",
                        shortcut: "⌘F",
                        icon: <Sparkles className="h-4 w-4" />,
                        onSelect: () => setCmdResult("Opened Feedback Modal"),
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 28 · LINK */}
        {activeTab === "link" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Link</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Polymorphic anchor with automatic external target/rel detection, visual underline styles, and accessible focus rings.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CustomLink href="/components" variant="default">Documentation</CustomLink>\n<CustomLink href="https://github.com" isExternal showExternalIcon>GitHub</CustomLink>`,
                    "Link"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Default Link:</span>
                <CustomLink href="#">
                  Explore Design Tokens
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Subtle Muted Link:</span>
                <CustomLink href="#" variant="subtle">
                  View Project Changelog
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">External Target (_blank):</span>
                <CustomLink href="https://github.com" isExternal showExternalIcon>
                  GitHub Repository
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Always Underlined:</span>
                <CustomLink href="#" variant="underline" underline="always">
                  Terms of Service &amp; Licensing
                </CustomLink>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                <span className="text-muted-foreground">Disabled Anchor:</span>
                <CustomLink href="#" disabled>
                  Premium Features (Restricted)
                </CustomLink>
              </div>
            </div>
          </div>
        )}

        {/* 29 · BACK TO TOP */}
        {activeTab === "back-to-top" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Back to Top</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Floating action button with scroll threshold visibility, smooth scrolling animation, and accessible label.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<BackToTop threshold={300} smooth position="bottom-right" />`,
                    "BackToTop"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <p className="text-xs text-muted-foreground">
                The global <code className="font-mono text-[11px]">&lt;BackToTop /&gt;</code> component monitors window scroll position. Below is an interactive demonstration embedded in a scrollable frame:
              </p>

              <div className="relative border border-border rounded-xl overflow-hidden shadow-inner bg-card h-48">
                <div
                  id="demo-scroll-box"
                  className="h-full overflow-y-auto p-4 space-y-3 text-xs"
                >
                  <div className="p-3 rounded-lg bg-muted/40 border border-border">
                    <h5 className="font-bold text-foreground">Top of Document</h5>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      Scroll down inside this box to trigger the return-to-top button.
                    </p>
                  </div>

                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-3 rounded-lg bg-muted/20 border border-border">
                      <div className="font-semibold text-foreground">Paragraph Block #{i + 1}</div>
                      <p className="text-muted-foreground text-[11px]">
                        Continuous content section testing passive scroll handlers.
                      </p>
                    </div>
                  ))}

                  <div className="p-3 rounded-lg bg-muted/40 border border-border text-center">
                    <span className="font-semibold text-foreground">End of content</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("demo-scroll-box")
                    el?.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                  className="absolute bottom-3 right-3 p-2.5 rounded-full bg-teal-600 text-white shadow-lg hover:bg-teal-700 transition-all flex items-center gap-1.5 text-xs font-bold"
                  aria-label="Back to top of section"
                >
                  <ArrowUp className="h-4 w-4" />
                  <span>Top</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 30 · POPOVER */}
        {activeTab === "popover" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Popover</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Floating contextual panel anchored to a trigger with collision detection and focus management.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Open Settings</Button>\n  </PopoverTrigger>\n  <PopoverContent className="w-80">\n    <h4 className="font-semibold text-xs">Dimensions</h4>\n  </PopoverContent>\n</Popover>`,
                    "Popover"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex justify-center p-8 rounded-xl border border-border bg-card">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="default" className="flex items-center gap-2">
                      <Sliders className="h-4 w-4" />
                      <span>Canvas Dimensions</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-4 space-y-3 shadow-xl">
                    <div className="space-y-1">
                      <h4 className="font-bold text-xs text-foreground">Canvas Settings</h4>
                      <p className="text-[11px] text-muted-foreground">Configure resolution viewport boundaries.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <label htmlFor="doc-popover-width" className="text-[10px] font-mono text-muted-foreground">WIDTH (PX)</label>
                        <input
                          id="doc-popover-width"
                          name="popoverWidth"
                          aria-label="Popover Width in pixels"
                          type="text"
                          autoComplete="off"
                          suppressHydrationWarning
                          value={popoverW}
                          onChange={(e) => setPopoverW(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="doc-popover-height" className="text-[10px] font-mono text-muted-foreground">HEIGHT (PX)</label>
                        <input
                          id="doc-popover-height"
                          name="popoverHeight"
                          aria-label="Popover Height in pixels"
                          type="text"
                          autoComplete="off"
                          suppressHydrationWarning
                          value={popoverH}
                          onChange={(e) => setPopoverH(e.target.value)}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                    </div>

                    <Button size="sm" className="w-full text-xs" onClick={() => alert(`Saved ${popoverW}x${popoverH}`)}>
                      Save Settings
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
                <div className="font-semibold text-foreground">Accessibility Specifications:</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Trigger exposes <code className="font-mono text-[11px]">aria-haspopup=&quot;dialog&quot;</code> and <code className="font-mono text-[11px]">aria-expanded</code>.</li>
                  <li>Dismissible via click outside or pressing the <code className="font-mono text-[11px]">Escape</code> key.</li>
                  <li>Focus is restored cleanly to the trigger button upon closing.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 31 · CONTEXT MENU */}
        {activeTab === "context-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Context Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Pointer-positioned right-click context menu with keyboard shortcuts, submenus, and boundary checks.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ContextMenu>\n  <ContextMenuTrigger className="p-8 border border-dashed">\n    Right-click here\n  </ContextMenuTrigger>\n  <ContextMenuContent>\n    <ContextMenuItem shortcut="⌘D">Duplicate</ContextMenuItem>\n  </ContextMenuContent>\n</ContextMenu>`,
                    "ContextMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Interactive Target</span>
                <span>Action: <strong className="text-foreground">{contextAction || "None"}</strong></span>
              </div>

              <ContextMenu>
                <ContextMenuTrigger className="p-12 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 cursor-context-menu text-center bg-muted/10 hover:border-teal-500 transition-colors">
                  <MousePointer className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                  <div className="text-xs font-bold text-foreground">
                    Right-click inside this container
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    Menu spawns dynamically at cursor coordinates with boundary safety.
                  </p>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-52">
                  <ContextMenuItem
                    shortcut="⌘D"
                    icon={<Copy className="h-3.5 w-3.5" />}
                    onClick={() => setContextAction("Duplicated Component")}
                  >
                    Duplicate
                  </ContextMenuItem>
                  <ContextMenuItem
                    shortcut="⌘C"
                    icon={<Layers className="h-3.5 w-3.5" />}
                    onClick={() => setContextAction("Copied Tokens")}
                  >
                    Copy Tokens
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem
                    shortcut="⌫"
                    icon={<Trash2 className="h-3.5 w-3.5" />}
                    onClick={() => setContextAction("Deleted Item")}
                    className="text-rose-500"
                  >
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </div>
        )}

        {/* 32 · HOVER CARD */}
        {activeTab === "hover-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Hover Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Supplementary preview popover with enter/leave delay throttling and keyboard focus support.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<HoverCard openDelay={200}>\n  <HoverCardTrigger asChild>\n    <a href="#">@ada_lovelace</a>\n  </HoverCardTrigger>\n  <HoverCardContent>\n    <p>Lead Systems Architect</p>\n  </HoverCardContent>\n</HoverCard>`,
                    "HoverCard"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-8 max-w-2xl mx-auto flex items-center justify-center text-xs">
              <div className="leading-relaxed text-muted-foreground">
                Maintained with care by{" "}
                <HoverCard openDelay={150} closeDelay={150}>
                  <HoverCardTrigger asChild>
                    <span className="font-bold underline text-teal-600 dark:text-teal-400 cursor-pointer">
                      @ada_lovelace
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center shrink-0">
                        AL
                      </div>
                      <div className="space-y-0.5 min-w-0 flex-1">
                        <h5 className="font-bold text-xs text-foreground">Ada Lovelace</h5>
                        <div className="text-[11px] font-mono text-muted-foreground">@ada_lovelace</div>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          Pioneer of computational algorithms &amp; UI token architectures.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-muted-foreground pt-2 border-t border-border">
                      <div><strong className="text-foreground">65</strong> Components</div>
                      <div><strong className="text-foreground">25</strong> Styles</div>
                      <div><strong className="text-foreground">100%</strong> Accessible</div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
                {" "}across 25 authentic design styles.
              </div>
            </div>
          </div>
        )}

        {/* 33 · DRAWER / SHEET */}
        {activeTab === "drawer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Drawer / Sheet</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sliding modal panel anchored to any viewport edge (left, right, top, bottom) with focus trap.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Drawer open={isOpen} onOpenChange={setIsOpen}>\n  <DrawerTrigger asChild>\n    <Button>Open Sheet</Button>\n  </DrawerTrigger>\n  <DrawerContent side="right">\n    <DrawerHeader>\n      <DrawerTitle>Settings</DrawerTitle>\n    </DrawerHeader>\n  </DrawerContent>\n</Drawer>`,
                    "Drawer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-8 max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
              <p className="text-xs text-muted-foreground">
                Triggers an animated edge sheet with backdrop blur and focus locking.
              </p>

              <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <PanelRight className="h-4 w-4" />
                    <span>Open Side Sheet</span>
                  </Button>
                </DrawerTrigger>

                <DrawerContent side="right">
                  <DrawerHeader>
                    <DrawerTitle>Workspace Configuration</DrawerTitle>
                    <DrawerDescription>
                      Configure your component repository and continuous integration deployment hooks.
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="space-y-4 py-4 text-xs">
                    <div className="space-y-1.5">
                      <Label htmlFor="doc-target-framework">Target Framework</Label>
                      <input
                        id="doc-target-framework"
                        name="targetFramework"
                        aria-label="Target Framework"
                        type="text"
                        autoComplete="off"
                        suppressHydrationWarning
                        defaultValue="Next.js 16 (Turbopack)"
                        className="w-full px-3 py-2 border rounded-md text-xs bg-muted/20"
                        readOnly
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="doc-output-directory">Output Directory</Label>
                      <input
                        id="doc-output-directory"
                        name="outputDirectory"
                        aria-label="Output Directory"
                        type="text"
                        autoComplete="off"
                        suppressHydrationWarning
                        defaultValue="src/components/ui"
                        className="w-full px-3 py-2 border rounded-md text-xs font-mono bg-muted/20"
                        readOnly
                      />
                    </div>
                  </div>

                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </DrawerClose>
                    <Button size="sm" onClick={() => setDrawerOpen(false)}>Save Settings</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        )}

        {/* 34 · COMMAND PALETTE */}
        {activeTab === "command-palette" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Command Palette</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Quick launcher modal with category filtering, command descriptions, and keyboard navigation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CommandPalette\n  open={isOpen}\n  onOpenChange={setIsOpen}\n  groups={[\n    {\n      category: "Navigation",\n      items: [{ id: "c1", label: "Components", shortcut: "G C" }],\n    },\n  ]}\n/>`,
                    "CommandPalette"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-8 max-w-2xl mx-auto flex flex-col items-center justify-center gap-4 text-center">
              <Button onClick={() => setPaletteOpen(true)} className="flex items-center gap-2 h-10 px-6">
                <Search className="h-4 w-4" />
                <span>Search Commands...</span>
                <kbd className="ml-2 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </Button>

              {paletteAction && (
                <div className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1.5 animate-in fade-in-0">
                  <Check className="h-3.5 w-3.5" />
                  <span>Selected: {paletteAction}</span>
                </div>
              )}

              <CommandPalette
                open={paletteOpen}
                onOpenChange={setPaletteOpen}
                groups={[
                  {
                    category: "Navigation",
                    items: [
                      {
                        id: "pal-comp",
                        label: "Browse Components",
                        description: "Open the 55 components catalog",
                        shortcut: "G C",
                        icon: <Layers className="h-4 w-4" />,
                        onSelect: () => setPaletteAction("Opened Components Catalog"),
                      },
                      {
                        id: "pal-styles",
                        label: "Explore Design Styles",
                        description: "Switch between 25 curated aesthetics",
                        shortcut: "G S",
                        icon: <LayoutGrid className="h-4 w-4" />,
                        onSelect: () => setPaletteAction("Opened Styles Explorer"),
                      },
                    ],
                  },
                  {
                    category: "Actions",
                    items: [
                      {
                        id: "pal-copy",
                        label: "Copy React Import",
                        description: "Quickly copy import statement to clipboard",
                        shortcut: "⌘C",
                        icon: <Copy className="h-4 w-4" />,
                        onSelect: () => setPaletteAction("Copied React Import"),
                      },
                      {
                        id: "pal-dark",
                        label: "Toggle Color Scheme",
                        description: "Switch between light and dark preview modes",
                        shortcut: "⌘T",
                        icon: <Sparkles className="h-4 w-4" />,
                        onSelect: () => setPaletteAction("Toggled Theme"),
                      },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 35 · DATE PICKER */}
        {activeTab === "date-picker" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Date Picker</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive date selection input with calendar popup, today jump, and formatting.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DatePicker\n  value={selectedDate}\n  onValueChange={setSelectedDate}\n  placeholder="Choose a date..."\n/>`,
                    "DatePicker"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Selected Date: <strong className="text-foreground">{formatDate(showcaseDate) || "None"}</strong></span>
                {showcaseDate && (
                  <Button size="sm" variant="ghost" onClick={() => setShowcaseDate(undefined)} className="h-6 text-xs">
                    Reset
                  </Button>
                )}
              </div>

              <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center">
                <div className="w-full max-w-xs space-y-1.5">
                  <Label>Scheduled Delivery</Label>
                  <DatePicker
                    value={showcaseDate}
                    onValueChange={setShowcaseDate}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 36 · TIME PICKER */}
        {activeTab === "time-picker" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Time Picker</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configurable time input with hours, minutes, AM/PM stepper, and quick selection presets.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TimePicker\n  value={time}\n  onValueChange={setTime}\n  format="12h"\n  minuteStep={15}\n/>`,
                    "TimePicker"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Selected Time: <strong className="text-foreground">{showcaseTime}</strong></span>
              </div>

              <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center">
                <div className="w-full max-w-xs space-y-1.5">
                  <Label>Meeting Time</Label>
                  <TimePicker
                    value={showcaseTime}
                    onValueChange={setShowcaseTime}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 37 · CALENDAR */}
        {activeTab === "calendar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Calendar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Monthly grid calendar with day states, month navigation, and accessible date labels.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Calendar\n  value={selectedDate}\n  onValueChange={setSelectedDate}\n/>`,
                    "Calendar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Picked: <strong className="text-foreground">{formatDate(showcaseCalDate)}</strong></span>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card flex justify-center">
                <Calendar
                  value={showcaseCalDate}
                  onValueChange={setShowcaseCalDate}
                />
              </div>
            </div>
          </div>
        )}

        {/* 38 · MEGA MENU */}
        {activeTab === "mega-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Mega Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Enterprise-grade multi-column navigation menu with categorized columns and featured banners.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MegaMenu\n  label="Products"\n  columns={[\n    {\n      heading: "Core",\n      items: [{ title: "UI Components", href: "/components" }],\n    },\n  ]}\n  featured={{\n    title: "Version 3.0",\n    description: "All 55 components live",\n    ctaText: "Explore",\n    href: "/explore",\n  }}\n/>`,
                    "MegaMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">CHAMELEON UI</span>
                <MegaMenu
                  label="Explore Directory"
                  columns={[
                    {
                      heading: "Component Batches",
                      items: [
                        { title: "Inputs & Forms", description: "Form fields, switches, steppers", href: "#" },
                        { title: "Feedback & Dialogs", description: "Modals, alerts, drawers", href: "#" },
                        { title: "Navigation Systems", description: "Breadcrumbs, pagination, menus", href: "#" },
                      ],
                    },
                    {
                      heading: "Design Systems",
                      items: [
                        { title: "Japandi", description: "Warm minimalism & quiet balance", href: "#" },
                        { title: "Glassmorphism", description: "Translucent frosted depth", href: "#" },
                        { title: "Brutalist", description: "Bold borders and raw contrast", href: "#" },
                      ],
                    },
                  ]}
                  featured={{
                    title: "Zero Dependencies",
                    description: "Built strictly on semantic HTML and Tailwind CSS.",
                    ctaText: "All 25 Styles",
                    href: "/explore",
                    tag: "PRO",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 39 · FLOATING ACTION BUTTON */}
        {activeTab === "floating-action-button" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Floating Action Button (FAB)</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Corner-docked primary action trigger with extended labels and expandable speed-dial actions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FloatingActionButton\n  label="Create"\n  position="bottom-right"\n  actions={[\n    { id: "share", label: "Share", icon: <Share2 />, onClick: () => {} },\n  ]}\n/>`,
                    "FloatingActionButton"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span>Speed Dial Demonstration</span>
                <span>Action: <strong className="text-foreground">{fabAction || "None"}</strong></span>
              </div>

              <div className="relative border border-border rounded-xl p-8 bg-card h-56 flex flex-col justify-between overflow-hidden shadow-inner">
                <div>
                  <h5 className="font-bold text-xs text-foreground">Canvas Area</h5>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Click the action button below to trigger the speed dial overlay.
                  </p>
                </div>

                <div className="self-end">
                  <FloatingActionButton
                    position="inline"
                    label="Quick Actions"
                    actions={[
                      { id: "edit", label: "Edit Layer", icon: <Sliders className="h-4 w-4" />, onClick: () => setFabAction("Edit Layer") },
                      { id: "share", label: "Share Spec", icon: <Share2 className="h-4 w-4" />, onClick: () => setFabAction("Share Spec") },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 40 · TABLE */}
        {activeTab === "table" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Table</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic tabular layout with headers, hover row states, alignments, and footer calculations.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Table>\n  <TableHeader>\n    <TableRow>\n      <TableHead>Invoice</TableHead>\n      <TableHead>Status</TableHead>\n      <TableHead align="right">Amount</TableHead>\n    </TableRow>\n  </TableHeader>\n  <TableBody>\n    <TableRow>\n      <TableCell>INV-001</TableCell>\n      <TableCell>Paid</TableCell>\n      <TableCell align="right">$1,250</TableCell>\n    </TableRow>\n  </TableBody>\n</Table>`,
                    "Table"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Invoices &amp; Billings</span>
                <span>Selected: <strong className="text-foreground">{tableSelect}</strong></span>
              </div>

              <div className="rounded-lg border border-border overflow-hidden bg-card shadow-xs">
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
                    {[
                      { id: "INV-101", client: "Acme Logistics", date: "Sep 28, 2026", status: "Paid", amount: "$1,450.00" },
                      { id: "INV-102", client: "Vanguard Studio", date: "Sep 25, 2026", status: "Pending", amount: "$2,890.50" },
                      { id: "INV-103", client: "Hyperion Labs", date: "Sep 21, 2026", status: "Paid", amount: "$840.00" },
                      { id: "INV-104", client: "Solis Dynamics", date: "Sep 14, 2026", status: "Overdue", amount: "$3,120.00" },
                    ].map((inv) => (
                      <TableRow
                        key={inv.id}
                        isSelected={tableSelect === inv.id}
                        onClick={() => setTableSelect(inv.id)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-mono font-bold">{inv.id}</TableCell>
                        <TableCell className="font-medium">{inv.client}</TableCell>
                        <TableCell className="text-muted-foreground">{inv.date}</TableCell>
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
                        <TableCell align="right" className="font-mono font-semibold">{inv.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className="font-semibold">Total Outstanding</TableCell>
                      <TableCell align="right" className="font-mono font-bold">$8,300.50</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        )}

        {/* 41 · DATA TABLE */}
        {activeTab === "data-table" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Data Table</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Full-featured client table with real-time text filtering, multi-column sorting, selection, and pagination.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DataTable\n  data={data}\n  columns={[\n    { id: "name", header: "Name", accessorKey: "name", sortable: true },\n    { id: "role", header: "Role", accessorKey: "role", sortable: true },\n  ]}\n  searchable\n  selectable\n  pageSize={5}\n/>`,
                    "DataTable"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Interactive Directory</span>
                <span>Selected: <strong className="text-foreground">{dataTableIds.length}</strong> row(s)</span>
              </div>

              <DataTable
                data={[
                  { id: "usr-1", name: "Elena Rostova", role: "Principal Architect", team: "Core Platform", status: "Active" },
                  { id: "usr-2", name: "Marcus Vance", role: "Systems Engineer", team: "Infrastructure", status: "Active" },
                  { id: "usr-3", name: "Sarah Chen", role: "Product Designer", team: "Design Systems", status: "Away" },
                  { id: "usr-4", name: "Lucas Duarte", role: "Frontend Lead", team: "Web Client", status: "Active" },
                  { id: "usr-5", name: "Aria Thorne", role: "Security Engineer", team: "SecOps", status: "Offline" },
                  { id: "usr-6", name: "Devon Miller", role: "QA Engineer", team: "Verification", status: "Active" },
                ]}
                columns={[
                  { id: "name", header: "Member", accessorKey: "name", sortable: true },
                  { id: "role", header: "Role", accessorKey: "role", sortable: true },
                  { id: "team", header: "Team", accessorKey: "team", sortable: true },
                  {
                    id: "status",
                    header: "Status",
                    accessorKey: "status",
                    sortable: true,
                    cell: (item: any) => (
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
                        item.status === "Active" ? "bg-emerald-500/15 text-emerald-600" : "bg-muted text-muted-foreground"
                      )}>
                        {item.status}
                      </span>
                    ),
                  },
                ]}
                selectable
                selectedIds={dataTableIds}
                onSelectionChange={setDataTableIds}
                pageSize={4}
              />
            </div>
          </div>
        )}

        {/* 42 · LIST */}
        {activeTab === "list" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Bordered and divided item list with leading avatars, descriptive subtext, and status chips.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<List variant="bordered">\n  <ListHeader>Recent Activity</ListHeader>\n  <ListItem\n    interactive\n    title="Elena Rostova"\n    description="Merged branch main"\n    trailing="5m ago"\n  />\n</List>`,
                    "List"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Interactive Items List</span>
                <span>Active: <strong className="text-foreground">{listSelect}</strong></span>
              </div>

              <div className="rounded-lg border border-border overflow-hidden bg-card">
                <ListHeader action={<span className="text-[10px] font-mono">LIVE FEED</span>}>
                  Deployment Events
                </ListHeader>
                <List variant="divided">
                  {[
                    { id: "item-1", init: "ER", title: "Elena Rostova pushed commit 8f3b92a", desc: "Production release v2.4.0 verified across all clusters.", time: "5m ago", tag: "Release" },
                    { id: "item-2", init: "MV", title: "Marcus Vance merged branch feat/tokens", desc: "Updated design system primitives and responsive token registry.", time: "22m ago", tag: "PR #348" },
                    { id: "item-3", init: "SC", title: "Sarah Chen commented on issue #412", desc: "Requested higher contrast ratio for dark-mode toggle components.", time: "1h ago", tag: "Review" },
                  ].map((it) => (
                    <ListItem
                      key={it.id}
                      interactive
                      selected={listSelect === it.id}
                      onClick={() => setListSelect(it.id)}
                      leading={
                        <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                          {it.init}
                        </div>
                      }
                      title={<span className="text-xs font-semibold">{it.title}</span>}
                      description={<span className="text-[11px] text-muted-foreground">{it.desc}</span>}
                      trailing={
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[10px] font-mono text-muted-foreground">{it.time}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted border border-border/50">{it.tag}</span>
                        </div>
                      }
                    />
                  ))}
                </List>
              </div>
            </div>
          </div>
        )}

        {/* 43 · TIMELINE */}
        {activeTab === "timeline" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Timeline</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chronological event pipeline with completed, active, and upcoming step indicators.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Timeline>\n  <TimelineItem status="completed" title="Build Succeeded" timestamp="14:02 UTC" />\n  <TimelineItem status="current" title="Canary Deploy" timestamp="Running" />\n  <TimelineItem status="upcoming" title="Cache Invalidation" isLast />\n</Timeline>`,
                    "Timeline"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Release Pipeline</span>
                <button
                  type="button"
                  onClick={() => setTimelineStep((s) => (s >= 3 ? 0 : s + 1))}
                  className="px-2.5 py-1 text-xs rounded border border-border bg-card hover:bg-muted font-medium transition-colors"
                >
                  Advance Step ({timelineStep + 1}/4)
                </button>
              </div>

              <div className="rounded-lg border border-border p-5 bg-card">
                <Timeline>
                  {[
                    { title: "Source Build", desc: "Compiled Next.js application artifacts with 0 errors.", time: "14:02 UTC" },
                    { title: "Automated Test Suite", desc: "Ran 48 unit and integration tests successfully.", time: "14:05 UTC" },
                    { title: "Canary Deployment", desc: "Routing 10% live traffic to canary pod instances.", time: "14:08 UTC" },
                    { title: "Global CDN Edge Propagation", desc: "Invalidate edge cache across 32 geographic points of presence.", time: "Pending" },
                  ].map((st, i) => (
                    <TimelineItem
                      key={i}
                      status={i < timelineStep ? "completed" : i === timelineStep ? "current" : "upcoming"}
                      title={st.title}
                      description={st.desc}
                      timestamp={st.time}
                      isLast={i === 3}
                    />
                  ))}
                </Timeline>
              </div>
            </div>
          </div>
        )}

        {/* 44 · STAT / METRIC CARD */}
        {activeTab === "stat-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Stat / Metric Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  KPI telemetry card displaying metric values, directional trend pills, and subtext context.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<StatCard\n  label="Total Revenue"\n  value="$84,250"\n  trend={{ value: "+14.2%", direction: "up" }}\n  description="vs previous month"\n/>`,
                    "StatCard"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Dashboard Metrics Grid</span>
                <span>Live Refresh</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatCard
                  label="Total Revenue"
                  value="$84,250"
                  icon={<DollarSign className="h-4 w-4" />}
                  trend={{ value: "+14.2%", direction: "up" }}
                  description="+$10.4k vs previous mo."
                />
                <StatCard
                  label="Active Users"
                  value="14,890"
                  icon={<Users className="h-4 w-4" />}
                  trend={{ value: "+8.6%", direction: "up" }}
                  description="In 52 geographic regions"
                />
                <StatCard
                  label="Avg Latency"
                  value="42ms"
                  icon={<Server className="h-4 w-4" />}
                  trend={{ value: "-4.1%", direction: "down" }}
                  description="P99 response time"
                />
              </div>
            </div>
          </div>
        )}

        {/* 45 · RATING */}
        {activeTab === "rating" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Rating</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible star scoring component with fractional precision, hover preview, and keyboard control.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Rating\n  value={score}\n  onChange={setScore}\n  size="lg"\n  showValue\n/>`,
                    "Rating"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-5 text-center">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Interactive Feedback Rating</span>
                {ratingFeedback && (
                  <span className="text-emerald-600 font-semibold animate-in fade-in-0">
                    {ratingFeedback}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-foreground">How would you rate this component release?</h4>
                <p className="text-xs text-muted-foreground">Click a star or use keyboard arrow keys.</p>
              </div>

              <div className="flex justify-center py-2">
                <Rating
                  value={ratingVal}
                  onChange={(val) => {
                    setRatingVal(val)
                    setRatingFeedback(`Rated ${val} out of 5 stars!`)
                    setTimeout(() => setRatingFeedback(null), 2500)
                  }}
                  size="lg"
                  showValue
                />
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Read-only Benchmark:</span>
                <div className="flex items-center gap-1.5">
                  <Rating value={4.8} precision={0.5} readOnly size="sm" />
                  <span className="font-mono font-bold text-xs">4.8 (1,420 reviews)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 46 · CHIP */}
        {activeTab === "chip" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chip</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive tags and filter pills with selectable states, custom avatars, and dismissible remove buttons.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Chip selected={isSelected} onClick={toggle}>Design Systems</Chip>\n<Chip variant="outline" removable onRemove={handleRemove}>Next.js</Chip>`,
                    "Chip"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Filter Chips &amp; Tag Cloud</span>
                {chipTags.length < 4 && (
                  <button
                    type="button"
                    onClick={() => setChipTags(["TypeScript", "TailwindCSS", "Next.js", "Radix Primitives"])}
                    className="text-primary hover:underline font-semibold"
                  >
                    Reset tags
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">Selectable Category Filter:</div>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "frontend", "backend", "cloud"].map((f) => (
                    <Chip
                      key={f}
                      selected={chipSelected === f}
                      onClick={() => setChipSelected(f)}
                    >
                      {f.toUpperCase()}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-border">
                <div className="text-xs font-semibold text-muted-foreground">Dismissible Tags:</div>
                <div className="flex flex-wrap gap-1.5">
                  {chipTags.map((tag) => (
                    <Chip
                      key={tag}
                      variant="outline"
                      removable
                      onRemove={() => setChipTags((prev) => prev.filter((t) => t !== tag))}
                    >
                      {tag}
                    </Chip>
                  ))}
                  {chipTags.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">No tags remaining. Click reset above.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 47 · DESCRIPTION LIST */}
        {activeTab === "description-list" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Description List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic term-definition pairs with responsive horizontal, vertical, and grid alignments.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DescriptionList layout="horizontal">\n  <DescriptionItem>\n    <DescriptionTerm>Cluster</DescriptionTerm>\n    <DescriptionDetails>us-east-prod</DescriptionDetails>\n  </DescriptionItem>\n</DescriptionList>`,
                    "DescriptionList"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Cluster Configuration</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setDlLayout("horizontal")}
                    className={cn("px-2 py-0.5 rounded text-xs", dlLayout === "horizontal" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted")}
                  >
                    Horizontal
                  </button>
                  <button
                    type="button"
                    onClick={() => setDlLayout("grid")}
                    className={cn("px-2 py-0.5 rounded text-xs", dlLayout === "grid" ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted")}
                  >
                    Grid
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-border p-5 bg-card">
                <DescriptionList layout={dlLayout} columns={2}>
                  <DescriptionItem layout={dlLayout === "grid" ? "vertical" : "horizontal"}>
                    <DescriptionTerm>Cluster Name</DescriptionTerm>
                    <DescriptionDetails className="font-mono font-semibold">us-east-prod-04</DescriptionDetails>
                  </DescriptionItem>
                  <DescriptionItem layout={dlLayout === "grid" ? "vertical" : "horizontal"}>
                    <DescriptionTerm>Runtime Engine</DescriptionTerm>
                    <DescriptionDetails>Node.js v20.12 (Turbopack)</DescriptionDetails>
                  </DescriptionItem>
                  <DescriptionItem layout={dlLayout === "grid" ? "vertical" : "horizontal"}>
                    <DescriptionTerm>Security Status</DescriptionTerm>
                    <DescriptionDetails className="text-emerald-600 font-semibold">
                      Zero Vulnerabilities
                    </DescriptionDetails>
                  </DescriptionItem>
                  <DescriptionItem layout={dlLayout === "grid" ? "vertical" : "horizontal"}>
                    <DescriptionTerm>Public IP Range</DescriptionTerm>
                    <DescriptionDetails className="font-mono text-xs">198.51.100.0/24</DescriptionDetails>
                  </DescriptionItem>
                </DescriptionList>
              </div>
            </div>
          </div>
        )}

        {/* 48 · KEY-VALUE LIST */}
        {activeTab === "key-value-list" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Key-Value List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Metadata and diagnostics list featuring monospace formatting and instant one-click clipboard copying.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<KeyValueList\n  items={[\n    { key: "API Endpoint", value: "https://api.hub.dev", mono: true, copyable: true },\n  ]}\n/>`,
                    "KeyValueList"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>API Credentials &amp; Variables</span>
                <span>Click 📋 to copy</span>
              </div>

              <KeyValueList
                items={[
                  { key: "Project ID", value: "prj_hub_9042a8b", mono: true, copyable: true, copyText: "prj_hub_9042a8b" },
                  { key: "API Endpoint", value: "https://api.hub.dev/v2/stream", mono: true, copyable: true, copyText: "https://api.hub.dev/v2/stream" },
                  { key: "Environment Key", value: "sk_live_9f02••••••••••3b", mono: true, copyable: true, copyText: "sk_live_9f02b1c4e9083b" },
                  {
                    key: "Access Tier",
                    value: "Enterprise Dedicated",
                    badge: <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Verified</span>,
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 49 · DATA GRID */}
        {activeTab === "data-grid" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Data Grid</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Spreadsheet-style 2D matrix featuring roving tabindex, active cell outline, and full directional keyboard arrow navigation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DataGrid\n  data={matrix}\n  columns={[\n    { id: "region", header: "Region", accessorKey: "region" },\n    { id: "q1", header: "Q1", accessorKey: "q1", align: "right" },\n  ]}\n  caption="Financial Performance Matrix"\n/>`,
                    "DataGrid"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Roving Tabindex Keyboard Matrix</span>
                <span>Active: <strong className="text-foreground">Row {gridFocusCell.r + 1}, Col {gridFocusCell.c + 1} ({gridFocusCell.v})</strong></span>
              </div>

              <DataGrid
                data={[
                  { region: "North America", q1: "$124,500", q2: "$138,200", q3: "$149,000", q4: "$162,400" },
                  { region: "Europe / EMEA", q1: "$89,200", q2: "$94,100", q3: "$102,600", q4: "$114,000" },
                  { region: "Asia Pacific", q1: "$68,400", q2: "$78,900", q3: "$91,500", q4: "$106,200" },
                  { region: "Latin America", q1: "$32,100", q2: "$36,400", q3: "$41,000", q4: "$48,900" },
                ]}
                columns={[
                  { id: "region", header: "Region", accessorKey: "region", width: "160px" },
                  { id: "q1", header: "Q1", accessorKey: "q1", align: "right" },
                  { id: "q2", header: "Q2", accessorKey: "q2", align: "right" },
                  { id: "q3", header: "Q3", accessorKey: "q3", align: "right" },
                  { id: "q4", header: "Q4", accessorKey: "q4", align: "right" },
                ]}
                onCellClick={(r, c, item: any) => {
                  const keys = ["region", "q1", "q2", "q3", "q4"]
                  setGridFocusCell({ r, c, v: String(item[keys[c]] ?? "") })
                }}
              />
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === "faq" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">FAQ Section</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Frequently Asked Questions accordion with live category filtering, instant search, accessible disclosures, and support banner.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Faq\n  items={[\n    {\n      id: "faq-1",\n      question: "How do I install the design system tokens?",\n      answer: "Run npm i @style-tokens/core or copy individual style tokens into your Tailwind configuration.",\n      category: "Getting Started",\n    },\n    {\n      id: "faq-2",\n      question: "Can I customize the color palette?",\n      answer: "Yes, all 25 design styles use CSS variables and Tailwind classes that can be extended.",\n      category: "Customization",\n    },\n  ]}\n  title="Frequently Asked Questions"\n  subtitle="Find answers to common questions about our design systems and components."\n  searchable\n  variant="separated"\n/>`,
                    "FAQ Section"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-card/40 p-6 md:p-8">
              <Faq
                items={[
                  {
                    id: "showcase-faq-1",
                    question: "How do I install components from the design system?",
                    answer: "You can copy the component files directly into your project or install the package via your favorite package manager.",
                    category: "Getting Started",
                  },
                  {
                    id: "showcase-faq-2",
                    question: "Can I use multiple design styles simultaneously?",
                    answer: "Yes. Each style provides scoped tokens, classes, and palettes allowing micro-frontends or page-level theme switching.",
                    category: "Getting Started",
                  },
                  {
                    id: "showcase-faq-3",
                    question: "Is keyboard accessibility supported?",
                    answer: "Every interactive element includes full WAI-ARIA accordion attributes, keyboard enter/space triggers, and focus ring outlines.",
                    category: "Accessibility",
                  },
                  {
                    id: "showcase-faq-4",
                    question: "How do I override themes and tokens?",
                    answer: "Pass custom className overrides, or adjust CSS variables defined in your tailwind.config or global style sheet.",
                    category: "Customization",
                  },
                  {
                    id: "showcase-faq-5",
                    question: "Does it support server-side rendering with Next.js?",
                    answer: "Yes, all interactive components are fully compatible with Next.js App Router and Server Components.",
                    category: "Frameworks",
                  },
                ]}
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about the component catalog, styles, and integration."
                searchable
                variant="separated"
                supportCta={{
                  text: "Can't find what you're looking for?",
                  actionText: "Contact Support",
                  href: "mailto:support@chameleon-ui.design",
                }}
              />
            </div>
          </div>
        )}

        {/* 50 · COLLAPSIBLE */}
        {activeTab === "collapsible" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Collapsible</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive disclosure panel with smooth height transition and accessible aria-expanded attributes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Collapsible open={isOpen} onOpenChange={setIsOpen}>\n  <CollapsibleTrigger asChild>\n    <Button variant="ghost">Toggle Details</Button>\n  </CollapsibleTrigger>\n  <CollapsibleContent>\n    <p>Expanded metrics and cluster details.</p>\n  </CollapsibleContent>\n</Collapsible>`,
                    "Collapsible"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Disclosure Component</span>
                <span>State: <strong className="text-foreground">{collapsibleOpen ? "Expanded" : "Collapsed"}</strong></span>
              </div>

              <Collapsible
                open={collapsibleOpen}
                onOpenChange={setCollapsibleOpen}
                className="rounded-lg border border-border bg-card overflow-hidden shadow-xs"
              >
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-foreground">Cluster Telemetry &amp; Logs</h4>
                    <p className="text-[11px] text-muted-foreground">Click chevron to toggle resource details.</p>
                  </div>
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className="p-1.5 rounded border border-border hover:bg-muted transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          collapsibleOpen && "rotate-180"
                        )}
                      />
                      <span className="sr-only">Toggle cluster telemetry</span>
                    </button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-2 border-t border-border text-xs space-y-2 bg-muted/20">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Cache Hit Ratio</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">99.4%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Node Workers</span>
                      <span className="font-mono font-bold text-foreground">64 nodes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Response Latency</span>
                      <span className="font-mono font-bold text-foreground">28ms</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}

        {/* 51 · DIVIDER / SEPARATOR */}
        {activeTab === "divider" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Divider / Separator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visual division component supporting horizontal, vertical, labeled, and decorative modes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Divider label="OR CONTINUE WITH" />\n<div className="flex items-center gap-3">\n  <span>Left</span>\n  <Divider orientation="vertical" className="h-4" />\n  <span>Right</span>\n</div>`,
                    "Divider"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">Horizontal with Centered Label:</div>
                <Divider label="Deployment Stages" spacing="sm" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">Vertical Inline Toolbar Separator:</div>
                <div className="flex items-center gap-3 text-xs p-2.5 rounded-lg border border-border bg-card">
                  <span className="font-semibold text-foreground">Overview</span>
                  <Divider orientation="vertical" spacing="none" className="h-4" />
                  <span className="text-muted-foreground">Analytics</span>
                  <Divider orientation="vertical" spacing="none" className="h-4" />
                  <span className="text-muted-foreground">Settings</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-muted-foreground">Subtle Decorative Separator:</div>
                <Divider spacing="sm" decorative />
                <p className="text-[11px] text-muted-foreground">
                  Decorative separators maintain semantic presentation without creating accessibility noise for screen readers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 52 · CONTAINER */}
        {activeTab === "container" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Container</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive centered layout wrapper providing max-width constraints and horizontal padding presets.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Container size="${containerSize}">\n  <h3>Bound Viewport Box</h3>\n  <p>Standardized responsive padding across viewports.</p>\n</Container>`,
                    "Container"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Container Width Presets</span>
                <div className="flex items-center gap-1.5">
                  {(["sm", "md", "lg", "xl"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setContainerSize(s)}
                      className={cn(
                        "px-2 py-0.5 rounded text-xs transition-colors",
                        containerSize === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-dashed border-border p-4 rounded-xl bg-muted/10">
                <Container size={containerSize} className="border border-border rounded-lg p-6 bg-card shadow-sm transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-foreground">Centered Container Box</h4>
                      <p className="text-xs text-muted-foreground">Target size: {containerSize.toUpperCase()}</p>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                      mx-auto
                    </span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    Containers enforce standard responsive horizontal padding across mobile (16px), tablet (24px), and desktop (32px).
                  </p>
                </Container>
              </div>
            </div>
          </div>
        )}

        {/* 53 · GRID */}
        {activeTab === "grid" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Grid</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  CSS Grid layout primitive with responsive column configurations, gap tokens, and auto-fit support.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Grid cols={{ default: 1, sm: 2, md: 3 }} gap="md">\n  <GridItem>Tile 1</GridItem>\n  <GridItem>Tile 2</GridItem>\n  <GridItem>Tile 3</GridItem>\n</Grid>`,
                    "Grid"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Column Count</span>
                <div className="flex items-center gap-1.5">
                  {[2, 3, 4].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setGridColsCount(c)}
                      className={cn(
                        "px-2.5 py-0.5 text-xs rounded border transition-colors",
                        gridColsCount === c ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {c} Cols
                    </button>
                  ))}
                </div>
              </div>

              <Grid cols={gridColsCount as any} gap="sm" className="w-full">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <GridItem
                    key={idx}
                    className="p-4 border border-border rounded-lg bg-card shadow-xs flex flex-col justify-between gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold text-muted-foreground">0{idx + 1}</span>
                      <LayoutGrid className="h-3.5 w-3.5 text-muted-foreground/60" />
                    </div>
                    <div className="text-xs font-semibold text-foreground">Matrix Tile {idx + 1}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">Auto Gap &middot; Aligned</div>
                  </GridItem>
                ))}
              </Grid>
            </div>
          </div>
        )}

        {/* 54 · STACK */}
        {activeTab === "stack" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Stack</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Linear Flexbox layout primitive supporting horizontal, vertical, gap tokens, and optional dividers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Stack direction="horizontal" gap="md" align="center" divider={<span>•</span>}>\n  <div>Step 1</div>\n  <div>Step 2</div>\n  <div>Step 3</div>\n</Stack>`,
                    "Stack"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Layout Direction</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStackDirection((d) => (d === "horizontal" ? "vertical" : "horizontal"))}
                    className="px-2.5 py-1 rounded border border-border bg-card text-xs hover:bg-muted font-medium transition-colors"
                  >
                    Direction: {stackDirection === "horizontal" ? "Row" : "Column"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStackWithDivider(!stackWithDivider)}
                    className={cn(
                      "px-2.5 py-1 rounded border text-xs transition-colors",
                      stackWithDivider ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                    )}
                  >
                    Divider: {stackWithDivider ? "ON" : "OFF"}
                  </button>
                </div>
              </div>

              <div className="p-5 border border-border rounded-lg bg-card">
                <Stack
                  direction={stackDirection}
                  gap="sm"
                  align="center"
                  divider={stackWithDivider ? <span className="text-muted-foreground/50 font-mono text-xs">•</span> : undefined}
                  className="w-full"
                >
                  <div className="p-3 border border-border rounded-md bg-muted/20 flex-1 text-xs min-w-0">
                    <span className="font-bold text-foreground block truncate">Step 1: Ingest</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Stream event payload</span>
                  </div>
                  <div className="p-3 border border-border rounded-md bg-muted/20 flex-1 text-xs min-w-0">
                    <span className="font-bold text-foreground block truncate">Step 2: Transform</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Normalize token keys</span>
                  </div>
                  <div className="p-3 border border-border rounded-md bg-muted/20 flex-1 text-xs min-w-0">
                    <span className="font-bold text-foreground block truncate">Step 3: Publish</span>
                    <span className="text-[11px] text-muted-foreground block truncate">Broadcast to edge</span>
                  </div>
                </Stack>
              </div>
            </div>
          </div>
        )}

        {/* 55 · SPLIT PANE */}
        {activeTab === "split-pane" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Split Pane</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Two-panel layout with draggable separator, keyboard resizing, pointer capture, and min/max limits.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SplitPane\n  direction="horizontal"\n  initialSize={50}\n  primaryPanel={<div>Editor</div>}\n  secondaryPanel={<div>Preview</div>}\n/>`,
                    "SplitPane"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Draggable Splitter</span>
                <span className="font-mono">
                  Primary: {Math.round(splitPanePos)}% | Secondary: {100 - Math.round(splitPanePos)}%
                </span>
              </div>

              <SplitPane
                direction="horizontal"
                initialSize={50}
                onSizeChange={setSplitPanePos}
                className="h-64 shadow-xs"
                primaryPanel={
                  <div className="p-4 h-full flex flex-col justify-between text-xs space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <Terminal className="h-3.5 w-3.5 text-teal-600" />
                        <span>Source Markdown</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                        Drag the central handle or use arrow keys when focused to adjust pane widths.
                      </p>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground bg-muted/40 p-2 rounded">
                      width: {Math.round(splitPanePos)}%
                    </div>
                  </div>
                }
                secondaryPanel={
                  <div className="p-4 h-full flex flex-col justify-between text-xs bg-muted/10 space-y-2">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        <span>Live HTML Preview</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                        Automatic min-size constraints (20%) prevent panels from collapsing out of view.
                      </p>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground bg-muted/40 p-2 rounded">
                      width: {100 - Math.round(splitPanePos)}%
                    </div>
                  </div>
                }
              />
            </div>
          </div>
        )}

        {/* 56 · ASPECT RATIO */}
        {activeTab === "aspect-ratio" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Aspect Ratio</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Container maintaining strict visual proportions across viewport widths with native CSS aspect-ratio.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AspectRatio ratio="${aspectRatioChoice}">\n  <img src="/photo.jpg" alt="Preview" className="w-full h-full object-cover" />\n</AspectRatio>`,
                    "AspectRatio"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Select Ratio Preset</span>
                <div className="flex items-center gap-1.5">
                  {(["16:9", "4:3", "1:1", "21:9"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAspectRatioChoice(r)}
                      className={cn(
                        "px-2 py-0.5 text-xs rounded border transition-colors",
                        aspectRatioChoice === r ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-border/80 p-4 rounded-xl bg-muted/10">
                <AspectRatio ratio={aspectRatioChoice} className="border border-border rounded-lg bg-card shadow-inner">
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center space-y-1">
                    <span className="font-mono text-sm font-bold text-foreground">{aspectRatioChoice}</span>
                    <span className="text-xs text-muted-foreground">Native CSS aspect-ratio</span>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        )}

        {/* 57 · SCROLL AREA */}
        {activeTab === "scroll-area" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Scroll Area</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Keyboard-accessible scrollable region featuring custom thin scrollbars and directional overflow constraints.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ScrollArea maxHeight={180}>\n  <div>Long content logs...</div>\n</ScrollArea>`,
                    "ScrollArea"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Terminal Log Stream</span>
                <span className="font-mono">max-height: 180px</span>
              </div>

              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between text-xs font-semibold">
                  <span>Server Execution Logs</span>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">● LIVE</span>
                </div>
                <ScrollArea maxHeight={180} className="p-4 space-y-2">
                  {[
                    { time: "21:30:01", msg: "Initialized Turbopack compilation daemon." },
                    { time: "21:30:04", msg: "Verified 25 design style kits and tokens." },
                    { time: "21:30:08", msg: "Mounted responsive Container & Grid system." },
                    { time: "21:30:12", msg: "Registered PointerCapture on SplitPane handle." },
                    { time: "21:30:15", msg: "Synthesized CSS aspect-ratio constraints." },
                    { time: "21:30:19", msg: "Initialized keyboard roving focus on ScrollArea." },
                    { time: "21:30:24", msg: "Resolved hydration tree with 0 nesting errors." },
                    { time: "21:30:28", msg: "Production cluster ready for edge distribution." },
                  ].map((log, i) => (
                    <div key={i} className="flex items-baseline gap-2 font-mono text-xs">
                      <span className="text-muted-foreground/60 select-none text-[11px]">{log.time}</span>
                      <span className="text-foreground">{log.msg}</span>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </div>
        )}

        {/* 58 · RESIZABLE PANEL */}
        {activeTab === "resizable-panel" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Resizable Panel</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-panel group with drag handles, touch event support, minimum/maximum constraints, and keyboard controls.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ResizablePanelGroup direction="horizontal">\n  <ResizablePanel defaultSize={35}>Nav</ResizablePanel>\n  <ResizableHandle withHandle />\n  <ResizablePanel defaultSize={65}>Content</ResizablePanel>\n</ResizablePanelGroup>`,
                    "ResizablePanel"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Multi-Panel Resizing</span>
                <span>Drag handle or focus &amp; use arrow keys</span>
              </div>

              <ResizablePanelGroup
                direction="horizontal"
                className="h-64 shadow-xs"
              >
                <ResizablePanel defaultSize={35} minSize={20} maxSize={50} className="p-4 border-r border-border/40">
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-foreground">Navigation Tree</h5>
                    <p className="text-[11px] text-muted-foreground">Components suite &amp; styles.</p>
                  </div>
                  <div className="mt-4 space-y-1 text-xs">
                    <div className="p-1 rounded bg-muted/60 font-mono text-[11px]">📁 src/components</div>
                    <div className="p-1 pl-4 text-muted-foreground text-[11px]">📄 layout.tsx</div>
                    <div className="p-1 pl-4 text-muted-foreground text-[11px]">📄 container.tsx</div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={65} minSize={50} maxSize={80} className="p-4 bg-muted/10">
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-foreground">Document Surface</h5>
                    <p className="text-[11px] text-muted-foreground">Active working buffer area with dynamic sizing.</p>
                  </div>
                  <div className="mt-4 p-3 border border-border rounded bg-card font-mono text-xs text-muted-foreground">
                    // ResizablePanel automatically synchronizes sibling sizes.
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        )}

        {/* 59 · MASONRY */}
        {activeTab === "masonry" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Masonry</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive multi-column waterfall layout placing variable-height cards with zero vertical gaps.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Masonry cols={{ default: 1, sm: 2, md: 3 }} gap="md">\n  <div className="h-32">Card 1</div>\n  <div className="h-48">Card 2</div>\n  <div className="h-24">Card 3</div>\n</Masonry>`,
                    "Masonry"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Waterfall Card Wall</span>
                <span>Columns: 1 (mobile) &rarr; 2 (tablet) &rarr; 3 (desktop)</span>
              </div>

              <Masonry cols={{ default: 1, sm: 2, md: 3 }} gap="sm" className="w-full">
                {[
                  {
                    num: "01",
                    tag: "SYSTEM",
                    title: "Design Principles",
                    desc: "Establishing strict typography hierarchies and token constraints across all visual surfaces.",
                    minHeight: "min-h-[120px]",
                    badge: "CORE",
                  },
                  {
                    num: "02",
                    tag: "TOKENS",
                    title: "Responsive Breakpoints",
                    desc: "Coordinating multi-device fluid tokens across mobile, tablet, laptop, and ultra-wide monitor screens with synchronized clamp functions.",
                    minHeight: "min-h-[165px]",
                    badge: "FLUID",
                  },
                  {
                    num: "03",
                    tag: "A11Y",
                    title: "Color Contrast",
                    desc: "WCAG 2.2 AAA ratings verified with high-contrast luminance ratios.",
                    minHeight: "min-h-[105px]",
                    badge: "7.1:1",
                  },
                  {
                    num: "04",
                    tag: "MOTION",
                    title: "Spring Physics Engine",
                    desc: "Interactive kinetic curves and cubic-bezier transition rates tuned for tactile user interactions and natural dampening.",
                    minHeight: "min-h-[155px]",
                    badge: "60 FPS",
                  },
                  {
                    num: "05",
                    tag: "PERF",
                    title: "Zero Cumulative Layout Shift",
                    desc: "Aspect-ratio placeholders prevent reflows during lazy asset mounting.",
                    minHeight: "min-h-[120px]",
                    badge: "0.00 CLS",
                  },
                  {
                    num: "06",
                    tag: "WATERFALL",
                    title: "Staggered Flow Architecture",
                    desc: "Dynamic multi-column tracks distribute elements horizontally so the natural reading order flows left-to-right across the top row before descending.",
                    minHeight: "min-h-[175px]",
                    badge: "STREAM",
                  },
                  {
                    num: "07",
                    tag: "EDGE",
                    title: "Sub-Millisecond Hydration",
                    desc: "Optimized server bundle with zero redundant DOM nesting or hydration drift.",
                    minHeight: "min-h-[110px]",
                    badge: "99.9%",
                  },
                ].map((item) => (
                  <div
                    key={item.num}
                    className={cn(
                      "p-4 border border-border rounded-lg bg-card shadow-xs flex flex-col justify-between transition-all",
                      item.minHeight
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-mono text-muted-foreground">ENTRY {item.num}</span>
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {item.tag}
                        </span>
                      </div>
                      <h5 className="text-xs font-bold mt-0.5 text-foreground">{item.title}</h5>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/40 pt-2 mt-3 text-[9px] font-mono text-muted-foreground">
                      <span>{item.badge}</span>
                      <span>VERIFIED</span>
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
          </div>
        )}

        {/* 60 · SPINNER */}
        {activeTab === "spinner" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Spinner / Loader</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Indeterminate SVG spinner with configurable sizes, semantic role="status", and reduced-motion handling.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Spinner size="${spinnerSizeChoice}" variant="primary" label="Loading data..." showLabel />`,
                    "Spinner"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Size Variants</span>
                <div className="flex gap-1">
                  {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpinnerSizeChoice(s)}
                      className={cn(
                        "px-2 py-0.5 rounded text-xs transition-colors",
                        spinnerSizeChoice === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-border bg-muted/10 space-y-3">
                <Spinner size={spinnerSizeChoice} variant="primary" />
                <span className="text-xs font-mono text-muted-foreground">
                  Active size: {spinnerSizeChoice}
                </span>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-card flex items-center justify-between">
                <Spinner size="sm" label="Synchronizing database records..." showLabel />
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                  POLLING
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 61 · LOADING BUTTON */}
        {activeTab === "loading-button" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Loading Button</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Async action trigger that disables duplicate submissions, preserves dimensions, and renders inline spinners.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LoadingButton\n  loading={${btnLoading}}\n  loadingText="Deploying Microservice..."\n  onClick={handleDeploy}\n>\n  Deploy Cluster Node\n</LoadingButton>`,
                    "LoadingButton"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Interactive Submission State</span>
                <span>Click to trigger async lock</span>
              </div>

              <LoadingButton
                loading={btnLoading}
                loadingText="Deploying Microservice..."
                disabled={isDisabled}
                onClick={() => {
                  setBtnLoading(true);
                  setBtnSuccess(false);
                  setTimeout(() => {
                    setBtnLoading(false);
                    setBtnSuccess(true);
                    setTimeout(() => setBtnSuccess(false), 3000);
                  }, 2000);
                }}
                className="w-full"
              >
                {btnSuccess ? (
                  <>
                    <Check className="h-4 w-4 mr-1 text-emerald-300" />
                    Deployed Successfully!
                  </>
                ) : (
                  "Deploy Cluster Node"
                )}
              </LoadingButton>

              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span>State: <strong className="text-foreground">{btnLoading ? "Processing (Locked)" : btnSuccess ? "Succeeded" : "Idle"}</strong></span>
                <button
                  type="button"
                  onClick={() => {
                    setBtnLoading(false);
                    setBtnSuccess(false);
                  }}
                  className="hover:underline text-[11px]"
                >
                  Reset State
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 62 · STATUS INDICATOR */}
        {activeTab === "status-indicator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Status Indicator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Semantic dot badge featuring animated ping ripples, accessible text descriptors, and color-independent states.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<StatusIndicator status="${statusVal}" label="System Operational" pulse showLabel />`,
                    "StatusIndicator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Active Status Filter</span>
                <span className="font-mono uppercase">{statusVal}</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["online", "active", "pending", "warning", "error", "offline"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusVal(s)}
                    className={cn(
                      "p-2 rounded-lg border text-xs capitalize transition-colors flex items-center justify-center",
                      statusVal === s ? "border-primary bg-primary/10 font-bold" : "hover:bg-muted"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-border bg-card flex items-center justify-between">
                <StatusIndicator status={statusVal} size="lg" />
                <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
                  role="status"
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 63 · STEP PROGRESS */}
        {activeTab === "step-progress" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Step Progress</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-phase workflow visualizer with completed checkmarks, current step rings, and connecting progress line.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<StepProgress\n  steps={[\n    { id: 1, label: "Account", description: "Identity" },\n    { id: 2, label: "Capacity", description: "Node count" },\n    { id: 3, label: "Review", description: "Confirm" },\n  ]}\n  currentStep={${stepIdx}}\n/>`,
                    "StepProgress"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Phase Progress Matrix</span>
                <span>Step {stepIdx + 1} of 3</span>
              </div>

              <StepProgress
                steps={[
                  { id: 1, label: "Identity", description: "Account keys" },
                  { id: 2, label: "Cluster Spec", description: "Workers & RAM" },
                  { id: 3, label: "Deployment", description: "Launch" },
                ]}
                currentStep={stepIdx}
                onStepClick={(i) => setStepIdx(i)}
              />

              <div className="flex items-center justify-between pt-3 border-t text-xs">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={stepIdx === 0}
                  onClick={() => setStepIdx((p) => Math.max(0, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  size="sm"
                  disabled={stepIdx === 2}
                  onClick={() => setStepIdx((p) => Math.min(2, p + 1))}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 64 · CIRCULAR PROGRESS */}
        {activeTab === "circular-progress" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Circular Progress</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Radial SVG progress meter supporting determinate percentages, indeterminate rotation, and custom centers.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CircularProgress\n  value={${circIndeterminate ? "undefined" : circVal}}\n  size="lg"\n  showValue\n  variant="default"\n/>`,
                    "CircularProgress"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Radial Metric Display</span>
                <label htmlFor="doc-circ-indeterminate" className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    id="doc-circ-indeterminate"
                    name="circIndeterminate"
                    aria-label="Toggle Indeterminate state"
                    type="checkbox"
                    suppressHydrationWarning
                    checked={circIndeterminate}
                    onChange={(e) => setCircIndeterminate(e.target.checked)}
                    className="rounded text-xs"
                  />
                  Indeterminate
                </label>
              </div>

              <div className="flex items-center justify-around gap-4 py-4">
                <div className="flex flex-col items-center gap-2">
                  <CircularProgress
                    value={circIndeterminate ? undefined : circVal}
                    size="md"
                    showValue
                    variant="default"
                  />
                  <span className="text-[11px] text-muted-foreground">Default</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CircularProgress
                    value={circIndeterminate ? undefined : circVal}
                    size="md"
                    showValue
                    variant="success"
                  />
                  <span className="text-[11px] text-muted-foreground">Success</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <CircularProgress
                    value={circIndeterminate ? undefined : circVal}
                    size="lg"
                    showValue
                    variant="default"
                  />
                  <span className="text-[11px] text-muted-foreground">Large</span>
                </div>
              </div>

              {!circIndeterminate && (
                <div className="space-y-1.5 border-t border-border pt-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <label htmlFor="doc-circ-progress-slider">Adjust Percentage:</label>
                    <span className="font-mono font-bold text-foreground">{circVal}%</span>
                  </div>
                  <input
                    id="doc-circ-progress-slider"
                    name="circProgressSlider"
                    aria-label="Adjust circular progress percentage"
                    type="range"
                    suppressHydrationWarning
                    min={0}
                    max={100}
                    value={circVal}
                    onChange={(e) => setCircVal(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 65 · SHIMMER */}
        {activeTab === "shimmer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Shimmer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Content-preserving loading placeholder with smooth gradient sweep animation to prevent cumulative layout shifts.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<div className="space-y-3">\n  <Shimmer variant="avatar" className="h-10 w-10" />\n  <Shimmer variant="text" height={16} width="80%" />\n  <Shimmer variant="block" height={90} />\n</div>`,
                    "Shimmer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Card Mockup Placeholder</span>
                <span>CLS: 0.00</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-4 shadow-xs">
                <div className="flex items-center gap-3">
                  <Shimmer variant="avatar" className="h-10 w-10" />
                  <div className="space-y-1.5 flex-1">
                    <Shimmer variant="text" height={14} width="70%" />
                    <Shimmer variant="text" height={10} width="40%" />
                  </div>
                </div>
                <Shimmer variant="block" height={80} className="w-full" />
                <div className="flex gap-2">
                  <Shimmer variant="block" height={22} width={64} rounded="sm" />
                  <Shimmer variant="block" height={22} width={64} rounded="sm" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 66 · CONNECTION STATUS */}
        {activeTab === "connection-status" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Connection Status</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real-time transport monitor supporting connected, connecting, disconnected, and offline states with latency readouts.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ConnectionStatus\n  status="${connState}"\n  latency={${connState === "connected" ? '"18ms"' : "undefined"}}\n  onRetry={() => {}}\n  variant="card"\n/>`,
                    "ConnectionStatus"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Select Simulated State</span>
                <div className="flex gap-1">
                  {(["connected", "reconnecting", "offline"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setConnState(s)}
                      className={cn(
                        "px-2 py-0.5 rounded text-xs capitalize transition-colors",
                        connState === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <ConnectionStatus
                status={connState}
                latency={connState === "connected" ? "18ms" : undefined}
                onRetry={() => setConnState("connected")}
                variant="card"
              />
            </div>
          </div>
        )}

        {/* 67 · SKELETON TEXT */}
        {activeTab === "skeleton-text" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Skeleton Text</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-line typography placeholders with natural last-line width shortening and typography-matching line heights.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<div className="space-y-4">\n  <SkeletonText lines={1} variant="heading" widths={["80%"]} />\n  <SkeletonText lines={3} variant="paragraph" lastLineWidth="55%" />\n</div>`,
                    "SkeletonText"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-md mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Typography Skeleton Presets</span>
                <span>Proportional Height</span>
              </div>

              <div className="p-4 rounded-xl border border-border bg-card space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Title Line</span>
                  <SkeletonText lines={1} variant="heading" widths={["82%"]} />
                </div>
                <div className="space-y-2 pt-2 border-t border-border">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">Article Paragraph</span>
                  <SkeletonText lines={3} variant="paragraph" lastLineWidth="58%" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 68 · LOADING BAR */}
        {activeTab === "loading-bar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Loading Bar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Horizontal progress bar supporting determinate percentages, sliding indeterminate beams, and label readouts.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LoadingBar\n  value={${loadingBarIndet ? "undefined" : loadingBarValue}}\n  label="Database Migration"\n  showValue\n  size="md"\n  variant="default"\n/>`,
                    "LoadingBar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Track Visual Variants</span>
                <label htmlFor="doc-loading-bar-indet" className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    id="doc-loading-bar-indet"
                    name="loadingBarIndet"
                    aria-label="Toggle indeterminate loading bar"
                    type="checkbox"
                    suppressHydrationWarning
                    checked={loadingBarIndet}
                    onChange={(e) => setLoadingBarIndet(e.target.checked)}
                    className="rounded text-xs"
                  />
                  Indeterminate
                </label>
              </div>

              <div className="space-y-4">
                <LoadingBar
                  value={loadingBarIndet ? undefined : loadingBarValue}
                  label="Asset Bundle Compression"
                  showValue
                  size="md"
                  variant="default"
                />
                <LoadingBar
                  value={loadingBarIndet ? undefined : loadingBarValue}
                  label="Memory Cache Optimization"
                  showValue
                  size="sm"
                  variant="success"
                />
                <LoadingBar
                  value={loadingBarIndet ? undefined : loadingBarValue}
                  label="Telemetry Stream Transcoding"
                  showValue
                  size="lg"
                  variant="gradient"
                />
              </div>

              {!loadingBarIndet && (
                <div className="space-y-1 pt-2 border-t border-border">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <label htmlFor="doc-loading-bar-progress">Progress:</label>
                    <span className="font-mono font-bold text-foreground">{loadingBarValue}%</span>
                  </div>
                  <input
                    id="doc-loading-bar-progress"
                    name="loadingBarProgress"
                    aria-label="Adjust loading bar progress"
                    type="range"
                    suppressHydrationWarning
                    min={0}
                    max={100}
                    value={loadingBarValue}
                    onChange={(e) => setLoadingBarValue(Number(e.target.value))}
                    className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 69 · PROCESSING INDICATOR */}
        {activeTab === "processing-indicator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Processing Indicator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Async background state manager handling idle, active, completed, and error states with progress bar and retry buttons.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ProcessingIndicator\n  status="${procStatus}"\n  title="Optimizing media assets..."\n  description="48 of 64 files processed."\n  progress={${procStatus === "processing" ? "75" : "undefined"}}\n  onRetry={() => {}}\n  onCancel={() => {}}\n  variant="card"\n/>`,
                    "ProcessingIndicator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="rounded-xl border border-border bg-background p-6 max-w-lg mx-auto space-y-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Task State Switcher</span>
                <div className="flex gap-1">
                  {(["idle", "processing", "success", "error"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setProcStatus(s)}
                      className={cn(
                        "px-2 py-0.5 rounded text-xs capitalize transition-colors",
                        procStatus === s ? "bg-primary text-primary-foreground font-semibold" : "hover:bg-muted"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <ProcessingIndicator
                status={procStatus}
                title={
                  procStatus === "processing"
                    ? "Syncing Cloud Storage"
                    : procStatus === "success"
                    ? "Data Synchronized"
                    : procStatus === "error"
                    ? "Transfer Interrupted"
                    : "Worker Ready"
                }
                description="Secure automated backup archive transfer in progress."
                progress={procStatus === "processing" ? 75 : undefined}
                onRetry={() => setProcStatus("processing")}
                onCancel={() => setProcStatus("idle")}
                variant="card"
              />
            </div>
          </div>
        )}

        
        {/* MEDIA & CONTENT TABS */}
        {activeTab === "image" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Image</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive image wrapper with loading and error states.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-sm h-64">
                <Image src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80" alt="Gradient" className="w-full h-full rounded-lg" fallbackText="Image failed to load" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "image-gallery" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Image Gallery</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive grid layout for images.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <ImageGallery columns={3}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <ImageGalleryItem key={i}>
                      <Image src={`https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80&sig=${i}`} alt={`Gallery ${i}`} />
                    </ImageGalleryItem>
                  ))}
                </ImageGallery>
              </div>
            </div>
          </div>
        )}

        {activeTab === "carousel" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Carousel</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Horizontal scrolling carousel with CSS scroll snap.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <Carousel>
                  {[1, 2, 3, 4].map((i) => (
                    <CarouselItem key={i}>
                      <Image src={`https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80&sig=${i}`} alt={`Slide ${i}`} className="aspect-video rounded-xl" />
                    </CarouselItem>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        )}

        {activeTab === "video-player" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Video Player</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Responsive wrapper for HTML5 video with native controls.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <VideoPlayer src="https://www.w3schools.com/html/mov_bbb.mp4" className="w-full aspect-video rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "audio-player" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Audio Player</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Styled wrapper for HTML5 audio playback.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-md">
                <AudioPlayer src="https://www.w3schools.com/html/horse.ogg" className="w-full rounded-xl" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "lightbox" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Lightbox</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modal overlay for viewing media in fullscreen.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-64 h-64">
                <Lightbox alt="A beautiful landscape">
                  <Image src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80" alt="Landscape" className="rounded-lg object-cover w-full h-full" />
                </Lightbox>
              </div>
            </div>
          </div>
        )}

        {activeTab === "media-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Media Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Specialized card for highlighting media content.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-sm">
                <MediaCard>
                  <MediaCardImage>
                    <Image src="https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80" alt="Photography" className="aspect-video" />
                  </MediaCardImage>
                  <MediaCardContent>
                    <h3 className="font-semibold text-lg">Creative Photography</h3>
                    <p className="text-muted-foreground text-sm mt-2">Explore the art of capturing moments with precision and creativity.</p>
                  </MediaCardContent>
                </MediaCard>
              </div>
            </div>
          </div>
        )}

        {activeTab === "code-block" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Code Block</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Syntax highlighting wrapper with copy to clipboard.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl">
                <CodeBlock language="typescript" code={`function greet(name: string) {\n  console.log(\`Hello, \${name}!\`);\n}`} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "markdown-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Markdown Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Safe markdown renderer for basic formatting.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-2xl bg-muted/20 p-6 rounded-md">
                <MarkdownPreview content={`# Welcome to Markdown\n\nThis is a **bold** statement and this is *italic*.\n\n- Item 1\n- Item 2\n\n> A blockquote goes here.\n\n\`\`\`javascript\nconst test = true;\nconsole.log(test);\n\`\`\``} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "file-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">File Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Component to display file metadata with download action.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card flex justify-center">
              <div className="w-full max-w-md space-y-4">
                <FilePreview fileName="annual-report.pdf" fileSize="2.4 MB" fileType="document" onDownload={() => alert('Downloading...')} />
                <FilePreview fileName="presentation.key" fileSize="14.1 MB" fileType="unknown" />
                <FilePreview fileName="vacation.jpg" fileSize="4.2 MB" fileType="image" />
              </div>
            </div>
          </div>
        )}

        {/* BATCH 9 ADVANCED / UTILITY TABS */}
        {activeTab === "search-bar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Search Bar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Search input featuring clear actions, active query debouncing, and autocomplete suggestion dropdown.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SearchBar\n  value={query}\n  onChange={setQuery}\n  onSearch={(q) => console.log(q)}\n  suggestions={[\n    { id: "1", label: "React Components", category: "Framework" },\n    { id: "2", label: "Tailwind CSS", category: "Styling" }\n  ]}\n  placeholder="Search components..."\n/>`,
                    "SearchBar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card max-w-lg mx-auto space-y-4">
              <SearchBar
                value={demoSearchQuery}
                onChange={setDemoSearchQuery}
                onSearch={(q) => setDemoSearchSubmitted(q)}
                suggestions={[
                  { id: "1", label: "React 19 Hooks", category: "React", description: "useActionState, useOptimistic" },
                  { id: "2", label: "Tailwind CSS v4", category: "CSS", description: "Modern theme tokens" },
                  { id: "3", label: "TypeScript Generics", category: "Language", description: "Strict type safety" },
                  { id: "4", label: "Next.js Turbopack", category: "Build", description: "High performance compilation" },
                ]}
                placeholder="Search documentation, components..."
                label="Search Documentation"
              />
              {demoSearchSubmitted && (
                <div className="text-xs text-muted-foreground font-mono bg-muted/40 p-2.5 rounded-lg border border-border">
                  Searched for: <span className="font-bold text-foreground">"{demoSearchSubmitted}"</span>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "filter" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Filter</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Modular filter toolbar supporting radios, multi-select checkboxes, keywords, and numeric ranges.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Filter\n  filters={[\n    { id: "status", label: "Status", type: "radio", options: [{ label: "Active", value: "active" }] }\n  ]}\n  values={filterState}\n  onChange={setFilterState}\n/>`,
                    "Filter"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <Filter
                filters={[
                  {
                    id: "status",
                    label: "Status",
                    type: "radio",
                    options: [
                      { label: "Active", value: "active" },
                      { label: "Archived", value: "archived" },
                    ],
                  },
                  {
                    id: "framework",
                    label: "Framework",
                    type: "multi-select",
                    options: [
                      { label: "React", value: "react", count: 24 },
                      { label: "Vue", value: "vue", count: 12 },
                      { label: "Svelte", value: "svelte", count: 8 },
                    ],
                  },
                  {
                    id: "rating",
                    label: "Min Rating",
                    type: "range",
                    min: 0,
                    max: 100,
                    step: 5,
                  },
                ]}
                values={demoFilterValues}
                onChange={setDemoFilterValues}
              />
              <div className="text-xs font-mono text-muted-foreground bg-muted/40 p-2.5 rounded-lg border border-border">
                Filter State: {JSON.stringify(demoFilterValues)}
              </div>
            </div>
          </div>
        )}

        {activeTab === "sort-menu" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Sort Menu</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Accessible dropdown selector for reordering records by directional criteria with indicator icons.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SortMenu\n  options={[\n    { id: "name-asc", label: "Name (A → Z)", direction: "asc" },\n    { id: "newest", label: "Newest First", direction: "desc" }\n  ]}\n  value={sort}\n  onChange={(opt) => setSort(opt.id)}\n/>`,
                    "SortMenu"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto flex flex-col items-center space-y-4">
              <SortMenu
                options={[
                  { id: "name-asc", label: "Name (A → Z)", direction: "asc" },
                  { id: "name-desc", label: "Name (Z → A)", direction: "desc" },
                  { id: "newest", label: "Newest First", direction: "desc" },
                  { id: "oldest", label: "Oldest First", direction: "asc" },
                  { id: "rating", label: "Highest Rated", direction: "desc" },
                ]}
                value={demoSortValue}
                onChange={(opt) => setDemoSortValue(opt.id)}
              />
              <span className="text-xs font-mono text-muted-foreground">
                Active Sort Option: <strong className="text-foreground">{demoSortValue}</strong>
              </span>
            </div>
          </div>
        )}

        {activeTab === "range-slider" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Range Slider</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Dual-handled continuous track for selecting bounded interval minimums and maximums without handle overlap.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<RangeSlider\n  min={0}\n  max={100}\n  step={1}\n  value={range}\n  onChange={setRange}\n  formatValue={(v) => \`$\${v}\`}\n/>`,
                    "RangeSlider"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <RangeSlider
                min={0}
                max={100}
                step={1}
                value={demoRangeSliderVal}
                onChange={setDemoRangeSliderVal}
                formatValue={(v) => `${v}`}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                <span>Lower: <strong className="font-mono text-foreground">${demoRangeSliderVal[0]}</strong></span>
                <span>Upper: <strong className="font-mono text-foreground">${demoRangeSliderVal[1]}</strong></span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "slider" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Slider</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Single-point slider track with touch and mouse dragging, keyboard stepper increments, and scale marks.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Slider\n  min={0}\n  max={100}\n  step={1}\n  value={val}\n  onChange={setVal}\n  formatValue={(v) => \`\${v}%\`}\n/>`,
                    "Slider"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <Slider
                min={0}
                max={100}
                step={5}
                value={demoSliderVal}
                onChange={setDemoSliderVal}
                formatValue={(v) => `${v}%`}
                marks={[
                  { value: 0, label: "0%" },
                  { value: 50, label: "50%" },
                  { value: 100, label: "100%" },
                ]}
              />
              <div className="text-center text-xs text-muted-foreground">
                Current Level: <strong className="font-mono text-foreground">{demoSliderVal}%</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "color-picker" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Color Picker</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Hex-validated color selection interface with preset swatches, native color wheel integration, and live preview.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ColorPicker\n  value={color}\n  onChange={setColor}\n  label="Theme Accent"\n/>`,
                    "ColorPicker"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto flex flex-col items-center space-y-4">
              <ColorPicker
                value={demoColorVal}
                onChange={setDemoColorVal}
                label="Accent Color"
              />
              <div
                className="w-full h-10 rounded-lg border shadow-inner transition-colors"
                style={{ backgroundColor: demoColorVal }}
              />
            </div>
          </div>
        )}

        {activeTab === "combobox" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Combobox</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Searchable select input with listbox semantics, keyboard navigation, clear triggers, and check indicators.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Combobox\n  options={[\n    { value: "nextjs", label: "Next.js" },\n    { value: "react", label: "React" }\n  ]}\n  value={selected}\n  onChange={setSelected}\n  placeholder="Select framework..."\n/>`,
                    "Combobox"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <Combobox
                options={[
                  { value: "react", label: "React 19", description: "Declarative component framework" },
                  { value: "nextjs", label: "Next.js (App Router)", description: "Hybrid fullstack framework" },
                  { value: "vue", label: "Vue.js", description: "The Progressive JavaScript Framework" },
                  { value: "svelte", label: "SvelteKit", description: "Compiler-driven web platform" },
                  { value: "astro", label: "Astro", description: "Content-first static architecture" },
                ]}
                value={demoComboboxVal}
                onChange={setDemoComboboxVal}
                placeholder="Choose a framework..."
              />
              <div className="text-xs text-muted-foreground font-mono">
                Selected Framework: <strong className="text-foreground">{demoComboboxVal}</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "multi-select" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Multi-Select</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Composite tag selector supporting multiple item choices, filter search, individual chip removal, and batch reset.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MultiSelect\n  options={[\n    { value: "react", label: "React" },\n    { value: "typescript", label: "TypeScript" }\n  ]}\n  value={selectedList}\n  onChange={setSelectedList}\n/>`,
                    "MultiSelect"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <MultiSelect
                options={[
                  { value: "react", label: "React" },
                  { value: "typescript", label: "TypeScript" },
                  { value: "tailwind", label: "Tailwind CSS" },
                  { value: "turbopack", label: "Turbopack" },
                  { value: "radix", label: "Radix UI" },
                  { value: "zustand", label: "Zustand" },
                ]}
                value={demoMultiSelectVal}
                onChange={setDemoMultiSelectVal}
                placeholder="Select skills..."
              />
              <div className="text-xs text-muted-foreground font-mono">
                Selected Count: <strong className="text-foreground">{demoMultiSelectVal.length} items</strong>
              </div>
            </div>
          </div>
        )}

        {activeTab === "otp-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">OTP / PIN Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Segmented security verification code input with auto-advance, backspace repositioning, paste splitting, and masking.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<OtpInput\n  length={6}\n  value={otp}\n  onChange={setOtp}\n  onComplete={(code) => console.log("Code complete:", code)}\n/>`,
                    "OtpInput"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>
            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto flex flex-col items-center space-y-5">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Two-Factor Authentication</span>
                <p className="text-xs text-muted-foreground">Enter the 6-digit code sent to your authenticator app</p>
              </div>

              <OtpInput
                length={6}
                value={demoOtpVal}
                onChange={setDemoOtpVal}
                onComplete={(code) => setDemoOtpCompleted(code)}
                success={!!demoOtpCompleted}
              />

              {demoOtpCompleted && (
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <Sparkles className="h-3.5 w-3.5" /> Authentication Successful
                </div>
              )}
            </div>
          </div>
        )}

        {/* 105 · COMMAND BUTTON GROUP */}
        {activeTab === "command-button-group" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Command Button Group</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Group related actions with primary/secondary distinction, keyboard shortcuts, and responsive orientation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CommandButtonGroup\n  items={[\n    { id: "save", label: "Save", shortcut: "⌘S", variant: "default" },\n    { id: "duplicate", label: "Duplicate", shortcut: "⌘D" },\n    { id: "export", label: "Export", shortcut: "⌥E" }\n  ]}\n/>`,
                    "CommandButtonGroup"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Interactive Command Actions</span>
                <span>Last Action: <strong className="text-primary font-mono">{demoCommandAction}</strong></span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">Attached (Horizontal)</span>
                  <div className="pt-1">
                    <CommandButtonGroup
                      size="default"
                      items={[
                        {
                          id: "save",
                          label: "Save Changes",
                          shortcut: "⌘S",
                          variant: "default",
                          onClick: () => setDemoCommandAction("Saved changes"),
                          disabled: isDisabled,
                        },
                        {
                          id: "duplicate",
                          label: "Duplicate",
                          shortcut: "⌘D",
                          variant: "outline",
                          onClick: () => setDemoCommandAction("Duplicated document"),
                          disabled: isDisabled,
                        },
                        {
                          id: "export",
                          label: "Export Code",
                          shortcut: "⌥E",
                          variant: "outline",
                          onClick: () => setDemoCommandAction("Exported code archive"),
                          disabled: isDisabled,
                        },
                        {
                          id: "delete",
                          label: "Trash",
                          shortcut: "⌫",
                          variant: "outline",
                          onClick: () => setDemoCommandAction("Moved item to trash"),
                          disabled: isDisabled,
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">Spaced / Unattached</span>
                  <div className="pt-1">
                    <CommandButtonGroup
                      attached={false}
                      size="sm"
                      items={[
                        {
                          id: "preview",
                          label: "Live Preview",
                          variant: "secondary",
                          onClick: () => setDemoCommandAction("Opened live preview"),
                          disabled: isDisabled,
                        },
                        {
                          id: "history",
                          label: "Version History",
                          shortcut: "⌘H",
                          variant: "outline",
                          onClick: () => setDemoCommandAction("Viewing version history"),
                          disabled: isDisabled,
                        },
                        {
                          id: "share",
                          label: "Share Link",
                          variant: "outline",
                          onClick: () => setDemoCommandAction("Copied shareable link"),
                          disabled: isDisabled,
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 106 · BUTTON GROUP */}
        {activeTab === "button-group" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Button Group</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Connected buttons with shared borders, seamless rounded corners, and focus elevation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ButtonGroup\n  items={[\n    { id: "grid", label: "Grid View" },\n    { id: "list", label: "List View" },\n    { id: "table", label: "Table View" }\n  ]}\n/>`,
                    "ButtonGroup"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Connected Layout Selectors</span>
                <span>Active Mode: <strong className="text-foreground capitalize">{demoButtonGroupView}</strong></span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">Shared Border Items</span>
                  <div className="pt-1">
                    <ButtonGroup
                      size="default"
                      items={[
                        {
                          id: "grid",
                          label: "Grid Layout",
                          active: demoButtonGroupView === "grid",
                          onClick: () => setDemoButtonGroupView("grid"),
                          disabled: isDisabled,
                        },
                        {
                          id: "list",
                          label: "List View",
                          active: demoButtonGroupView === "list",
                          onClick: () => setDemoButtonGroupView("list"),
                          disabled: isDisabled,
                        },
                        {
                          id: "board",
                          label: "Kanban Board",
                          active: demoButtonGroupView === "board",
                          onClick: () => setDemoButtonGroupView("board"),
                          disabled: isDisabled,
                        },
                        {
                          id: "split",
                          label: "Split Pane",
                          active: demoButtonGroupView === "split",
                          onClick: () => setDemoButtonGroupView("split"),
                          disabled: isDisabled,
                        },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">Vertical Connected Orientation</span>
                  <div className="pt-1 w-44">
                    <ButtonGroup
                      orientation="vertical"
                      size="sm"
                      items={[
                        { id: "top", label: "Top Section", disabled: isDisabled },
                        { id: "mid", label: "Middle Section", disabled: isDisabled },
                        { id: "bot", label: "Bottom Section", disabled: isDisabled },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 107 · SPLIT BUTTON */}
        {activeTab === "split-button" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Split Button</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Primary action paired with a connected dropdown menu for secondary context actions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SplitButton\n  label="Deploy Application"\n  onClick={() => deployLive()}\n  options={[\n    { id: "stage", label: "Deploy to Staging", shortcut: "⌘S" },\n    { id: "dry", label: "Dry Run Build" }\n  ]}\n/>`,
                    "SplitButton"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Interactive Dropdown Actions</span>
                <span>Status: <strong className="text-primary font-mono">{demoSplitStatus}</strong></span>
              </div>

              <div className="flex flex-wrap items-center gap-6 justify-center py-4">
                <SplitButton
                  label="Publish Release"
                  variant="default"
                  size="default"
                  disabled={isDisabled}
                  onClick={() => setDemoSplitStatus("Released to production")}
                  options={[
                    {
                      id: "prod",
                      label: "Deploy to Production",
                      description: "Run automated blue-green rollout",
                      shortcut: "⌘P",
                      onClick: () => setDemoSplitStatus("Production rollout initiated"),
                    },
                    {
                      id: "staging",
                      label: "Deploy to Staging",
                      description: "Immediate preview build",
                      shortcut: "⌘S",
                      onClick: () => setDemoSplitStatus("Staging deployment complete"),
                    },
                    {
                      id: "dry",
                      label: "Dry Run Build",
                      description: "Verify bundle without deploying",
                      onClick: () => setDemoSplitStatus("Dry run passed successfully"),
                    },
                    {
                      id: "rollback",
                      label: "Rollback Release",
                      description: "Revert to previous stable tag",
                      destructive: true,
                      onClick: () => setDemoSplitStatus("Rollback executed"),
                    },
                  ]}
                />

                <SplitButton
                  label="Merge Request"
                  variant="outline"
                  size="default"
                  disabled={isDisabled}
                  onClick={() => setDemoSplitStatus("Merged with default strategy")}
                  options={[
                    {
                      id: "squash",
                      label: "Squash and Merge",
                      onClick: () => setDemoSplitStatus("Squashed and merged"),
                    },
                    {
                      id: "rebase",
                      label: "Rebase and Merge",
                      onClick: () => setDemoSplitStatus("Rebased and merged"),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        )}

        {/* 108 · SEGMENTED CONTROL */}
        {activeTab === "segmented-control" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Segmented Control</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive multi-option mode switcher with active pill indicator and full keyboard roving navigation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SegmentedControl\n  value={timeframe}\n  onValueChange={setTimeframe}\n  options={[\n    { value: "day", label: "Day" },\n    { value: "week", label: "Week" },\n    { value: "month", label: "Month" }\n  ]}\n/>`,
                    "SegmentedControl"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Mode Switcher (Roving Keyboard Nav)</span>
                <span>Active: <strong className="text-foreground capitalize">{demoSegmentedVal}</strong></span>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-muted-foreground">Standard with Badges</span>
                  <div className="pt-1">
                    <SegmentedControl
                      value={demoSegmentedVal}
                      onValueChange={setDemoSegmentedVal}
                      disabled={isDisabled}
                      options={[
                        { value: "day", label: "Day" },
                        { value: "week", label: "Week", badge: "Live" },
                        { value: "month", label: "Month" },
                        { value: "quarter", label: "Quarter" },
                        { value: "year", label: "Year" },
                      ]}
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-muted-foreground">Full Width Variant</span>
                  <div className="pt-1">
                    <SegmentedControl
                      fullWidth
                      value={demoSegmentedVal}
                      onValueChange={setDemoSegmentedVal}
                      disabled={isDisabled}
                      options={[
                        { value: "day", label: "24h Interval" },
                        { value: "week", label: "7d Rolling" },
                        { value: "month", label: "30d Window" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 109 · TOOLBAR */}
        {activeTab === "toolbar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Toolbar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compact responsive row of tools, toggle groups, and formatting buttons with overflow containment.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Toolbar>\n  <ToolbarToggleGroup type="multiple">\n    <ToolbarToggleItem value="bold">B</ToolbarToggleItem>\n    <ToolbarToggleItem value="italic">I</ToolbarToggleItem>\n  </ToolbarToggleGroup>\n  <ToolbarSeparator />\n  <ToolbarButton>Link</ToolbarButton>\n</Toolbar>`,
                    "Toolbar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Compact Action Row</span>
                <span>Active: <strong className="text-foreground">{demoToolbarFormats.join(", ") || "none"} ({demoToolbarAlign})</strong></span>
              </div>

              <div className="flex flex-col items-center gap-4 py-2">
                <Toolbar>
                  <ToolbarToggleGroup
                    type="multiple"
                    value={demoToolbarFormats}
                    onValueChange={setDemoToolbarFormats}
                  >
                    <ToolbarToggleItem value="bold" disabled={isDisabled}>
                      <span className="font-bold">B</span>
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="italic" disabled={isDisabled}>
                      <span className="italic">I</span>
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="underline" disabled={isDisabled}>
                      <span className="underline">U</span>
                    </ToolbarToggleItem>
                  </ToolbarToggleGroup>

                  <ToolbarSeparator />

                  <ToolbarToggleGroup
                    type="single"
                    value={demoToolbarAlign}
                    onValueChange={(val) => val && setDemoToolbarAlign(val)}
                  >
                    <ToolbarToggleItem value="left" disabled={isDisabled}>
                      L
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="center" disabled={isDisabled}>
                      C
                    </ToolbarToggleItem>
                    <ToolbarToggleItem value="right" disabled={isDisabled}>
                      R
                    </ToolbarToggleItem>
                  </ToolbarToggleGroup>

                  <ToolbarSeparator />

                  <ToolbarButton
                    iconOnly
                    disabled={isDisabled}
                    onClick={() => alert("Action triggered from Toolbar button")}
                  >
                    <Sparkles className="h-4 w-4 text-primary" />
                  </ToolbarButton>
                </Toolbar>
              </div>
            </div>
          </div>
        )}

        {/* 110 · FLOATING TOOLBAR */}
        {activeTab === "floating-toolbar" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Floating Toolbar</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Contextual actions that float near selected content with collision detection and keyboard escape.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FloatingToolbar\n  actions={[\n    { id: "bold", label: "Bold", onClick: () => formatBold() },\n    { id: "link", label: "Link", onClick: () => addLink() }\n  ]}\n/>`,
                    "FloatingToolbar"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Contextual Bubble Toolbar</span>
                <span>{demoFloatingSelection ? `Action: ${demoFloatingSelection}` : "Click or highlight text below"}</span>
              </div>

              <div className="space-y-3">
                <div
                  onClick={() => setDemoFloatingSelection("Simulated selection active")}
                  className="p-4 rounded-lg border border-border bg-muted/20 text-sm leading-relaxed cursor-pointer select-text hover:bg-muted/30 transition-colors"
                >
                  &ldquo;Simplicity is prerequisite for reliability. Complex state management should be contained behind intuitive, composable primitives.&rdquo;
                </div>
                <div className="flex items-center justify-center pt-2">
                  <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-popover p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => setDemoFloatingSelection("Bold formatting applied")}
                      className="px-2.5 py-1 text-xs font-semibold rounded hover:bg-muted text-foreground"
                    >
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoFloatingSelection("Italic formatting applied")}
                      className="px-2.5 py-1 text-xs italic rounded hover:bg-muted text-foreground"
                    >
                      Italic
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoFloatingSelection("Link prompt opened")}
                      className="px-2.5 py-1 text-xs underline rounded hover:bg-muted text-foreground"
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoFloatingSelection("AI Tone rewritten")}
                      className="px-2.5 py-1 text-xs font-medium rounded hover:bg-muted text-primary"
                    >
                      Rewrite ✨
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 111 · RICH TEXT EDITOR */}
        {activeTab === "rich-text-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Rich Text Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Feature-rich formatting editor supporting bold, lists, links, headings, blockquotes, and safe HTML sanitization.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<RichTextEditor\n  value={content}\n  onChange={setContent}\n  placeholder="Type formatted notes..."\n/>`,
                    "RichTextEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <RichTextEditor
                value={demoRichTextVal}
                onChange={setDemoRichTextVal}
                disabled={isDisabled}
                placeholder="Write rich formatted content here..."
                minHeight="140px"
              />

              <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-1">
                <span className="text-[11px] font-semibold text-muted-foreground uppercase">Sanitized HTML Output</span>
                <pre className="text-[11px] font-mono text-muted-foreground overflow-x-auto whitespace-pre-wrap">
                  {demoRichTextVal}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* 112 · MENTION INPUT */}
        {activeTab === "mention-input" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Mention Input</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Text input with trigger-based autocomplete popup for tagging users and team members.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MentionInput\n  value={text}\n  onChange={setText}\n  users={[\n    { id: "1", name: "Dhruv Kolhe", username: "dhruvmkolhe" }\n  ]}\n/>`,
                    "MentionInput"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground">Tag Team Members</span>
                <p className="text-xs text-muted-foreground">Type &lsquo;@&rsquo; followed by member name to open suggestions menu.</p>
              </div>

              <MentionInput
                value={demoMentionVal}
                onChange={setDemoMentionVal}
                disabled={isDisabled}
                rows={3}
              />

              <div className="text-xs text-muted-foreground font-mono">
                Current text length: <strong className="text-foreground">{demoMentionVal.length} chars</strong>
              </div>
            </div>
          </div>
        )}

        {/* 113 · EMOJI PICKER */}
        {activeTab === "emoji-picker" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Emoji Picker</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Searchable emoji picker with category tabs, recent history, and live preview.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<EmojiPicker\n  onSelect={(emoji) => handleInsertEmoji(emoji)}\n/>`,
                    "EmojiPicker"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto flex flex-col items-center space-y-5">
              <div className="text-center space-y-1">
                <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Emoji Palette</span>
                <p className="text-xs text-muted-foreground">Selected emoji: <span className="text-xl ml-1">{demoEmojiVal}</span></p>
              </div>

              <EmojiPicker
                onSelect={(emoji) => setDemoEmojiVal(emoji)}
              />
            </div>
          </div>
        )}

        {/* 114 · MENTION / TAG EDITOR */}
        {activeTab === "tag-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Mention / Tag Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Inline chip manager for adding, editing, validating, and removing tags and user mentions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TagEditor\n  value={tags}\n  onChange={setTags}\n  placeholder="Add tags..."\n/>`,
                    "TagEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-semibold text-foreground">Interactive Tags & Mentions</span>
                <p className="text-xs text-muted-foreground">
                  Press Enter or comma to create tags. Double click an existing tag to edit in-place.
                </p>
              </div>

              <TagEditor
                value={demoTagsVal}
                onChange={setDemoTagsVal}
                disabled={isDisabled}
                placeholder="Type tag or @mention and press Enter..."
              />

              <div className="text-xs text-muted-foreground font-mono">
                Total Tags: <strong className="text-foreground">{demoTagsVal.length}</strong> (Tags: {demoTagsVal.join(", ")})
              </div>
            </div>
          </div>
        )}

        {/* 115 · FILE UPLOAD DROPZONE */}
        {activeTab === "file-upload-dropzone" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">File Upload Dropzone</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Drag-and-drop file upload container with format validation, size guards, and file inspection.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FileUploadDropzone\n  accept={[".png", ".jpg", ".pdf"]}\n  maxSize={10 * 1024 * 1024}\n  onFilesAccepted={(files) => console.log(files)}\n/>`,
                    "FileUploadDropzone"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
                <span className="font-semibold text-foreground">Interactive Dropzone</span>
                <span>Accepted in Session: <strong className="text-primary font-mono">{demoDropzoneAccepted} files</strong></span>
              </div>

              <FileUploadDropzone
                accept={[".png", ".jpg", ".jpeg", ".pdf", ".zip", ".json"]}
                maxSize={10 * 1024 * 1024}
                maxFiles={4}
                disabled={isDisabled}
                onFilesAccepted={(files) => setDemoDropzoneAccepted(files.length)}
                helperText="Accepted formats: PNG, JPG, PDF, ZIP, JSON (max 10MB each)"
              />
            </div>
          </div>
        )}

        {/* 116 · FILE UPLOAD PROGRESS LIST */}
        {activeTab === "file-upload-progress" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">File Upload Progress List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-file transfer manager with progress tracking, pause/resume, retry, and client demo states.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FileUploadProgressList\n  files={uploadQueue}\n  onPause={(id) => pauseUpload(id)}\n  onResume={(id) => resumeUpload(id)}\n/>`,
                    "FileUploadProgressList"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <FileUploadProgressList
                files={demoUploadItems}
                onPause={(id) =>
                  setDemoUploadItems((prev) =>
                    prev.map((f) => (f.id === id ? { ...f, status: "paused" } : f))
                  )
                }
                onResume={(id) =>
                  setDemoUploadItems((prev) =>
                    prev.map((f) => (f.id === id ? { ...f, status: "uploading" } : f))
                  )
                }
                onRemove={(id) =>
                  setDemoUploadItems((prev) => prev.filter((f) => f.id !== id))
                }
                onClearCompleted={() =>
                  setDemoUploadItems((prev) => prev.filter((f) => f.status !== "completed"))
                }
              />
            </div>
          </div>
        )}

        {/* 117 · FILE MANAGER */}
        {activeTab === "file-manager" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">File Manager</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Complete browser file explorer with folder navigation, search, grid/list modes, upload, and deletion.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FileManager\n  onItemSelect={(item) => console.log(item)}\n/>`,
                    "FileManager"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Virtual Filesystem Explorer</span>
                <span>Selected: <strong className="text-primary font-mono">{demoFileManagerSelect}</strong></span>
              </div>

              <FileManager
                onItemSelect={(item) => setDemoFileManagerSelect(`${item.name} (${item.type})`)}
              />
            </div>
          </div>
        )}

        {/* 118 · FOLDER TREE */}
        {activeTab === "folder-tree" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Folder Tree</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Collapsible directory navigation tree with nested hierarchy levels and folder item counts.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FolderTree\n  data={directoryTree}\n  onSelect={(node) => console.log(node)}\n/>`,
                    "FolderTree"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Collapsible Folder Structure</span>
                <span>Active Node: <strong className="text-primary font-mono">{demoFolderTreeSelect}</strong></span>
              </div>

              <FolderTree
                selectedId={demoFolderTreeSelect}
                onSelect={(n) => setDemoFolderTreeSelect(n.name)}
                defaultExpandedIds={["root", "src", "components"]}
                data={[
                  {
                    id: "root",
                    name: "chameleon-ui",
                    itemCount: 9,
                    children: [
                      {
                        id: "src",
                        name: "src",
                        itemCount: 4,
                        children: [
                          {
                            id: "components",
                            name: "components",
                            itemCount: 48,
                            children: [
                              { id: "ui", name: "ui", itemCount: 124 },
                              { id: "styles", name: "styles", itemCount: 25 },
                              { id: "gallery", name: "gallery", itemCount: 3 },
                            ],
                          },
                          { id: "lib", name: "lib", itemCount: 7 },
                          { id: "app", name: "app", itemCount: 6 },
                        ],
                      },
                      { id: "public", name: "public", itemCount: 14 },
                      { id: "package.json", name: "package.json", isLeafFile: true, fileType: "code" },
                      { id: "tsconfig.json", name: "tsconfig.json", isLeafFile: true, fileType: "code" },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 119 · TREE VIEW */}
        {activeTab === "tree-view" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Tree View</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-level hierarchical data viewer with keyboard roving navigation, checkboxes, and badge support.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TreeView\n  data={treeNodes}\n  showCheckboxes\n  onSelect={(node) => console.log(node)}\n/>`,
                    "TreeView"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Architecture Hierarchy</span>
                <span>Selected: <strong className="text-primary font-mono">{demoTreeViewSelect}</strong></span>
              </div>

              <TreeView
                selectedId={demoTreeViewSelect}
                onSelect={(node) => setDemoTreeViewSelect(node.id)}
                showCheckboxes
                defaultExpandedIds={["cloud", "frontend"]}
                data={[
                  {
                    id: "cloud",
                    label: "Cloud Production Tier",
                    badge: <span className="text-[10px] bg-emerald-500/10 text-emerald-600 px-1 rounded">Active</span>,
                    children: [
                      { id: "api", label: "FastAPI Microservices" },
                      { id: "postgres", label: "PostgreSQL Database Engine" },
                      { id: "redis", label: "Upstash Redis Cache Cluster" },
                    ],
                  },
                  {
                    id: "frontend",
                    label: "Frontend Edge Delivery",
                    badge: <span className="text-[10px] bg-primary/10 text-primary px-1 rounded">Vercel</span>,
                    children: [
                      { id: "next-app", label: "Next.js App Router" },
                      { id: "design-system", label: "25 Aesthetic Themes Suite" },
                    ],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 120 · ORGANIZATION CHART */}
        {activeTab === "organization-chart" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Organization Chart</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visual reporting structure and company hierarchy diagram with branch expand/collapse.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<OrganizationChart\n  data={organizationData}\n  onNodeClick={(member) => inspectMember(member)}\n/>`,
                    "OrganizationChart"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Reporting Structure</span>
                <span>Active Member: <strong className="text-primary font-mono">{demoOrgSelect}</strong></span>
              </div>

              <OrganizationChart
                onNodeClick={(member) => setDemoOrgSelect(`${member.name} (${member.role})`)}
                data={{
                  id: "1",
                  name: "Dhruv Kolhe",
                  role: "Head of Engineering",
                  department: "Leadership",
                  children: [
                    {
                      id: "2",
                      name: "Sarah Chen",
                      role: "Design System Lead",
                      department: "Product Design",
                      children: [
                        { id: "4", name: "Elena Rostova", role: "UI Designer", department: "Design" },
                        { id: "5", name: "Marcus Brody", role: "Design Technologist", department: "Design" },
                      ],
                    },
                    {
                      id: "3",
                      name: "Alex Rivera",
                      role: "Staff Web Architect",
                      department: "Core Engineering",
                      children: [
                        { id: "6", name: "Kenji Sato", role: "DevOps Engineer", department: "Infrastructure" },
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}

        {/* 121 · KANBAN BOARD */}
        {activeTab === "kanban-board" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Kanban Board</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multi-column workflow board with interactive drag-and-drop task routing and column counters.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<KanbanBoard\n  columns={columns}\n  tasks={tasks}\n  onTaskMove={(taskId, targetCol) => moveTask(taskId, targetCol)}\n/>`,
                    "KanbanBoard"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-5xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Interactive Task Board</span>
                <span className="text-[11px] font-mono text-primary font-medium">Drag cards or use arrow buttons</span>
              </div>

              <KanbanBoard
                columns={demoKanbanCols}
                tasks={demoKanbanTasks}
                onDeleteTask={(taskId) => {
                  setDemoKanbanCols((prev) =>
                    prev.map((c) => ({
                      ...c,
                      taskIds: c.taskIds.filter((id) => id !== taskId),
                    }))
                  )
                }}
              />
            </div>
          </div>
        )}

        {/* 122 · DRAG-AND-DROP LIST */}
        {activeTab === "drag-and-drop-list" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Drag-and-Drop List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive item reordering list with grip handles, keyboard step alternatives, and removal.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DragAndDropList\n  items={items}\n  onReorder={(newItems) => setItems(newItems)}\n/>`,
                    "DragAndDropList"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Interactive Item Reordering</span>
                <span className="font-mono text-primary text-[11px]">
                  Order: {demoDndItems.map((i) => i.id).join(" → ")}
                </span>
              </div>

              <DragAndDropList
                items={demoDndItems}
                onReorder={setDemoDndItems}
                onRemove={(id) => setDemoDndItems((prev) => prev.filter((i) => i.id !== id))}
              />
            </div>
          </div>
        )}

        {/* 123 · TASK BOARD CARD */}
        {activeTab === "task-board-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Task Board Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Workflow task card displaying priority badges, checklist counters, assignees, and due dates.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TaskBoardCard\n  task={{\n    id: "t-1",\n    title: "Implement File Manager",\n    priority: "urgent",\n    dueDate: "2026-10-24"\n  }}\n/>`,
                    "TaskBoardCard"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <TaskBoardCard
                canMoveLeft
                canMoveRight
                task={{
                  id: "showcase-card",
                  title: "Hierarchical Tree Navigation & Drag Reorder",
                  description: "Full accessible keyboard alternatives for drag and drop with WAI-ARIA tree semantics.",
                  priority: "urgent",
                  labels: ["Batch 11", "Files", "A11y"],
                  dueDate: "2026-10-24",
                  subtasks: { completed: 8, total: 10 },
                  assignees: [
                    { id: "1", name: "Dhruv Kolhe" },
                    { id: "2", name: "Sarah Chen" },
                  ],
                }}
              />
            </div>
          </div>
        )}

        {/* 124 · CALENDAR EVENT CARD */}
        {activeTab === "calendar-event-card" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Calendar Event Card</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Schedule appointment card with category palettes, virtual call links, attendees, and RSVP actions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CalendarEventCard\n  event={{\n    id: "e-1",\n    title: "Engineering Sprint Sync",\n    date: "2026-10-24",\n    startTime: "10:00 AM",\n    endTime: "11:00 AM"\n  }}\n/>`,
                    "CalendarEventCard"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-6">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Full Event Card</span>
                <CalendarEventCard
                  onJoinMeeting={() => alert("Connecting to Google Meet room...")}
                  onRSVP={(_, status) => alert(`RSVP updated: ${status}`)}
                  event={{
                    id: "event-main",
                    title: "Chameleon UI Architecture & Component Audit",
                    description: "Review of Batch 11 Files and Hierarchical navigation primitives across 25 design themes.",
                    date: "2026-10-24",
                    startTime: "03:00 PM",
                    endTime: "04:30 PM",
                    category: "Engineering",
                    color: "#6366f1",
                    location: "Studio Conference Room 4B / Google Meet",
                    meetingLink: "https://meet.google.com/xyz-uvwx-rst",
                    attendees: [
                      { id: "1", name: "Dhruv Kolhe" },
                      { id: "2", name: "Alex Rivera" },
                      { id: "3", name: "Sarah Chen" },
                    ],
                    status: "confirmed",
                  }}
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-muted-foreground">Compact Agenda Item</span>
                <CalendarEventCard
                  variant="compact"
                  onJoinMeeting={() => alert("Joining standup call...")}
                  event={{
                    id: "event-compact",
                    title: "Daily Frontend Standup",
                    date: "2026-10-24",
                    startTime: "09:30 AM",
                    endTime: "09:45 AM",
                    color: "#10b981",
                    meetingLink: "https://meet.google.com/standup",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* 125 · AGENDA VIEW */}
        {activeTab === "agenda-view" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Agenda View</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chronological event schedule grouped by date with timeframe filters, time slots, and empty state.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AgendaView\n  events={events}\n  onEventClick={(ev) => console.log(ev)}\n/>`,
                    "AgendaView"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Upcoming Schedule</span>
                <span>Active Event: <strong className="text-primary font-mono">{demoAgendaEvent}</strong></span>
              </div>

              <AgendaView
                onEventClick={(ev) => setDemoAgendaEvent(ev.title)}
                onAddEvent={() => alert("Open New Event Modal")}
                events={[
                  {
                    id: "a-1",
                    title: "Sprint Review & Architecture Audit",
                    date: "2026-10-24",
                    startTime: "10:00 AM",
                    endTime: "11:30 AM",
                    category: "Engineering",
                    color: "#6366f1",
                    location: "Studio Conference Room 4B",
                    status: "confirmed",
                    attendees: [{ name: "Dhruv" }, { name: "Sarah" }, { name: "Alex" }],
                  },
                  {
                    id: "a-2",
                    title: "Design System Tokens Sync",
                    date: "2026-10-24",
                    startTime: "02:00 PM",
                    endTime: "03:00 PM",
                    category: "Design",
                    color: "#10b981",
                    isVirtual: true,
                    status: "confirmed",
                    attendees: [{ name: "Sarah" }, { name: "Elena" }],
                  },
                  {
                    id: "a-3",
                    title: "Executive Roadmap Planning",
                    date: "2026-10-25",
                    startTime: "09:30 AM",
                    endTime: "11:00 AM",
                    category: "Product",
                    color: "#f59e0b",
                    location: "Boardroom A",
                    status: "tentative",
                    attendees: [{ name: "Dhruv" }, { name: "Marcus" }],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 126 · GANTT CHART */}
        {activeTab === "gantt-chart" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Gantt Chart</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Project roadmap timeline with configurable dependency curves, progress bars, and milestones.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<GanttChart\n  tasks={tasks}\n  startDate="2026-10-01"\n  endDate="2026-10-31"\n  onTaskClick={(t) => console.log(t)}\n/>`,
                    "GanttChart"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-5xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Q4 Engineering Roadmap</span>
                <span>Active Task: <strong className="text-primary font-mono">{demoGanttTask}</strong></span>
              </div>

              <GanttChart
                startDate="2026-10-01"
                endDate="2026-10-31"
                onTaskClick={(t) => setDemoGanttTask(t.name)}
                tasks={[
                  {
                    id: "t-1",
                    name: "API & Data Schema",
                    startDate: "2026-10-02",
                    endDate: "2026-10-08",
                    progress: 100,
                    color: "#3b82f6",
                    assignee: "Alex",
                  },
                  {
                    id: "t-2",
                    name: "Batch 12 Frontend",
                    startDate: "2026-10-06",
                    endDate: "2026-10-18",
                    progress: 65,
                    color: "#6366f1",
                    assignee: "Dhruv",
                    dependencies: ["t-1"],
                  },
                  {
                    id: "t-3",
                    name: "Design Token Sync",
                    startDate: "2026-10-12",
                    endDate: "2026-10-22",
                    progress: 40,
                    color: "#10b981",
                    assignee: "Sarah",
                    dependencies: ["t-2"],
                  },
                  {
                    id: "t-4",
                    name: "Production Release",
                    startDate: "2026-10-24",
                    endDate: "2026-10-24",
                    progress: 0,
                    isMilestone: true,
                    dependencies: ["t-2", "t-3"],
                  },
                ]}
              />
            </div>
          </div>
        )}

        {/* 127 · DEPENDENCY GRAPH */}
        {activeTab === "dependency-graph" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Dependency Graph</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Entity relationship topology map with cycle detection, orphan edge protection, and node selection.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DependencyGraph\n  nodes={nodes}\n  edges={edges}\n  onNodeSelect={(node) => console.log(node)}\n/>`,
                    "DependencyGraph"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span className="font-semibold text-foreground">Microservices Topology</span>
                <span>Selected: <strong className="text-primary font-mono">{demoDepNode}</strong></span>
              </div>

              <DependencyGraph
                onNodeSelect={(n) => setDemoDepNode(n ? n.label : "None")}
                nodes={[
                  { id: "core", label: "Core Engine", category: "Core", version: "v2.4", x: 40, y: 80 },
                  { id: "auth", label: "Auth Provider", category: "Security", version: "v1.8", x: 260, y: 30 },
                  { id: "db", label: "PostgreSQL DB", category: "Data", version: "v15", x: 260, y: 140 },
                  { id: "gateway", label: "API Gateway", category: "Network", version: "v3.0", x: 480, y: 80 },
                ]}
                edges={[
                  { id: "e1", from: "core", to: "auth" },
                  { id: "e2", from: "core", to: "db" },
                  { id: "e3", from: "auth", to: "gateway" },
                  { id: "e4", from: "db", to: "gateway" },
                ]}
              />
            </div>
          </div>
        )}

        {/* 128 · FLOWCHART EDITOR */}
        {activeTab === "flowchart-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Flowchart Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Editable process diagram builder with process, decision, and terminal nodes on a dot canvas grid.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FlowchartEditor\n  initialNodes={nodes}\n  initialEdges={edges}\n  onChange={(n, e) => console.log(n, e)}\n/>`,
                    "FlowchartEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <FlowchartEditor />
            </div>
          </div>
        )}

        {/* 129 · NODE-BASED EDITOR */}
        {activeTab === "node-based-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Node-Based Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visual node graph with typed I/O ports, bezier cables, keyboard movement, and connection routing.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NodeBasedEditor\n  initialNodes={nodes}\n  initialConnections={connections}\n/>`,
                    "NodeBasedEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <NodeBasedEditor />
            </div>
          </div>
        )}

        {/* 130 · WORKFLOW BUILDER */}
        {activeTab === "workflow-builder" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Workflow Builder</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Multistep automation pipeline configuration with trigger, action, delay, and branch steps.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<WorkflowBuilder\n  initialSteps={steps}\n  onChange={(s) => console.log(s)}\n/>`,
                    "WorkflowBuilder"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <WorkflowBuilder />
            </div>
          </div>
        )}

        {/* 131 · CHAT MESSAGE */}
        {activeTab === "chat-message" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chat Message</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Individual conversation message with sender avatar, timestamp, status checkmarks, and attachments.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ChatMessage\n  message={{\n    id: "m-1",\n    sender: { id: "u-1", name: "Sarah Chen" },\n    content: "Batch 12 components ready!",\n    timestamp: "10:14 AM"\n  }}\n  isOutgoing={false}\n/>`,
                    "ChatMessage"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-4">
              <ChatMessage
                isOutgoing={false}
                message={{
                  id: "m-demo-1",
                  sender: { id: "sarah", name: "Sarah Chen", role: "Design Lead" },
                  content: "Hey Dhruv! Did you review the Batch 12 Scheduling & Workflow components?",
                  timestamp: "10:14 AM",
                  status: "read",
                  attachments: [
                    { id: "a-1", name: "workflow-spec.pdf", size: 245000, type: "file" },
                  ],
                }}
              />

              <ChatMessage
                isOutgoing={true}
                message={{
                  id: "m-demo-2",
                  sender: { id: "me", name: "Dhruv Kolhe", role: "VP Engineering" },
                  content: "Yes! All 10 components are built with zero foreign dependencies and WAI-ARIA support.",
                  timestamp: "10:16 AM",
                  status: "read",
                }}
              />
            </div>
          </div>
        )}

        {/* 132 · CHAT WINDOW */}
        {activeTab === "chat-window" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chat Window</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Full messaging interface with conversation stream, presence indicator, search filter, and composer.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ChatWindow\n  title="Design Sync"\n  onSendMessage={(text, files) => console.log(text, files)}\n/>`,
                    "ChatWindow"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <ChatWindow />
            </div>
          </div>
        )}

        {/* 133 · CHAT COMPOSER */}
        {activeTab === "chat-composer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chat Composer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Message input bar with auto-resizing textarea, attachment chips, emoji shortcut, and send trigger.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ChatComposer\n  onSend={(text, files) => handleSendMessage(text, files)}\n/>`,
                    "ChatComposer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Interactive Composer</span>
                <span>Last Sent: <strong className="text-primary font-mono">{demoComposerMsg}</strong></span>
              </div>

              <ChatComposer
                onSend={(text) => setDemoComposerMsg(text || "Attachment sent")}
              />
            </div>
          </div>
        )}

        {/* 134 · TYPING INDICATOR */}
        {activeTab === "typing-indicator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Typing Indicator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Smooth bouncing dots presence indicator with bubble and text variants and reduced-motion fallback.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TypingIndicator\n  active={true}\n  variant="bubble"\n/>`,
                    "TypingIndicator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-8 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Simulation Toggle</span>
                <button
                  type="button"
                  onClick={() => setDemoTypingActive(!demoTypingActive)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {demoTypingActive ? "Pause Indicator" : "Activate Indicator"}
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-muted-foreground block">Bubble Variant</span>
                  <TypingIndicator active={demoTypingActive} variant="bubble" />
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-muted-foreground block">Text Variant</span>
                  <TypingIndicator active={demoTypingActive} name="Sarah Chen" variant="text" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 135 · CONVERSATION LIST */}
        {activeTab === "conversation-list" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Conversation List</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Browse chats and channels with search filtering, unread badges, presence, and selection.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ConversationList\n  selectedId={selectedId}\n  onSelectConversation={(item) => setSelectedId(item.id)}\n/>`,
                    "ConversationList"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-md mx-auto space-y-4">
              <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                <span>Selected Chat ID:</span>
                <span className="font-mono text-primary font-bold">{demoSelectedConv}</span>
              </div>
              <ConversationList
                selectedId={demoSelectedConv}
                onSelectConversation={(c) => setDemoSelectedConv(c.id)}
              />
            </div>
          </div>
        )}

        {/* 136 · USER PRESENCE */}
        {activeTab === "user-presence" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">User Presence</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configurable presence states (online, busy, away, offline, in-meeting) in badge, pill, and detailed modes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<UserPresence status="online" variant="pill" />\n<UserPresence status="online" variant="detailed" userName="Dhruv Kolhe" />`,
                    "UserPresence"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-muted-foreground block">Pill Badges</span>
                <div className="flex flex-wrap items-center gap-3">
                  <UserPresence status="online" variant="pill" />
                  <UserPresence status="busy" variant="pill" />
                  <UserPresence status="away" variant="pill" />
                  <UserPresence status="in-meeting" variant="pill" />
                  <UserPresence status="offline" variant="pill" />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground block">Interactive Status Selector</span>
                <UserPresence
                  status={demoPresenceVal}
                  onChangeStatus={(s) => setDemoPresenceVal(s)}
                  variant="selector"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                <span className="text-xs font-semibold text-muted-foreground block">Detailed Profile Card</span>
                <UserPresence
                  status={demoPresenceVal}
                  variant="detailed"
                  userName="Dhruv Kolhe"
                  userRole="Staff Architect"
                  customMessage="Reviewing Batch 13 Collaboration Tools"
                />
              </div>
            </div>
          </div>
        )}

        {/* 137 · VIDEO CALL CONTROLS */}
        {activeTab === "video-call-controls" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Video Call Controls</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Meeting dock with mute, camera, screen-share, hand raise, and safe simulation indicators.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<VideoCallControls\n  roomName="Design Systems Sync"\n  callDuration="24:18"\n  onToggleMic={(muted) => console.log("Muted:", muted)}\n/>`,
                    "VideoCallControls"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <VideoCallControls />
            </div>
          </div>
        )}

        {/* 138 · ACTIVITY FEED */}
        {activeTab === "activity-feed" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Activity Feed</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Chronological event timeline for commits, PR reviews, deployments, comments, and releases.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ActivityFeed\n  groupByDate={true}\n  showFilters={true}\n  onEventClick={(ev) => console.log(ev)}\n/>`,
                    "ActivityFeed"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-4">
              <ActivityFeed />
            </div>
          </div>
        )}

        {/* 139 · COMMENT THREAD */}
        {activeTab === "comment-thread" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Comment Thread</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Nested discussion threads with multi-level replies, inline editing, deletion, and reactions.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CommentThread\n  allowNesting={true}\n  onAddComment={(text, parentId) => console.log(text, parentId)}\n/>`,
                    "CommentThread"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <CommentThread />
            </div>
          </div>
        )}

        {/* 140 · REVIEW / FEEDBACK PANEL */}
        {activeTab === "review-feedback-panel" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Review / Feedback Panel</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Collect technical ratings and reviews with criteria breakdown, tags, and validation feedback.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ReviewFeedbackPanel\n  onSubmitFeedback={(fb) => console.log("Feedback:", fb)}\n/>`,
                    "ReviewFeedbackPanel"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-xl mx-auto space-y-4">
              {demoFeedbackResult && (
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary font-medium">
                  {demoFeedbackResult}
                </div>
              )}
              <ReviewFeedbackPanel
                onSubmitFeedback={(fb) =>
                  setDemoFeedbackResult(
                    `Received rating: ${fb.rating}/5 stars from ${fb.authorName}`
                  )
                }
              />
            </div>
          </div>
        )}

        {/* 141 · DIFF VIEWER */}
        {activeTab === "diff-viewer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Diff Viewer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compare code or text changes cleanly with split side-by-side and unified inline modes.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DiffViewer\n  oldCode={oldCode}\n  newCode={newCode}\n  initialMode="split"\n/>`,
                    "DiffViewer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <DiffViewer />
            </div>
          </div>
        )}

        {/* 142 · TERMINAL EMULATOR */}
        {activeTab === "terminal-emulator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Terminal Emulator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive sandboxed terminal with safe built-in commands, history navigation, and ANSI styling.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<TerminalEmulator\n  promptPrefix="developer@chameleon-ui:~$"\n  onExecuteCommand={(cmd) => console.log(cmd)}\n/>`,
                    "TerminalEmulator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              {demoTerminalCmd && (
                <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2">
                  <span>Last Executed:</span>
                  <span className="font-mono text-primary font-bold">{demoTerminalCmd}</span>
                </div>
              )}
              <TerminalEmulator
                onExecuteCommand={(cmd) => setDemoTerminalCmd(cmd)}
              />
            </div>
          </div>
        )}

        {/* 143 · LOG VIEWER */}
        {activeTab === "log-viewer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Log Viewer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Filter and inspect application logs with search, severity levels, auto-scroll, and metadata JSON.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LogViewer\n  initialLevel="ALL"\n  showSearch={true}\n  autoScroll={true}\n/>`,
                    "LogViewer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <LogViewer />
            </div>
          </div>
        )}

        {/* 144 · JSON VIEWER */}
        {activeTab === "json-viewer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">JSON Viewer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Expandable/collapsible JSON tree inspector with syntax colors, search, and raw error handling.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<JSONViewer\n  data={jsonObject}\n  initialExpandedDepth={2}\n  showSearch={true}\n/>`,
                    "JSONViewer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <JSONViewer />
            </div>
          </div>
        )}

        {/* 145 · API REQUEST BUILDER */}
        {activeTab === "api-request-builder" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">API Request Builder</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure HTTP methods, endpoints, query params, headers, payload body, and authentication.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<APIRequestBuilder\n  initialMethod="GET"\n  initialUrl="https://api.chameleon-ui.dev/v1/metrics"\n  onSendRequest={(req) => console.log(req)}\n/>`,
                    "APIRequestBuilder"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              {demoSentRequest && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-300 font-mono">
                  {demoSentRequest}
                </div>
              )}
              <APIRequestBuilder
                onSendRequest={(req) =>
                  setDemoSentRequest(
                    `Dispatched: ${req.method} ${req.url} (${req.params.filter(p=>p.enabled).length} params, ${req.headers.filter(h=>h.enabled).length} headers)`
                  )
                }
              />
            </div>
          </div>
        )}

        {/* 146 · API RESPONSE VIEWER */}
        {activeTab === "api-response-viewer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">API Response Viewer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Inspect HTTP response status, latency, payload size, JSON body formatting, and headers table.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<APIResponseViewer\n  response={responseData}\n/>`,
                    "APIResponseViewer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <APIResponseViewer />
            </div>
          </div>
        )}

        {/* 147 · REGEX TESTER */}
        {activeTab === "regex-tester" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Regex Tester</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Test regular expressions with flags, live match highlighting, capture groups, and presets.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<RegexTester\n  initialPattern="(\\w+)@(\\w+\\.[a-z]{2,})"\n  initialFlags="g"\n/>`,
                    "RegexTester"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <RegexTester />
            </div>
          </div>
        )}

        {/* 148 · CRON EXPRESSION BUILDER */}
        {activeTab === "cron-expression-builder" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Cron Expression Builder</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure 5-part cron schedules with visual controls, human-readable explanations, and common presets.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<CronExpressionBuilder\n  initialExpression="0 9 * * 1"\n  onChange={(cron) => console.log(cron)}\n/>`,
                    "CronExpressionBuilder"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <CronExpressionBuilder />
            </div>
          </div>
        )}

        {/* 149 · QUERY BUILDER */}
        {activeTab === "query-builder" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Query Builder</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Construct database filters with condition groups (AND/OR), field operators, and SQL preview.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<QueryBuilder\n  initialQuery={query}\n  onChange={(q) => console.log(q)}\n/>`,
                    "QueryBuilder"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <QueryBuilder />
            </div>
          </div>
        )}

        {/* 150 · FORMULA EDITOR */}
        {activeTab === "formula-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Formula Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Spreadsheet-style formula bar with safe recursive evaluator (no eval), cell context, and syntax help.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FormulaEditor\n  initialFormula="=SUM(A1, B2, 45)"\n  cellContext={{ A1: 120, B2: 80 }}\n  onFormulaChange={(formula, res) => console.log(formula, res)}\n/>`,
                    "FormulaEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <FormulaEditor
                onFormulaChange={(_, res) => setDemoFormulaResult(res)}
              />
            </div>
          </div>
        )}

        {/* 151 · SPREADSHEET GRID */}
        {activeTab === "spreadsheet-grid" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Spreadsheet Grid</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Editable spreadsheet grid with cell coordinates, keyboard navigation, and dynamic formula resolution.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SpreadsheetGrid\n  rowsCount={5}\n  colsCount={4}\n  onChange={(data) => console.log(data)}\n/>`,
                    "SpreadsheetGrid"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <SpreadsheetGrid />
            </div>
          </div>
        )}

        {/* 152 · CHART LEGEND */}
        {activeTab === "chart-legend" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chart Legend</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Toggle chart data series visibility with color swatches, metrics, and selection controls.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ChartLegend\n  series={seriesList}\n  onChangeSeries={(s) => console.log(s)}\n/>`,
                    "ChartLegend"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <ChartLegend />
            </div>
          </div>
        )}

        {/* 153 · CHART CROSSHAIR / TOOLTIP */}
        {activeTab === "chart-crosshair-tooltip" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Chart Crosshair / Tooltip</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Interactive dual hairline crosshair tracking cursor coordinates with contextual data tooltip.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ChartCrosshairTooltip\n  width={600}\n  height={240}\n/>`,
                    "ChartCrosshairTooltip"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <ChartCrosshairTooltip />
            </div>
          </div>
        )}

        {/* 154 · HEATMAP */}
        {activeTab === "heatmap" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Heatmap</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  2D intensity matrix mapping values to color ramps with cell inspection and min/max scale legend.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Heatmap\n  colorTheme="emerald"\n  showLegend={true}\n/>`,
                    "Heatmap"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <Heatmap />
            </div>
          </div>
        )}

        {/* 155 · TREEMAP */}
        {activeTab === "treemap" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Treemap</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visualize hierarchical proportions accurately with nested squarified rectangles, labels, and drill-down.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<Treemap\n  colorTheme="emerald"\n  width={640}\n  height={360}\n  onNodeClick={(n) => console.log(n)}\n/>`,
                    "Treemap"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <Treemap />
            </div>
          </div>
        )}

        {/* 156 · SANKEY DIAGRAM */}
        {activeTab === "sankey-diagram" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Sankey Diagram</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visualize weighted flows between categories with smooth cubic Bézier ribbons and invalid link tolerance.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SankeyDiagram\n  width={720}\n  height={360}\n  onNodeClick={(n) => console.log(n)}\n/>`,
                    "SankeyDiagram"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <SankeyDiagram />
            </div>
          </div>
        )}

        {/* 157 · NETWORK GRAPH */}
        {activeTab === "network-graph" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Network Graph</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Display connected entities with interactive draggable nodes, selection, zoom/pan, and node inspector.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<NetworkGraph\n  width={740}\n  height={400}\n  onNodeSelect={(n) => console.log(n)}\n/>`,
                    "NetworkGraph"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <NetworkGraph />
            </div>
          </div>
        )}

        {/* 158 · MAP MARKER / CLUSTER */}
        {activeTab === "map-marker-cluster" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Map Marker / Cluster</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Group geographic points into proximity clusters across zoom levels with interactive pin details.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MapMarkerCluster\n  width={740}\n  height={380}\n  clusterDistance={45}\n/>`,
                    "MapMarkerCluster"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <MapMarkerCluster />
            </div>
          </div>
        )}

        {/* 159 · ONBOARDING TOUR */}
        {activeTab === "onboarding-tour" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Onboarding Tour</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Step-by-step guided product walkthrough with spotlight targets, keyboard navigation, and completion state.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<OnboardingTour\n  onComplete={() => console.log("Tour completed")}\n  onDismiss={() => console.log("Tour dismissed")}\n/>`,
                    "OnboardingTour"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-2xl mx-auto space-y-4">
              <OnboardingTour />
            </div>
          </div>
        )}

        {/* 160 · SPOTLIGHT SEARCH */}
        {activeTab === "spotlight-search" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Spotlight Search</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Global command search palette (⌘K) with category filtering, keyboard navigation, and quick preview.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<SpotlightSearch\n  onSelect={(item) => console.log(item)}\n/>`,
                    "SpotlightSearch"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <SpotlightSearch />
            </div>
          </div>
        )}

        {/* 160b · APPLICATION SEARCH */}
        {activeTab === "application-search" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Application Search</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Unified search across all registered application content — styles, components, and pages.
                  Returns real matches from the live content index with text highlighting, category grouping, and keyboard navigation.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `import { ApplicationSearch } from "@/components/ui/application-search"\nimport { useRouter } from "next/navigation"\n\nconst router = useRouter()\n\n<ApplicationSearch\n  onSelect={(entry) => router.push(entry.href)}\n  maxPerCategory={6}\n/>`,
                    "ApplicationSearch"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Live interactive preview */}
              <div className="rounded-xl border border-border bg-background p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Interactive Preview
                </span>
                <ApplicationSearch
                  loading={isDisabled}
                  error={isError}
                  onSelect={(entry) => {
                    /* In a real app: router.push(entry.href) */
                    window.alert(`Selected: "${entry.title}" → ${entry.href}`)
                  }}
                  maxPerCategory={5}
                />
                <p className="text-[11px] text-muted-foreground">
                  Toggle <strong>Disabled</strong> for loading state · Toggle <strong>Error</strong> for error state above.
                  Type any component name, style, or keyword to see live results.
                </p>
              </div>

              {/* States panel */}
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                    States
                  </span>

                  {/* Normal */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-foreground">Normal — idle hint</span>
                    <ApplicationSearch
                      onSelect={() => {}}
                      maxPerCategory={3}
                      placeholder="Type to search…"
                      className="max-h-64 overflow-hidden"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-5 space-y-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground block">
                    Loading &amp; Error states
                  </span>
                  <div className="space-y-3">
                    <ApplicationSearch
                      loading
                      maxPerCategory={3}
                      placeholder="Searching…"
                    />
                    <ApplicationSearch
                      error="Failed to load search index. Check your connection."
                      maxPerCategory={3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Behaviour notes */}
            <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-2">
              <p className="font-semibold text-foreground">Behaviour notes</p>
              <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                <li>Searches registered entries from SEARCH_INDEX (styles, components, pages)</li>
                <li>Results sorted by relevance: exact title match &gt; prefix match &gt; contains match &gt; description/keyword match</li>
                <li>Category filter pills narrow results without clearing the query</li>
                <li>Text highlighting marks the matched query fragment inside titles and descriptions</li>
                <li>Keyboard: ↑ ↓ navigate · Enter selects · Escape clears query</li>
                <li>No private or sensitive content is indexed</li>
              </ul>
            </div>
          </div>
        )}

        {/* 161 · PERMISSION MATRIX */}
        {activeTab === "permission-matrix" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Permission Matrix</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure roles, permissions, and access levels using an interactive RBAC grid with client sandbox declaration.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<PermissionMatrix\n  onSavePermissions={(perms) => console.log(perms)}\n/>`,
                    "PermissionMatrix"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <PermissionMatrix />
            </div>
          </div>
        )}

        {/* 162 · AUDIT LOG */}
        {activeTab === "audit-log" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Audit Log</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Security and administrative audit trail with actor filtering, status filters, and changed state diff modal.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AuditLog\n  onExportLogs={() => console.log("Export triggered")}\n/>`,
                    "AuditLog"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <AuditLog />
            </div>
          </div>
        )}

        {/* 163 · FEATURE FLAG MANAGER */}
        {activeTab === "feature-flag-manager" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Feature Flag Manager</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Progressive delivery toggles by environment and audience group with rollout percentage sliders.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FeatureFlagManager\n  initialEnvironment="production"\n  onFlagChange={(flags) => console.log(flags)}\n/>`,
                    "FeatureFlagManager"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <FeatureFlagManager />
            </div>
          </div>
        )}

        {/* 164 · VERSION HISTORY */}
        {activeTab === "version-history" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Version History</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compare revision differences with line diffs and safe functional rollback restoration.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<VersionHistory\n  onRestoreRevision={(rev) => console.log(rev)}\n/>`,
                    "VersionHistory"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <VersionHistory />
            </div>
          </div>
        )}

        {/* 165 · DESIGN TOKEN EDITOR */}
        {activeTab === "design-token-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Design Token Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Edit colors, typography, spacing, and corner radii safely in a scoped sandbox with CSS export.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<DesignTokenEditor\n  onTokensChange={(t) => console.log(t)}\n/>`,
                    "DesignTokenEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <DesignTokenEditor />
            </div>
          </div>
        )}

        {/* 166 · RESPONSIVE PREVIEW SWITCHER */}
        {activeTab === "responsive-preview-switcher" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Responsive Preview Switcher</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Preview components across mobile, tablet, and desktop viewports with device frames and orientation toggles.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ResponsivePreviewSwitcher\n  initialPreset="mobile-lg"\n/>`,
                    "ResponsivePreviewSwitcher"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <ResponsivePreviewSwitcher />
            </div>
          </div>
        )}

        {/* 167 · ACCESSIBILITY AUDIT PANEL */}
        {activeTab === "accessibility-audit-panel" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Accessibility Audit Panel</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Automated WCAG 2.1 rule checks and structured criteria for manual screen-reader testing.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AccessibilityAuditPanel\n  onRunAudit={() => console.log("Audit re-run")}\n/>`,
                    "AccessibilityAuditPanel"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <AccessibilityAuditPanel />
            </div>
          </div>
        )}

        {/* 168 · CONTRAST PAIR TESTER */}
        {activeTab === "contrast-pair-tester" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Contrast Pair Tester</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compare foreground and background colors with exact WCAG 2.1 relative luminance and compliance scoring.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ContrastPairTester\n  initialForeground="#0f766e"\n  initialBackground="#ffffff"\n/>`,
                    "ContrastPairTester"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <ContrastPairTester />
            </div>
          </div>
        )}

        {/* 169 · VISUAL REGRESSION COMPARATOR */}
        {activeTab === "visual-regression-comparator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Visual Regression Comparator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compare before-and-after screenshots with a draggable reveal slider, side-by-side mode, and onion-skin.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<VisualRegressionComparator\n  baselineTitle="v1.4"\n  currentTitle="v1.5"\n/>`,
                    "VisualRegressionComparator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <VisualRegressionComparator />
            </div>
          </div>
        )}

        {/* 170 · LIVE COMPONENT PLAYGROUND */}
        {activeTab === "live-component-playground" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Live Component Playground</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Expose supported component props, themes, and sizes safely without arbitrary code execution.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LiveComponentPlayground\n  initialLabel="Explore Tokens"\n  initialVariant="primary"\n/>`,
                    "LiveComponentPlayground"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <LiveComponentPlayground />
            </div>
          </div>
        )}

        {/* 171 · COMPONENT DEPENDENCY GRAPH */}
        {activeTab === "component-dependency-graph" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Component Dependency Graph</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Visualize relationships between tokens, primitives, composites, and high-level features.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ComponentDependencyGraph\n  onSelectNode={(node) => console.log(node)}\n/>`,
                    "ComponentDependencyGraph"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <ComponentDependencyGraph />
            </div>
          </div>
        )}

        {/* 172 · STATE MACHINE VISUALIZER */}
        {activeTab === "state-machine-visualizer" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">State Machine Visualizer</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Finite state machine diagram with active node highlighting, event triggers, and transition log.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<StateMachineVisualizer\n  initialState="idle"\n  onTransition={(from, evt, to) => console.log(from, evt, to)}\n/>`,
                    "StateMachineVisualizer"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <StateMachineVisualizer />
            </div>
          </div>
        )}

        {/* 173 · MOCK API RESPONSE GENERATOR */}
        {activeTab === "mock-api-response-generator" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Mock API Response Generator</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Produce configurable sample API responses with realistic status codes, headers, and bodies.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<MockApiResponseGenerator\n  defaultStatus={200}\n  defaultTemplate="users"\n/>`,
                    "MockApiResponseGenerator"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-3xl mx-auto space-y-4">
              <MockApiResponseGenerator />
            </div>
          </div>
        )}

        {/* 174 · FORM VALIDATION PLAYGROUND */}
        {activeTab === "form-validation-playground" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Form Validation Playground</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Test and inspect regex, password complexity, boundary clamping, and async validation rules in real-time.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<FormValidationPlayground\n  onValidSubmit={(data) => console.log(data)}\n/>`,
                    "FormValidationPlayground"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <FormValidationPlayground />
            </div>
          </div>
        )}

        {/* 175 · KEYBOARD SHORTCUT EDITOR */}
        {activeTab === "keyboard-shortcut-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Keyboard Shortcut Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Configure key bindings, verify collision safety against OS shortcuts, and test keystrokes live.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<KeyboardShortcutEditor\n  onShortcutsChange={(shortcuts) => console.log(shortcuts)}\n/>`,
                    "KeyboardShortcutEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <KeyboardShortcutEditor />
            </div>
          </div>
        )}

        {/* 176 · THEME TOKEN DIFF */}
        {activeTab === "theme-token-diff" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Theme Token Diff</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Compare two theme configurations side-by-side and highlight added, removed, and modified tokens.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ThemeTokenDiff\n  themeAName="Base Clean (Light)"\n  themeBName="Dark Tech (Cyan Glow)"\n/>`,
                    "ThemeTokenDiff"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <ThemeTokenDiff />
            </div>
          </div>
        )}

        {/* 177 · RTL LAYOUT PREVIEW */}
        {activeTab === "rtl-layout-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">RTL Layout Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Preview right-to-left components and bidirectional mirroring without mutating global document state.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<RtlLayoutPreview\n  initialDirection="rtl"\n  initialLanguage="ar"\n/>`,
                    "RtlLayoutPreview"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <RtlLayoutPreview />
            </div>
          </div>
        )}

        {/* 178 · LOCALIZATION PREVIEW */}
        {activeTab === "localization-preview" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Localization Preview</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Test localized strings, native Intl date/currency formatting, and text expansion layout stress.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<LocalizationPreview\n  initialLocale="de-DE"\n/>`,
                    "LocalizationPreview"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <LocalizationPreview />
            </div>
          </div>
        )}

        {/* 179 · ANIMATION TIMELINE EDITOR */}
        {activeTab === "animation-timeline-editor" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Animation Timeline Editor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Scrub transition progress, adjust easing curves and keyframes, and export CSS animation rules.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<AnimationTimelineEditor\n  initialDurationMs={600}\n  initialEasing="spring-overshoot"\n/>`,
                    "AnimationTimelineEditor"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <AnimationTimelineEditor />
            </div>
          </div>
        )}

        {/* 180 · COMPONENT USAGE ANALYTICS */}
        {activeTab === "component-usage-analytics" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Component Usage Analytics</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Inspect component usage frequency, dominant variants, and prop distributions with honest telemetry.
                </p>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  handleCopy(
                    `<ComponentUsageAnalytics\n  onExportReport={(data) => console.log(data)}\n/>`,
                    "ComponentUsageAnalytics"
                  )
                }
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copied ? "Copied" : "Copy Code"}
              </Button>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card max-w-4xl mx-auto space-y-4">
              <ComponentUsageAnalytics />
            </div>
          </div>
        )}

        {/* 70 · PLAYGROUND */}
        {activeTab === "playground" && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">Integrated Suite Playground</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  All 10 components reacting dynamically in concert.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <Sparkles className="h-4 w-4" /> Ready for production
              </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-xl border border-border bg-background p-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField label="Member Name" required={isRequired} error={isError ? "Required field" : undefined}>
                    <input
                      name="memberName"
                      autoComplete="off"
                      suppressHydrationWarning
                      defaultValue="Ada Lovelace"
                      disabled={isDisabled}
                      className="h-9 w-full rounded-md border border-input px-3 text-xs shadow-xs"
                    />
                  </FormField>

                  <div className="space-y-1.5">
                    <Label required={isRequired}>Billing Currency</Label>
                    <Select
                      options={[
                        { value: "usd", label: "USD ($)" },
                        { value: "eur", label: "EUR (€)" },
                        { value: "gbp", label: "GBP (£)" },
                      ]}
                      value="usd"
                      disabled={isDisabled}
                      error={isError}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label required={isRequired}>Deployment Date</Label>
                    <DateInput value={dateVal} onChange={setDateVal} disabled={isDisabled} error={isError} />
                  </div>

                  <div className="space-y-1.5">
                    <Label required={isRequired}>Max Workers</Label>
                    <NumberInput value={numberVal} onValueChange={setNumberVal} min={1} max={32} disabled={isDisabled} error={isError} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label required={isRequired}>Project Description</Label>
                  <Textarea
                    rows={3}
                    maxLength={140}
                    showCount
                    value={textareaVal}
                    onChange={(e) => setTextareaVal(e.target.value)}
                    disabled={isDisabled}
                    error={isError}
                  />
                </div>

                <Checkbox
                  label="I verify the server specifications comply with company policies"
                  checked={cbChecked}
                  onCheckedChange={setCbChecked}
                  disabled={isDisabled}
                  error={isError}
                  required={isRequired}
                />
              </div>

              <div className="rounded-xl border border-border bg-muted/20 p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                  Architecture Highlights
                </span>
                <div className="space-y-3 text-xs text-muted-foreground leading-normal">
                  <p>
                    <strong className="text-foreground block">Zero Foreign Dependencies:</strong> Form components rely exclusively on semantic HTML, Radix primitives already present, and Tailwind CSS.
                  </p>
                  <p>
                    <strong className="text-foreground block">Controlled &amp; Uncontrolled:</strong> Every input supports standard React state hooks or native FormData forms.
                  </p>
                  <p>
                    <strong className="text-foreground block">25 Styles Synchronization:</strong> Seamlessly ported to every aesthetic in Chameleon UI with matching tokens, fonts, and dark mode.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
