# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-03-22

### Changed
- Polished package presentation and README
- Added README preview screenshot

## [1.0.0] - 2026-03-22

### Added
- Initial release of `md-spawn` custom element
- Markdown rendering from `src` URL or inline content
- HTML sanitization via DOMPurify (enabled by default)
- Syntax highlighting via highlight.js
- Relative asset and link resolution
- Lazy loading support (`loading="lazy"`)
- Shadow DOM isolation (`shadow` attribute)
- Unsafe mode for trusted content (`unsafe` attribute)
- Inline fallback when `src` fetch fails
- Fetch caching with request deduplication
- GitHub-flavored default theme
- Unit tests (vitest) and E2E tests (Playwright)
