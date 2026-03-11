# Product App - React + Vite E-commerce Application

This is a modern product e-commerce application built with React and Vite, featuring product search, filtering, cart management, and a responsive design.

## Features

- **Product Listing** - Browse all available products with infinite scroll
- **Search Bar** - Search products by name in real-time with debouncing
- **Filter by Category** - Filter products by different categories
- **Product Details Modal** - View detailed information about each product
- **Shopping Cart** - Add products to cart with quantity management
- **Remove from Cart** - Delete items from your shopping cart
- **Responsive Design** - Works seamlessly on all device sizes
- **Smooth Animations** - Hover effects on product cards and buttons
- **Tailwind CSS Integration** - Modern styling with Tailwind CSS

## Screenshots

### Homepage
![Product App Homepage](./screenshots/homepage.png)

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- React Router DOM (for navigation)
- Axios (for API calls)
- ESLint (for code quality)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd product-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx      - Search input component
│   ├── Filter.jsx          - Category filter dropdown
│   ├── ProductCard.jsx     - Product card component
│   ├── ProductModel.jsx    - Product detail modal
│   ├── CartModal.jsx       - Shopping cart modal
│   └── Pagination.jsx      - Pagination component
├── pages/
│   └── Products.jsx        - Main products page
├── services/
│   └── api.js              - API calls
├── context/
│   └── CartContext.jsx     - Cart context for state management
├── App.jsx                 - Root component
├── index.css               - Global styles
└── main.jsx                - Entry point
```

## Features Explanation

### Add to Cart
Click the "Add To Cart" button on any product card to add it to your shopping cart. If the product is already in the cart, the quantity will increase.

### View Cart
Click the cart badge (🛒 Cart) in the header to view your shopping cart with all added items, quantities, and total price.

### Remove from Cart
In the cart modal, click the "✕ Remove" button next to any item to remove it from the cart.

### Search & Filter
- Use the search bar to find products by name
- Use the category filter dropdown to filter products by category
- Both features work together seamlessly

## How to Add More Screenshots

1. Take a screenshot of your app and save it to the `screenshots/` folder
2. Update this README.md:
```markdown
### Feature Name
![Feature Description](./screenshots/your-image.png)
```

## ESLint Configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
