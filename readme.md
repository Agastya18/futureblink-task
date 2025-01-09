# Email Sequence Designer

A visual flowchart-based email marketing sequence designer built with the MERN stack. Design email sequences with a drag-and-drop interface and automate email sending based on custom delays.


<img width="1456" alt="Screenshot 2025-01-09 at 6 54 54 PM" src="https://github.com/user-attachments/assets/a8b589fe-9981-4ebb-a510-476d6eec5d85" />


## Features

- Visual flowchart interface using React Flow
- Drag-and-drop nodes for:
  - Cold Email
  - Wait/Delay (in minutes)
  - Lead Source
- Automated email scheduling
- Real-time flow editing and preview
- Email scheduling with custom delays

## Tech Stack

### Frontend
- React
- TypeScript
- React Flow
- Tailwind CSS
- Zustand (State Management)
- Lucide React (Icons)

### Backend
- Node.js
- Express
- MongoDB
- Agenda (Job Scheduling)
- Nodemailer (Email Service)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- SMTP server credentials

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd email-sequence-designer
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd server
npm install
```

4. Configure environment variables:

Create a `.env` file in the server directory with the following:
```env
MONGODB_URI=mongodb://localhost:27017/email-sequence
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
```

## Running the Application

1. Start the frontend development server:
```bash
npm run dev
```

2. Start the backend server:
```bash
cd server
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Creating a Sequence**
   - Drag nodes from the sidebar onto the canvas
   - Connect nodes by dragging from one node's handle to another
   - Configure email content and delay times

2. **Node Types**
   - **Lead Source**: Starting point of your sequence
   - **Cold Email**: Configure email content, subject, and recipient
   - **Wait/Delay**: Set delay duration in minutes

3. **Saving and Scheduling**
   - Click the "Save Flow" button to save your sequence
   - Emails will be automatically scheduled based on the configured delays

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── CustomNode.tsx
│   │   └── Sidebar.tsx
│   ├── store/
│   │   └── flowStore.ts
│   ├── types/
│   │   └── flow.ts
│   ├── App.tsx
│   └── main.tsx
├── server/
│   ├── server.js
│   └── package.json
└── package.json
```



## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Flow](https://reactflow.dev/) for the flowchart interface
- [Agenda](https://github.com/agenda/agenda) for job scheduling
- [Nodemailer](https://nodemailer.com/) for email functionality
