import React from 'react';
import { useTheme } from './context/ThemeContext';
import Dashboard from './components/interactive-components/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const { theme, themeStyles } = useTheme();

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${themeStyles.bg}`}>
        <Dashboard />
      </div>
    </ErrorBoundary>
  );
};

export default App;