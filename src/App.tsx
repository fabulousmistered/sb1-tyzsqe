import React, { useState, useEffect } from 'react'
import { Book, Sun, Moon } from 'lucide-react'
import TranslationLine from './components/TranslationLine'
import calculateScore from './utils/scoring'
import metamorphosesData from './data/metamorphoses.json'

interface MetamorphosesLine {
  book_number: number;
  line_number: number;
  latin: string;
  english: string;
  verbs: string[];
}

function App() {
  const [translations, setTranslations] = useState<string[]>(Array(metamorphosesData.length).fill(''))
  const [scores, setScores] = useState<number[]>(Array(metamorphosesData.length).fill(0))
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleTranslationChange = (index: number, translation: string) => {
    const newTranslations = [...translations]
    newTranslations[index] = translation
    setTranslations(newTranslations)

    const score = calculateScore(translation, metamorphosesData[index].english)
    const newScores = [...scores]
    newScores[index] = score
    setScores(newScores)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark' : 'light'
  }, [isDarkMode])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Book className="mr-2" />
          <h1 className="text-2xl font-bold">Ovid's Metamorphoses Translator</h1>
        </div>
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-blue-700 transition-colors">
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </header>
      <main className="container mx-auto p-4">
        {metamorphosesData.map((line: MetamorphosesLine, index: number) => (
          <TranslationLine
            key={line.line_number}
            lineNumber={line.line_number}
            latinLine={line.latin}
            verbs={line.verbs}
            translation={translations[index]}
            score={scores[index]}
            accurateTranslation={line.english}
            onChange={(translation) => handleTranslationChange(index, translation)}
            isDarkMode={isDarkMode}
          />
        ))}
      </main>
    </div>
  )
}

export default App