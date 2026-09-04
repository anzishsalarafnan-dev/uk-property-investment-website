export function contactConfirmationHtml(name: string) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #171717;">
    <h1 style="font-size: 20px;">We've received your message</h1>
    <p style="color: #475569;">Hi ${name}, thanks for reaching out. Our team will get back to you within one business day.</p>
  </div>`;
}
