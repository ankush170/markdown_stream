import MarkdownInput from '../components/MarkdownInput';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Markdown Stream</h1>
      <MarkdownInput />
    </div>
  );
}
