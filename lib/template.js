/**
 * renderInterstitial()
 * ─────────────────────
 * Desain etis & transparan — GitHub-themed repository gateway.
 * Tidak ada countdown, tidak ada impersonasi, tidak ada tipu-tipu.
 *
 * Prinsip:
 *  • User tahu mereka sedang mendukung kreator via affiliate
 *  • Satu tombol jujur: "Open Repository on GitHub ↗"
 *  • Disclaimer affiliate jelas di footer
 *  • Mobile-first, responsive, lightweight
 */

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function renderInterstitial({
  title,
  targetUrl,
  affiliateUrl,
  shopeeTitle,
  shopeeImageUrl,
}) {
  const safeTitle = escapeHtml(title);
  const safeTarget = escapeHtml(targetUrl);
  const safeAffiliate = escapeHtml(affiliateUrl);
  const safeShopeeTitle = escapeHtml(shopeeTitle || "Support Creator Set-up");
  const safeShopeeImage = escapeHtml(
    shopeeImageUrl || "https://img.icons8.com/color/96/shopee.png",
  );

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="robots" content="noindex,nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0E1117;
      --card-bg: #161B22;
      --card-border: #30363D;
      --text-main: #C9D1D9;
      --text-muted: #8B949E;
      --btn-github: #238636;
      --btn-github-hover: #2EA043;
      --btn-shopee: #EE4D2D;
      --btn-shopee-hover: #FF6644;
      --accent: #58A6FF;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
    }
    
    .container {
      max-width: 600px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Header Profile */
    .profile-header {
      text-align: center;
      margin-bottom: 10px;
    }
    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--btn-github), var(--accent));
      margin: 0 auto 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
    }
    .profile-title {
      font-size: 20px;
      font-weight: 600;
      color: #FFF;
      margin-bottom: 4px;
    }
    .profile-bio {
      font-size: 14px;
      color: var(--text-muted);
    }

    /* Bento Cards */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 24px;
      text-align: center;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    }

    .card-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #FFF;
    }

    .card-desc {
      font-size: 14px;
      color: var(--text-muted);
      margin-bottom: 20px;
    }

    /* Primary Target Button (GitHub) */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 14px 20px;
      border-radius: 8px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s ease;
      gap: 8px;
    }
    .btn-github {
      background-color: var(--btn-github);
      color: #FFF;
      border: 1px solid rgba(240,246,252,0.1);
    }
    .btn-github:hover {
      background-color: var(--btn-github-hover);
      transform: translateY(-1px);
    }

    /* Shopee Card Layout */
    .shopee-layout {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
      text-align: left;
      background: rgba(255,255,255,0.03);
      padding: 12px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .shopee-image {
      width: 64px;
      height: 64px;
      border-radius: 8px;
      object-fit: cover;
      background: #FFF;
    }
    .shopee-details {
      flex: 1;
      min-width: 0;
    }
    .shopee-item-title {
      font-size: 13px;
      color: #FFF;
      font-weight: 500;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .btn-shopee {
      background-color: transparent;
      color: var(--btn-shopee);
      border: 1px solid var(--btn-shopee);
    }
    .btn-shopee:hover {
      background-color: rgba(238, 77, 45, 0.1);
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: var(--text-muted);
    }

    @media (max-width: 480px) {
      .card { padding: 20px 16px; }
      .shopee-layout { align-items: flex-start; }
    }
  </style>
</head>
<body>

  <div class="container">
    
    <div class="profile-header">
      <div class="profile-avatar">💻</div>
      <h1 class="profile-title">Open Source Gateway</h1>
      <p class="profile-bio">Curated tools for developers & creators</p>
    </div>

    <!-- Main Target Card (GitHub) -->
    <div class="card">
      <h2 class="card-title">Requested Resource</h2>
      <p class="card-desc">Here is the link you requested. Tap below to continue.</p>
      <a href="${safeTarget}" class="btn btn-github">
        <svg fill="#fff" viewBox="0 0 24 24" width="20" height="20"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        Open Target URL
      </a>
    </div>

    <!-- Monetization Card (Shopee Affiliate) -->
    <div class="card">
      <h2 class="card-title">Support The Creator ☕</h2>
      <p class="card-desc">If my recommendations help you, consider supporting by checking out my setup gears. No extra cost to you!</p>
      
      <div class="shopee-layout">
        <img src="${safeShopeeImage}" alt="Product" class="shopee-image" />
        <div class="shopee-details">
          <div class="shopee-item-title">${safeShopeeTitle}</div>
        </div>
      </div>

      <a href="${safeAffiliate}" class="btn btn-shopee" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        View on Shopee
      </a>
    </div>

  </div>

  <div class="footer">
    Transparansi: Tombol belanja di atas merupakan link afiliasi.<br>
    © ${new Date().getFullYear()} Resourced via N8N Edge Systems
  </div>

</body>
</html>
  `;
}
