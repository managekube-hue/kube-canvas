import { UidrLayout } from "@/components/UidrLayout";
import { Code2, GitBranch, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UidrIde() {
  const GITHUB_REPO = "https://github.com/managekube-hue/Kubric-UiDR.git";

  return (
    <UidrLayout>
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-16">
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
          <Code2 className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">Integrated IDE</h1>
        <p className="text-white/50 max-w-md text-center mb-8">
          The Monaco-powered browser IDE is coming soon. For now, clone the repo and work locally.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a href={GITHUB_REPO} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <GitBranch className="w-4 h-4" /> Clone Repository
            </Button>
          </a>
          <a href="https://github.dev/managekube-hue/Kubric-UiDR" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 gap-2">
              <ExternalLink className="w-4 h-4" /> Open in github.dev
            </Button>
          </a>
        </div>

        <div className="mt-12 p-6 border border-white/10 bg-white/[0.02] rounded-lg max-w-lg w-full">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Quick Start</h3>
          <pre className="text-xs text-white/60 font-mono whitespace-pre-wrap leading-relaxed">
{`git clone ${GITHUB_REPO}
cd Kubric-UiDR
npm install
npm run dev`}
          </pre>
        </div>
      </div>
    </UidrLayout>
  );
}
