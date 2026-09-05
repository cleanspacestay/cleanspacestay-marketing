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
- [x] Refresh `origin/master` (no intervening commits) and pass clean pnpm install, five Vitest governance tests, workflow YAML, and static build
- [ ] Confirm Vercel preview is CLEAN
- [ ] Commit as Colin Brechbill, push `governance/continuous-knowledge-checks`, and open an unmerged PR
- [ ] Post-merge default-branch and production verification pending explicit merge approval
