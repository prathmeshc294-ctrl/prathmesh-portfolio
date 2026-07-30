# Prathmesh Chavan — Portfolio Website

A production-ready, static portfolio site. No build step, no dependencies to install —
just open `index.html` in a browser, or deploy the folder as-is.

## File structure
```
index.html          → all sections/content
css/style.css        → design tokens, layout, responsive rules, animations
js/main.js            → theme toggle, scroll reveals, nav highlighting, form logic, effects
assets/profile.jpg    → your profile photo (cropped + enhanced)
Prathmesh_Chavan_GET_Resume.pdf  → linked from the "Download CV" button
robots.txt / sitemap.xml         → basic SEO
```

## Run it locally
Just double-click `index.html`, or serve it properly (recommended, so relative
asset paths and the mobile viewport behave normally):

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy it for free (pick one)
- **Vercel**: `npm i -g vercel` → run `vercel` inside the folder → done.
- **Netlify**: drag-and-drop the folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the folder to a repo, enable Pages on the `main` branch.

Whichever you use, update the `og:url`, `canonical`, and `sitemap.xml` URLs
in `index.html` to match your real domain.

## Turn on the contact form
Right now, submitting the form opens the visitor's email client with a
pre-filled message to prathmesh0033@gmail.com — it works with zero setup.

To send messages silently instead:
1. Create a free account at https://www.emailjs.com
2. Add the EmailJS SDK script tag to `index.html`, above `js/main.js`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   <script>emailjs.init("YOUR_PUBLIC_KEY");</script>
   ```
3. Set these two lines right before that init call:
   ```html
   <script>
     window.EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
     window.EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
   </script>
   ```
`main.js` already checks for these and will use EmailJS automatically once present.

## Notes on content accuracy
Every fact on this site (experience, education, projects, certifications,
skills, contact details) was taken directly from your resume. Nothing was
invented. If you update your resume, search the corresponding text in
`index.html` and update it there — content isn't pulled from the PDF dynamically.
