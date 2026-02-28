import { FileCode, FileText, FileJson, Image, File, Database, Terminal, Settings, Lock, Globe, Package, Cpu, BookOpen } from "lucide-react";

const iconMap: Record<string, { icon: typeof FileCode; color: string }> = {
  ts: { icon: FileCode, color: "text-blue-400" },
  tsx: { icon: FileCode, color: "text-blue-400" },
  js: { icon: FileCode, color: "text-yellow-400" },
  jsx: { icon: FileCode, color: "text-yellow-400" },
  go: { icon: Cpu, color: "text-cyan-400" },
  rs: { icon: Cpu, color: "text-orange-400" },
  py: { icon: FileCode, color: "text-green-400" },
  md: { icon: BookOpen, color: "text-white/50" },
  mdx: { icon: BookOpen, color: "text-white/50" },
  json: { icon: FileJson, color: "text-yellow-300" },
  yaml: { icon: Settings, color: "text-red-300" },
  yml: { icon: Settings, color: "text-red-300" },
  toml: { icon: Settings, color: "text-orange-300" },
  css: { icon: FileCode, color: "text-purple-400" },
  scss: { icon: FileCode, color: "text-pink-400" },
  html: { icon: Globe, color: "text-orange-400" },
  svg: { icon: Image, color: "text-emerald-400" },
  png: { icon: Image, color: "text-emerald-400" },
  jpg: { icon: Image, color: "text-emerald-400" },
  gif: { icon: Image, color: "text-emerald-400" },
  webp: { icon: Image, color: "text-emerald-400" },
  ico: { icon: Image, color: "text-emerald-400" },
  sql: { icon: Database, color: "text-blue-300" },
  sh: { icon: Terminal, color: "text-green-300" },
  bash: { icon: Terminal, color: "text-green-300" },
  dockerfile: { icon: Package, color: "text-blue-300" },
  lock: { icon: Lock, color: "text-white/25" },
  env: { icon: Lock, color: "text-yellow-500" },
  txt: { icon: FileText, color: "text-white/40" },
  mod: { icon: Package, color: "text-cyan-300" },
  sum: { icon: Lock, color: "text-white/25" },
  makefile: { icon: Terminal, color: "text-amber-400" },
};

interface Props {
  filename: string;
  size?: number;
  className?: string;
}

export function IdeFileIcon({ filename, size = 12, className = "" }: Props) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const name = filename.toLowerCase();

  // Special filenames
  let config = iconMap[ext];
  if (name === "dockerfile") config = iconMap.dockerfile;
  if (name === "makefile") config = iconMap.makefile;
  if (name.endsWith(".lock")) config = iconMap.lock;
  if (name.startsWith(".env")) config = iconMap.env;

  if (!config) config = { icon: File, color: "text-white/25" };

  const Icon = config.icon;
  return <Icon size={size} className={`${config.color} ${className} flex-shrink-0`} />;
}
