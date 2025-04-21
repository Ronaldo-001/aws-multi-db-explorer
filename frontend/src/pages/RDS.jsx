import { useEffect, useState } from "react";

function RDS() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/rds/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddProduct = async () => {
    const res = await fetch("http://localhost:5000/api/rds/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: product }),
    });
    const data = await res.json();
    setProducts((prev) => [...prev, data]);
    setProduct("");
  };

  return (
    <div>
      <h2>RDS Products</h2>
      <div className="input-group">
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Product Name"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <ul>
        {products.map((p, idx) => (
          <li key={idx}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RDS;
