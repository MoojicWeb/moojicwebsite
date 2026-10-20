# Moojic Content Studio

This Sanity Studio is limited to blog posts and SEO metadata for the existing website pages. Blog posts support a cover image and optional inline images in the article body. The Vercel site reads published content from the public `production` dataset; no write token is used in the public website.

## Start the Studio

1. Install Node.js 22.12 or later.
2. From this directory, run `npm install`.
3. Run `npm run dev` and sign in with the Sanity account that owns project `oudkj47x`.
4. In Sanity Manage, set the `production` dataset to public and add `https://moojic.com` as a CORS origin (no credentials). Add `http://localhost:3000` as well for local development.
5. In the Studio, open **Page SEO** and create its fixed settings document; it starts with metadata for the existing routes. Blog posts can be created immediately; Sanity's normal Publish action makes them visible.
6. Run `npm run deploy` to host the editor on Sanity.

## Make publishing update SEO and the sitemap

The website reads published content directly from Sanity. Vercel also prerenders article pages and generates the sitemap at build time. After the site is deployed with this integration, create a Vercel Deploy Hook and a Sanity webhook for the `production` dataset that calls that hook when a published `blogPost` or `pageSeoSettings` document is created, updated, or deleted. Store the Deploy Hook URL only in Sanity's webhook configuration. This rebuilds the SEO HTML and sitemap after edits.

Published blog content and page metadata are public because the website must be able to fetch them. Drafts and editing actions require signing in to the Studio.
