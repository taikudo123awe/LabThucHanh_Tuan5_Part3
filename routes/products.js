const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Tất cả các route trong file này sẽ yêu cầu đăng nhập
// Tiền tố /admin/products được định nghĩa trong app.js
// URL đầy đủ sẽ là /admin/products/

// GET /admin/products -> Hiển thị danh sách sản phẩm
router.get('/', authMiddleware.isAuthenticated, productController.getProductListAdmin);

// GET /admin/products/add -> Hiển thị form thêm mới
router.get('/add', authMiddleware.isAuthenticated, productController.getProductForm);

// GET /admin/products/edit/:id -> Hiển thị form chỉnh sửa
router.get('/edit/:id', authMiddleware.isAuthenticated, productController.getProductForm);

// POST /admin/products/add hoặc /admin/products/edit/:id -> Xử lý lưu dữ liệu
router.post(['/add', '/edit/:id'], authMiddleware.isAuthenticated, productController.postProduct);

// POST /admin/products/delete/:id -> Xử lý xóa
router.post('/delete/:id', authMiddleware.isAuthenticated, productController.deleteProduct);

module.exports = router;
