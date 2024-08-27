export default function AdminInfo() {
    return (
        <div className="bg-gray-100 min-h-screen p-8 mt-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Tamil Nadu - An Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Number of Districts</h2>
                    <p className="text-lg text-gray-500">38</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Number of Taluks</h2>
                    <p className="text-lg text-gray-500">273</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Number of Villages</h2>
                    <p className="text-lg text-gray-500">16,564</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Area</h2>
                    <p className="text-lg text-gray-500">130,058 sq km</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Population</h2>
                    <p className="text-lg text-gray-500">~77 million</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Capital City</h2>
                    <p className="text-lg text-gray-500">Chennai</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Official Language</h2>
                    <p className="text-lg text-gray-500">Tamil</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Economy</h2>
                    <p className="text-lg text-gray-500">Diverse (Manufacturing, Agriculture, IT, etc.)</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Major Rivers</h2>
                    <p className="text-lg text-gray-500">Kaveri, Thamirabarani, Vaigai, Palar</p>
                </div>
            </div>
        </div>
    );
}
