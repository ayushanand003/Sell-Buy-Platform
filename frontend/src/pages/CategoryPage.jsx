import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/items/category/${category}`);
        const data = await res.json();
        setItems(data.items || data); // handle both {items: [...]} or just [...]
      } catch (err) {
        console.error("Error fetching category items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category]);

  if (loading) return <p>Loading {category} items...</p>;
  if (!items.length) return <p>No items found in {category}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textTransform: "capitalize" }}>{category} Items</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={item.imageUrl || "https://via.placeholder.com/250"}
              alt={item.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
            <p style={{ margin: "5px 0" }}>Brand: {item.brand}</p>
            <p style={{ margin: "5px 0" }}>Starting Bid: ₹{item.startingBid}</p>
            {item.buyNowPrice && <p style={{ margin: "5px 0" }}>Buy Now: ₹{item.buyNowPrice}</p>}
            <Link to={`/auction/${item._id}`}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  border: "none",
                  background: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
