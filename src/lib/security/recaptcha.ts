export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // If not configured, don't block the app — treat as pass.
    return true;
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    // v3 returns a score 0.0 (bot) - 1.0 (human). 0.5 is Google's suggested threshold.
    return data.success === true && (data.score === undefined || data.score >= 0.5);
  } catch {
    // If Google's API is unreachable, fail open rather than blocking real users.
    return true;
  }
}
