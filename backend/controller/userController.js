// backend/controller/userController.js
import UsersService from "../service/userService.js";
import { generateTokens, verifyRefreshToken } from "../helpers/jwtHelper.js";
// Thêm dòng này để kiểm tra ngay lập tức khi chạy server:
//console.log('Loaded .env from:', envPath);

class UsersController {

  // [GET] /api/user
  async getAll(req, res) {
    try {

      const data = await UsersService.getUsers();
        console.log("Fetched users:", data);
      return res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // [GET] /api/user/:id
  async getById(req, res) {
    try {
      const { id } = req.params;

      const data = await UsersService.getUserById(id);

      return res.status(200).json({
        success: true,
        data: data
      });
    } catch (error) {
      const status = error.message.includes("not found") ? 404 : 
                     error.message.includes("Access denied") ? 403 : 500;
      
      return res.status(status).json({
        success: false,
        message: error.message
      });
    }
  }

  // [POST] /api/user/register
  async create(req, res) {
    try {
      // Gọi Service
      const newUser = await UsersService.createUser({
        ...req.body,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // [PUT] /api/user/:id
  async update(req, res) {
    try {
      const { id } = req.params;

      const updatedUser = await UsersService.updateUser(id, req.body);

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // [DELETE] /api/user/:id
  async delete(req, res) {
    try {
      const { id } = req.params;

      await UsersService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully"
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // [POST] /api/user/login
  async login(req, res) {
    try {
      // 1. Xác thực user/pass qua Service
      const user = await UsersService.loginUser(req.body);

      // 2. Tạo cặp Access/Refresh Token
      const { accessToken, refreshToken } = generateTokens({ 
          userId: user.id, 
          email: user.email 
      });

      // 3. Lưu Refresh Token xuống DB (Quan trọng để bảo mật)
      await UsersService.updateRefreshToken(user.id, refreshToken);
      // --- SỬA ĐỔI Ở ĐÂY ---
      // Loại bỏ refresh_token cũ ra khỏi object user trước khi trả về
      // (Dùng kỹ thuật Destructuring để tách rác)
      const { refresh_token, ...cleanUser } = user;
      
      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            ...cleanUser,        // Thông tin user
            accessToken,    // Token ngắn hạn
            refreshToken    // Token dài hạn
        }
      });
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: error.message
      });
    }
  }
  // POST /api/user/refresh-token
  async refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new Error("Refresh Token is required");

        // Verify xem token có hợp lệ (đúng chữ ký, chưa hết hạn) không
        const decoded = verifyRefreshToken(refreshToken);
        if (!decoded) throw new Error("Invalid or expired refresh token");

        //  Kiểm tra user có tồn tại không
        const user = await UsersService.getUserById(decoded.userId);
        
        // 3. (BẢO MẬT CẤP CAO) Kiểm tra token gửi lên có khớp với token trong DB không
        // Nếu DB bạn có cột refresh_token, hãy mở comment dòng dưới:
        if (user.refresh_token !== refreshToken) {
             throw new Error("Refresh token has been revoked or implies token theft");
        }

        // 4. Tạo Access Token mới (Giữ nguyên refresh token cũ hoặc tạo mới tùy chiến thuật)
        // Ở đây ta chỉ cấp lại AccessToken mới
        const tokens = generateTokens({ userId: user.id, email: user.email });
        
        // Trả về access token mới
        return res.status(200).json({
            success: true,
            accessToken: tokens.accessToken
            // Nếu bạn muốn xoay vòng Refresh Token (Refresh Rotation), trả về cả refreshToken mới và update DB tại đây
        });

    } catch (error) {
        return res.status(403).json({ // 403 Forbidden là mã chuẩn cho lỗi token
            success: false,
            message: error.message
        });
    }
  }
  
}

// Export Singleton
export default new UsersController();