export default function ServicesPage() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Services</h2>
          <p className="text-gray-600">Manage your services</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Upload Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Service Card Example */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Service Preview</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">UX & Web Design Master</h3>
            <div className="flex space-x-2">
              <button className="text-blue-600 text-sm hover:underline">Edit</button>
              <button className="text-blue-600 text-sm hover:underline">Unpublish</button>
              <button className="text-red-600 text-sm hover:underline">Delete</button>
            </div>
          </div>
        </div>

        {/* Add more service cards as needed */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Service Preview</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">UX & Web Design Master</h3>
            <div className="flex space-x-2">
              <button className="text-blue-600 text-sm hover:underline">Edit</button>
              <button className="text-blue-600 text-sm hover:underline">Unpublish</button>
              <button className="text-red-600 text-sm hover:underline">Delete</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4">
            <div className="bg-gray-100 rounded-lg h-32 mb-4 flex items-center justify-center">
              <span className="text-gray-400">Service Preview</span>
            </div>
            <h3 className="font-medium text-gray-900 mb-2">UX & Web Design Master</h3>
            <div className="flex space-x-2">
              <button className="text-blue-600 text-sm hover:underline">Edit</button>
              <button className="text-blue-600 text-sm hover:underline">Unpublish</button>
              <button className="text-red-600 text-sm hover:underline">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}