# Quiz Maker 2.0

A modern web application for creating, managing, and taking quizzes. Built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication and authorization
- Create and manage quiz questions
- Organize questions by categories
- Multiple choice questions with 4 options
- Clean and intuitive user interface
- Responsive design

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Hook Form
- React Router
- Axios for API calls

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/quizMaker_2.0_client.git
cd quizMaker_2.0_client
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Testing the Application

You can test the deployed application using the following credentials:

- Username: `jagin`
- Password: `123`

## Project Structure

```
src/
├── features/
│   └── qbank/
│       ├── QuestionForm.tsx    # Form component for adding/editing questions
│       └── qBankApi.ts         # API integration for questions
├── components/                 # Reusable components
├── pages/                     # Page components
└── App.tsx                    # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React Hook Form for form management
- Tailwind CSS for styling
- All contributors who have helped shape this project
