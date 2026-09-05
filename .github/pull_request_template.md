# Summary

Describe the public-facing problem, long-term solution, and affected pages/routes/forms.

## Scope and freshness

- [ ] Current `origin/master` fetched at task start and before final validation
- [ ] Local `AGENTS.md`, source/configuration, and relevant canonical web docs reviewed
- [ ] Dedicated branch used; no direct push to `master`
- [ ] Product claims verified against current live/canonical platform status

## Knowledge impact

- [ ] Durable product/provider/route/deployment knowledge impact reviewed
- [ ] No documentation update required because behavior/claims did not change
- [ ] Local and canonical web documentation updated in coordinated PR(s)
- [ ] `todo.md` updated where present

## Public-site regression impact

- [ ] Branding and **CleanSpace Stay** naming
- [ ] Feature/integration claim accuracy
- [ ] Mobile and desktop responsive layout
- [ ] Keyboard, focus, contrast, labels, and reduced motion
- [ ] SEO, metadata, links, redirects, and help/privacy/terms routes
- [ ] Contact-form validation, abuse resistance, privacy, and Resend behavior
- [ ] Performance, assets, and poor-connection behavior
- [ ] Vercel environment, domains, and deployment

## Validation

- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] Vitest source-contract regression coverage added/updated
- [ ] No placeholder production copy
- [ ] No secret or contact/customer data in source, fixtures, logs, or screenshots
- [ ] Vercel preview is CLEAN and affected routes inspected
- [ ] Main/master drift reconciled before final validation

## Security and recovery

- [ ] No production form submitted or email sent without explicit approval
- [ ] No DNS/domain/provider/deployment change performed without explicit approval
- [ ] Rollback/recovery implications documented below
- [ ] High-risk change received independent review, or is not high risk

## Final state

- [ ] Commit author is `Colin Brechbill <cbrechbill@byvenuecreative.com>`
- [ ] PR remains unmerged pending deliberate owner approval

### Notes, owner actions, and recovery

Explain preview findings, public-copy evidence, owner configuration, remaining uncertainty, and rollback.
