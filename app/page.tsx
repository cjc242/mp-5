import UrlForm from "@/components/UrlForm";

export default function Home() {
  return (
      <div className="flex flex-col items-center bg-blue-200 p-4 min-h-screen">
        <h1 className="text-4xl font-semibold p-4">URL Shortener</h1>
        <UrlForm />
      </div>
  );
}