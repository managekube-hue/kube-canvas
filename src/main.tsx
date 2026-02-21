import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const purgeLovableArtifacts = () => {
	document.getElementById("lovable-badge")?.remove();

	document
		.querySelectorAll(
			[
				'#lovable-badge',
				'[id*="lovable"]',
				'[class*="lovable"]',
				'[aria-label*="Lovable"]',
				'a[href*="lovable.dev/projects"]',
				'a[href*="utm_source=lovable-badge"]',
				'a[href*="lovable"]',
				'iframe[src*="lovable"]',
			].join(",")
		)
		.forEach((element) => {
			const container = element.closest("aside,div") as HTMLElement | null;
			if (container && (container.id.includes("lovable") || container.className.includes("lovable"))) {
				container.remove();
			} else {
				element.remove();
			}
		});

	document
		.querySelectorAll('meta[content*="lovable.app"], meta[content*="lovable.dev"]')
		.forEach((meta) => meta.remove());
};

purgeLovableArtifacts();

const observer = new MutationObserver(() => {
	purgeLovableArtifacts();
});

observer.observe(document.documentElement, { childList: true, subtree: true });

window.setInterval(purgeLovableArtifacts, 1500);

createRoot(document.getElementById("root")!).render(<App />);
