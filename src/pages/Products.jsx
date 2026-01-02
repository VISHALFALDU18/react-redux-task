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
        if (!token) {
            navigate('/');
            return;
        }
        dispatch(fetchProducts());
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
            dispatch(addProduct(formData));
        }
        setFormData({
            title: '',
            description: '',
            price: '',
            category: '',
            brand: '',
            rating: '',
        });
        setEditing(null);
    };

    const handleEdit = (product) => {
        setEditing(product.id);
        setFormData({
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            brand: product.brand,
            rating: product.rating,
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
            <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Brand</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((p) => (
                        <tr key={p.id}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.id}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.title}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.description}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.category}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>${p.price}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.brand}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{p.rating}</td>
                            <td>
                                <button onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>Edit</button>
                                <button onClick={() => handleDelete(p.id)} style={{ color: 'red' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
