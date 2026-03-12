const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { product, quantity, totalPrice, form } = payload;

  // Basic input guard — never trust client data
  if (!product?.title || !form?.name || !form?.phone || !form?.address || !form?.city || !form?.paymentOption) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
  }

  const payLabel =
    form.paymentOption === 'pay-on-delivery' ? 'Pay on Delivery' : 'Pay Before Delivery';

  const html = `
    <!-- Wrapper -->
    <div style="background: #f3f4f6; padding: 32px 16px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
    <div style="max-width: 600px; margin: 0 auto;">

      <!-- Header -->
      <div style="background: linear-gradient(135deg, #111111 0%, #1f2937 100%);
                  border-radius: 12px 12px 0 0; padding: 28px 32px;
                  display: flex; align-items: center; gap: 14px;">
        <!-- Lock + bolt icon inline -->
        <svg width="40" height="40" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0;">
          <rect width="64" height="64" rx="12" fill="#1c2340"/>
          <path d="M 20 38 L 20 28 A 12 12 0 0 0 44 28 L 44 38" fill="none" stroke="#d4a017" stroke-width="5.5" stroke-linecap="round"/>
          <rect x="11" y="36" width="42" height="24" rx="7" fill="#d4a017"/>
          <path d="M 34 42 L 28 49 L 32 49 L 30 56 L 38 49 L 34 49 Z" fill="#111111"/>
        </svg>
        <div>
          <p style="color: #d4a017; font-size: 11px; font-weight: 700; letter-spacing: 1.5px;
                    text-transform: uppercase; margin: 0 0 3px;">SmartToolsHubNg</p>
          <h1 style="color: #ffffff; font-size: 20px; font-weight: 800; margin: 0;">
            🛒 New Order Received
          </h1>
        </div>
      </div>

      <!-- Body card -->
      <div style="background: #ffffff; border-left: 1px solid #e5e7eb;
                  border-right: 1px solid #e5e7eb; padding: 32px;">

        <!-- ORDER DETAILS section header -->
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #d4a017;
                  text-transform: uppercase; margin: 0 0 12px; border-bottom: 2px solid #fdf6e3;
                  padding-bottom: 8px;">Order Details</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
          <tbody>
            <tr>
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px; width: 130px; vertical-align: top;">Product</td>
              <td style="padding: 9px 0; font-weight: 700; color: #111827; font-size: 14px;">${escapeHtml(product.title)}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px;">Quantity</td>
              <td style="padding: 9px 0; font-weight: 600; color: #111827;">${escapeHtml(String(quantity))}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px;">Unit Price</td>
              <td style="padding: 9px 0; color: #374151;">${escapeHtml(String(product.price))}</td>
            </tr>
          </tbody>
        </table>

        <!-- Total highlight pill -->
        <table style="width: 100%; background: linear-gradient(135deg, #111111 0%, #1f2937 100%);
                      border-radius: 10px; margin-bottom: 32px; border-collapse: collapse;">
          <tbody>
            <tr>
              <td style="padding: 16px 20px; color: #d1d5db; font-size: 13px; font-weight: 600;
                         letter-spacing: 0.5px; white-space: nowrap;">ORDER TOTAL</td>
              <td style="padding: 16px 20px; color: #d4a017; font-size: 22px; font-weight: 900;
                         text-align: right; white-space: nowrap;">${escapeHtml(String(totalPrice))}</td>
            </tr>
          </tbody>
        </table>

        <!-- CUSTOMER DETAILS section header -->
        <p style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; color: #d4a017;
                  text-transform: uppercase; margin: 0 0 12px; border-bottom: 2px solid #fdf6e3;
                  padding-bottom: 8px;">Customer Details</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
          <tbody>
            <tr>
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px; width: 130px;">Name</td>
              <td style="padding: 9px 0; font-weight: 600; color: #111827;">${escapeHtml(form.name)}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px;">Phone</td>
              <td style="padding: 9px 0; color: #111827;">${escapeHtml(form.phone)}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px;">Address</td>
              <td style="padding: 9px 0; color: #111827;">${escapeHtml(form.address)}, ${escapeHtml(form.city)}</td>
            </tr>
            <tr style="border-top: 1px solid #f3f4f6;">
              <td style="padding: 9px 0; color: #6b7280; font-size: 13px;">Payment</td>
              <td style="padding: 9px 0;">
                <span style="display: inline-block; background: #fdf6e3; color: #b8860b;
                             border: 1px solid #d4a017; border-radius: 6px;
                             padding: 3px 10px; font-size: 12px; font-weight: 700;">
                  ${escapeHtml(payLabel)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div style="background: #111111; border-radius: 0 0 12px 12px;
                  padding: 16px 32px; text-align: center;">
        <p style="color: #6b7280; font-size: 11px; margin: 0;">
          Automated order notification &nbsp;·&nbsp;
          <span style="color: #d4a017; font-weight: 600;">SmartToolsHubNg</span>
          &nbsp;·&nbsp; Lagos, Nigeria
        </p>
      </div>

    </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"SmartToolsHubNg Orders" <${process.env.SMTP_USER}>`,
      to: process.env.ORDER_EMAIL,
      replyTo: form.phone ? undefined : form.phone,
      subject: `New Order: ${product.title} × ${quantity}`,
      html,
    });
    return { statusCode: 200, body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error('[send-order] Mail error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email. Please try again.' }) };
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
