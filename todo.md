# Comprehensive Legal Pages Update — todo

## Privacy Policy
- [x] Add mobile-app data section (device IDs, push tokens, app/OS version, location, camera/photo access)
- [x] Add identity/sensitive documents (gov ID images, TSA/known-traveler #, loyalty #)
- [x] Add data retention section
- [x] Add "we do not sell/share" + privacy rights (Florida Digital Bill of Rights + CCPA-style)
- [x] Add push notifications, analytics, children, where-processed
- [x] Add third-party travel suppliers note
- [x] Update "Last Updated"

## Terms of Service
- [x] Add Mobile Application License / EULA (Apple + Google clauses)
- [x] Add Confidentiality & Trade Secrets (Florida Uniform Trade Secrets Act; workflow/business logic)
- [x] Strengthen IP + feedback ownership
- [x] Add Customer Data vs. Platform IP
- [x] Add Warranty Disclaimer (AS IS) + travel-supplier disclaimer
- [x] Add Indemnification
- [x] Add Termination/Suspension
- [x] Add Acceptable Use
- [x] Add Account & Authorization (PM/Foreman/Worker)
- [x] Add Assignment (supports acquisition/asset story)
- [x] Add Binding Arbitration + Class-Action Waiver (Florida-seated), conspicuous notice
- [x] Update "Last Updated"

## Support
- [x] Cross-link app license/EULA terms

## Deploy
- [x] Commit (verified author Colin Brechbill), push (803eaca)
- [x] Verify live on cleanspacestay.com (all 3 pages HTTP 200; all key clauses present)

## Closeout
All three pages now comprehensively cover the web platform and the iOS/Android mobile app. Privacy Policy adds mobile-app data, identity/travel documents, retention, Florida Digital Bill of Rights / CCPA-style rights, and a no-sale statement. Terms add a mobile-app EULA with Apple/Google clauses, Florida trade-secret/confidentiality protection of workflows and business logic, strengthened IP and feedback ownership, customer-data vs. platform-IP split, AS-IS and travel-supplier disclaimers, indemnification, termination, acceptable use, assignment (supports acquisition), and Florida-seated binding arbitration with a class-action waiver. Support cross-links the EULA/app-store terms. Verified live and committed as Colin Brechbill.
- [ ] Closeout


## 2026-08-26 — Repository operating manual and canonical knowledge link

- [x] Add root `AGENTS.md` covering verified product claims, accessibility, contact privacy, Resend, deployment, and source precedence
- [x] Add `CLAUDE.md` delegating to the agent-neutral rules and canonical web knowledge
- [x] Add pull-request governance for knowledge, public-site regressions, validation, privacy, and recovery
- [x] Add Vitest as a development-only dependency and source-contract governance coverage
- [x] Refresh `origin/master` (no intervening commits) and pass 4 Vitest governance tests plus static build
- [x] Confirm Vercel preview is CLEAN for PR #1
- [x] Commit as Colin Brechbill, push `governance/repository-operating-manual`, and open unmerged PR #1
- [x] Post-merge production smoke test passed after approved PR #1 merge

## 2026-09-05 — Continuous knowledge and site validation

- [x] Add read-only validation on every pull request to `master` and every `master` push
- [x] Run governance source-contract tests and the static build in the workflow
- [x] Extend Vitest coverage for workflow triggers, permissions, commands, and credential safety
- [x] Pin pnpm, declare the single-package workspace, and allow only Esbuild’s required install script
- [x] Refresh `origin/master` (no intervening commits) and pass clean pnpm install, five Vitest governance tests, workflow YAML, and static build
- [x] Confirm Vercel preview is CLEAN for PR #2
- [x] Commit as Colin Brechbill, push `governance/continuous-knowledge-checks`, and open unmerged PR #2
- [x] Post-merge default-branch validation, READY production deployment, and homepage smoke test passed after approved PR #2 merge

## 2026-09-06 — Resend isolation and workflow maintenance

- [x] Replace the shared Resend key with a dedicated marketing sending-only key scoped to `cleanspacestay.com`
- [x] Redeploy the unchanged production source and verify the synthetic contact message reached `delivered`
- [x] Upgrade continuous-governance workflow dependencies to current Node 24-compatible action majors
- [x] Extend source-contract coverage for the upgraded action versions and credential-safety boundary
- [x] Refresh `origin/master` with no intervening commits; pass all 12 Vitest tests, workflow YAML, static build, secret/browser-gate scans, and Vercel CLI 59.11.7 no-deploy build validation
- [x] Confirm Vercel preview build and all GitHub checks are CLEAN for PR #3; authenticated private-route validation remains pending encrypted digest provisioning
- [x] Commit as Colin Brechbill, push `governance/workflow-security-followup`, and open unmerged PR #3
- [ ] Post-merge default-branch and production smoke verification pending explicit merge approval

## 2026-09-06 — Confidential page access remediation

- [x] Expand the final security review from the initially reported calculator/rollout gates to every confidential artifact: value calculator, rollout guide, executive briefing, demo script, and platform overview
- [x] Remove every browser-visible password/code literal, password field, unlock routine, and session/local-storage authorization flag
- [x] Delete duplicate `public/` copies of the value calculator and executive briefing to eliminate alias and drift bypasses
- [x] Add selective Vercel Routing Middleware using hashed Basic Auth, timing-safe comparison, fail-closed configuration, non-cacheable responses, read-method restriction, and bounded failed-attempt throttling
- [x] Protect all extensionless, `.html`, and defensive former `public/` aliases while leaving public routes and the contact endpoint outside the matcher
- [x] Add seven behavioral/source-contract tests; complete marketing suite passes 12 tests; workflow YAML and a Vercel CLI 59.11.7 no-deploy build pass
- [x] Securely remove temporary local Vercel/OIDC/settings files created during no-deploy validation
- [x] Provision the rotated encrypted `MARKETING_PRIVATE_ACCESS_SHA256` for Preview and Production and deliver the replacement password to KB by attachment-only email; the first pre-activation value was revoked after integration preview exposure and is unusable
- [x] Catch activation blockers in live preview testing: switch the non-intercepting explicit `proxy.js` entrypoint to Vercel’s default root `middleware.js` convention, then select the Node.js runtime required for timing-safe `node:crypto`; lock both choices with source contracts
- [x] Validate the refreshed PR preview: public routes return 200; all five private routes and `.html` aliases return 401 unauthenticated and 200 authenticated; removed `public/` aliases return 404 after authentication; invalid credentials, methods, and security headers behave correctly; the one-time Vercel automation bypass was revoked immediately
