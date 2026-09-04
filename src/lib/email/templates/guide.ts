export function guideEmailHtml(guideTitle: string) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
    <h1 style="font-size: 20px;">Your Guide is Ready</h1>
    <p style="color: #475569;">Thanks for requesting <strong>${guideTitle}</strong>.</p>
    <p style="color: #475569;">Your download link will be available shortly. In the meantime, feel free to explore our
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/cities" style="color: #0f172a;">city guides</a>
      or get an
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/valuation" style="color: #0f172a;">instant valuation</a>
      for your own property.
    </p>
  </div>`;
}
