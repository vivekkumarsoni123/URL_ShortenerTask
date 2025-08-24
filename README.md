# 🔗 URL Shortener App (MERN Stack)

A modern URL shortener application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to create shortened URLs and track their usage.

## ✨ Features

### User Features
- **URL Shortening**: Convert long URLs into short, shareable links
- **Instant Results**: Get shortened URLs immediately after submission
- **Copy to Clipboard**: Easy one-click copying of shortened URLs
- **Modern UI**: Beautiful, responsive design with smooth animations

### Admin Features
- **Dashboard**: View all shortened URLs in a comprehensive table
- **Click Tracking**: Monitor how many times each URL has been visited
- **Statistics**: View total URLs, total clicks, and average clicks
- **Copy Functionality**: Copy any shortened URL directly from the admin panel

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **nanoid** - URL-safe unique ID generator
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LC-Corporate
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

### 3. Database Setup

Make sure MongoDB is running on your system. The application will connect to:
```
mongodb://localhost:27017/url-shortener
```

If you need to use a different MongoDB connection string, update the `MONGO_URI` in `backend/config.env`.

### 4. Frontend Setup

Navigate to the frontend directory and install dependencies:
```bash
cd ../Frontend
npm install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

### Start the Frontend Development Server
```bash
cd Frontend
npm run dev
```

The frontend application will start on `http://localhost:5173`

## 📖 API Endpoints

### POST `/api/shorten`
Creates a shortened URL from a long URL.

**Request Body:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path"
}
```

**Response:**
```json
{
  "originalUrl": "https://www.example.com/very/long/url/path",
  "shortUrl": "http://localhost:5000/abc123",
  "shortCode": "abc123"
}
```

### GET `/:shortCode`
Redirects to the original URL and increments the click counter.

### GET `/api/urls`
Returns all shortened URLs with their statistics (admin endpoint).

## 🎯 Usage

### For Users
1. Visit the home page at `http://localhost:5173`
2. Enter a long URL in the input field
3. Click "Shorten URL" to generate a short link
4. Copy the shortened URL using the copy button

### For Admins
1. Navigate to the admin panel at `http://localhost:5173/admin`
2. View all shortened URLs and their statistics
3. Monitor click counts and performance
4. Copy any shortened URL directly from the table

## 📁 Project Structure

```
LC Corporate/
├── backend/
│   ├── models/
│   │   └── Url.js          # MongoDB schema
│   ├── routes/
│   │   └── url.js          # API routes
│   ├── config.env          # Environment variables
│   ├── database.js         # Database connection
│   ├── server.js           # Express server
│   └── package.json        # Backend dependencies
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   ├── UrlShortener.jsx
│   │   │   ├── UrlShortener.css
│   │   │   ├── AdminPanel.jsx
│   │   │   └── AdminPanel.css
│   │   ├── App.jsx         # Main app component
│   │   ├── App.css         # Global styles
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Base styles
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables

Create a `config.env` file in the backend directory:

```env
MONGO_URI=mongodb://localhost:27017/url-shortener
PORT=5000
NODE_ENV=development
```

### Customization

- **URL Length**: Modify the `nanoid(6)` parameter in `backend/routes/url.js` to change the length of generated short codes
- **Styling**: Update CSS files in the Frontend to customize the appearance
- **Ports**: Change the port numbers in the configuration files if needed

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on your system
   - Check the connection string in `config.env`
   - Verify MongoDB is accessible on the default port (27017)

2. **CORS Errors**
   - The backend is configured to allow requests from the frontend
   - If you change ports, update the CORS configuration in `server.js`

3. **Port Already in Use**
   - Change the port in `config.env` or kill the process using the port
   - Update the frontend API calls to use the new port

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Custom short codes
- [ ] URL expiration dates
- [ ] QR code generation
- [ ] Advanced analytics and charts
- [ ] Bulk URL shortening
- [ ] API rate limiting
- [ ] URL validation improvements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as part of the LC Corporate project.

---

**Happy URL Shortening! 🎉**
