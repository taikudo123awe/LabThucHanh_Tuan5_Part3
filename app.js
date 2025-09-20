// 1. Khai báo các module cần thiết
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

// 2. Import các file routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const supplierRoutes = require('./routes/suppliers');

// 3. Khởi tạo ứng dụng Express
const app = express();
const PORT = process.env.PORT || 3000;

// 4. Kết nối tới Cơ sở dữ liệu MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
    .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// 5. Cấu hình Middleware
// Phục vụ các file tĩnh (CSS, JS, images) từ thư mục 'public'
app.use(express.static('public'));
// Xử lý dữ liệu gửi lên từ HTML form
app.use(express.urlencoded({ extended: true }));
// Xử lý dữ liệu dạng JSON (cho các API sau này)
app.use(express.json());

// 6. Cấu hình Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // Thời gian sống của session: 1 ngày
    }
}));

// Middleware tùy chỉnh: Truyền thông tin session vào tất cả các view
// Giúp dễ dàng kiểm tra trạng thái đăng nhập trong file .ejs
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.userId ? true : false;
    next();
});

// 7. Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// 8. Liên kết các Routes
// Route cho trang chủ và các trang xác thực (đăng nhập, đăng ký)
app.use('/', indexRoutes);
app.use('/', authRoutes);

// Route cho các trang quản trị (yêu cầu đăng nhập)
app.use('/admin/products', productRoutes);
app.use('/admin/suppliers', supplierRoutes);

// 9. Khởi chạy Server
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});

