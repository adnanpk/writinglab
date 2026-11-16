# Writing Lab

Next.js 15 (App Router) + TypeScript + Tailwind. English/Arabic (RTL), day/night, text size, 6 accent colours.

## Run
```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Where to edit things
- Rates, turnaround multipliers, volume discounts, promo codes: `src/lib/pricing.ts` (turnaround multipliers are assumptions)
- Contact details & socials: `.env.local` (`NEXT_PUBLIC_*`) and `src/lib/site.ts`
- All copy (English + Arabic), FAQ, legal text: `src/lib/i18n.ts`
- Showcase sentence + editor comments: `src/lib/data.ts`
- Placeholder testimonials: `src/lib/i18n.ts` (`testi`), replace before launch

## Deploy (Hostinger Business, Node.js app)
Build command `npm run build`, start command `npm start`, set the env vars from `.env.example`.
`/api/submit` needs the Node runtime (Resend email + Google Drive/Docs). Without credentials it returns 503 in production.

## Google Drive setup
Create a service account, enable the Drive API, share a Drive folder with the service-account email (Editor),
and put its ID in `GOOGLE_DRIVE_FOLDER_ID`. Each submission gets its own folder with a Google Doc of the details + the uploaded file.
