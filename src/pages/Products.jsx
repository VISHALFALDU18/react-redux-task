import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
} from "../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/userSlice";

const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useSelector(
        (state) => state.products
    );

    const [formData, setFormData] = useState({
        title: "",
        price: "",
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            dispatch(updateProduct({ ...formData, id: editingId }));
        } else {
            dispatch(
                addProduct({
                    id: items.length + 1, // simple ID
                    ...formData,
                })
            );
        }

        setFormData({ title: "", price: "" });
        setEditingId(null);
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData({
            title: product.title,
            price: product.price,
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    if (loading) return <h3>Loading...</h3>;
    if (error) return <p>{error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <button onClick={handleLogout}>Logout</button>
            <h2 style={{ color: '#646cff' }}>Product List</h2>

            {/* TOTAL RECORDS */}
            <h4 style={{ color: '#646cff' }}>Total Records: {items.length}</h4>

            {/* CREATE / UPDATE */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    placeholder="Title"
                    style={{ marginRight: '10px', padding: '5px' }}
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            title: e.target.value,
                        })
                    }
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    style={{ marginRight: '10px', padding: '5px' }}
                    value={formData.price}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            price: e.target.value,
                        })
                    }
                    required
                />
                <button type="submit">
                    {editingId ? "Update" : "Add"}
                </button>

            </form>

            {/* READ */}
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ color: "black" }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((p) => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>${p.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>
                                <button onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>
                                    Edit
                                </button>
                                <button
                                    onClick={() =>
                                        dispatch(deleteProduct(p.id))
                                    }
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
