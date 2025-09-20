const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const authMiddleware = require('../middleware/auth');

// Tiền tố /admin/suppliers được định nghĩa trong app.js
// URL đầy đủ sẽ là /admin/suppliers/

// GET /admin/suppliers -> Hiển thị danh sách
router.get('/', authMiddleware.isAuthenticated, supplierController.getSupplierListAdmin);

// GET /admin/suppliers/add -> Hiển thị form thêm
router.get('/add', authMiddleware.isAuthenticated, supplierController.getSupplierForm);

// GET /admin/suppliers/edit/:id -> Hiển thị form sửa
router.get('/edit/:id', authMiddleware.isAuthenticated, supplierController.getSupplierForm);

// POST /admin/suppliers/add hoặc /admin/suppliers/edit/:id -> Xử lý lưu
router.post(['/add', '/edit/:id'], authMiddleware.isAuthenticated, supplierController.postSupplier);

// POST /admin/suppliers/delete/:id -> Xử lý xóa
router.post('/delete/:id', authMiddleware.isAuthenticated, supplierController.deleteSupplier);

module.exports = router;
