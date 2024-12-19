import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../services/api";
import "./../styles/ProductDetails.css";


const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails(id)
            .then((response) => setProduct(response.data))
            .catch((error) => console.error("Error fetching product details:", error));
    }, [id]);

    if (!product) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5">
            {/* Product Card */}
            <div className="card shadow-lg">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={product.images[0]}
                            alt={product.title}
                            className="img-fluid rounded-start"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title fw-bold">{product.title}</h2>
                            <p className="card-text text-muted mb-4">{product.description}</p>
                            <p className="card-text">
                                <strong className="text-primary">Price:</strong> ${product.price}
                            </p>
                            <p className="card-text">
                                <strong className="text-success">Stock Available:</strong> {product.stock}
                            </p>
                            <p className="card-text">
                                <strong className="text-secondary">Category:</strong> {product.category}
                            </p>
                            <p className="card-text">
                                <strong className="text-warning">Return Policy:</strong> {product.returnPolicy}
                            </p>
                            <a href="/" className="btn btn-primary mt-3">
                                Back to Products
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-5">
                <h4 className="fw-bold">Customer Reviews</h4>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="list-group mb-4">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="list-group-item shadow-sm mb-2">
                                <h6 className="fw-bold">{review.reviewerName}</h6>
                                <p className="mb-1">{review.comment}</p>
                                <small className="text-muted">
                                    Rating: {review.rating} ⭐ | {new Date(review.date).toLocaleDateString()}
                                </small>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted">No reviews available for this product.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetails;
