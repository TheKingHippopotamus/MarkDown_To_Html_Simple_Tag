const silentLogLevels = new Set(["silent", "error"]);

if (silentLogLevels.has(process.env.npm_config_loglevel ?? "")) {
  process.exit(0);
}

const useColor = process.stdout.isTTY && !("NO_COLOR" in process.env);

function color(code, text) {
  return useColor ? `\u001b[${code}m${text}\u001b[0m` : text;
}

const divider = color("90", "-".repeat(72));

const lines = [
  `${color("1;96", "md-spawn")} ${color("2", "installed successfully")}`,
  color(
    "2",
    "A browser-native <md-spawn> element for rendering Markdown from src or inline.",
  ),
  "",
  `${color("1", "Creator")}  ${color("35", "KingHippo")}`,
  "         https://github.com/TheKingHippopotamus",
  "",
  color("1", "Quick start"),
  color("32", 'import "md-spawn";'),
  color("32", '<md-spawn src="/README.md"></md-spawn>'),
  "",
  `${color("1", "Tip")} ${color("33", 'Inline Markdown also works, and `loading="lazy"` delays first render.')}`,
];

console.log(`\n${divider}\n${lines.join("\n")}\n${divider}\n`);
