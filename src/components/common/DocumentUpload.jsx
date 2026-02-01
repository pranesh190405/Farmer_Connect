import { useState } from 'react';
import api from '../../utils/api';

const DocumentUpload = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('document', file);

        setUploading(true);
        setMessage('');

        try {
            await api.post('/users/upload-document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Upload successful!');
            setFile(null);
            if (onUploadSuccess) onUploadSuccess();
        } catch (error) {
            console.error(error);
            setMessage('Upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Upload ID/Verification Document</h3>
            <div className="space-y-4">
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,application/pdf"
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                />

                {message && <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}

                <button
                    onClick={handleUpload}
                    disabled={!file || uploading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                    {uploading ? 'Uploading...' : 'Upload Document'}
                </button>
            </div>
        </div>
    );
};

export default DocumentUpload;
