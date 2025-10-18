
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Code, Play, Copy, Download, FileCode, Lightbulb, CheckCircle} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface CodeSuggestion {
  id: string
  title: string
  description: string
  code: string
  language: string
  timestamp: Date
}

const CodeAssistant: React.FC = () => {
  const { isAuthenticated, signIn } = useAuth()
  const [inputCode, setInputCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [selectedAction, setSelectedAction] = useState('review')
  const [output, setOutput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [suggestions, setSuggestions] = useState<CodeSuggestion[]>([])

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'typescript', name: 'TypeScript', icon: '🔷' },
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'html', name: 'HTML', icon: '🌐' },
    { id: 'css', name: 'CSS', icon: '🎨' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'cpp', name: 'C++', icon: '⚙️' },
  ]

  const actions = [
    { id: 'review', name: 'Review Code', description: 'Get feedback and suggestions' },
    { id: 'explain', name: 'Explain Code', description: 'Understand what the code does' },
    { id: 'optimize', name: 'Optimize Code', description: 'Improve performance and readability' },
    { id: 'debug', name: 'Debug Code', description: 'Find and fix potential issues' },
    { id: 'generate', name: 'Generate Code', description: 'Create code from description' },
    { id: 'convert', name: 'Convert Language', description: 'Convert to another language' },
  ]

  const codeExamples = {
    javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))`,
    react: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default Counter;`,
  }

  const handleProcess = async () => {
    if (!inputCode.trim() && selectedAction !== 'generate') return

    if (!isAuthenticated) {
      await signIn()
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      let result = ''
      
      switch (selectedAction) {
        case 'review':
          result = `Code Review for ${selectedLanguage}:

✅ Strengths:
- Code structure is clear and readable
- Proper function naming conventions
- Good use of conditional logic

⚠️ Suggestions:
- Consider adding error handling for edge cases
- Add type annotations for better code documentation
- Consider memoization for recursive functions to improve performance

🔧 Recommended improvements:
- Add input validation
- Use more descriptive variable names
- Consider breaking down complex functions into smaller ones`
          break
        
        case 'explain':
          result = `Code Explanation:

This code implements a Fibonacci sequence calculator using recursion.

🔍 How it works:
1. The function takes a number 'n' as input
2. Base case: if n is 0 or 1, return n directly
3. Recursive case: return the sum of fibonacci(n-1) and fibonacci(n-2)
4. The function calls itself to calculate smaller Fibonacci numbers

📊 Time Complexity: O(2^n) - exponential
📦 Space Complexity: O(n) - due to recursion stack

💡 Note: This implementation is simple but inefficient for large numbers due to repeated calculations.`
          break
        
        case 'optimize':
          result = `Optimized Code:

// Using memoization for better performance
function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Or using iterative approach (even more efficient)
function fibonacciIterative(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}

🚀 Performance improvements:
- Memoization reduces time complexity from O(2^n) to O(n)
- Iterative approach uses O(1) space instead of O(n)
- Much faster for large numbers`
          break
        
        case 'debug':
          result = `Debug Analysis:

🐛 Potential Issues Found:

1. Stack Overflow Risk:
   - For large values of n (n > ~40), the recursive approach may cause stack overflow
   - Solution: Use iterative approach or increase stack size

2. No Input Validation:
   - Function doesn't handle negative numbers or non-integers
   - Solution: Add input validation

3. Performance Issues:
   - Exponential time complexity causes slow execution for large n
   - Solution: Use memoization or iterative approach

🔧 Fixed Version:
function fibonacci(n) {
  // Input validation
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    throw new Error('Input must be a non-negative integer');
  }
  
  if (n <= 1) return n;
  
  // Iterative approach to avoid stack overflow
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`
          break
        
        case 'generate':
          result = `// Generated code based on your requirements

function calculateAverage(numbers) {
  if (!Array.isArray(numbers) || numbers.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  
  const sum = numbers.reduce((acc, num) => {
    if (typeof num !== 'number') {
      throw new Error('All elements must be numbers');
    }
    return acc + num;
  }, 0);
  
  return sum / numbers.length;
}

// Usage example:
const scores = [85, 92, 78, 96, 88];
const average = calculateAverage(scores);
console.log(\`Average score: \${average}\`);

// Features included:
// ✅ Input validation
// ✅ Error handling
// ✅ Clear documentation
// ✅ Usage example`
          break
        
        case 'convert':
          result = `Converted to Python:

def fibonacci(n):
    """
    Calculate the nth Fibonacci number using iteration.
    
    Args:
        n (int): Position in Fibonacci sequence (non-negative integer)
    
    Returns:
        int: The nth Fibonacci number
    
    Raises:
        ValueError: If n is not a non-negative integer
    """
    if not isinstance(n, int) or n < 0:
        raise ValueError("Input must be a non-negative integer")
    
    if n <= 1:
        return n
    
    a, b = 0, 1
    for i in range(2, n + 1):
        a, b = b, a + b
    
    return b

# Usage example
if __name__ == "__main__":
    result = fibonacci(10)
    print(f"Fibonacci(10) = {result}")

# Key differences from JavaScript:
# - Uses snake_case naming convention
# - Type hints and docstrings for documentation
# - Pythonic tuple unpacking
# - if __name__ == "__main__" guard`
          break
      }
      
      setOutput(result)
      setIsProcessing(false)
      toast.success('Processing completed!')
      
      // Add to suggestions if it's a useful result
      if (selectedAction === 'optimize' || selectedAction === 'generate') {
        const newSuggestion: CodeSuggestion = {
          id: Date.now().toString(),
          title: `${actions.find(a => a.id === selectedAction)?.name} - ${selectedLanguage}`,
          description: `${selectedAction} result for ${selectedLanguage} code`,
          code: result,
          language: selectedLanguage,
          timestamp: new Date()
        }
        setSuggestions(prev => [newSuggestion, ...prev.slice(0, 4)])
      }
    }, 2000)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const loadExample = (language: string) => {
    if (codeExamples[language as keyof typeof codeExamples]) {
      setInputCode(codeExamples[language as keyof typeof codeExamples])
      setSelectedLanguage(language)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <Code className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI Code Assistant
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to get AI-powered code review, optimization, debugging, and generation assistance.
          </p>
          <button
            onClick={signIn}
            className="btn-primary w-full"
          >
            Sign In to Code
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Code Assistant</h1>
          <p className="text-gray-600">Get AI-powered help with code review, debugging, and optimization</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Code Input</h2>

              {/* Language and Action Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {languages.map(lang => (
                      <option key={lang.id} value={lang.id}>
                        {lang.icon} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
                  <select
                    value={selectedAction}
                    onChange={(e) => setSelectedAction(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {actions.map(action => (
                      <option key={action.id} value={action.id}>
                        {action.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Code Input */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {selectedAction === 'generate' ? 'Describe what you want to build' : 'Your Code'}
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCopy(inputCode)}
                      disabled={!inputCode}
                      className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder={
                    selectedAction === 'generate' 
                      ? "Describe the function or component you want to create..."
                      : `Paste your ${selectedLanguage} code here...`
                  }
                  className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Process Button */}
              <button
                onClick={handleProcess}
                disabled={(!inputCode.trim() && selectedAction !== 'generate') || isProcessing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>{actions.find(a => a.id === selectedAction)?.name}</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Code Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <FileCode className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Code Examples</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => loadExample(lang)}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="font-medium text-sm capitalize">{lang}</div>
                    <div className="text-xs text-gray-500">Load example</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Output */}
            {output && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 mt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Result</h2>
                  <button
                    onClick={() => handleCopy(output)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                  {output}
                </pre>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="space-y-2">
                {actions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setSelectedAction(action.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedAction === action.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-medium text-sm">{action.name}</div>
                    <div className="text-xs text-gray-500">{action.description}</div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Recent Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Results</h2>
              </div>
              <div className="space-y-3">
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">{suggestion.title}</span>
                        <span className="text-xs text-gray-500">
                          {suggestion.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                      <button
                        onClick={() => setOutput(suggestion.code)}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        View Result
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-4">
                    No recent results. Process some code to see results here.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeAssistant
