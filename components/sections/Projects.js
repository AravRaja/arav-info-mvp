export default function Projects() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="font-mono text-2xl mb-6">Projects</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Example project cards */}
        <div className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="font-bold mb-2">Project One</div>
          <div className="text-sm text-gray-400">Hover for GIF/keywords</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <div className="font-bold mb-2">Project Two</div>
          <div className="text-sm text-gray-400">Hover for GIF/keywords</div>
        </div>
      </div>
    </div>
  )
}
