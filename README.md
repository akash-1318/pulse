# Pulse - Video Streaming & Management Platform

A full-stack video streaming and management platform with real-time processing, sensitivity analysis, and multi-user support. Built with Express.js, React, MongoDB, and WebSocket technology.

## 🎯 Overview

Pulse is an enterprise-ready video management system designed for organizations to upload, stream, and manage video content with advanced features including:

- **Multi-user video platform** with role-based access control
- **Real-time video processing** with progress tracking
- **Sensitivity detection** using keyword analysis
- **Live streaming** capabilities with WebSocket support
- **Organizational management** with admin controls
- **Responsive UI** built with React and Tailwind CSS

---

## ✨ Key Features

### Authentication & Authorization

- **User Registration**: Organization admins can register and create accounts
- **Secure Login**: JWT-based authentication with token expiration
- **Role-Based Access Control**: Three user roles with distinct permissions
  - **Viewer**: Can watch and browse videos
  - **Editor**: Can upload, edit, and manage their own videos
  - **Admin**: Full platform control including user management

### Video Management

- **Upload Videos**: Editors and admins can upload video files (up to 200MB default)
- **Video Metadata**: Automatic extraction of duration and file information
- **Categories**: Organize videos by custom categories
- **Search & Filter**: Search videos by title, description, or category
- **Video Streaming**: Efficient streaming with progress tracking
- **CRUD Operations**: Create, read, update, and delete video metadata

### Processing & Analysis

- **Real-time Processing**: Video processing with live progress updates
- **Sensitivity Analysis**: Automatic content sensitivity classification
  - Detects flagged keywords in title, description, and filename
  - Generates sensitivity scores (0-100)
  - Flags content for review if necessary
- **Processing States**: Track video status through (uploaded → processing → completed)
- **WebSocket Updates**: Live progress notifications to connected clients

### Organization & User Management

- **Multi-tenant Support**: Each user belongs to an organization
- **User Management Panel**: Admins can view, create, and manage organization users
- **Admin Dashboard**: Comprehensive admin interface for platform management

### Security

- **Password Hashing**: Secure bcryptjs password hashing
- **CORS Protection**: Configured cross-origin security
- **Helmet Middleware**: HTTP header security
- **Request Validation**: Input validation and error handling
- **File Upload Security**: Multer-based file handling with type validation

---

## 🚀 Tech Stack

### Backend

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5.2.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) with bcryptjs
- **Real-time**: Socket.IO 4.8.3
- **File Upload**: Multer 2.1.1
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Dev Tools**: Nodemon for hot reloading

### Frontend

- **Library**: React 19.1.0
- **Build Tool**: Vite 7.1.0
- **Styling**: Tailwind CSS 3.4.1
- **HTTP Client**: Axios 1.8.4
- **Real-time**: Socket.IO Client 4.8.1
- **Package Manager**: npm

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **MongoDB** (v4.4 or higher) - Local or Atlas
- **Git**

---

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/akash-1318/pulse.git
cd pulse
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/pulse
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pulse

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Client URL (CORS)
CLIENT_URL=http://localhost:5173

# File Upload
MAX_VIDEO_SIZE_MB=200
UPLOAD_DIR=./uploads
```

#### Start the Backend Server

**Development Mode** (with hot reload):

```bash
npm run dev
```

**Production Mode**:

```bash
npm start
```

The backend will be available at `http://localhost:3000`

### 3. Frontend Setup

#### Install Dependencies

