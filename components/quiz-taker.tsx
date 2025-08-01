"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2Icon, XCircleIcon, RefreshCwIcon } from "lucide-react"

interface QuizQuestion {
  id: string
  questionText: string
  options: { id: string; text: string; isCorrect: boolean }[]
}

const sampleQuestions: QuizQuestion[] = [
  {
    id: "q1",
    questionText: "Vercel'in ana ürünü nedir?",
    options: [
      { id: "o1a", text: "Veritabanı Hizmeti", isCorrect: false },
      { id: "o1b", text: "Frontend Geliştirme Platformu", isCorrect: true },
      { id: "o1c", text: "Mobil Uygulama Geliştirme Ortamı", isCorrect: false },
      { id: "o1d", text: "Oyun Motoru", isCorrect: false },
    ],
  },
  {
    id: "q2",
    questionText: "React.js hangi şirket tarafından geliştirilmiştir?",
    options: [
      { id: "o2a", text: "Google", isCorrect: false },
      { id: "o2b", text: "Microsoft", isCorrect: false },
      { id: "o2c", text: "Meta (Facebook)", isCorrect: true },
      { id: "o2d", text: "Apple", isCorrect: false },
    ],
  },
  {
    id: "q3",
    questionText: "Next.js hangi framework üzerine inşa edilmiştir?",
    options: [
      { id: "o3a", text: "Angular", isCorrect: false },
      { id: "o3b", text: "Vue.js", isCorrect: false },
      { id: "o3c", text: "React", isCorrect: true },
      { id: "o3d", text: "Svelte", isCorrect: false },
    ],
  },
  {
    id: "q4",
    questionText: "JavaScript'te bir dizinin sonuna eleman eklemek için hangi metot kullanılır?",
    options: [
      { id: "o4a", text: "unshift()", isCorrect: false },
      { id: "o4b", text: "pop()", isCorrect: false },
      { id: "o4c", text: "push()", isCorrect: true },
      { id: "o4d", text: "shift()", isCorrect: false },
    ],
  },
  {
    id: "q5",
    questionText: "HTML'de bir bağlantı oluşturmak için hangi etiket kullanılır?",
    options: [
      { id: "o5a", text: "<link>", isCorrect: false },
      { id: "o5b", text: "<a>", isCorrect: true },
      { id: "o5c", text: "<href>", isCorrect: false },
      { id: "o5d", text: "<url>", isCorrect: false },
    ],
  },
]

export function QuizTaker() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [showResult, setShowResult] = useState(false) // To show correct/incorrect feedback
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null)

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const progressValue = ((currentQuestionIndex + (quizFinished ? 1 : 0)) / sampleQuestions.length) * 100

  const handleAnswerSelect = (value: string) => {
    if (!showResult) {
      // Prevent changing answer after submission feedback
      setSelectedAnswer(value)
    }
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      alert("Lütfen bir cevap seçin.")
      return
    }

    const correctAnswer = currentQuestion.options.find((opt) => opt.isCorrect)
    const isCorrect = correctAnswer && selectedAnswer === correctAnswer.id
    setIsCorrectAnswer(isCorrect)
    setShowResult(true)

    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setIsCorrectAnswer(null)
    } else {
      setQuizFinished(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizFinished(false)
    setShowResult(false)
    setIsCorrectAnswer(null)
  }

  if (quizFinished) {
    return (
      <Card className="w-full max-w-md mx-auto shadow-lg animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-green-600 dark:text-green-400">
            Quiz Tamamlandı! 🎉
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Harika bir iş çıkardın! İşte sonuçların:
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center grid gap-4">
          <div className="text-5xl font-bold text-gray-900 dark:text-gray-50">
            {score} / {sampleQuestions.length}
          </div>
          <p className="text-xl text-gray-700 dark:text-gray-300">Doğru Cevap Sayısı</p>
          <div className="flex justify-center items-center gap-2 text-lg">
            {score === sampleQuestions.length ? (
              <span className="text-green-500 flex items-center gap-1">
                <CheckCircle2Icon className="h-6 w-6" /> Mükemmel!
              </span>
            ) : score > sampleQuestions.length / 2 ? (
              <span className="text-yellow-500 flex items-center gap-1">
                <CheckCircle2Icon className="h-6 w-6" /> İyi İş!
              </span>
            ) : (
              <span className="text-red-500 flex items-center gap-1">
                <XCircleIcon className="h-6 w-6" /> Biraz Daha Çalış!
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz} className="bg-blue-600 hover:bg-blue-700 text-white">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Tekrar Başla
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">Quiz Zamanı!</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Soruyu okuyun ve doğru cevabı seçin.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>
            Soru {currentQuestionIndex + 1} / {sampleQuestions.length}
          </span>
          <Progress value={progressValue} className="w-[60%]" aria-label={`Quiz ilerlemesi: ${progressValue}%`} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {currentQuestionIndex + 1}. {currentQuestion.questionText}
        </h2>
        <RadioGroup value={selectedAnswer || ""} onValueChange={handleAnswerSelect} className="grid gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option.id
            const isCorrectOption = option.isCorrect
            let itemClass = "flex items-center rounded-lg border p-4 transition-all duration-200 cursor-pointer"

            if (showResult) {
              if (isCorrectOption) {
                itemClass += " border-green-500 bg-green-50 dark:bg-green-900/20 ring-2 ring-green-500"
              } else if (isSelected && !isCorrectOption) {
                itemClass += " border-red-500 bg-red-50 dark:bg-red-900/20 ring-2 ring-red-500"
              } else {
                itemClass += " border-gray-200 dark:border-gray-700"
              }
            } else if (isSelected) {
              itemClass += " border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500"
            } else {
              itemClass += " border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            }

            return (
              <div
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                className={itemClass}
                aria-checked={isSelected}
                role="radio"
                tabIndex={0}
              >
                <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                <Label
                  htmlFor={option.id}
                  className="w-full cursor-pointer text-lg font-medium text-gray-800 dark:text-gray-100"
                >
                  {option.text}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
        {showResult && (
          <div className={`text-center text-lg font-semibold ${isCorrectAnswer ? "text-green-600" : "text-red-600"}`}>
            {isCorrectAnswer ? "Doğru Cevap! 🎉" : "Yanlış Cevap. Tekrar Deneyin. 😔"}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        {!showResult ? (
          <Button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Cevabı Gönder
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="bg-green-600 hover:bg-green-700 text-white">
            {currentQuestionIndex < sampleQuestions.length - 1 ? "Sonraki Soru" : "Quizi Bitir"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
