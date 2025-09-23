# Snyexisai - Modern Next.js Application

A modern, scalable Next.js frontend project with TypeScript, Tailwind CSS, and component-based architecture.

## 🚀 Features

- **Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling with custom design system
- **Component-based architecture** with reusable UI components
- **ESLint & Prettier** for code quality
- **Modern development workflow** with hot reload
- **Responsive design** with mobile-first approach
- **SEO optimized** with proper meta tags
- **Performance optimized** with automatic code splitting

## 📁 Project Structure

```
snyexisai/
├── .github/
│   └── copilot-instructions.md    # GitHub Copilot configuration
├── public/                        # Static assets
│   ├── images/                   # Image assets
│   └── icons/                    # Icon assets
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/               # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   │   └── Button.tsx       # Button component
│   │   ├── layout/              # Layout components
│   │   │   └── Navigation.tsx   # Navigation component
│   │   └── forms/               # Form components
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # General utilities
│   │   ├── config.ts            # App configuration
│   │   └── constants.ts         # App constants
│   └── types/                   # TypeScript type definitions
│       └── index.ts             # Global types
├── .eslintrc.json               # ESLint configuration
├── .prettierrc.json             # Prettier configuration
├── .gitignore                   # Git ignore rules
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

## 🛠 Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Quality:** ESLint, Prettier
- **Package Manager:** npm/yarn/pnpm

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd snyexisai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🎨 Design System

The project includes a comprehensive design system built with Tailwind CSS:

### Colors
- Custom CSS variables for consistent theming
- Light and dark mode support
- Semantic color naming (primary, secondary, accent, etc.)

### Components
- **Button**: Variants (default, outline, ghost, link) and sizes (sm, default, lg, icon)
- **Navigation**: Responsive navigation with mobile menu
- **Layout**: Consistent page layouts and containers

### Typography
- Optimized font loading with `next/font`
- Responsive typography scales
- Semantic heading hierarchy

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Tailwind CSS

The project uses a custom Tailwind configuration with:
- Custom color palette
- Design tokens
- Component variants
- Responsive breakpoints

### TypeScript

Configured with strict mode and path aliases:
- `@/*` - src directory
- `@/components/*` - components directory
- `@/lib/*` - lib directory
- `@/types/*` - types directory

## 📦 Component Library

### UI Components

Located in `src/components/ui/`:
- **Button** - Flexible button component with variants
- More components to be added...

### Layout Components

Located in `src/components/layout/`:
- **Navigation** - Responsive navigation bar
- More layout components to be added...

### Form Components

Located in `src/components/forms/`:
- Form components to be added...

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

### Other Platforms

The project can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Heroku
- AWS
- Google Cloud

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the [Next.js documentation](https://nextjs.org/docs)
- Review the [Tailwind CSS documentation](https://tailwindcss.com/docs)
- Create an issue in this repository

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS.