import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const purgeLovableArtifacts = () => {
	document.getElementById("lovable-badge")?.remove();

	document
		.querySelectorAll('a[href*="lovable.dev/projects"], a[href*="utm_source=lovable-badge"]')
		.forEach((anchor) => {
			const container = anchor.closest("aside,div");
			if (container) {
				container.remove();
			} else {
				anchor.remove();
			}
		});

	document
		.querySelectorAll('meta[content*="lovable.app"], meta[content*="lovable.dev"]')
		.forEach((meta) => meta.remove());
};

purgeLovableArtifacts();

new MutationObserver(() => {
	purgeLovableArtifacts();
}).observe(document.documentElement, { childList: true, subtree: true });

createRoot(document.getElementById("root")!).render(<App />);
