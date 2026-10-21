# Topstar Labels author website

A responsive static website for Topstar Labels and the ebook *The AI Income Playbook*. It includes Home, Books, book detail, Videos, Articles, About and Contact/Socials pages. Responsive YouTube video sections are included on the homepage, book detail page and Videos page.

## Social links included
- Facebook: https://www.facebook.com/profile.php?id=61575726305131&mibextid=ZbWKwL
- YouTube: https://youtube.com/@topstarlabels?si=YYEPNiO19DV_rt1u
- X: https://x.com/Topstarlabels
- Instagram: https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=xxr4hlb
- TikTok: https://www.tiktok.com/@starlabels1?_r=1&_t=ZS-9AfQbg9r2Hc

## Before launch
1. Open `assets/site.js` and add the confirmed Amazon product URL and Payhip product URL in `SITE_SETTINGS.books.aiIncomePlaybook`. The same settings activate purchase buttons on the homepage, Books page and dedicated book page.
2. Replace the CSS-generated illustrative ebook cover with the actual approved book cover if you have it. The current cover is a designed placeholder, not the original book cover.
3. Review the author/about wording and the three starter articles before publishing.
4. If possible, replace the Instagram invitation URL with the direct public Instagram profile URL for a cleaner visitor experience.


## Adding YouTube videos later

You do not need to rebuild the site or pay for video hosting. Upload a video to your YouTube channel, then add one object to the `videos` array near the top of `assets/site.js`:

```js
videos: [
  {
    id: "VIDEO_ID11",
    title: "The AI Income Playbook: Introduction",
    description: "A short introduction to the ebook and the ideas it explores.",
    featured: true,
    bookPage: true
  }
],
```

Replace `VIDEO_ID11` with the exact 11-character ID from your YouTube URL. For example, in `https://www.youtube.com/watch?v=abcdefghijk`, the ID is `abcdefghijk` (example only). Keep the video ID in quotation marks. To add another video, add another object separated by a comma.

- `featured: true` shows the video on the homepage (the first featured video is shown there).
- `bookPage: true` shows the video on the *The AI Income Playbook* page (up to three related videos).
- Every valid video in the list appears on `videos.html`.

After editing `assets/site.js`, upload/commit the changed file to your GitHub repository. GitHub Pages publishes the update automatically; you do not need a build step. Videos are embedded from YouTube using a responsive 16:9 player and lazy loading. YouTube's own availability, privacy and embedding settings still apply.

## Free publishing using GitHub Pages
1. Create/sign in to a GitHub account at https://github.com/.
2. Create a new public repository named `topstar-author-website`.
3. Upload the contents of this folder (the HTML files, `assets` folder and README) to the repository root. Do not upload only the ZIP file.
4. In the repository, open **Settings → Pages**.
5. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
6. Wait for GitHub Pages to publish. Your free address will normally resemble `https://YOUR-USERNAME.github.io/topstar-author-website/`.

GitHub's interface can change, so follow its current Pages prompts if labels differ. A custom domain is optional and generally costs money. GitHub Pages is static hosting; there is no built-in mailing list, checkout, or contact form in this version.

## Editing the purchase links
In `assets/site.js`, change the two empty strings inside `SITE_SETTINGS.books.aiIncomePlaybook`:

```js
amazonUrl: "https://www.amazon.com/dp/YOUR_REAL_BOOK_ASIN",
payhipUrl: "https://payhip.com/b/YOUR_REAL_PRODUCT_CODE"
```

These are format examples only, not real purchase links. Replace each with the exact URL copied from your actual product listing. If a platform is not ready, leave its value as an empty string. The buttons on the homepage, Books page and book detail page will activate automatically for any valid `http://` or `https://` URL; otherwise they stay visibly disabled. Never guess a product URL.
