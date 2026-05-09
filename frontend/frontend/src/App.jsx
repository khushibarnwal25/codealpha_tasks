import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD OR UPDATE
  const handleSubmit = async () => {

    if (editId) {

      // UPDATE
      await fetch(`http://localhost:5000/api/products/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      setEditId(null);

    } else {

      // ADD
      await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

    }

    setForm({
      name: "",
      price: "",
      description: "",
      image: "",
    });

    fetchProducts();
  };

  // DELETE
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // EDIT
  const editProduct = (p) => {
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      image: p.image,
    });

    setEditId(p._id);
  };

  // LOGOUT
  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >

      {/* LOGOUT BUTTON */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      <h1
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "30px",
          color: "#00ffd5",
        }}
      >
        My Colorful Store 🛒
      </h1>

      {/* FORM */}
      <div
        style={{
          maxWidth: "400px",
          margin: "auto",
          backgroundColor: "#1f2937",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#00ffd5",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
          marginTop: "40px",
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{
              backgroundColor: "#1f2937",
              width: "280px",
              borderRadius: "20px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={
                p.image && p.image.startsWith("http")
                  ? p.image
                  : "https://via.placeholder.com/150"
              }
              alt={p.name}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "15px",
              }}
            />

            <h2 style={{ color: "#00ffd5" }}>
              {p.name}
            </h2>

            <h3>₹ {p.price}</h3>

            <p style={{ color: "#d1d5db" }}>
              {p.description}
            </p>

            <button
              onClick={() => editProduct(p)}
              style={{
                backgroundColor: "orange",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                marginRight: "10px",
                fontWeight: "bold",
              }}
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteProduct(p._id)
              }
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};

export default App;