# E-Commerce Web Application

A modern e-commerce application built with React, TypeScript, Vite, and Tailwind CSS.

![Project Screenshot](https://via.placeholder.com/800x400)

## Features

- 📱 Responsive design that works on mobile, tablet, and desktop
- 🔐 User authentication with sign in and sign up functionality
- 🛍️ Product listing with filtering and sorting options
- 🔍 Filter products by various categories (ideal for, occasion, fabric, etc.)
- 💲 Multiple sort options (recommended, price low to high, etc.)
- ❤️ Add products to favorites
- 🛒 Shopping cart functionality
- 👤 User profile dropdown
- 🎨 Customizable product filtering
- 🌙 Mobile-friendly navigation and filter sidebar

## Tech Stack

- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [React Router](https://reactrouter.com/) - Routing library for React

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── Layout/
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   └── ProductCard.tsx
├── services/
│   └── index.ts
├── Types/
│   └── Product.ts
├── utils/
│   ├── index.ts
│   └── SortProducts.ts
├── App.tsx
└── main.tsx
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173/`

## Dependencies

- **Core**:
  - `react`: ^18.2.0
  - `react-dom`: ^18.2.0
  - `react-router-dom`: ^6.22.0
  - `typescript`: ^5.3.3
  - `vite`: ^5.0.8

- **UI & Styling**:
  - `tailwindcss`: ^3.4.1
  - `framer-motion`: ^11.0.3
  - `lucide-react`: ^0.330.0

- **Developer Tools**:
  - `typescript`: ^5.3.3
  - `@types/react`: ^18.2.43
  - `@types/react-dom`: ^18.2.17
  - `@vitejs/plugin-react`: ^4.2.1
  - `eslint`: ^8.55.0
  - `eslint-plugin-react`: ^7.33.2
  - `eslint-plugin-react-hooks`: ^4.6.0
  - `eslint-plugin-react-refresh`: ^0.4.5

## Component Overview

### ProductListing

The main page that displays all products with filtering and sorting capabilities.

- Fetches products from the API
- Handles sorting and filtering logic
- Responsive design for mobile and desktop
- User authentication status display
- Mobile navigation menu

### FilterSidebar

Component for filtering products by different categories.

- Multiple filter categories (ideal for, occasion, fabric, etc.)
- Collapsible filter sections
- Select/unselect all options
- Customizable product filtering

### ProductCard

Displays individual product information in a card format.

- Product image with hover effects
- Add to favorites functionality
- Product title, category, and price
- "Add to Cart" button that appears on hover or always on mobile
- Out of stock overlay

### Authentication Components

- `SignIn.tsx`: Login form with email and password
- `SignUp.tsx`: Registration form with validation
- `AuthProvider.tsx`: Context provider for authentication state

## API Integration

The application fetches product data from an external API. The `fetchProducts` function in the services directory handles the API calls.

