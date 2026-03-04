# 🚀 Final Project – Express TypeScript REST API

API RESTful được xây dựng bằng **Node.js**, **Express**, **TypeScript** và **MongoDB Atlas**, hỗ trợ xác thực JWT, xác thực email và tài liệu Swagger.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ             | Mô tả                                   |
| --------------------- | --------------------------------------- |
| Node.js + Express     | Framework web                           |
| TypeScript            | Kiểm tra kiểu dữ liệu tĩnh              |
| MongoDB Atlas         | Cơ sở dữ liệu đám mây                   |
| JWT                   | Xác thực (Access Token & Refresh Token) |
| Bcryptjs              | Mã hóa mật khẩu                         |
| Nodemailer            | Gửi email xác thực qua Gmail SMTP       |
| Swagger (OpenAPI 3.0) | Tài liệu API                            |
| Express Validator     | Kiểm tra dữ liệu đầu vào                |

---

## 📁 Cấu trúc thư mục

```
src/
├── index.ts                  # Điểm khởi chạy ứng dụng
├── swagger.ts                # Cấu hình Swagger
├── containts/
│   ├── enums.ts              # Enum (UserRole, UserVerifyStatus...)
│   ├── httpStatus.ts         # Mã HTTP status
│   └── messages.ts           # Các thông báo phản hồi
├── controllers/
│   └── users.controllers.ts
├── middlewares/
│   ├── errors.middlewares.ts
│   └── users.middlewares.ts
├── models/
│   ├── Error.ts
│   ├── requests/
│   │   └── User.requests.ts
│   └── schemas/
│       ├── User.schema.ts
│       └── RefreshToken.schema.ts
├── routes/
│   └── users.routers.ts
├── services/
│   ├── database.services.ts
│   └── users.services.ts
└── utils/
    ├── handlers.ts
    ├── jwt.ts
    ├── mailer.ts
    └── validation.ts
```

---

## ⚙️ Cài đặt & Khởi chạy

### 1. Clone dự án

```bash
git clone https://github.com/HuuFuoc/final-project.git
cd final-project
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` tại thư mục gốc của dự án:

```env
# Server
SERVER_URL=http://localhost:3000

# MongoDB Atlas
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
DB_NAME=your_database_name
DB_USERS_COLLECTION=users
DB_REFRESH_TOKENS_COLLECTION=refresh_tokens

# JWT Secrets
JWT_SECRET_ACCESS_TOKEN=your_access_token_secret
JWT_SECRET_REFRESH_TOKEN=your_refresh_token_secret
JWT_SECRET_EMAIL_VERIFY_TOKEN=your_email_verify_token_secret

# JWT Expiration
ACCESS_TOKEN_EXPIRE_IN=15m
REFRESH_TOKEN_EXPIRE_IN=100d
EMAIL_VERIFY_TOKEN_EXPIRE_IN=7d

# Gmail SMTP (dùng App Password)
SMTP_USER=your_gmail@gmail.com
SMTP_PASSWORD=your_gmail_app_password
```

> ⚠️ **Lưu ý:** Để lấy `SMTP_PASSWORD`, truy cập [Google App Passwords](https://myaccount.google.com/apppasswords) và tạo App Password cho ứng dụng.

### 4. Chạy dự án

```bash
# Môi trường development
npm run dev

# Build production
npm run build
npm start
```

---

## 📖 Tài liệu API

Swagger UI có thể truy cập tại:

- **Local:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Production:** [https://final-project-f2z1.onrender.com/api-docs](https://final-project-f2z1.onrender.com/api-docs)

---

## 🔑 Danh sách API

### Xác thực (Auth)

| Phương thức | Endpoint                | Mô tả             | Yêu cầu đăng nhập |
| ----------- | ----------------------- | ----------------- | ----------------- |
| `POST`      | `/user/register`        | Đăng ký tài khoản | ❌                |
| `POST`      | `/user/login`           | Đăng nhập         | ❌                |
| `POST`      | `/user/logout`          | Đăng xuất         | ✅                |
| `GET`       | `/user/verify-email`    | Xác thực email    | ❌                |
| `PUT`       | `/user/change-password` | Đổi mật khẩu      | ✅                |

### Người dùng (Users)

| Phương thức | Endpoint          | Mô tả                 | Yêu cầu đăng nhập |
| ----------- | ----------------- | --------------------- | ----------------- |
| `POST`      | `/user/get-me`    | Lấy thông tin cá nhân | ✅                |
| `POST`      | `/user/update-me` | Cập nhật thông tin    | ✅                |

> ✅ = Yêu cầu gửi `Authorization: Bearer <access_token>` trong header

---

## 🔐 Luồng xác thực

1. **Đăng ký** → Nhận `access_token` & `refresh_token`, email xác thực được gửi tự động
2. **Xác thực email** → Click vào link trong email để kích hoạt tài khoản
3. **Đăng nhập** → Nhận `access_token` & `refresh_token`
4. **Truy cập route bảo mật** → Gửi `access_token` trong header `Authorization: Bearer <token>`
5. **Đăng xuất** → Xóa `refresh_token` khỏi cơ sở dữ liệu

---

## 📋 Ví dụ Request

### Đăng ký

```json
POST /user/register
{
  "name": "Nguyễn Văn A",
  "email": "example@gmail.com",
  "password": "Password123@",
  "confirm_password": "Password123@",
  "date_of_birth": "2000-01-01"
}
```

### Đăng nhập

```json
POST /user/login
{
  "email": "example@gmail.com",
  "password": "Password123@"
}
```

### Yêu cầu mật khẩu

- Tối thiểu **8 ký tự**, tối đa **50 ký tự**
- Ít nhất **1 chữ hoa**, **1 chữ thường**, **1 số**, **1 ký tự đặc biệt**

---

## 🧪 Các lệnh Scripts

```bash
npm run dev          # Chạy development với nodemon
npm run build        # Build TypeScript sang JavaScript
npm start            # Chạy bản production
npm run lint         # Kiểm tra lỗi ESLint
npm run lint:fix     # Tự động sửa lỗi ESLint
npm run prettier     # Kiểm tra format code
npm run prettier:fix # Tự động format code
```

---

## 👨‍💻 Tác giả

**Trần Hữu Phước** – [@HuuFuoc](https://github.com/HuuFuoc)
