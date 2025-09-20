const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Hiển thị form đăng ký
router.get('/register', authController.getRegisterForm);

// Xử lý POST request từ form đăng ký
router.post('/register', authController.postRegister);

// Hiển thị form đăng nhập
router.get('/login', authController.getLoginForm);

// Xử lý POST request từ form đăng nhập
router.post('/login', authController.postLogin);

// Xử lý đăng xuất
router.get('/logout', authController.logout);

// Hiển thị form quên mật khẩu
router.get('/forgot-password', authController.getForgotPasswordForm);

// TODO: Xử lý POST request cho chức năng quên mật khẩu
// router.post('/forgot-password', authController.postForgotPassword);

module.exports = router;
