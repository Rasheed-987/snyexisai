export default function CreateNewServicePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create New Service</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Service Name</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              placeholder="Enter service name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea 
              className="w-full p-2 border rounded h-32"
              placeholder="Enter service description"
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Create Service
          </button>
        </form>
      </div>
    </div>
  )
}