/* Topstar Labels website settings. Update purchase URLs here when confirmed. */
const SITE_SETTINGS = {
  books: {
    aiIncomePlaybook: {
      amazonUrl: "",
      payhipUrl: ""
    }
  },
  /* Add future YouTube videos here. Use the ID after youtu.be/ or v= in the video URL. */
  videos: [
    /* Example to activate: { id: "YOUR_VIDEO_ID", title: "The AI Income Playbook: Introduction", description: "A short introduction to the ebook and the ideas it explores.", featured: true, bookPage: true } */
  ],
  socials: [
    { name: "Facebook", short: "f", url: "https://www.facebook.com/profile.php?id=61575726305131&mibextid=ZbWKwL", className: "facebook" },
    { name: "YouTube", short: "▶", url: "https://youtube.com/@topstarlabels?si=YYEPNiO19DV_rt1u", className: "youtube" },
    { name: "X", short: "𝕏", url: "https://x.com/Topstarlabels", className: "x-social" },
    { name: "Instagram", short: "◎", url: "https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=xxr4hlb", className: "instagram" },
    { name: "TikTok", short: "♪", url: "https://www.tiktok.com/@starlabels1?_r=1&_t=ZS-9AfQbg9r2Hc", className: "tiktok" }
  ]
};

function socialLink(s, mode) {
  const label = mode === "compact" ? `<span class="social-short" aria-hidden="true">${s.short}</span><span class="sr-only">${s.name}</span>` : `<span class="social-short" aria-hidden="true">${s.short}</span><span class="social-name">${s.name}</span><span class="social-arrow" aria-hidden="true">↗</span>`;
  return `<a class="social-link ${s.className} ${mode === "compact" ? "social-compact" : ""}" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Visit Topstar Labels on ${s.name}">${label}</a>`;
}
document.querySelectorAll("[data-socials]").forEach(el => {
  const mode = el.dataset.socials;
  el.innerHTML = SITE_SETTINGS.socials.map(s => socialLink(s, mode)).join("");
});
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
if (menuToggle && nav) menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Activate purchase buttons automatically when a real product URL is supplied.
const purchaseUrls = {
  amazon: SITE_SETTINGS.books.aiIncomePlaybook.amazonUrl,
  payhip: SITE_SETTINGS.books.aiIncomePlaybook.payhipUrl
};
document.querySelectorAll("[data-purchase]").forEach(button => {
  const platform = button.dataset.purchase;
  const url = purchaseUrls[platform];
  const validUrl = typeof url === "string" && /^https?:\/\//i.test(url);
  if (validUrl) {
    button.href = url;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
    button.classList.remove("button-disabled");
    button.removeAttribute("aria-disabled");
    button.removeAttribute("title");
    button.textContent = platform === "amazon" ? "Buy on Amazon ↗" : "Get it on Payhip ↗";
  } else {
    // Keep the control visibly inactive until a real product URL is configured.
    button.href = "#";
    button.classList.add("button-disabled");
    button.setAttribute("aria-disabled", "true");
    button.setAttribute("title", `${platform === "amazon" ? "Amazon" : "Payhip"} product URL not yet added`);
    button.textContent = platform === "amazon" ? "Amazon link coming soon" : "Payhip link coming soon";
  }
});


// Responsive YouTube embeds. Videos are managed in SITE_SETTINGS.videos above.
// A video appears on the Videos page when configured, on the homepage if featured:true,
// and on the book page if bookPage:true. No HTML edits are needed to add future videos.
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
function validYouTubeId(id) {
  return /^[A-Za-z0-9_-]{11}$/.test(String(id || ""));
}
function videoCard(video) {
  const title = escapeHTML(video.title || "Topstar Labels video");
  const description = escapeHTML(video.description || "Watch more from Topstar Labels.");
  const id = String(video.id || "");
  if (!validYouTubeId(id)) return "";
  return `<article class="video-card"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div><div class="video-card-content"><p class="article-category">TOPSTAR LABELS VIDEO</p><h3>${title}</h3><p>${description}</p><a class="text-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div></article>`;
}
document.querySelectorAll("[data-video-list]").forEach(container => {
  const mode = container.dataset.videoList;
  const videos = SITE_SETTINGS.videos.filter(video => validYouTubeId(video.id));
  const chosen = mode === "featured" ? videos.filter(video => video.featured).slice(0, 1)
    : mode === "book" ? videos.filter(video => video.bookPage).slice(0, 3)
    : videos;
  if (chosen.length) {
    container.innerHTML = chosen.map(videoCard).join("");
  } else if (mode === "all") {
    container.innerHTML = `<div class="video-empty-state"><span class="video-empty-icon">▶</span><h3>Your video library starts here.</h3><p>New promotional videos and demonstrations will appear here as you add them to the website settings.</p><a class="button button-primary" href="https://www.youtube.com/@topstarlabels" target="_blank" rel="noopener noreferrer">Visit our YouTube channel ↗</a></div>`;
  } else {
    container.innerHTML = `<div class="video-placeholder"><span class="video-placeholder-icon">▶</span><div><strong>Video coming soon</strong><p>Related videos from Topstar Labels will appear here.</p><a class="text-link" href="videos.html">Visit the Videos page ↗</a></div></div>`;
  }
});
