# FriendFiesta

This project is developed using a modern tech stack, including React, Node.js, Express, MongoDB, and Socket.IO. It provides various features to create a dynamic and interactive social media platform.

# Features
## Authentication: 
Users can securely sign up, log in, and log out. Authentication is implemented using JSON Web Tokens (JWT) for secure user authentication.

## User Profiles: 
Each user has their own profile, where they can view and update their information. Users can also upload profile pictures to personalize their profiles.

## Posts:
Users can create posts, view posts from other users, like and comment on posts, and delete their own posts. The posts are displayed in a feed-like layout for easy consumption.

## Stories:
Users can create stories similar to other popular social media platforms. Stories expire automatically after 24 hours and provide a way for users to share short-lived content with their followers.

## Messaging:
Real-time messaging functionality allows users to chat with their online friends instantly. This feature is implemented using WebSocket technology provided by Socket.IO, ensuring fast and reliable communication.

## Relationships:
Users can follow and unfollow other users to stay updated with their activities. Following a user enables users to see their posts and stories in their feed.

## Notifications:
Users receive notifications for various actions, such as new likes, comments, and messages. Notifications provide a way for users to stay informed about activities related to their content.

## Dark Mode:
The application supports a dark mode theme, enhancing usability in low-light environments and providing users with a choice of visual preferences.

## Responsive Design:
The user interface is fully responsive and adapts to different screen sizes, ensuring a consistent and enjoyable experience across devices.


## Technologies Used
The project uses a combination of frontend and backend technologies to deliver its functionality:

### Frontend:
React: A popular JavaScript library for building user interfaces.
React Router: Used for declarative routing in the React application.
Axios: A promise-based HTTP client for making requests to the backend API.
Socket.IO Client: Used for real-time communication with the server via WebSocket.

### Backend:
Node.js: A JavaScript runtime environment for executing server-side code.
Express: A web application framework for building RESTful APIs and web servers.
MongoDB: A NoSQL database used for storing application data.
Socket.IO: A library that enables real-time, bidirectional communication between web clients and servers.

### Other:
JWT: JSON Web Tokens are used for secure authentication and authorization.
Multer: Middleware for handling file uploads in Node.js.
React Query: A React library for managing and caching asynchronous data fetching.
SCSS: A preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS).