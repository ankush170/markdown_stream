import './globals.css';

export const metadata = {
  title: 'Markdown Stream',
  description: 'Stream markdown text in real-time',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
