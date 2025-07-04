<?php

namespace Database\Seeders;

use App\Models\Supplier;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    public function run(): void
    {
        $suppliers = [
            [
                'name' => 'TechFlow Solutions',
                'email' => 'contact@techflow.com',
                'phone' => '+1 (555) 123-4567',
                'address' => '123 Innovation Drive',
                'city' => 'San Francisco',
                'country' => 'USA',
                'category' => 'Technology',
                'status' => 'active',
                'rating' => 4.8,
                'total_orders' => 156,
                'total_value' => 2450000,
                'last_order' => '2024-01-15',
                'contact_person' => 'Sarah Johnson',
                'website' => 'https://www.techflow.com',
                'tax_id' => 'US123456789',
                'payment_terms' => 'Net 30',
            ],
            [
                'name' => 'Global Manufacturing Co.',
                'email' => 'orders@globalmanuf.com',
                'phone' => '+1 (555) 987-6543',
                'address' => '456 Industrial Blvd',
                'city' => 'Detroit',
                'country' => 'USA',
                'category' => 'Manufacturing',
                'status' => 'active',
                'rating' => 4.5,
                'total_orders' => 89,
                'total_value' => 1890000,
                'last_order' => '2024-01-12',
                'contact_person' => 'Michael Chen',
                'website' => 'https://www.globalmanuf.com',
                'tax_id' => 'US987654321',
                'payment_terms' => 'Net 45',
            ],
            [
                'name' => 'EcoSupply Partners',
                'email' => 'info@ecosupply.com',
                'phone' => '+1 (555) 456-7890',
                'address' => '789 Green Street',
                'city' => 'Portland',
                'country' => 'USA',
                'category' => 'Sustainability',
                'status' => 'pending',
                'rating' => 4.2,
                'total_orders' => 34,
                'total_value' => 567000,
                'last_order' => '2024-01-08',
                'contact_person' => 'Emma Rodriguez',
                'website' => 'https://www.ecosupply.com',
                'tax_id' => 'US456789123',
                'payment_terms' => 'Net 15',
            ],
            [
                'name' => 'Premium Materials Ltd',
                'email' => 'sales@premiummaterials.com',
                'phone' => '+44 20 7123 4567',
                'address' => '10 Regent Street',
                'city' => 'London',
                'country' => 'UK',
                'category' => 'Materials',
                'status' => 'active',
                'rating' => 4.9,
                'total_orders' => 203,
                'total_value' => 3200000,
                'last_order' => '2024-01-14',
                'contact_person' => 'James Wilson',
                'website' => 'https://www.premiummaterials.com',
                'tax_id' => 'GB123456789',
                'payment_terms' => 'Net 30',
            ],
            [
                'name' => 'Digital Innovations Inc',
                'email' => 'hello@digitalinnovations.com',
                'phone' => '+1 (555) 321-9876',
                'address' => '321 Tech Park',
                'city' => 'Austin',
                'country' => 'USA',
                'category' => 'Technology',
                'status' => 'inactive',
                'rating' => 3.8,
                'total_orders' => 67,
                'total_value' => 890000,
                'last_order' => '2023-12-20',
                'contact_person' => 'Lisa Park',
                'website' => 'https://www.digitalinnovations.com',
                'tax_id' => 'US789123456',
                'payment_terms' => 'Net 60',
            ],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::create($supplier);
        }
    }
}