```bash
cd ../frontend
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

#### Start the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

#### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

---

## 📁 Project Structure

```
pulse/
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express app configuration
│   │   ├── server.js               # Server entry point
│   │   ├── config/
│   │   │   ├── db.js              # MongoDB connection
│   │   │   └── env.js             # Environment variables
│   │   ├── controllers/
│   │   │   ├── authController.js  # Auth logic
│   │   │   ├── userController.js  # User management
│   │   │   └── videoController.js # Video operations
│   │   ├── middleware/
│   │   │   ├── auth.js            # JWT verification
│   │   │   ├── errorHandler.js    # Error handling
│   │   │   ├── roles.js           # Role authorization
│   │   │   └── upload.js          # File upload handling
│   │   ├── models/
│   │   │   ├── Organization.js    # Organization schema
│   │   │   ├── User.js            # User schema
│   │   │   └── Video.js           # Video schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # Auth endpoints
│   │   │   ├── userRoutes.js      # User endpoints
│   │   │   └── videoRoutes.js     # Video endpoints
│   │   ├── services/
│   │   │   ├── socketService.js   # WebSocket handling
│   │   │   └── videoProcessingService.js
│   │   ├── utils/
│   │   │   ├── httpError.js       # Error class
│   │   │   ├── jwt.js             # JWT utilities
│   │   │   ├── sensitivity.js     # Sensitivity analysis
│   │   │   └── videoMetadata.js   # Video metadata extraction
│   │   ├── tests/
│   │   │   └── sensitivity.test.js
│   │   └── uploads/               # Video storage
│   ├── package.json
│   └── .env (create this)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                # Main app component
│   │   ├── main.jsx               # React entry point
│   │   ├── styles.css             # Global styles
│   │   ├── components/
│   │   │   ├── AlertMessage.jsx   # Alert notifications
│   │   │   ├── AppHeader.jsx      # Header component
│   │   │   ├── AuthForm.jsx       # Login/Register form
│   │   │   ├── AuthLanding.jsx    # Auth page
│   │   │   ├── DashboardContent.jsx
│   │   │   ├── FilterBar.jsx      # Video filters
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProtectedPlayerModal.jsx
│   │   │   ├── UploadForm.jsx     # Video upload
│   │   │   ├── UserManagement.jsx
│   │   │   ├── VideoCard.jsx      # Video display
│   │   │   └── VideoGrid.jsx      # Video grid layout
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   ├── hooks/
│   │   │   └── useSocket.js       # WebSocket hook
│   │   ├── lib/
│   │   │   └── api.js             # API client
│   │   └── utils/
│   │       └── formatters.js      # Formatting utilities
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── .env (create this)
│   └── index.html
│
└── README.md (this file)
```

---

## 🔌 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint    | Description                     | Auth |
| ------ | ----------- | ------------------------------- | ---- |
| POST   | `/register` | Register new organization admin | ❌   |
| POST   | `/login`    | Login user                      | ❌   |
| GET    | `/me`       | Get current user profile        | ✅   |

### Users (`/api/users`)

| Method | Endpoint | Description                    | Auth | Role  |
| ------ | -------- | ------------------------------ | ---- | ----- |
| GET    | `/`      | List all users in organization | ✅   | Admin |
| POST   | `/`      | Create new user                | ✅   | Admin |
| PATCH  | `/:id`   | Update user                    | ✅   | Admin |
| DELETE | `/:id`   | Delete user                    | ✅   | Admin |

### Videos (`/api/videos`)

| Method | Endpoint      | Description           | Auth | Role          |
| ------ | ------------- | --------------------- | ---- | ------------- |
| GET    | `/`           | List all videos       | ✅   | Any           |
| POST   | `/`           | Upload new video      | ✅   | Editor, Admin |
| GET    | `/:id`        | Get video details     | ✅   | Any           |
| PATCH  | `/:id`        | Update video metadata | ✅   | Editor, Admin |
| DELETE | `/:id`        | Delete video          | ✅   | Editor, Admin |
| GET    | `/:id/stream` | Stream video file     | ✅   | Any           |

### Health Check

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/api/health` | API health status |

---

## 🎬 Usage Guide

### 1. Creating an Account

1. Navigate to the application at `http://localhost:5173`
2. Click "Register as Admin"
3. Fill in your organization name, email, and password
4. You'll be logged in as an admin automatically

### 2. Uploading Videos

**As an Editor or Admin:**

1. Click "Upload Video" button
2. Select a video file (max 200MB)
3. Enter video title and description
4. Select a category
5. Click "Upload"
6. Monitor real-time processing progress

**Processing includes:**

- Video metadata extraction
- Sensitivity analysis
- Progress tracking updates

### 3. Browsing Videos

1. View all videos in the grid layout
2. Use filters to search by:
   - Title or description
   - Processing status
   - Sensitivity status
   - Category
3. Click on any video card to view details

### 4. Streaming Videos

