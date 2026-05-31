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
  
  <!-- OPEN GRAPH HEADER UNTUK MENYEMBUNYIKAN PREVIEW PRODUK SHOPEE -->
  <meta property="og:title" content="Open Source Gateway">
  <meta property="og:description" content="Curated tools and resources for developers. Click to access target repository.">
  <meta property="og:image" content="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png">
  <meta property="og:url" content="https://github.com">
  <meta name="twitter:card" content="summary">

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
      --btn-companion: #30363D;
      --btn-companion-hover: #3C444D;
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

    /* Hardware Card Layout (Full Width Target) */
    .hardware-layout {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
      text-align: left;
      background: rgba(255,255,255,0.03);
      padding: 16px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .hardware-media {
      width: 100%;
      border-radius: 8px;
      aspect-ratio: 16/9;
      object-fit: cover;
      background: #000;
    }
    .hardware-title {
      font-size: 16px;
      color: #FFF;
      font-weight: 600;
      margin-top: 4px;
    }
    .hardware-specs {
      font-size: 13px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .btn-companion {
      background-color: var(--btn-companion);
      color: #FFF;
      border: 1px solid var(--card-border);
    }
    .btn-companion:hover {
      background-color: var(--btn-companion-hover);
      border-color: var(--text-muted);
    }

    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 12px;
      color: var(--text-muted);
    }

    @media (max-width: 480px) {
      .card { padding: 20px 16px; }
      .hardware-layout { padding: 12px; }
    }

    /* Pairing Line Indicator */
    .pairing-line {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: -12px 0;
      z-index: 10;
      position: relative;
    }
    .pairing-badge {
      background: var(--card-border);
      color: var(--accent);
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 20px;
      border: 1px solid var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 0 15px rgba(88, 166, 255, 0.2);
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
        Akses Repositori GitHub
      </a>
    </div>

    <!-- Pairing Indicator -->
    <div class="pairing-line">
      <div class="pairing-badge">Better Together ✨</div>
    </div>

    <!-- Monetization Card (Hardware Companion) -->
    <div class="card">
      <h2 class="card-title">Hardware Companion: Local Server</h2>
      
      <div class="hardware-layout">
        <!-- Path video di bawah mengarah ke root Vercel public.
             User harus memasukannya ke folder /public/beelink-n95.mp4 -->
        <video autoplay loop muted playsinline class="hardware-media">
          <source src="/beelink-n95.mp4" type="video/mp4">
        </video>
        <div class="hardware-title">Beelink Mini S12 (Intel N95)</div>
        <div class="hardware-specs">
          Homelab server ultra-kompak. 36W hemat daya, 8GB DDR4, 256GB NVME SSD. Solusi run script 24/7 tanpa kepanasan.
        </div>
      </div>

      <a href="${safeAffiliate}" class="btn btn-companion" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
        Cek Harga & Ketersediaan ↗
      </a>
    </div>

  </div>

  <div class="footer">
    © ${new Date().getFullYear()} Resourced Shinkows
  </div>

</body>
</html>
  `;
}
