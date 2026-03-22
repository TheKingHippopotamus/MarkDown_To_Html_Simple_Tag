# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.x     | Yes       |

## Reporting a Vulnerability

If you discover a security vulnerability in md-spawn, please report it responsibly.

**Do not open a public issue.**

Instead, please email or contact the maintainer privately via
[GitHub](https://github.com/TheKingHippopotamus) with:

- A description of the vulnerability
- Steps to reproduce
- Potential impact

You can expect an initial response within 48 hours. Once confirmed, a fix will
be released as a patch version as soon as possible.

## Security Design

md-spawn sanitizes all rendered HTML through [DOMPurify](https://github.com/cure53/DOMPurify) by default. The `unsafe` attribute disables sanitization and should only be used with trusted content.
