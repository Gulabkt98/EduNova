# EduNova - Modern Learning Management System

EduNova is a comprehensive Learning Management System (LMS) built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a robust platform for online education, course management, and student learning.

## 🚀 Features

### For Students
- User authentication (Login/Signup) with OTP verification
- Browse available courses
- Purchase courses through secure payment integration
- Track learning progress
- Rate and review courses
- Personalized dashboard
- Profile management

### For Instructors
- Course creation and management
- Content upload (videos, documents, etc.)
- Track student progress
- Manage course sections and subsections
- View earnings and statistics
- Instructor dashboard

## 🛠️ Technical Stack

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- Axios for API calls
- React Router for navigation

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for media storage
- Razorpay payment integration

## 📁 Project Structure

```
EduNova/
├── src/                   # Frontend source code
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── slices/          # Redux slices
│   └── utils/           # Utility functions
│
├── EduNova_Backend/      # Backend source code
│   ├── controllers/     # Route controllers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── middlewares/    # Custom middlewares
│   └── utils/          # Utility functions
```

## ⚙️ Environment Variables

### Frontend (.env)
```
REACT_APP_BASE_URL=your_backend_url
REACT_APP_RAZORPAY_KEY=your_razorpay_key
```

### Backend (.env)
```
MONGODB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/EduNova.git
   ```

2. Install dependencies for frontend:
   ```bash
   cd EduNova
   npm install
   ```

3. Install dependencies for backend:
   ```bash
   cd EduNova_Backend
   npm install
   ```

4. Set up environment variables:
   - Create .env files in both frontend and backend directories
   - Add the necessary environment variables as shown above

5. Run the development servers:

   Frontend:
   ```bash
   npm start
   ```

   Backend:
   ```bash
   npm run dev
   ```

## 🔒 Security Features

- JWT authentication
- Password hashing
- OTP verification for signup
- Protected API routes
- Secure payment integration

## 📱 Key Components

- User Authentication System
- Course Management System
- Payment Integration
- Content Delivery System
- Progress Tracking System
- Rating and Review System
- User Profile Management

## 🛣️ API Routes

### Auth Routes
- POST /api/v1/auth/login
- POST /api/v1/auth/signup
- POST /api/v1/auth/sendotp
- POST /api/v1/auth/reset-password

### Course Routes
- GET /api/v1/course/getallcourses
- GET /api/v1/course/getCourseDetails
- POST /api/v1/course/createCourse
- PUT /api/v1/course/editCourse

### Profile Routes
- GET /api/v1/profile/getUserDetails
- PUT /api/v1/profile/updateProfile
- GET /api/v1/profile/getEnrolledCourses

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](link_to_issues).

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👥 Authors

- [@Gulabkt98](https://github.com/Gulabkt98)

---
For more information or support, please [contact us](mailto:gulabgkg99@gmail.com)
