# 0neAuthX

0neAuthX is a third-party authenticator designed to simplify and secure authentication workflows. It includes a **frontend client** and **backend endpoints** that interact with a real-time database to verify OTPs.

---

## Project Structure

```
root/
├── client/       # Frontend for the 0neAuthX website
├── endpoints/    # Backend API endpoints to handle OTP verification
├── README.md     # Project documentation
```

---

## Features

### Client (Frontend)
- A user-friendly interface for generating and managing OTPs.
- Built with React for a responsive and dynamic experience.
- Designed to integrate with third-party apps.

### Endpoints (Backend)
- **Verify OTPs**: Secure endpoints to verify OTPs sent by third-party apps.
- **Database Integration**: Connects to a real-time database for OTP management.
- Uses `POST` requests to ensure secure data transfer.

---
### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/0neAuthX.git
   cd 0neAuthX
   ```

2. Navigate to the **client** directory and install dependencies:
   ```bash
   cd client
   npm install
   ```

3. Configure the real-time database:
   - Update the database configuration in the respective `.env` files.

---

## Client (Frontend)

The client is a React-based frontend that provides a user interface for 0neAuthX.

### Run the Client
```bash
cd client
npm start
```

### Available Scripts
- `npm start`: Start the development server.
- `npm run build`: Build the app for production.

---

## Endpoints (Backend)

The backend contains API endpoints for OTP verification. The server is connected to a real-time database.


**Response**:
- **200 OK**: OTP verified successfully.
- **400 Bad Request**: Invalid OTP or app ID.
- **500 Internal Server Error**: Database or server issue.

---

### Available Scripts
- `npm start`: Start the server.
- `npm run dev`: Start the server in development mode with hot reload.


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

- Built with React, Tailwind, REST and Firebase.
- Inspired by robust TPA Services
- BUilt by [Aman Morghade](https://github.com/xaman27x)
---
```
