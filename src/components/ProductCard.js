import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => (
    <div className="card h-100 shadow-sm d-flex flex-column">
        <img
            src={product.thumbnail}
            className="card-img-top"
            alt={product.title}
            style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">
                <strong>Price:</strong> ${product.price}
            </p>
            <p className="card-text text-muted">
                <strong>Rating:</strong> {product.rating} ⭐
            </p>
            <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">
                View Details
            </Link>
        </div>
    </div>
);

export default ProductCard;
