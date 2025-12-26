import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Copy, Check } from "lucide-react";
import { useParams } from "react-router-dom";

// Math symbols that can be copied to clipboard
const mathSymbols = [
  { symbol: '\\frac{a}{b}', name: 'Fraction', category: 'algebra' },
  { symbol: '\\sqrt{x}', name: 'Square Root', category: 'algebra' },
  { symbol: '\\sum_{i=1}^{n}', name: 'Summation', category: 'calculus' },
  { symbol: '\\int', name: 'Integral', category: 'calculus' },
  { symbol: '\\infty', name: 'Infinity', category: 'symbols' },
  { symbol: '\\alpha', name: 'Alpha', category: 'greek' },
  { symbol: '\\beta', name: 'Beta', category: 'greek' },
  { symbol: '\\gamma', name: 'Gamma', category: 'greek' },
  { symbol: '\\Delta', name: 'Delta', category: 'greek' },
  { symbol: '\\theta', name: 'Theta', category: 'greek' },
  { symbol: '\\lambda', name: 'Lambda', category: 'greek' },
  { symbol: '\\pi', name: 'Pi', category: 'constants' },
  { symbol: '\\approx', name: 'Approximately', category: 'symbols' },
  { symbol: '\\neq', name: 'Not Equal', category: 'symbols' },
  { symbol: '\\leq', name: 'Less Than or Equal', category: 'symbols' },
  { symbol: '\\geq', name: 'Greater Than or Equal', category: 'symbols' },
  { symbol: '^2', name: 'Squared', category: 'exponents' },
  { symbol: '^3', name: 'Cubed', category: 'exponents' },
  { symbol: '^{x}', name: 'Power x', category: 'exponents' },
  { symbol: '_{n}', name: 'Subscript n', category: 'subscripts' },
];

const TestCreationPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [test, setTest] = useState({
    title: '',
    subject: '',
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    options: ['', '', '', ''], // 4 options by default
    correctAnswer: '',
  });
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize test based on testId
  useEffect(() => {
    // In a real app, this would fetch from an API
    setTest({
      title: `Test ${testId}`,
      subject: 'mathematics'
    });
    
    // Initialize with one question
    setQuestions([{
      id: 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    }]);
  }, [testId]);

  // Update current question when index changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      setCurrentQuestion({
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
      });
    }
  }, [currentQuestionIndex, questions]);

  // Update questions array when current question changes
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex < questions.length) {
      const updatedQuestions = [...questions];
      updatedQuestions[currentQuestionIndex] = {
        ...updatedQuestions[currentQuestionIndex],
        ...currentQuestion,
      };
      setQuestions(updatedQuestions);
    }
  }, [currentQuestion]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
    setCurrentQuestion({
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    });
  };

  const handleDeleteQuestion = (index: number) => {
    if (questions.length <= 1) return; // Don't delete the last question
    
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    
    // Adjust current index if needed
    if (currentQuestionIndex >= updatedQuestions.length) {
      setCurrentQuestionIndex(updatedQuestions.length - 1);
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const handleCopySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedSymbol(symbol);
    setTimeout(() => setCopiedSymbol(null), 2000);
  };

  const handleSaveTest = async () => {
    setIsSaving(true);
    // In a real app, this would save to an API
    console.log('Saving test:', { test, questions });
    setIsSaving(false);
    alert('Test saved successfully!');
  };

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Test: {test.title}</h1>
        <p className="text-muted-foreground">
          Subject: {test.subject} • {questions.length} questions
        </p>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        {/* Left Panel - Question Navigation */}
        <div className="w-full lg:w-1/4 flex flex-col border rounded-lg">
          <div className="p-4 border-b sticky top-0 bg-background z-10">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">Questions</h2>
              <Button 
                size="sm" 
                onClick={handleAddQuestion}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {questions.map((question, index) => (
              <div 
                key={question.id}
                className={`p-3 mb-2 rounded cursor-pointer flex justify-between items-center ${
                  currentQuestionIndex === index 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <span>Question {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteQuestion(index);
                  }}
                  className="h-6 w-6 p-0"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Question Editor */}
        <div className="flex-1 flex flex-col border rounded-lg">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Editing Question {currentQuestionIndex + 1}</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <Label htmlFor="questionText">Question Text</Label>
                <Textarea
                  id="questionText"
                  value={currentQuestion.text}
                  onChange={(e) => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                  placeholder="Enter your question here..."
                  rows={4}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label>Options</Label>
                <div className="space-y-3 mt-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <Label>Correct Answer</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentQuestion.options.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentQuestion.correctAnswer === String.fromCharCode(65 + index) ? "default" : "outline"}
                      onClick={() => setCurrentQuestion({
                        ...currentQuestion, 
                        correctAnswer: String.fromCharCode(65 + index)
                      })}
                    >
                      {String.fromCharCode(65 + index)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Math Symbols */}
        <div className="w-full lg:w-1/4 flex flex-col border rounded-lg">
          <div className="p-4 border-b sticky top-0 bg-background z-10">
            <h2 className="font-semibold">Math Symbols</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-2">
              {mathSymbols.map((symbol, index) => (
                <div 
                  key={index}
                  className="p-2 border rounded flex justify-between items-center hover:bg-muted cursor-pointer"
                  onClick={() => handleCopySymbol(symbol.symbol)}
                >
                  <div>
                    <div className="font-mono text-sm">{symbol.symbol}</div>
                    <div className="text-xs text-muted-foreground">{symbol.name}</div>
                  </div>
                  {copiedSymbol === symbol.symbol ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSaveTest} 
          disabled={isSaving}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            'Saving...'
          ) : (
            <>
              <Check className="h-4 w-4" />
              Save Test
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TestCreationPage;