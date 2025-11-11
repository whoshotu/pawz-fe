import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Paws Connect link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Paws Connect/i);
  expect(linkElement).toBeInTheDocument();
});
