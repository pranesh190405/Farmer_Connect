import { useState, useEffect } from 'react';
import api from '../../utils/api';
import ProductForm from './ProductForm';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await api.get('/products/my-products');
            setProducts(res.data.data);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (err) {
            alert('Failed to delete product');
        }
    };

    const handleSuccess = () => {
        setIsAdding(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const handleCancel = () => {
        setIsAdding(false);
        setEditingProduct(null);
    };

    if (loading) return <div className="text-center py-4">Loading products...</div>;

    if (isAdding || editingProduct) {
        return (
            <ProductForm
                product={editingProduct}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-700">My Agricultural Produce</h2>
                <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                    <span className="mr-2">+</span> Add Product
                </button>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}

            {products.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <p>No products listed yet.</p>
                    <p className="text-sm mt-1">Start by adding your first crop or produce.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {products.map(product => (
                        <div key={product._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-gray-800">{product.name}</h3>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                            {product.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                                    <div className="mt-2 flex items-center space-x-4 text-sm">
                                        <span className="font-medium text-green-700">₹{product.price}/{product.unit}</span>
                                        <span className="text-gray-500">Qty: {product.quantity} {product.unit}</span>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setEditingProduct(product)}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                                        title="Edit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                                        title="Delete"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
