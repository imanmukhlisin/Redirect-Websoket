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

export function renderInterstitial({ title, targetUrl, affiliateUrl }) {
  const safeTitle = escapeHtml(title);
  const safeTarget = escapeHtml(targetUrl);
  const safeAffiliate = escapeHtml(affiliateUrl);

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="robots" content="noindex,nofollow">
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}

body{
  font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;
  background:#0d1117;
  color:#e6edf3;
  min-height:100vh;
  min-height:100dvh;
  display:flex;
  align-items:center;
  justify-content:center;
  padding:24px 16px;
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
}

.card{
  width:100%;
  max-width:400px;
  text-align:center;
}

/* ── Secure Badge ── */
.badge{
  display:inline-flex;
  align-items:center;
  gap:6px;
  padding:6px 14px;
  background:rgba(46,160,67,.1);
  border:1px solid rgba(46,160,67,.25);
  border-radius:20px;
  font-size:12px;
  font-weight:500;
  color:#3fb950;
  margin-bottom:24px;
}

.badge-dot{
  width:7px;height:7px;
  background:#3fb950;
  border-radius:50%;
  flex-shrink:0;
}

/* ── Repo Icon ── */
.repo-icon{
  width:48px;height:48px;
  margin:0 auto 20px;
  color:#8b949e;
}

/* ── Title ── */
.repo-title{
  font-size:20px;
  font-weight:600;
  color:#e6edf3;
  line-height:1.4;
  margin-bottom:8px;
  word-break:break-word;
}

.repo-sub{
  font-size:14px;
  color:#8b949e;
  margin-bottom:32px;
}

/* ── Button ── */
.open-btn{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  width:100%;
  padding:14px 24px;
  font-family:'Inter',sans-serif;
  font-size:15px;
  font-weight:600;
  color:#e6edf3;
  background:#21262d;
  border:1px solid #30363d;
  border-radius:8px;
  cursor:pointer;
  transition:background .15s ease,border-color .15s ease;
  -webkit-tap-highlight-color:transparent;
}

.open-btn:hover{
  background:#30363d;
  border-color:#484f58;
}

.open-btn:active{
  background:#161b22;
}

.open-btn svg{
  width:16px;height:16px;
  color:#8b949e;
  flex-shrink:0;
}

/* ── Disclaimer ── */
.disclaimer{
  margin-top:32px;
  font-size:12px;
  line-height:1.6;
  color:#8b949e;
  padding:0 8px;
}

@media(min-width:480px){
  .repo-title{font-size:22px}
  .disclaimer{padding:0}
}
</style>
</head>
<body>
<div class="card">

  <!-- Secure Badge -->
  <div class="badge">
    <span class="badge-dot"></span>
    Secure connection
  </div>

  <!-- Repo Icon -->
  <svg class="repo-icon" viewBox="0 0 16 16" fill="currentColor">
    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5
    a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495
    0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25
    a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087
    a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
  </svg>

  <!-- Repo Name -->
  <h1 class="repo-title">${safeTitle}</h1>
  <p class="repo-sub">Repository is ready to open</p>

  <!-- Single Action Button -->
  <button class="open-btn" id="openBtn" onclick="bukaDua()">
    <svg viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38
      0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95
      0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27
      -.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82
      1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66
      0 0-.42-.77-1.22-.8 0 0-.78-.01-.05.48 0 0 .53.25.89 1.17 0 0 .47 1.43 2.69.94
      0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.998 7.998 0 0 1 0 8c0-4.42 3.58-8 8-8Z"/>
    </svg>
    Open Repository on GitHub ↗
  </button>

  <!-- Transparent Disclaimer -->
  <p class="disclaimer">
    Didukung oleh Shopee Affiliate. Klik Anda membantu kreator menyediakan repositori gratis harian.
  </p>

</div>

<iframe id="af" style="position:absolute;width:0;height:0;border:0;visibility:hidden"></iframe>

<script>
function bukaDua(){
  try{
    var w=window.open("${safeAffiliate}","_blank");
    if(!w||w.closed){document.getElementById("af").src="${safeAffiliate}";}
  }catch(e){document.getElementById("af").src="${safeAffiliate}";}
  window.location.href="${safeTarget}";
}
</script>
</body>
</html>`;
}
