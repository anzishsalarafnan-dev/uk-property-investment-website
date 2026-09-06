import { isHoneypotTriggered } from "./honeypot";

describe("isHoneypotTriggered", () => {
  it("returns false when the field is undefined", () => {
    expect(isHoneypotTriggered(undefined)).toBe(false);
  });

  it("returns false when the field is an empty string", () => {
    expect(isHoneypotTriggered("")).toBe(false);
  });

  it("returns false when the field is only whitespace", () => {
    expect(isHoneypotTriggered("   ")).toBe(false);
  });

  it("returns true when the field contains text (bot filled it in)", () => {
    expect(isHoneypotTriggered("http://spam.com")).toBe(true);
  });

  it("returns false for non-string values", () => {
    expect(isHoneypotTriggered(123)).toBe(false);
    expect(isHoneypotTriggered(null)).toBe(false);
  });
});
