# Contributing to md-spawn

Thanks for your interest in contributing! This guide will help you get started.

## Development Setup

```bash
git clone https://github.com/TheKingHippopotamus/MarkDown_To_Html_Simple_Tag.git
cd MarkDown_To_Html_Simple_Tag
npm install
npm run build
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Build with tsup |
| `npm test` | Run unit tests (vitest) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:e2e` | Run end-to-end tests (Playwright) |

## Making Changes

1. **Fork** the repo and create a branch from `main`.
2. **Install** dependencies with `npm install`.
3. **Make your changes** — keep them focused on a single concern.
4. **Add or update tests** if your change affects behavior.
5. **Run `npm test`** and make sure everything passes.
6. **Run `npm run build`** to verify the build succeeds.
7. **Open a Pull Request** against `main`.

## Pull Request Guidelines

- Keep PRs small and focused.
- Describe what your PR does and why.
- Reference any related issues (e.g. `Fixes #12`).
- Make sure CI passes before requesting review.

## Reporting Bugs

Use the [Bug Report](https://github.com/TheKingHippopotamus/MarkDown_To_Html_Simple_Tag/issues/new?template=bug_report.md) issue template.

## Requesting Features

Use the [Feature Request](https://github.com/TheKingHippopotamus/MarkDown_To_Html_Simple_Tag/issues/new?template=feature_request.md) issue template.

## Code Style

- TypeScript with strict mode.
- ES modules (`import` / `export`).
- No external runtime dependencies beyond `marked`, `dompurify`, and `highlight.js`.

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
