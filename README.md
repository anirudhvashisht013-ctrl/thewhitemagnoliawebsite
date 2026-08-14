# The White Magnolia — website

Single-page site for The White Magnolia, a boutique homestay in Kasauli, Himachal Pradesh.

## Run locally
    npm install
    npm run dev

## Build
    npm run build      # outputs to dist/

## Where to edit things
All booking links, phone numbers, room copy, places and house notes live in the
CONTACT + BOOKING DATA block at the top of `src/App.jsx`. Change them there and
they update everywhere on the page.

Design tokens (colours, fonts, shadows) are CSS variables at the top of `src/index.css`.

Photographs live in `public/img/`. Replace a file with the same name to swap an image.

## Deploying to Netlify
1. Push this folder to GitHub.
2. On Netlify: Add new site -> Import from Git -> pick the repo.
   Build command `npm run build`, publish directory `dist`. (netlify.toml sets this already.)
3. Domain settings -> Add custom domain -> thewhitemagnoliakasauli.com
4. Point the domain's nameservers at Netlify, or add the DNS records Netlify shows you.
   HTTPS is issued automatically and free.

Alternatively, drag the built `dist/` folder onto https://app.netlify.com/drop
for an instant deploy without Git.
