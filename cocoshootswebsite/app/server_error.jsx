export default function ServerError() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-xl shadow-2xl p-10 border border-gray-100 ">
            <h1 className="text-4xl text-black text-gray-900 font-bold mb-4">500 - Server Error</h1>
            <p className="text-lg text-gray-600">Sorry, something went wrong on our server.</p>
        </div>
    );
}