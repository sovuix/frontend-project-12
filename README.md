### Hexlet tests and linter status:
[![Actions Status](https://github.com/sovuix/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/sovuix/frontend-project-12/actions)

# 💬 Chat Application

<div align="center">
  

  
  ![React](https://img.shields.io/badge/React-18.2-blue?logo=react)
  ![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)
  ![RTK Query](https://img.shields.io/badge/RTK-Query-764ABC?logo=redux&logoColor=purple)
  ![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap)
  ![Vite](https://img.shields.io/badge/Vite-4.x-646CFF?logo=vite)

  
  <h3>A real-time chat application built with React, Redux Toolkit, and RTK Query.

The project demonstrates modern state management, API caching, error handling, and production monitoring integration.</h3>
</div>

---

## Features

<div align="center">
  
  | | | |
  |:---:|:---:|:---:|
  | 🔐 **Authentication** | 📢 **Channels** | 💬 **Real-time Chat** |
  | Secure JWT login | Create, rename, delete | Instant messaging |
  | ⚡ **RTK Query** | 🌍 **i18n Support** | 📱 **Responsive** |
  | Data caching & sync | RU language | Mobile-friendly |

</div>

###  User Authentication
- Secure login system with JWT tokens
- Registration for new users
- Protected routes for authorized users

### Channel Management
- Create new chat channels
- Rename existing channels
- Delete channels (with permissions)
- Browse available channels in sidebar

### Real-Time Messaging
- Instant message delivery via WebSocket
- Message history per channel
- User-friendly notifications
- Error handling with toast messages

### RTK Query Integration
- Automatic data caching and synchronization
- Optimistic updates for better UX
- Background refetching
- Built-in loading and error states
- Automatic request retries





---

## Tech Stack



### Frontend Core
| Technology | Description | Badge |
|------------|-------------|-------|
| **React 18** | UI Library | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) |
| **Redux Toolkit** | State Management | ![Redux](https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white) |
| **RTK Query** | Data Fetching & Caching | ![RTK Query](https://img.shields.io/badge/-RTK%20Query-764ABC?logo=redux&logoColor=purple) |
| **React Router v6** | Navigation | ![Router](https://img.shields.io/badge/-Router-CA4245?logo=react-router&logoColor=white) |

### UI & Styling
| Technology | Description | Badge |
|------------|-------------|-------|
| **Bootstrap 5** | CSS Framework | ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?logo=bootstrap&logoColor=white) |
| **React Toastify** | Notifications | ![Toastify](https://img.shields.io/badge/-Toastify-ffc107) |

### Form Handling
| Technology | Description | Badge |
|------------|-------------|-------|
| **Formik** | Form Management | ![Formik](https://img.shields.io/badge/-Formik-2563eb) |
| **Yup** | Validation | ![Yup](https://img.shields.io/badge/-Yup-2563eb) |

### Development Tools
| Technology | Description | Badge |
|------------|-------------|-------|
| **Vite** | Build Tool | ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white) |
| **ESLint** | Code Linting | ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white) |


### Installation

```bash
git clone https://github.com/sovuix/frontend-project-12
cd frontend-project-12/frontend
npm install
npm run dev