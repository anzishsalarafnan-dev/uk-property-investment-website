import { formatGBP, formatPercent } from "./format";

describe("formatGBP", () => {
  it("formats a whole number as GBP currency", () => {
    expect(formatGBP(250000)).toBe("£250,000");
  });

  it("rounds to the nearest whole pound", () => {
    expect(formatGBP(250000.75)).toBe("£250,001");
  });

  it("formats zero correctly", () => {
    expect(formatGBP(0)).toBe("£0");
  });
});

describe("formatPercent", () => {
  it("formats a number with one decimal place and a percent sign", () => {
    expect(formatPercent(6.5)).toBe("6.5%");
  });

  it("rounds to one decimal place", () => {
    expect(formatPercent(6.567)).toBe("6.6%");
  });

  it("formats zero correctly", () => {
    expect(formatPercent(0)).toBe("0.0%");
  });
});
