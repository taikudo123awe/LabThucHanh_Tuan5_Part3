const Supplier = require('../models/Supplier');
const Product = require('../models/Product');

// Hiển thị danh sách nhà cung cấp trong trang quản trị
exports.getSupplierListAdmin = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        res.render('suppliers/index', {
            title: 'Quản lý Nhà cung cấp',
            suppliers
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Hiển thị form thêm/sửa nhà cung cấp
exports.getSupplierForm = async (req, res) => {
    try {
        if (req.params.id) {
            // Sửa: Tìm nhà cung cấp theo ID
            const supplier = await Supplier.findById(req.params.id);
            res.render('suppliers/form', {
                title: 'Chỉnh sửa Nhà cung cấp',
                supplier
            });
        } else {
            // Thêm mới
            res.render('suppliers/form', {
                title: 'Thêm mới Nhà cung cấp',
                supplier: null // Hoặc supplier: {} đều được
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Xử lý việc thêm/sửa nhà cung cấp
exports.postSupplier = async (req, res) => {
    try {
        if (req.params.id) {
            // Cập nhật
            await Supplier.findByIdAndUpdate(req.params.id, req.body);
        } else {
            // Tạo mới
            const supplier = new Supplier(req.body);
            await supplier.save();
        }
        res.redirect('/admin/suppliers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Xử lý xóa nhà cung cấp
exports.deleteSupplier = async (req, res) => {
    try {
        // Kiểm tra xem có sản phẩm nào thuộc nhà cung cấp này không
        const productCount = await Product.countDocuments({ supplier: req.params.id });
        if (productCount > 0) {
            // Nếu có, không cho xóa và báo lỗi (hoặc có thể dùng flash message)
            return res.status(400).send('Không thể xóa nhà cung cấp này vì vẫn còn sản phẩm liên quan.');
        }
        // Nếu không có, tiến hành xóa
        await Supplier.findByIdAndDelete(req.params.id);
        res.redirect('/admin/suppliers');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};
