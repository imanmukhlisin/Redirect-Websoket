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

    /* Badges & Pro Tips */
    .badge-container {
      display: flex;
      gap: 8px;
      margin: 8px 0;
      flex-wrap: wrap;
    }
    .hw-badge {
      font-size: 11px;
      font-weight: 600;
      color: #A5D6FF;
      background: rgba(88, 166, 255, 0.15);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(88, 166, 255, 0.2);
    }
    .pro-tip {
      margin-top: 12px;
      background: rgba(46, 160, 67, 0.1);
      border-left: 3px solid #3FB950;
      padding: 10px 14px;
      border-radius: 4px 8px 8px 4px;
      font-size: 12px;
      color: #D2A8FF; /* Warna font ala IDE agar technical */
    }
    .pro-tip strong {
      color: #3FB950;
      display: block;
      margin-bottom: 2px;
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
        <div class="badge-container">
          <span class="hw-badge">🚀 ROI &lt; 12 Bulan</span>
          <span class="hw-badge">⚡ 36W Ultra Low-Power</span>
          <span class="hw-badge">🐳 10+ Docker Container Setup</span>
        </div>
        <div class="hardware-specs">
          Stop bayar VPS mahal bulanan. Homelab server hemat energi ini lebih dari cukup buat <i>run script</i> N8N, WhatsApp Bot, dan automasi 24/7 lo tanpa limitasi <i>provider</i>.
        </div>
        
        <div class="pro-tip">
          <strong>💡 Developer Note:</strong>
          <span style="color:#C9D1D9;">"Gue pribadi pakai ini. Setup ini sanggup angkat full stack automation (Postgres + Redis + API Server) tanpa throttling atau overheat. Modalnya sekali, akses root 100% milik lu selamanya."</span>
        </div>
      </div>

      <a href="${safeAffiliate}" class="btn btn-companion" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.81,11.69,4.81,12c0,0.31,0.02,0.65,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>
        Cek Harga & Mulai Rakit Server ↗
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
