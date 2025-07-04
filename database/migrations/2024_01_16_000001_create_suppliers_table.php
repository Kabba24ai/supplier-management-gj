<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('suppliers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->text('address');
            $table->string('city');
            $table->string('country');
            $table->string('category');
            $table->enum('status', ['active', 'inactive', 'pending'])->default('active');
            $table->decimal('rating', 2, 1)->default(0);
            $table->integer('total_orders')->default(0);
            $table->decimal('total_value', 12, 2)->default(0);
            $table->date('last_order')->nullable();
            $table->string('contact_person');
            $table->string('website')->nullable();
            $table->string('tax_id')->nullable();
            $table->string('payment_terms')->default('Net 30');
            $table->timestamps();
            $table->softDeletes();

            // Indexes
            $table->index(['status', 'category']);
            $table->index('email');
            $table->index('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('suppliers');
    }
};