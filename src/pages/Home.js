import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({ category: "All", priceRange: 100 });
    const [searchTerm, setSearchTerm] = useState(""); // New state for search term

    // Fetch products and extract unique categories
    useEffect(() => {
        fetchProducts()
            .then((response) => {
                const fetchedProducts = response.data.products;
                setProducts(fetchedProducts);

                // Extract unique categories
                const uniqueCategories = [
                    "All",
                    ...new Set(fetchedProducts.map((product) => product.category)),
                ];
                setCategories(uniqueCategories);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    // Filter products based on search term, category, and price range
    const filteredProducts = products.filter(
        (product) =>
            (filters.category === "All" || product.category === filters.category) &&
            product.price <= filters.priceRange &&
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) // Search filter
    );

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-primary text-white text-center py-5">
                <h1 className="fw-bold">Discover Our Products</h1>
                <p>Explore a wide range of products tailored to your needs</p>
                <div className="d-flex justify-content-center mt-3">
                    <div className="input-group w-50">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for products"
                            aria-label="Search for products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                        />
                        <button
                            className="btn btn-light"
                            onClick={() => console.log(`Searching for: ${searchTerm}`)}
                        >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mt-6">
                <div className="row">
                    {/* Filters Section */}
                    <div className="col-md-3">
                        <div className="card p-3">
                            <h5 className="fw-bold">Filters</h5>
                            {/* Category Filter */}
                            <div className="mb-3">
                                <label htmlFor="categoryFilter" className="form-label">
                                    Category
                                </label>
                                <select
                                    id="categoryFilter"
                                    className="form-select"
                                    value={filters.category}
                                    onChange={(e) =>
                                        setFilters({ ...filters, category: e.target.value })
                                    }
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-3">
                                <label htmlFor="priceRange" className="form-label">
                                    Max Price: ${filters.priceRange}
                                </label>
                                <input
                                    type="range"
                                    id="priceRange"
                                    className="form-range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={filters.priceRange}
                                    onChange={(e) =>
                                        setFilters({ ...filters, priceRange: e.target.value })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-md-9">
                        <div className="row g-3">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product.id} className="col-md-4 d-flex">
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="text-center">
                                    <p className="text-muted">No products found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
