const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Tên đăng nhập là bắt buộc'],
        unique: true, // Tên đăng nhập không được trùng
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email là bắt buộc'],
        unique: true, // Email không được trùng
        trim: true,
        lowercase: true, // Chuyển email về chữ thường
        match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'] // Kiểm tra định dạng email
    },
    phone: {
        type: String,
        required: [true, 'Số điện thoại là bắt buộc']
    },
    password: {
        type: String,
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: [6, 'Mật khẩu phải có ít nhất 6 ký tự']
    }
}, { timestamps: true });

// Middleware: Chạy trước khi một tài liệu 'User' được lưu
// Dùng để mã hóa mật khẩu
userSchema.pre('save', async function(next) {
    // Chỉ mã hóa nếu mật khẩu được thay đổi (hoặc là người dùng mới)
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Tạo "muối" để tăng cường bảo mật
        const salt = await bcrypt.genSalt(10);
        // Mã hóa mật khẩu với muối đã tạo
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Thêm một phương thức (method) vào schema để so sánh mật khẩu
userSchema.methods.comparePassword = function(candidatePassword) {
    // Dùng bcrypt để so sánh mật khẩu người dùng nhập với mật khẩu đã mã hóa trong DB
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

