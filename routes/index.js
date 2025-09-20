const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route cho trang chủ
// GET / -> Hiển thị danh sách sản phẩm với bộ lọc và tìm kiếm
router.get('/', productController.getHomePage);

module.exports = router;
