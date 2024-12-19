import React from "react";

const Filters = ({ filters, setFilters }) => {
    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="card p-3 shadow-sm">
            <h5 className="card-title">Filters</h5>
            <div className="form-group mb-3">
                <label htmlFor="category" className="form-label">Category</label>
                <select
                    id="category"
                    name="category"
                    className="form-select"
                    onChange={handleChange}
                >
                    <option value="">All</option>
                    <option value="beauty">Beauty</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="priceRange" className="form-label">Price Range</label>
                <input
                    type="range"
                    id="priceRange"
                    name="priceRange"
                    min="0"
                    max="100"
                    className="form-range"
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default Filters;
