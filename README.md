# Supplier Management System

A modern, responsive supplier management system built with React, TypeScript, and Tailwind CSS.

## Features

- **Supplier Management**: Add, edit, view, and delete suppliers
- **Advanced Search & Filtering**: Search by name, email, contact person with status and category filters
- **Dashboard Statistics**: Overview of total suppliers, active suppliers, total value, and average ratings
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **TypeScript Support**: Full type safety throughout the application
- **Modern UI**: Clean, professional interface with smooth animations and transitions

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement (HMR)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supplier-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── SupplierModal.tsx
├── data/               # Mock data and API utilities
│   └── mockData.ts
├── types/              # TypeScript type definitions
│   └── supplier.ts
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Features Overview

### Dashboard Statistics
- Total number of suppliers
- Active suppliers count
- Total business value
- Average supplier rating

### Supplier Management
- **Add New Suppliers**: Complete form with validation
- **Edit Existing Suppliers**: Update supplier information
- **Delete Suppliers**: Remove suppliers with confirmation
- **View Details**: Comprehensive supplier information display

### Search and Filtering
- **Text Search**: Search by supplier name, email, or contact person
- **Status Filter**: Filter by active, inactive, or pending status
- **Category Filter**: Filter by business category
- **Clear Filters**: Reset all filters with one click

### Data Fields
Each supplier record includes:
- Basic Information (name, email, phone, address)
- Business Details (category, status, rating)
- Financial Data (total orders, total value, payment terms)
- Contact Information (contact person, website, tax ID)
- Timestamps (join date, last order date)

## Development

### Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Code Style

The project follows modern React best practices:
- Functional components with hooks
- TypeScript for type safety
- Tailwind CSS for styling
- Component composition
- Clean, readable code structure

### Adding New Features

1. **Components**: Add new components in `src/components/`
2. **Types**: Define TypeScript interfaces in `src/types/`
3. **Data**: Mock data and API calls in `src/data/`
4. **Styling**: Use Tailwind CSS classes for consistent design

## Customization

### Styling
The application uses Tailwind CSS for styling. You can customize:
- Colors in the Tailwind configuration
- Component styles by modifying CSS classes
- Layout and spacing using Tailwind utilities

### Data Structure
Modify the `Supplier` interface in `src/types/supplier.ts` to add or remove fields.
Update the mock data in `src/data/mockData.ts` accordingly.

### Components
All components are modular and can be easily customized or extended.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.