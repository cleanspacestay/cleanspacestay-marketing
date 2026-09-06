# CleanSpace Stay Marketing — Engineering Operating Manual

This repository contains the active public CleanSpace Stay website and the Resend-backed contact endpoint. Cross-platform product and engineering knowledge is canonical in [`cleanspacestay-web/docs`](https://github.com/cleanspacestay/cleanspacestay-web/tree/main/docs). Start with the [knowledge pack](https://github.com/cleanspacestay/cleanspacestay-web/blob/main/docs/knowledge-pack/00-START-HERE.md) and [system overview](https://github.com/cleanspacestay/cleanspacestay-web/blob/main/docs/architecture/SYSTEM_OVERVIEW.md).

## Evidence precedence

> **Verified live state → current config on `origin/master` → current source on `origin/master` → Git history → repository documentation → AI memory, old conversations, summaries, or local unstaged context.**

Local source/configuration is authoritative for the public site. Product claims must match verified current capabilities and canonical platform status; do not advertise source-only, partial, planned, or disconnected integrations as live.

## Mandatory workflow

Fetch `origin/master`, inspect overlapping PRs/branches, read this file plus relevant source/Vercel/canonical docs, and create a dedicated branch. Review product-copy, brand, accessibility, responsive/mobile, performance, SEO, privacy/contact-data, Resend, deployment, and canonical-knowledge impact before implementation. Never push directly to `master`.

Use **CleanSpace Stay** consistently. No placeholder copy (`coming soon`, `TODO`, `lorem ipsum`) may reach production. Public forms must minimize data, validate/escape input, prevent abuse, and never log or expose contact content or provider credentials.

## Runtime and deployment boundaries

The static site and contact endpoint deploy through the existing Vercel Git integration. Do not add a second deploy path. Production runtime may use KB-owned Resend/Vercel accounts only and must not call Manus-operated services. Do not submit contact forms, send email, alter domains/DNS/provider settings, deploy, or merge without explicit authorization.

The confidential routes `/value-calculator`, `/rollout`, `/executive-briefing`, `/demo-script`, and `/platform-overview` (including `.html` forms and defensive former `public/` aliases) are protected before static content is served by the selective Vercel Routing Middleware in `proxy.js`. The middleware must remain fail-closed and read only the encrypted `MARKETING_PRIVATE_ACCESS_SHA256` Vercel environment variable. Never add client-side password fields, credential literals, unlock-state storage, unprotected duplicate page copies, or a bypass around the matcher. The plaintext access password is owner-controlled and must never enter source, documentation, logs, issue text, or chat.

## Knowledge maintenance and validation

When public positioning, feature availability, domains/routes, contact behavior, provider use, privacy/security, deployment, or recovery changes, update local guidance and the canonical web documentation/status in the same coordinated work. Before final validation, fetch `origin/master` again and reconcile intervening commits.

Run:

```bash
pnpm test
pnpm build
```

Add/update Vitest source-contract coverage, including `private-access.test.js` whenever confidential routes or `vercel.json` change; inspect mobile/desktop layouts and keyboard/focus behavior, verify links/forms without sending production data, update `todo.md` if present, and require a CLEAN Vercel preview. Every commit is authored as `Colin Brechbill <cbrechbill@byvenuecreative.com>`.

## High-risk review and handoff

Contact/email handling, PII, provider secrets, analytics/tracking, cookies/privacy, DNS/domains, accessibility regressions, security headers, or production configuration require independent review where material. Deliver an unmerged PR with tests, preview evidence, knowledge impact, recovery, and owner actions. Do not merge or deploy without explicit KB approval.
