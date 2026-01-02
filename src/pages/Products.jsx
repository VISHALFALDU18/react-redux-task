import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../redux/slices/productSlice";
import { logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Products = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items, loading, error } = useSelector((state) => state.products);
    const { token } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        rating: '',
    });

    const [editing, setEditing] = useState(null);

    useEffect(() => {
        if (token === null) return;
        if (!token) {
            navigate('/');
        }
        else {
            dispatch(fetchProducts());
        }
    }, [dispatch, token, navigate]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddorUpdate = (e) => {
        e.preventDefault();
        if (editing) {
            dispatch(updateProduct({ ...formData, id: editing }));
        } else {
            const fakeId = Math.floor(Math.random() * 900) + 101;
            dispatch(addProduct({ id: fakeId, ...formData }));
        }
        setFormData({
            title: '',
            description: '',
            category: '',
            price: '',
            brand: '',
            rating: '',
        });
        setEditing(null);
    };

    const handleEdit = (p) => {
        setEditing(p.id);
        setFormData({
            title: p.title,
            description: p.description,
            price: p.price,
            category: p.category,
            brand: p.brand,
            rating: p.rating,
        });
    };

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };



    if (loading) return <h3 style={{ textAlign: 'center' }}>Loading...</h3>
    if (error) return <p style={{ textAlign: 'center', color: 'red' }}>Error: {error}</p>

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: '#646cff' }}>Product List</h2>
            <button onClick={handleLogout} style={{ marginBottom: '10px' }}>Logout</button>

            <form onSubmit={handleAddorUpdate} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <input
                    type="number"
                    step="0.1"
                    name="rating"
                    placeholder="Rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button type="submit">{editing ? 'Update' : 'Add'}</button>
            </form>

            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ color: "black" }}>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Description</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Category</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Brand</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Rating</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((p) => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.description}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.category}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>${p.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.brand}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px', color: "black" }}>{p.rating}</td>
                            <td style={{
                                border: '1px solid #ddd', padding: '8px', color: "black"
                            }}>
                                <button onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>Edit</button>
                                <button onClick={() => handleDelete(p.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
