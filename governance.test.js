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

  it("does not commit credential-looking values in governance files", () => {
    const secretPattern = /\b(?:sbp_|vcp_|re_[A-Za-z0-9]|sk-(?:proj-)?)[A-Za-z0-9_-]{12,}/g;
    const offenders = ["AGENTS.md", "CLAUDE.md", ".github/pull_request_template.md"].filter((file) =>
      secretPattern.test(read(file)),
    );
    expect(offenders).toEqual([]);
  });
});
