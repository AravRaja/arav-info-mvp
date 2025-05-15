export default function Contact() {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="font-mono text-2xl mb-6">Contact</h2>
      <form className="flex flex-col space-y-4">
        <input className="bg-gray-800 rounded px-4 py-2 text-white placeholder-gray-400" placeholder="Your email" type="email" required />
        <textarea className="bg-gray-800 rounded px-4 py-2 text-white placeholder-gray-400" placeholder="Your message" required />
        <button className="bg-accent-blue text-background font-bold py-2 rounded hover:bg-accent-purple transition-colors" type="submit">/ping</button>
      </form>
      <div className="mt-4 text-gray-400 text-sm">Or email <a href="mailto:arav@example.com" className="underline">arav@example.com</a></div>
    </div>
  )
}
