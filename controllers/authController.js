const User = require('../models/User');

// Hiển thị form đăng ký
exports.getRegisterForm = (req, res) => {
    res.render('register', { title: 'Đăng ký tài khoản' });
};

// Xử lý đăng ký người dùng mới
exports.postRegister = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Kiểm tra xem username hoặc email đã tồn tại chưa
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // Tạm thời chỉ gửi lỗi, sau này sẽ cải thiện với flash messages
            return res.status(400).send('Tên đăng nhập hoặc email đã tồn tại.');
        }

        const user = new User({ username, email, phone, password });
        await user.save(); // Mật khẩu được mã hóa tự động nhờ middleware trong model

        res.redirect('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } catch (error) {
        // Xử lý lỗi validation hoặc lỗi server
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
};

// Hiển thị form đăng nhập
exports.getLoginForm = (req, res) => {
    res.render('login', { title: 'Đăng nhập' });
};

// Xử lý đăng nhập
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        // Nếu không tìm thấy user hoặc mật khẩu không khớp
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Tên đăng nhập hoặc mật khẩu không chính xác.');
        }

        // Lưu user ID vào session để duy trì trạng thái đăng nhập
        req.session.userId = user._id;

        res.redirect('/'); // Chuyển hướng về trang chủ sau khi đăng nhập thành công
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
};

// Xử lý đăng xuất
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Không thể đăng xuất. Vui lòng thử lại.');
        }
        res.redirect('/login'); // Chuyển hướng về trang đăng nhập sau khi đăng xuất
    });
};

// TODO: Xây dựng chức năng quên mật khẩu
exports.getForgotPasswordForm = (req, res) => {
    res.render('forgot', { title: 'Quên mật khẩu' });
};
