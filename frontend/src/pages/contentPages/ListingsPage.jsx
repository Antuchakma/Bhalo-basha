import React, { useEffect, useState } from "react";
import axios from "axios";

function ListingsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5002/api/product/");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading listings...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Rentals</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-500">No listings available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
            >
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500 text-sm mb-2">{product.location}</p>
                <p className="text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-blue-600 font-bold">{product.rent} ৳ /month</p>
                  <p className="text-xs text-gray-400">
                    {product.contractDuration} mo contract
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListingsPage;
