<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class SupplierController extends Controller
{
    public function index(Request $request)
    {
        $query = Supplier::query();

        // Search functionality
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->filled('status') && $request->status !== 'all') {
            $query->byStatus($request->status);
        }

        // Filter by category
        if ($request->filled('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortOrder = $request->get('sort_order', 'asc');
        $query->orderBy($sortBy, $sortOrder);

        $suppliers = $query->paginate(15);

        if ($request->expectsJson()) {
            return response()->json([
                'suppliers' => $suppliers,
                'stats' => $this->getStats(),
            ]);
        }

        return view('suppliers.index', compact('suppliers'));
    }

    public function create()
    {
        return view('suppliers.create');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'category' => 'required|string|in:Technology,Manufacturing,Materials,Sustainability,Services',
            'contact_person' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'tax_id' => 'nullable|string|max:50',
            'payment_terms' => 'required|string|in:Net 15,Net 30,Net 45,Net 60',
            'status' => 'required|string|in:active,inactive,pending',
        ]);

        $supplier = Supplier::create($validated);

        return response()->json([
            'message' => 'Supplier created successfully',
            'supplier' => $supplier,
        ], 201);
    }

    public function show(Supplier $supplier): JsonResponse
    {
        return response()->json(['supplier' => $supplier]);
    }

    public function edit(Supplier $supplier)
    {
        return view('suppliers.edit', compact('supplier'));
    }

    public function update(Request $request, Supplier $supplier): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('suppliers')->ignore($supplier->id)],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'category' => 'required|string|in:Technology,Manufacturing,Materials,Sustainability,Services',
            'contact_person' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'tax_id' => 'nullable|string|max:50',
            'payment_terms' => 'required|string|in:Net 15,Net 30,Net 45,Net 60',
            'status' => 'required|string|in:active,inactive,pending',
        ]);

        $supplier->update($validated);

        return response()->json([
            'message' => 'Supplier updated successfully',
            'supplier' => $supplier,
        ]);
    }

    public function destroy(Supplier $supplier): JsonResponse
    {
        $supplier->delete();

        return response()->json([
            'message' => 'Supplier deleted successfully',
        ]);
    }

    public function stats(): JsonResponse
    {
        return response()->json($this->getStats());
    }

    private function getStats(): array
    {
        $totalSuppliers = Supplier::count();
        $activeSuppliers = Supplier::active()->count();
        $totalValue = Supplier::sum('total_value');
        $avgRating = Supplier::avg('rating');

        return [
            'total_suppliers' => $totalSuppliers,
            'active_suppliers' => $activeSuppliers,
            'total_value' => $totalValue,
            'avg_rating' => round($avgRating, 1),
        ];
    }

    public function categories(): JsonResponse
    {
        $categories = Supplier::distinct('category')->pluck('category');
        
        return response()->json(['categories' => $categories]);
    }
}