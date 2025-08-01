import { QuizTaker } from "@/components/quiz-taker"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            QuizForgeDinamik
          </span>
        </h1>
        <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">Dinamik Quiz Oluşturma ve Çözme Platformu</p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center p-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Kullanıcı Paneli (Quiz Çöz)</h2>
          <QuizTaker />
        </div>
      </main>
    </div>
  )
}
