import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Mative and our mission',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="mb-8 text-4xl font-bold tracking-tight text-gray-900">
          About Mative
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Mative is a modern Next.js application built with the latest web technologies 
            and best practices. Our project showcases a component-based architecture that 
            emphasizes reusability, maintainability, and performance.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide developers with a solid foundation for building scalable, 
            maintainable, and performant web applications using Next.js and modern 
            development practices.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Frontend</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Next.js 14+ with App Router</li>
                <li>• React 18+ with TypeScript</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Component-based architecture</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Development</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• ESLint & Prettier for code quality</li>
                <li>• TypeScript for type safety</li>
                <li>• Hot module replacement</li>
                <li>• Optimized build process</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li>• 🚀 Fast development with hot reload</li>
            <li>• 📱 Responsive design with mobile-first approach</li>
            <li>• 🎨 Modern design system with Tailwind CSS</li>
            <li>• 🔧 Reusable component library</li>
            <li>• ⚡ Optimized performance and SEO</li>
            <li>• 🛡️ Type-safe development with TypeScript</li>
          </ul>
        </div>
      </div>
    </div>
  )
}