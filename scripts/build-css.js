const fs = require('fs');
const path = require('path');
const { compile } = require('@tailwindcss/node');
const { Scanner } = require('@tailwindcss/oxide');

async function buildCSS() {
  const rootDir = path.resolve(__dirname, '..');
  const inputCss = `
@import "tailwindcss";

:root {
  --background: #0f0f0f;
  --foreground: #f1f1f1;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: Roboto, "YouTube Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom YouTube scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #717171;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #aaaaaa;
}

/* Hide scrollbars for category pills */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
`;

  const compiler = await compile(inputCss, {
    from: path.join(rootDir, 'app', 'globals.css'),
    base: rootDir,
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      { base: path.join(rootDir, 'app'), pattern: '**/*', negated: false },
      { base: path.join(rootDir, 'components'), pattern: '**/*', negated: false },
      { base: path.join(rootDir, 'data'), pattern: '**/*', negated: false },
    ],
  });

  const candidates = scanner.scan();
  console.log(`[Tailwind] Found ${candidates.length} candidate classes`);

  const builtCss = compiler.build(candidates);
  const targetPath = path.join(rootDir, 'app', 'globals.css');
  fs.writeFileSync(targetPath, builtCss, 'utf8');
  console.log(`[Tailwind] Successfully compiled CSS to app/globals.css (${builtCss.length} bytes)`);
}

buildCSS().catch((err) => {
  console.error('[Tailwind] Error compiling CSS:', err);
  process.exit(1);
});
