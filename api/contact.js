export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  const htmlBody = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px">
      <h2 style="color:#0f172a;margin:0 0 24px">New Demo Request</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0;width:120px">Name</td>
          <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0">Email</td>
          <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0"><a href="mailto:${email}" style="color:#1C38EA">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 12px;font-weight:600;color:#334155;border-bottom:1px solid #e2e8f0">Company</td>
          <td style="padding:8px 12px;color:#0f172a;border-bottom:1px solid #e2e8f0">${company || 'Not provided'}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
        <p style="margin:0 0 8px;font-weight:600;color:#334155">Message:</p>
        <p style="margin:0;color:#0f172a;white-space:pre-wrap">${message}</p>
      </div>
      <p style="margin:24px 0 0;font-size:12px;color:#64748b">Submitted from cleanspacestay.com contact form</p>
    </div>
  `;

  const textBody = `New Demo Request\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'CleanSpace Stay <hello@cleanspacestay.com>',
        to: ['hello@cleanspacestay.com'],
        reply_to: [email],
        subject: `Demo Request: ${name}${company ? ` — ${company}` : ''}`,
        html: htmlBody,
        text: textBody,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Resend error:', data);
      return res.status(500).json({ error: 'Failed to send message. Please try again.' });
    }

    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
}
