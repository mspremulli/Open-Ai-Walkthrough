import Assistant from "./assisant";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-5">
        <p className="text-2xl text-center font-semibold mb-4">Welcome to your OpenAI walkthrough</p>
        <div className="flex justify-center items-center bg-white shadow-lg p-6 rounded-lg">
          <Assistant
            assistantId={""} 
            apiKey={""} 
          />
        </div>
      </div>
    </main>
  );
}