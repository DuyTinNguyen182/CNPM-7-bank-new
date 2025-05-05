const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Gắn thông tin user vào request
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Token không hợp lệ!' });
        }
    } else {
        return res.status(401).json({ message: 'Không có token!' });
    }
};

module.exports = authMiddleware;
