# OneAuth-X Client

The **OneAuth-X Client** is the frontend application for the OneAuth-X authenticator. It offers a seamless user experience for authentication, profile customization, and homepage interactions. Built with modern web technologies and Firebase services, it provides secure and dynamic functionality.

---

## Features

### 🔑 Login via Firebase Auth
- Secure user authentication using Firebase Authentication.
- Supports email/password login and social logins (if configured).

### 🏠 Homepage
- Displays active pages and services linked to the user's account.
- Dynamic updates from Firebase Realtime Database and Firestore.

### ✏️ Profile Customization
- Users can update their personal information and preferences.
- Images and files stored securely in Cloud Storage.

---

## Tech Stack

### Core Technologies
- **ReactJS**: Frontend framework for building dynamic UIs.
- **TailwindCSS**: Utility-first CSS framework for styling.

### Firebase Integration
- **Firebase Authentication**: User login and session management.
- **Firebase Realtime Database**: Storing and retrieving active page data.
- **Firestore**: Managing structured profile and user-specific data.
- **Cloud Storage**: Secure file uploads for profile images and assets.
- **Cloud Functions**: Serverless functions for backend logic.

## Running the Client

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Folder Structure

```
client/
├── public/               # Static assets
├── src/
├── ├── assets/           # COntains the Static Multimedia of the Website
│   ├── components/       # Reusable React components
│   ├── pages/            # Page-specific components (Login, Homepage, Profile)
│   ├── context/          # Context API for global state
│   ├── firebase/         # Firebase configuration and integration
│   ├── utils/            # Utility functions
│   ├── App.js            # Main app component
│   ├── index.js          # Entry point
│   └── index.css         # Global styles
```

---

## Scripts

### Available Scripts
- `npm start`: Start the development server.
- `npm run build`: Build the app for production.
- `npm test`: Run tests.


## Deployment
This website is deployed on *Google Cloud Platform (GCP)*
---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- **React**: For making frontend development simple and powerful.
- **TailwindCSS**: For its utility-first approach to styling.
- **Firebase**: For its seamless backend and cloud integration.
```