// Middleware để kiểm tra xem người dùng đã đăng nhập hay chưa

exports.isAuthenticated = (req, res, next) => {
    // req.session.userId được tạo ra khi người dùng đăng nhập thành công
    if (req.session && req.session.userId) {
        // Nếu có session, người dùng đã đăng nhập -> cho phép tiếp tục
        return next();
    }
    // Nếu không có session, chuyển hướng người dùng về trang đăng nhập
    res.redirect('/login');
};
