import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const read = (relative) => fs.readFileSync(path.join(repoRoot, relative), "utf8");

describe("marketing governance source contract", () => {
  it("provides agent-neutral and Claude entry points linked to canonical web knowledge", () => {
    const agents = read("AGENTS.md");
    const claude = read("CLAUDE.md");
    expect(agents).toMatch(/cleanspacestay-web\/blob\/main\/docs\/knowledge-pack\/00-START-HERE\.md/);
    expect(claude).toMatch(/Read \[`AGENTS\.md`\]/);
    expect(claude).toMatch(/PLATFORM_INTEGRATIONS\.md/);
  });

  it("requires current-master refresh, verified claims, durable knowledge, verified author, and deliberate merge", () => {
    const agents = read("AGENTS.md");
    expect(agents).toMatch(/Evidence precedence/i);
    expect(agents).toMatch(/origin\/master/);
    expect(agents).toMatch(/dedicated branch/i);
    expect(agents).toMatch(/Product claims must match verified current capabilities/);
    expect(agents).toMatch(/canonical web documentation\/status/i);
    expect(agents).toMatch(/Colin Brechbill <cbrechbill@byvenuecreative\.com>/);
    expect(agents).toMatch(/Do not merge or deploy without explicit KB approval/);
  });

  it("keeps the PR template focused on public claims, knowledge, accessibility, validation, privacy, and recovery", () => {
    const template = read(".github/pull_request_template.md");
    for (const marker of [
      "Knowledge impact",
      "Public-site regression impact",
      "Validation",
      "Security and recovery",
      "PR remains unmerged",
    ]) {
      expect(template).toContain(marker);
    }
    expect(template).toMatch(/Vercel preview is CLEAN/);
    expect(template).toMatch(/No placeholder production copy/);
  });

  it("runs governance and static-site checks on every PR and master change", () => {
    const workflow = read(".github/workflows/continuous-governance.yml");
    expect(workflow).toMatch(/pull_request:\s*\n\s+branches: \[master\]/);
    expect(workflow).toMatch(/push:\s*\n\s+branches: \[master\]/);
    expect(workflow).toMatch(/permissions:\s*\n\s+contents:\s*read/);
    expect(workflow).not.toMatch(/contents:\s*write|pull-requests:\s*write|issues:\s*write/);
    expect(workflow).toMatch(/pnpm test/);
    expect(workflow).toMatch(/pnpm build/);
    expect(workflow).toMatch(/actions\/checkout@v7/);
    expect(workflow).toMatch(/pnpm\/action-setup@v6/);
    expect(workflow).toMatch(/actions\/setup-node@v7/);
    expect(workflow).not.toMatch(/actions\/(?:checkout|setup-node)@v[1-6]\b|pnpm\/action-setup@v[1-5]\b/);
    expect(JSON.parse(read("package.json")).packageManager).toBe("pnpm@11.24.0");
    const workspace = read("pnpm-workspace.yaml");
    expect(workspace).toMatch(/packages:\s*\n\s+- \./);
    expect(workspace).toMatch(/allowBuilds:\s*\n\s+esbuild:\s*true/);
    expect(read(".gitignore")).toMatch(/(?:^|\n)node_modules\//);
    expect(read(".gitignore")).toMatch(/(?:^|\n)\.vercel(?:\n|$)/);
  });

  it("does not commit credential-looking values in governance files", () => {
    const secretPattern = /\b(?:sbp_|vcp_|re_[A-Za-z0-9]|sk-(?:proj-)?)[A-Za-z0-9_-]{12,}/g;
    const offenders = [
      "AGENTS.md",
      "CLAUDE.md",
      ".github/pull_request_template.md",
      ".github/workflows/continuous-governance.yml",
    ].filter((file) =>
      secretPattern.test(read(file)),
    );
    expect(offenders).toEqual([]);
  });
});
