export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, companyName, fullName, email, phone, platform, message } = req.body || {};

  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'Full name, email, and message are required.' });
  }

  const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
  const SENDGRID_TO_EMAIL = process.env.SENDGRID_TO_EMAIL;
  const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL;

  // Diagnostic: log which Sendgrid-prefixed env keys are visible (NOT values).
  // Removable once the form is working.
  const sendgridKeysVisible = Object.keys(process.env).filter((k) => k.startsWith('SENDGRID'));
  console.log('SendGrid env diagnostic:', {
    visibleKeys: sendgridKeysVisible,
    hasApiKey: !!SENDGRID_API_KEY,
    apiKeyLength: SENDGRID_API_KEY ? SENDGRID_API_KEY.length : 0,
    hasTo: !!SENDGRID_TO_EMAIL,
    hasFrom: !!SENDGRID_FROM_EMAIL,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });

  if (!SENDGRID_API_KEY || !SENDGRID_TO_EMAIL || !SENDGRID_FROM_EMAIL) {
    return res.status(500).json({
      error: 'Server email configuration is incomplete.',
      // Surface which keys are present (not values) so the client can see too.
      debug: {
        visibleSendgridKeys: sendgridKeysVisible,
        hasApiKey: !!SENDGRID_API_KEY,
        hasTo: !!SENDGRID_TO_EMAIL,
        hasFrom: !!SENDGRID_FROM_EMAIL,
      },
    });
  }

  const subject = type === 'customer-care'
    ? 'Customer Care Request from Moojic Website'
    : 'New Enquiry from Moojic Website';

  const html = `
    <h2>${subject}</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Contact Type</strong></td><td style="padding:8px;border:1px solid #ddd;">${type === 'customer-care' ? 'Customer Care' : 'Enquiry'}</td></tr>
      ${platform ? `<tr><td style="padding:8px;border:1px solid #ddd;"><strong>Platform</strong></td><td style="padding:8px;border:1px solid #ddd;">${platform}</td></tr>` : ''}
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Company Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${companyName || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Full Name</strong></td><td style="padding:8px;border:1px solid #ddd;">${fullName}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd;">${email}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;"><strong>Phone</strong></td><td style="padding:8px;border:1px solid #ddd;">${phone || 'N/A'}</td></tr>
      <tr><td style="padding:8px;border:1px solid #ddd;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #ddd;white-space:pre-wrap;">${message}</td></tr>
    </table>
  `;

  const text = `
Contact Type: ${type === 'customer-care' ? 'Customer Care' : 'Enquiry'}
${platform ? `Platform: ${platform}` : ''}
Company Name: ${companyName || 'N/A'}
Full Name: ${fullName}
Email: ${email}
Phone: ${phone || 'N/A'}
Message:
${message}
  `.trim();

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          { to: [{ email: SENDGRID_TO_EMAIL }] }
        ],
        from: { email: SENDGRID_FROM_EMAIL },
        subject,
        content: [
          { type: 'text/plain', value: text },
          { type: 'text/html', value: html },
        ],
      }),
    });

    if (response.status >= 200 && response.status < 300) {
      return res.status(200).json({ success: true });
    }

    const errorBody = await response.text();
    console.error('SendGrid error:', response.status, errorBody);

    // Return more specific errors to help debug
    if (response.status === 401) {
      return res.status(500).json({ error: 'Invalid SendGrid API key.' });
    }
    if (response.status === 403) {
      return res.status(500).json({ error: 'SendGrid sender not verified. Please verify ' + SENDGRID_FROM_EMAIL + ' in your SendGrid dashboard.' });
    }
    if (response.status === 400) {
      return res.status(500).json({ error: 'Bad request to SendGrid: ' + errorBody });
    }

    return res.status(500).json({ error: `SendGrid error (${response.status}): ${errorBody}` });
  } catch (err) {
    console.error('API error:', err);
    return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
}
