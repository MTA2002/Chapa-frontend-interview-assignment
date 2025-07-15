# Chapa PSP Dashboard

A modern, feature-rich Payment Service Provider (PSP) dashboard built with Next.js 15, offering comprehensive payment management, user administration, and multi-language support.

![Chapa PSP Dashboard](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=flat-square&logo=tailwindcss)

## 🚀 Features

### 🔐 Authentication & Authorization

- **Secure Login/Signup** - JWT-based authentication with form validation
- **Role-Based Access Control** - Three user roles: User, Admin, Super Admin
- **Auto Wallet Creation** - Automatic wallet generation for new users
- **Session Management** - Persistent authentication with Zustand state management

### 👥 User Management

- **User Registration** - Complete user onboarding with personal information
- **User Administration** - Admin panel for user management and oversight
- **Profile Management** - User profile editing and management
- **User Status Control** - Activate/deactivate user accounts

### 💳 Payment & Wallet Management

- **Digital Wallets** - Automatic wallet creation and management
- **Transaction History** - Comprehensive transaction tracking and reporting
- **Payment Processing** - Simulated payment processing with MSW
- **Transaction Analytics** - Real-time transaction statistics and insights

### 🌐 Internationalization

- **Multi-Language Support** - English and Amharic language support
- **Dynamic Language Switching** - Real-time language toggle in dashboard
- **Localized Content** - Complete UI translation with next-intl
- **Locale-based Routing** - URL-based locale management

### 📱 Responsive Design

- **Mobile-First Approach** - Optimized for all device sizes
- **Responsive Dashboard** - Adaptive layout for desktop, tablet, and mobile
- **Mobile Navigation** - Hamburger menu for mobile users
- **Touch-Friendly UI** - Optimized for touch interactions

### 🎨 Modern UI/UX

- **Shadcn/ui Components** - Beautiful, accessible component library
- **Professional Design** - Clean, modern interface design
- **Interactive Elements** - Hover effects, animations, and transitions
- **Consistent Theming** - Unified design system throughout the app

## 🛠️ Technologies Used

### Frontend Framework

- **[Next.js 15.3.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.0.0](https://reactjs.org/)** - Latest React with concurrent features
- **[TypeScript 5.0](https://www.typescriptlang.org/)** - Type-safe development

### Styling & UI

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/ui](https://ui.shadcn.com/)** - Reusable component library
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[React Icons](https://react-icons.github.io/react-icons/)** - Popular icon library

### State Management & Forms

- **[Zustand 5.0.6](https://zustand-demo.pmnd.rs/)** - Lightweight state management
- **[React Hook Form 7.60.0](https://react-hook-form.com/)** - Performant forms
- **[Zod 4.0.5](https://zod.dev/)** - TypeScript-first schema validation
- **[@hookform/resolvers](https://github.com/react-hook-form/resolvers)** - Form validation resolvers

### Internationalization

- **[next-intl 4.3.4](https://next-intl-docs.vercel.app/)** - Complete i18n solution
- **Locale-based Routing** - URL-based language switching
- **Server-side Translation** - Optimized translation loading

### Development & Testing

- **[MSW 2.10.4](https://mswjs.io/)** - Mock Service Worker for API mocking
- **[ESLint 9.0](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS processing and optimization

### Additional Libraries

- **[React Hot Toast](https://react-hot-toast.com/)** - Beautiful notifications
- **[NextJS TopLoader](https://www.npmjs.com/package/nextjs-toploader)** - Page loading indicator
- **[Class Variance Authority](https://cva.style/docs)** - Component variant management
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

## 🏗️ Project Structure

```
chapa-frontend-assaignment/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   │   ├── (auth)/        # Authentication pages
│   │   │   ├── dashboard/     # Dashboard pages
│   │   │   └── page.tsx       # Home page
│   │   ├── globals.css        # Global styles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── home-page/        # Landing page components
│   │   └── common/           # Shared components
│   ├── stores/               # Zustand stores
│   ├── mocks/                # MSW mock handlers
│   ├── lib/                  # Utility functions
│   └── i18n/                 # Internationalization config
├── messages/                  # Translation files
├── public/                    # Static assets
└── package.json              # Dependencies
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chapa-frontend-assaignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Initialize MSW (if needed)**

   ```bash
   npx msw init public --save
   ```

4. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Configuration

### Environment Setup

The application uses Mock Service Worker (MSW) for API simulation in development. No additional environment variables are required for basic functionality.

### Build Configuration

- **ESLint**: Disabled during builds for faster compilation
- **TypeScript**: Type checking can be skipped during builds
- **i18n**: Configured with next-intl for seamless internationalization

## 🌍 Internationalization

The app supports multiple languages:

- **English (en)** - Default language
- **Amharic (am)** - Complete translation

Language switching is available in the dashboard header, and all content is fully translated including:

- UI components and labels
- Form validation messages
- Dashboard content
- Role-based greetings
- Transaction types and statuses

## 👤 User Roles & Permissions

### User

- View personal dashboard
- Manage personal wallet
- View transaction history
- Update profile information

### Admin

- All User permissions
- View user management panel
- Activate/deactivate users
- Access admin-specific features

### Super Admin

- All Admin permissions
- Full system administration
- Complete user oversight
- System-wide analytics

## 🎯 Demo Features

### Mock Data

The application includes realistic mock data for:

- **Users**: Pre-created users with different roles
- **Transactions**: Sample transaction history
- **Wallets**: Mock wallet data with balances

### Persistent Storage

- **LocalStorage Integration**: Data persists across browser sessions
- **State Management**: Zustand handles real-time state updates
- **Data Manager**: Centralized data operations with CRUD functionality

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is created as part of a frontend interview assignment for Chapa.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [MSW Documentation](https://mswjs.io/docs/)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)

---

**Built with ❤️ using Next.js 15 and modern web technologies**
