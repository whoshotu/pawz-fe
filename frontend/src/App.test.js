import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';

test('renders Paws Connect link', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
  const linkElement = screen.getByText(/Paws Connect/i);
  expect(linkElement).toBeInTheDocument();
});
