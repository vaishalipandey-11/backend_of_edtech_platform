# 🎓 CodeZen - EdTech Platform Backend
A **comprehensive backend system** for an educational technology platform, built with **Node.js, Express, and MongoDB**.  
This project showcases **real-world backend development skills** including authentication, course management, payments, and cloud integrations.

---

## 🚀 Key Features

### 🔑 Authentication & Authorization
- Secure **JWT-based authentication**
- **Role-based access control** (Student / Instructor / Admin)
- **OTP verification** for signup
- **Password reset** with email

### 📚 Course Management
- Full **CRUD operations** for courses
- Section & Subsection management
- **Course progress tracking**
- Category-based organization

### 💳 Payment Integration
- Integrated **Razorpay payment gateway**
- Secure **payment verification**
- Automated **course enrollment**
- Success **email notifications**

### ☁️ Cloud & Media Handling
- **Cloudinary integration** for media storage
- Video content & profile picture uploads
- File uploads with **Multer**

### 📧 Email System
- Automated notifications (signup, purchase, etc.)
- Custom **email templates**
- Contact form support

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** JWT, Bcrypt  
- **Payments:** Razorpay  
- **Cloud Storage:** Cloudinary  
- **Email Service:** Nodemailer  
- **Others:** Multer, CORS  

---

## 📋 API Documentation

The backend exposes over **25 RESTful routes** covering:
- Authentication (`/api/v1/auth/...`)
- Course management (`/api/v1/course/...`)
- Payment handling (`/api/v1/payment/...`)
- User profile & progress (`/api/v1/profile/...`)

👉 Detailed API usage, sample requests & responses are available via the **Postman Collection** included in this repository.  
*(add link after deploying here vp)*

---

## 🔧 Installation & Setup

1. **Install dependencies**
   ```bash
   npm install

2.Set up environment variables in a .env file
  MONGODB_URL=your_mongodb_url
  JWT_SECRET=your_jwt_secret
  CLOUD_NAME=your_cloudinary_name
  API_KEY=your_cloudinary_key
  API_SECRET=your_cloudinary_secret
  RAZORPAY_KEY=your_razorpay_key
  RAZORPAY_SECRET=your_razorpay_secret

3. Run the server
   ```bash
   npm run dev

## 📋 API Documentation

The backend exposes over ** RESTful routes** including authentication, courses, payments, and user profiles.. etc.  

👉 You can test all APIs using the provided **Postman Collection**:  
[📥 Download CodeZen API Collection]([backend_of_studynotion.postman_collection.json](https://github.com/vaishalipandey-11/backend_of_edtech_platform/blob/main/backend_of_studynotion.postman_collection.json))

Import this file into Postman to explore and test the API endpoints.
   

🎯 Learning Outcomes

Implemented secure authentication & role-based authorization
Integrated third-party services (Razorpay, Cloudinary)
Designed and documented RESTful APIs
Managed file uploads & cloud storage
Built a notification system with email automation
Structured scalable backend architecture

🔍 Future Enhancements

Real-time updates via WebSockets
Redis caching for performance optimization
Analytics dashboard for admins
AI-powered content recommendation system
Mobile app integration

👩‍💻 Author

Vaishali Pandey
```bash
📧 Email: pandeyvaishali002@gmail.com
🐙 GitHub: vaishalipandey-11   

    
