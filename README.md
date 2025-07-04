# Supplier Management System - Laravel

A complete supplier management system built with Laravel, featuring a modern web interface for managing supplier relationships and partnerships.

## Features

- **Supplier Management**: Add, edit, view, and delete suppliers
- **Advanced Search & Filtering**: Search by name, email, contact person with status and category filters
- **Dashboard Statistics**: Overview of total suppliers, active suppliers, total value, and average ratings
- **Responsive Design**: Modern, mobile-friendly interface built with Tailwind CSS
- **RESTful API**: Complete API endpoints for all supplier operations
- **Database Seeding**: Pre-populated sample data for testing

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd supplier-management-laravel
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Database Configuration**
   - Update your `.env` file with database credentials
   - Create a new MySQL database named `supplier_management`

6. **Run Migrations and Seeders**
   ```bash
   php artisan migrate --seed
   ```

7. **Build Assets**
   ```bash
   npm run build
   # or for development
   npm run dev
   ```

8. **Start the Development Server**
   ```bash
   php artisan serve
   ```

Visit `http://localhost:8000` to access the application.

## API Endpoints

### Suppliers
- `GET /api/suppliers` - List all suppliers with filtering and pagination
- `POST /api/suppliers` - Create a new supplier
- `GET /api/suppliers/{id}` - Get supplier details
- `PUT /api/suppliers/{id}` - Update supplier
- `DELETE /api/suppliers/{id}` - Delete supplier
- `GET /api/suppliers/stats` - Get dashboard statistics
- `GET /api/suppliers/categories` - Get available categories

### Query Parameters for Listing
- `search` - Search by name, email, or contact person
- `status` - Filter by status (active, inactive, pending)
- `category` - Filter by category
- `sort_by` - Sort field (default: name)
- `sort_order` - Sort direction (asc, desc)

## Database Schema

### Suppliers Table
- `id` - Primary key
- `name` - Company name
- `email` - Contact email (unique)
- `phone` - Contact phone
- `address` - Physical address
- `city` - City
- `country` - Country
- `category` - Business category
- `status` - Status (active, inactive, pending)
- `rating` - Supplier rating (0-5)
- `total_orders` - Total number of orders
- `total_value` - Total monetary value
- `last_order` - Date of last order
- `contact_person` - Primary contact name
- `website` - Company website
- `tax_id` - Tax identification number
- `payment_terms` - Payment terms
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp
- `deleted_at` - Soft delete timestamp

## Technology Stack

- **Backend**: Laravel 10.x
- **Frontend**: Blade Templates with Vue.js 3
- **Styling**: Tailwind CSS
- **Database**: MySQL
- **Build Tool**: Vite
- **Icons**: Heroicons (SVG)

## Development

### Running in Development Mode
```bash
# Terminal 1 - Laravel development server
php artisan serve

# Terminal 2 - Asset compilation with hot reload
npm run dev
```

### Code Style
The project follows Laravel coding standards. Run the following to check code style:
```bash
./vendor/bin/pint
```

### Testing
```bash
php artisan test
```

## Production Deployment

1. **Environment Configuration**
   - Set `APP_ENV=production`
   - Set `APP_DEBUG=false`
   - Configure production database credentials

2. **Optimize for Production**
   ```bash
   composer install --optimize-autoloader --no-dev
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   npm run build
   ```

3. **Set Proper Permissions**
   ```bash
   chmod -R 755 storage bootstrap/cache
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure code style compliance
5. Submit a pull request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).