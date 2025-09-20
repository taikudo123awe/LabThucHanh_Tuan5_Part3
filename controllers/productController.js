const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// Hiển thị trang chủ với danh sách sản phẩm (có tìm kiếm và lọc)
exports.getHomePage = async (req, res) => {
    try {
        const { supplier, search } = req.query; // Lấy tham số lọc từ URL
        let filter = {};

        // Nếu có ID nhà cung cấp, thêm vào bộ lọc
        if (supplier) {
            filter.supplier = supplier;
        }

        // Nếu có từ khóa tìm kiếm, dùng regex để tìm kiếm không phân biệt hoa thường
        if (search) {
            filter.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(filter).populate('supplier');
        const suppliers = await Supplier.find(); // Lấy tất cả nhà cung cấp để hiển thị menu lọc

        res.render('index', {
            title: 'Trang chủ',
            products,
            suppliers,
            selectedSupplier: supplier // Giữ lại giá trị đã chọn trên menu
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Hiển thị danh sách sản phẩm trong trang quản trị
exports.getProductListAdmin = async (req, res) => {
    try {
        const products = await Product.find().populate('supplier');
        res.render('products/index', {
            title: 'Quản lý Sản phẩm',
            products
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Hiển thị form thêm/sửa sản phẩm
exports.getProductForm = async (req, res) => {
    try {
        const suppliers = await Supplier.find();
        if (req.params.id) {
            // Trường hợp sửa: tìm sản phẩm theo ID
            const product = await Product.findById(req.params.id);
            res.render('products/form', {
                title: 'Chỉnh sửa Sản phẩm',
                product,
                suppliers
            });
        } else {
            // Trường hợp thêm mới
            res.render('products/form', {
                title: 'Thêm mới Sản phẩm',
                suppliers,
                product: null // Hoặc product: {} đều được
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Xử lý việc thêm/sửa sản phẩm
exports.postProduct = async (req, res) => {
    try {
        if (req.params.id) {
            // Cập nhật sản phẩm
            await Product.findByIdAndUpdate(req.params.id, req.body);
        } else {
            // Tạo sản phẩm mới
            const product = new Product(req.body);
            await product.save();
        }
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};

// Xử lý xóa sản phẩm
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/admin/products');
    } catch (error) {
        console.error(error);
        res.status(500).send('Đã có lỗi xảy ra.');
    }
};
