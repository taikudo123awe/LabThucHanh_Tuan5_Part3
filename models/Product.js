const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá sản phẩm không thể là số âm']
    },
    quantity: {
        type: Number,
        required: [true, 'Số lượng là bắt buộc'],
        min: [0, 'Số lượng không thể là số âm']
    },
    // Trường này tạo mối quan hệ với collection 'suppliers'
    supplier: {
        type: mongoose.Schema.Types.ObjectId, // Kiểu dữ liệu ID đặc biệt của MongoDB
        ref: 'Supplier', // Tham chiếu đến model 'Supplier'
        required: [true, 'Nhà cung cấp là bắt buộc']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
