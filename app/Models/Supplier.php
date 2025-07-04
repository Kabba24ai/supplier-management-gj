<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'address',
        'city',
        'country',
        'category',
        'status',
        'rating',
        'total_orders',
        'total_value',
        'last_order',
        'contact_person',
        'website',
        'tax_id',
        'payment_terms',
    ];

    protected $casts = [
        'rating' => 'decimal:1',
        'total_value' => 'decimal:2',
        'last_order' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $dates = [
        'last_order',
        'deleted_at',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%")
              ->orWhere('contact_person', 'like', "%{$search}%");
        });
    }

    // Accessors
    public function getFormattedTotalValueAttribute()
    {
        return '$' . number_format($this->total_value, 0);
    }

    public function getStatusColorAttribute()
    {
        return match($this->status) {
            'active' => 'bg-green-100 text-green-800 border-green-200',
            'inactive' => 'bg-red-100 text-red-800 border-red-200',
            'pending' => 'bg-yellow-100 text-yellow-800 border-yellow-200',
            default => 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }

    public function getJoinDateFormattedAttribute()
    {
        return $this->created_at->format('M j, Y');
    }

    public function getLastOrderFormattedAttribute()
    {
        return $this->last_order ? $this->last_order->format('M j, Y') : 'N/A';
    }
}