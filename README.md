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
- Redux Toolkit (RTK Query) for API calls

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

For a recruiter-friendly tour, select one of the **Admin demo**, **Faculty demo**, or **Student demo** cards on the sign-in screen. The selected account is prefilled for you.

Before deploying, seed the demo workspace from the server project with `npm run demo:seed`. Use a distinct password for public demo accounts; their credentials are intentionally visible because they are resettable sample accounts.

## Environment variables

Vite inlines every `VITE_*` value it can see at build time, so the file that
holds them determines what the deployed bundle talks to.

| File | Loaded by | Purpose |
| --- | --- | --- |
| `.env` | every build | Shared demo account credentials only. **No API URL.** |
| `.env.development` | `npm run dev` only | `VITE_API_BASE_URL=http://localhost:8000/api` |
| `.env.local` | local only, git-ignored | Machine-specific overrides |
| Hosting dashboard | Vercel build | Optional production `VITE_API_BASE_URL` |

The API URL is resolved in `src/app/serverApi.ts`:

1. `VITE_API_BASE_URL`, when set.
2. `http://localhost:8000/api` while running `npm run dev`.
3. `https://quiz-maker-2-0-server.vercel.app/api` for any production build.

If a production build is configured with a `localhost` / `127.0.0.1` URL, the
app ignores it, logs a warning, and uses the deployed API. That guard exists
because a committed `VITE_API_BASE_URL=http://localhost:8000/api` once shipped
inside the deployed bundle.

## Troubleshooting

**Login works on a laptop but not on a phone.** The deployed bundle is calling
the API on the *device that opened the page* — `localhost` is the phone itself,
so the request fails. Chrome on Android additionally shows *“wants to access
other apps and services on this device”* because the page is reaching for a
local address. Check the deployed JS for `localhost:8000` and rebuild with a
public API URL. The app now refuses to boot with a loopback URL in production,
so a fresh deploy cannot regress.

**`npm run dev` talks to the deployed API.** Your shell or `.env.local` is
setting `VITE_API_BASE_URL`; remove it or point it at
`http://localhost:8000/api`.

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
