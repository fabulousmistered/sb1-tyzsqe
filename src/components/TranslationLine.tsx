import React from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Type } from 'lucide-react'

interface TranslationLineProps {
  lineNumber: number
  latinLine: string
  verbs: string[]
  translation: string
  score: number
  accurateTranslation: string
  onChange: (translation: string) => void
  isDarkMode: boolean
}

const TranslationLine: React.FC<TranslationLineProps> = ({ 
  lineNumber, 
  latinLine, 
  verbs, 
  translation, 
  score, 
  accurateTranslation,
  onChange,
  isDarkMode
}) => {
  const highlightVerbs = (text: string, verbs: string[]) => {
    let highlightedText = text;
    verbs.forEach(verb => {
      const regex = new RegExp(`\\b${verb}\\b`, 'g');
      highlightedText = highlightedText.replace(regex, `<span class="text-red-500">${verb}</span>`);
    });
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className={`grid grid-cols-2 gap-4 mb-4 items-center ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
      <div className="flex items-center">
        <span className={`mr-2 w-6 text-right ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{lineNumber}.</span>
        <p>{highlightVerbs(latinLine, verbs)}</p>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          value={translation}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter your translation here"
          className={`flex-grow p-2 border rounded-md mr-2 ${
            isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-700 placeholder-gray-400'
          }`}
        />
        <span className="text-sm font-medium w-10 text-center mr-2" style={{ color: score >= 80 ? 'green' : score >= 60 ? 'orange' : 'red' }}>
          {score}%
        </span>
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <button className={`hover:text-gray-700 focus:outline-none ${isDarkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-500 hover:text-gray-700'}`}>
                <Type size={20} />
              </button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={`p-2 rounded-md shadow-md border max-w-xs ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white' 
                    : 'bg-white border-gray-200 text-gray-800'
                }`}
                sideOffset={5}
              >
                {accurateTranslation}
                <Tooltip.Arrow className={isDarkMode ? 'fill-gray-800' : 'fill-white'} />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  )
}

export default TranslationLine