import { useState } from 'react'

export default function About() {
  const [expand, setExpand] = useState(false)
  return (
    <div className="w-full max-w-xl mx-auto">
      <h2 className="font-mono text-2xl mb-6">About</h2>
      <div className="text-gray-300">
        <div>
          <span>TL;DR: Creative dev, lover of code and design.</span>
          {!expand && (
            <button onClick={() => setExpand(true)} className="ml-4 underline text-accent-blue">Read more</button>
          )}
        </div>
        {expand && (
          <div className="mt-4">
            Full background goes here. (Expand with your story, experience, and philosophy.)
          </div>
        )}
      </div>
    </div>
  )
}