1. Click on any video in the grid
2. The video player will open
3. Stream or download the video
4. View video metadata and details

### 5. Managing Users (Admin Only)

1. Navigate to the "User Management" section
2. View all organization users
3. Create new users with roles: Viewer, Editor, or Admin
4. Edit user information
5. Delete users as needed

### 6. Video Sensitivity

All uploaded videos are automatically analyzed for:

- **Flagged Keywords**: violence, blood, weapon, abuse, nsfw, adult, harm, fight
- **Sensitivity Score**: 0-100 based on matches
- **Status**: Safe or Flagged

Videos flagged as sensitive are marked for review.

---

## 🔄 Real-time Features

### WebSocket Connections

The application uses Socket.IO to provide real-time updates:

**Video Processing Progress:**

- Connect when user logs in
- Receive updates on:
  - Processing status changes
  - Processing progress percentage
  - Sensitivity analysis results
  - Matched keywords

**Example WebSocket Events:**

```javascript
// Listen for video progress updates
socket.on("videoProgress", (payload) => {
  // {
  //   videoId: "...",
  //   processingStatus: "processing|completed|failed",
  //   processingProgress: 0-100,
  //   sensitivityStatus: "safe|flagged",
  //   sensitivityScore: 0-100,
  //   matchedKeywords: ["violence"]
  // }
});
```

---

## 🧪 Testing

### Run Tests

```bash
cd backend
npm test
```

### Test Coverage

- Sensitivity classification tests
- Keyword matching tests
- Score calculation tests

---

## 🔐 Security Considerations

### Environment Variables

- **Never commit `.env` files** to version control
- Use strong JWT_SECRET in production (32+ characters)
- Keep database credentials secure

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use strong JWT_SECRET
- [ ] Configure proper CORS origins
- [ ] Set up HTTPS/SSL
- [ ] Enable rate limiting
- [ ] Set up proper database backups
- [ ] Use environment-specific configuration
- [ ] Enable security headers (already configured with Helmet)
- [ ] Set up logging and monitoring

---

## 🐛 Troubleshooting

### Backend won't start

**Issue**: Port already in use

```bash
# Change PORT in .env or kill the process
lsof -ti:3000 | xargs kill -9
```

**Issue**: MongoDB connection failed

- Check MongoDB is running
- Verify MONGODB_URI is correct
- Check network connectivity to MongoDB Atlas

### Frontend won't connect to backend

**Issue**: CORS errors

- Verify `CLIENT_URL` in backend `.env`
- Ensure backend is running on correct port
- Check `VITE_API_BASE_URL` in frontend `.env`

### Videos not uploading

**Issue**: File too large

- Default max is 200MB, increase `MAX_VIDEO_SIZE_MB` in backend `.env`

**Issue**: No uploads folder

- Create `backend/uploads` directory
- Ensure proper permissions

---

## 📦 Dependencies

### Critical Dependencies

- **Express.js**: HTTP server framework
- **MongoDB/Mongoose**: Database
- **JWT**: Secure authentication
- **Socket.IO**: Real-time communication
- **Multer**: File upload handling
- **React**: UI framework
- **Vite**: Modern build tool

### Security Dependencies

- **bcryptjs**: Password hashing
- **Helmet**: HTTP security headers
- **CORS**: Cross-origin protection

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👤 Author

**Akash Sharma**

- GitHub: [@akash-1318](https://github.com/akash-1318)

---

## 📞 Support & Contact

For issues, questions, or suggestions:

- Open an issue on GitHub
- Check existing documentation
- Review the troubleshooting section

---

## 🚦 Getting Help

### Common Commands Reference

**Backend Development:**

```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm test             # Run tests
npm start            # Start production server
```

**Frontend Development:**

```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 📚 Additional Resources

### Video Format Support

- MP4 (H.264)
- WebM
- OGG
- MOV

### Recommended Video Upload Specs

- Codec: H.264
- Resolution: Up to 4K (3840x2160)
- Bitrate: 2500 kbps - 10000 kbps
- Frame Rate: 24-60 fps
- Audio: AAC, 128 kbps

---

**Last Updated:** March 31, 2026  
**Version:** 1.0.0
