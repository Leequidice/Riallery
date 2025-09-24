# Riallery - Rialo Community Gallery

A digital gallery celebrating the creative spirit of the Rialo community. Built with modern web technologies and inspired by Rialo's minimalist design aesthetic.

![Riallery Screenshot](https://via.placeholder.com/800x400/262626/A9DDD3?text=Riallery+Gallery)

## 🎨 Features

- **Dark Theme Design**: Inspired by rialo.io's dramatic aesthetic
- **Curated Gallery**: Showcase community artworks with filters and search
- **Weekly Features**: Spotlight exceptional artists from the community
- **Responsive Design**: Optimized for desktop and mobile viewing
- **Modern UI**: Clean, minimalist interface with teal accent colors
- **Fast Performance**: Built with Next.js 15 and optimized for speed

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component
- **Development**: ESLint, Prettier

## 🎨 Design System

### Colors
- **Primary Green**: `#A9DDD3` (Rialo's signature teal)
- **Cream Background**: `#E8E3D5` (warm, sophisticated)
- **Dark Background**: `#262626` (neutral-900)
- **Pure Black**: `#010101` (text and accents)

### Typography
- **Font**: Inter (300, 400, 500, 600, 700)
- **Style**: Light weights with letter spacing for minimalist feel

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Leequidice/Riallery.git
cd riallery
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
riallery/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js app router pages
│   ├── components/        # Reusable UI components
│   │   ├── gallery/       # Gallery-specific components
│   │   ├── layout/        # Layout components (Header, Footer)
│   │   └── ui/           # Generic UI components
│   ├── config/           # Configuration files
│   ├── lib/              # Utility functions and API
│   └── types/            # TypeScript type definitions
├── tailwind.config.ts    # Tailwind CSS configuration
└── next.config.ts        # Next.js configuration
```

## 🎯 Key Components

### Gallery System
- **GalleryGrid**: Responsive grid layout for artworks
- **ArtworkCard**: Individual artwork display with hover effects
- **Filters**: Advanced filtering by medium, style, themes, etc.
- **Lightbox**: Full-screen artwork viewing experience

### Layout Components
- **Header**: Transparent navigation with pill-style menu
- **Footer**: Site information and social links
- **Button**: Consistent button styling across the app

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Sanity.io Configuration (for production CMS)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your_domain
```

### Customization
- **Colors**: Update `tailwind.config.ts` for color scheme changes
- **Typography**: Modify font settings in `src/app/layout.tsx`
- **Site Config**: Edit `src/config/site.ts` for metadata and navigation

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🎨 Design Philosophy

Riallery follows Rialo's design principles:
- **Minimalism**: Clean, uncluttered interfaces
- **Focus**: Art-first approach with minimal distractions  
- **Quality**: Thoughtful curation over quantity
- **Community**: Celebrating individual creativity within a collective

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Rialo Website**: [rialo.io](https://rialo.io)
- **Community**: [Discord](https://discord.gg/RialoProtocol)

## 📧 Contact

For questions about this project, please reach out through the Rialo community channels.

---

Built with ❤️ for the Rialo community
