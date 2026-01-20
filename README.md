# Brothers Rising Web Portal

A modern single-page website built with Nuxt 3, Vue 3, and Tailwind CSS, recreating the Brothers Rising community website.

## Features

- Single-page application with smooth scrolling navigation
- Responsive design with mobile menu
- MailerLite API integration for newsletter subscriptions and contact forms
- Tailwind CSS-only styling (no custom CSS)
- Modern, warm, earthy design aesthetic

## Tech Stack

- **Framework**: Nuxt 3
- **UI Framework**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS v3
- **Email Marketing**: MailerLite API

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```env
MAILERLITE_API_KEY=your_mailerlite_api_key
MAILERLITE_GROUP_ID=your_newsletter_group_id
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
br-web-portal/
├── components/          # Vue components
│   ├── NavBar.vue
│   ├── HeroSection.vue
│   ├── OfferingsSection.vue
│   ├── AboutSection.vue
│   ├── NewsletterSection.vue
│   ├── ContactSection.vue
│   └── Footer.vue
├── composables/        # Vue composables
│   └── useMailerLite.ts
├── server/
│   └── api/            # Server API routes
│       ├── subscribe.post.ts
│       └── contact.post.ts
├── pages/
│   └── index.vue       # Main page
├── assets/
│   ├── images/         # Images and assets
│   └── css/
│       └── main.css    # Tailwind imports
└── public/             # Static assets
```

## MailerLite Setup

1. Get your MailerLite API key from your MailerLite account settings
2. Get your Group ID for the newsletter subscribers group
3. Add both to your `.env` file

The API key is kept server-side only for security. All form submissions go through Nuxt server API routes.

## Design System

- **Colors**: Earthy stone tones with gold/amber accents
- **Typography**: Serif fonts for headings, sans-serif for body text
- **Spacing**: Consistent Tailwind spacing scale
- **Responsive**: Mobile-first approach with breakpoints at sm, md, lg

## Navigation

The navigation bar includes:
- Home
- Offerings
- About
- Sign Up
- WhatsApp Community (external link)
- Contact

All internal links use smooth scrolling to section IDs.

## Adding Images

Place your images in the `assets/images/` directory and reference them in components. For example:

```vue
<img src="~/assets/images/hero-background.jpg" alt="Hero" />
```

## License

© 2024 Brothers Rising. All rights reserved.
