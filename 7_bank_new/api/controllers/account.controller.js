const service = require("../services/account.service");
const jwt = require("jsonwebtoken");

// Middleware xác thực JWT (dùng chung cho tất cả các route cần bảo vệ)
const authMiddleware = require("../middlewares/authMiddleware");

// Tạo tài khoản mới (không cần JWT, cho phép tạo tài khoản mới)
exports.create = async (req, res) => {
  try {
    const acc = await service.createAccount(req.body);
    res.status(201).json(acc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Lấy thông tin tài khoản (bảo vệ bằng JWT)
// exports.get = [authMiddleware, async (req, res) => {
//   const acc = await service.getAccount(req.params.user);
//   if (!acc) return res.status(404).json({ error: "User not found" });
//   res.json(acc);
// }];
exports.get = async (req, res) => {
  const acc = await service.getAccount(req.params.user);
  if (!acc) return res.status(404).json({ error: "User not found" });
  res.json(acc);
};


// Xóa tài khoản (bảo vệ bằng JWT)
exports.delete = [authMiddleware, async (req, res) => {
  const result = await service.deleteAccount(req.params.user);
  if (result.deletedCount === 0) {
    return res.status(404).json({ error: "User not found" });
  }
  res.sendStatus(204);
}];

// Thêm giao dịch cho người dùng (bảo vệ bằng JWT)
exports.addTransaction = [authMiddleware, async (req, res) => {
  try {
    const tx = await service.addTransaction(req.params.user, req.body);
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}];

// Xóa giao dịch của người dùng (bảo vệ bằng JWT)
exports.deleteTransaction = [authMiddleware, async (req, res) => {
  try {
    await service.deleteTransaction(req.params.user, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}];

// Đăng nhập và phát JWT token
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra thông tin người dùng (sử dụng service để kiểm tra)
    const user = await service.checkLogin(username, password);
    if (!user) {
      return res.status(400).json({ error: "Sai tài khoản hoặc mật khẩu" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token hết hạn sau 1 ngày
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
