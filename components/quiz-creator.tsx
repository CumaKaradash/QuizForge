"use client"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusIcon, TrashIcon, SaveIcon, EditIcon, XIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface Option {
  id: string
  text: string
  isCorrect: boolean
}

interface QuizQuestion {
  id: string
  questionText: string
  options: Option[]
}

export function QuizCreator() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null)
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null)
  const uniqueId = useId()

  const resetCurrentQuestion = () => {
    setCurrentQuestion({
      id: `q-${Date.now()}-${uniqueId}`,
      questionText: "",
      options: [{ id: `opt-${Date.now()}-1`, text: "", isCorrect: false }],
    })
    setEditingQuestionId(null)
  }

  // Initialize with a blank question on mount
  useState(() => {
    resetCurrentQuestion()
  }, [])

  const handleQuestionTextChange = (text: string) => {
    if (currentQuestion) {
      setCurrentQuestion({ ...currentQuestion, questionText: text })
    }
  }

  const handleAddOption = () => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        options: [
          ...currentQuestion.options,
          { id: `opt-${Date.now()}-${currentQuestion.options.length + 1}`, text: "", isCorrect: false },
        ],
      })
    }
  }

  const handleOptionTextChange = (id: string, text: string) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.map((opt) => (opt.id === id ? { ...opt, text } : opt)),
      })
    }
  }

  const handleOptionCorrectChange = (id: string, checked: boolean) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.map((opt) => ({ ...opt, isCorrect: opt.id === id ? checked : false })),
      })
    }
  }

  const handleRemoveOption = (id: string) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.filter((opt) => opt.id !== id),
      })
    }
  }

  const handleSaveQuestion = () => {
    if (!currentQuestion) return

    if (!currentQuestion.questionText.trim()) {
      alert("Lütfen bir soru metni girin.")
      return
    }
    if (currentQuestion.options.length < 2) {
      alert("Lütfen en az iki seçenek ekleyin.")
      return
    }
    if (!currentQuestion.options.some((opt) => opt.isCorrect)) {
      alert("Lütfen doğru cevabı işaretleyin.")
      return
    }
    if (currentQuestion.options.some((opt) => !opt.text.trim())) {
      alert("Lütfen tüm seçenek metinlerini doldurun.")
      return
    }

    if (editingQuestionId) {
      setQuestions(questions.map((q) => (q.id === editingQuestionId ? currentQuestion : q)))
    } else {
      setQuestions([...questions, currentQuestion])
    }
    alert("Soru başarıyla kaydedildi!")
    resetCurrentQuestion()
  }

  const handleEditQuestion = (questionId: string) => {
    const questionToEdit = questions.find((q) => q.id === questionId)
    if (questionToEdit) {
      setCurrentQuestion(questionToEdit)
      setEditingQuestionId(questionId)
    }
  }

  const handleDeleteQuestion = (questionId: string) => {
    if (confirm("Bu soruyu silmek istediğinizden emin misiniz?")) {
      setQuestions(questions.filter((q) => q.id !== questionId))
      if (editingQuestionId === questionId) {
        resetCurrentQuestion()
      }
    }
  }

  const handleCancelEdit = () => {
    resetCurrentQuestion()
  }

  const handleFinalSaveAll = () => {
    console.log("Kaydedilen Tüm Quiz Soruları:", questions)
    alert("Tüm sorular başarıyla kaydedildi! Konsolu kontrol edin.")
    // Burada tüm soruları bir API'ye gönderme veya veritabanına kaydetme işlemi yapılabilir.
    setQuestions([]) // Clear after saving all
    resetCurrentQuestion()
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">Quiz Oluşturucu</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">
          Dinamik quizleriniz için yeni sorular ekleyin ve yönetin.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8">
        {currentQuestion && (
          <div className="grid gap-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {editingQuestionId ? "Soruyu Düzenle" : "Yeni Soru Ekle"}
            </h3>
            <div className="grid gap-2">
              <Label htmlFor="question" className="text-gray-700 dark:text-gray-300">
                Soru Metni
              </Label>
              <Input
                id="question"
                placeholder="Sorunuzu buraya yazın..."
                value={currentQuestion.questionText}
                onChange={(e) => handleQuestionTextChange(e.target.value)}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-50 dark:border-gray-600"
              />
            </div>
            <div className="grid gap-4">
              <Label className="text-gray-700 dark:text-gray-300">Cevap Seçenekleri</Label>
              {currentQuestion.options.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-3 p-2 bg-white dark:bg-gray-900 rounded-md shadow-sm"
                >
                  <Input
                    placeholder="Seçenek metni"
                    value={option.text}
                    onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                    className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700"
                  />
                  <div className="flex items-center gap-1.5">
                    <Checkbox
                      id={`correct-${option.id}`}
                      checked={option.isCorrect}
                      onCheckedChange={(checked) => handleOptionCorrectChange(option.id, Boolean(checked))}
                      aria-label={`Seçenek ${option.text} için doğru cevap`}
                    />
                    <Label htmlFor={`correct-${option.id}`} className="text-sm text-gray-700 dark:text-gray-300">
                      Doğru
                    </Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveOption(option.id)}
                    aria-label="Seçeneği Sil"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={handleAddOption}
                className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Seçenek Ekle
              </Button>
            </div>
            <div className="flex justify-end gap-2">
              {editingQuestionId && (
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  İptal
                </Button>
              )}
              <Button onClick={handleSaveQuestion} className="bg-green-600 hover:bg-green-700 text-white">
                <SaveIcon className="h-4 w-4 mr-2" />
                {editingQuestionId ? "Değişiklikleri Kaydet" : "Soruyu Ekle"}
              </Button>
            </div>
          </div>
        )}

        <Separator className="my-4" />

        <div className="grid gap-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Eklenen Sorular ({questions.length})
          </h3>
          {questions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">Henüz eklenmiş soru yok.</p>
          ) : (
            <div className="grid gap-3">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between p-3 border rounded-md bg-white dark:bg-gray-900 shadow-sm"
                >
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {index + 1}. {q.questionText.length > 70 ? q.questionText.substring(0, 67) + "..." : q.questionText}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditQuestion(q.id)}
                      aria-label="Soruyu Düzenle"
                    >
                      <EditIcon className="h-4 w-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteQuestion(q.id)}
                      aria-label="Soruyu Sil"
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {questions.length > 0 && (
            <Button onClick={handleFinalSaveAll} className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white">
              <SaveIcon className="h-5 w-5 mr-2" />
              Tüm Quizleri Kaydet
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
