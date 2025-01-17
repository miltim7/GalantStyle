import '../styles/global.css';

export const metadata = {
  title: 'Galant Style',
  description: 'Сайт Galant Style',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
