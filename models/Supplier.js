const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên nhà cung cấp là bắt buộc'],
        trim: true
    },
    address: {
        type: String,
        required: [true, 'Địa chỉ là bắt buộc']
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại là bắt buộc']
    }
}, {
    // Tự động thêm hai trường createdAt và updatedAt
    timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
