# Thrift 3.0

A modern thrift savings application built with React, TypeScript, and TailwindCSS.

## Features

- 🌓 Light/Dark theme
- 📱 Responsive design
- 💳 Payment processing
- 👥 Group management
- 📊 Dashboard analytics
- 🔔 Notifications
- 🎯 Interactive components

## Tech Stack

- React 18
- TypeScript 4.9
- TailwindCSS 3
- Framer Motion
- PostgreSQL
- Jest & React Testing Library

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/dapcigar/Thrift-3.0.git
cd Thrift-3.0
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
npm run dev
```

5. For production build:
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # React context providers
├── database/       # Database configuration and migrations
├── hoc/           # Higher-order components
├── pages/         # Page components
├── tests/         # Test suites
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Testing

Run all tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.