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
  { symbol: "\\frac{a}{b}", name: "Fraction", category: "algebra" },
  { symbol: "\\sqrt{x}", name: "Square Root", category: "algebra" },
  { symbol: "\\sum_{i=1}^{n}", name: "Summation", category: "calculus" },
  { symbol: "\\int", name: "Integral", category: "calculus" },
  { symbol: "\\infty", name: "Infinity", category: "symbols" },
  { symbol: "\\alpha", name: "Alpha", category: "greek" },
  { symbol: "\\beta", name: "Beta", category: "greek" },
  { symbol: "\\gamma", name: "Gamma", category: "greek" },
  { symbol: "\\Delta", name: "Delta", category: "greek" },
  { symbol: "\\theta", name: "Theta", category: "greek" },
  { symbol: "\\lambda", name: "Lambda", category: "greek" },
  { symbol: "\\pi", name: "Pi", category: "constants" },
  { symbol: "\\approx", name: "Approximately", category: "symbols" },
  { symbol: "\\neq", name: "Not Equal", category: "symbols" },
  { symbol: "\\leq", name: "Less Than or Equal", category: "symbols" },
  { symbol: "\\geq", name: "Greater Than or Equal", category: "symbols" },
  { symbol: "^2", name: "Squared", category: "exponents" },
  { symbol: "^3", name: "Cubed", category: "exponents" },
  { symbol: "^{x}", name: "Power x", category: "exponents" },
  { symbol: "_{n}", name: "Subscript n", category: "subscripts" },
];

const TestCreationPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const isNewTest = testId === "new";
  const [test, setTest] = useState({
    title: "",
    subject: "mathematics",
    isPremium: false,
  });
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isNewTest) {
      // Fetch existing test data
      const fetchTest = async () => {
        try {
          const fetchedTest = await api.teacher.getTest(testId);
          setTest({
            title: fetchedTest.title,
            subject: fetchedTest.subject,
            isPremium: fetchedTest.isPremium || false,
          });
          setQuestions(fetchedTest.questions);
        } catch (error) {
          console.error("Error fetching test:", error);
        }
      };
      fetchTest();
    } else {
      // Initialize with one empty question for a new test
      setQuestions([
        {
          id: 1,
          text: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ]);
    }
  }, [testId, isNewTest]);

  const handleTestChange = (field: string, value: any) => {
    setTest((prev) => ({ ...prev, [field]: value }));
  };

  const updateCurrentQuestion = (field: string, value: any) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...updatedQuestions[currentQuestionIndex],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestionIndex(questions.length);
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
    const currentQuestion = questions[currentQuestionIndex];
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    updateCurrentQuestion("options", updatedOptions);
  };

  const handleAddOption = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const updatedOptions = [...currentQuestion.options, ""];
    updateCurrentQuestion("options", updatedOptions);
  };

  const handleRemoveOption = (index: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.options.length <= 2) return; // Must have at least 2 options
    const updatedOptions = currentQuestion.options.filter(
      (_: any, i: number) => i !== index,
    );
    updateCurrentQuestion("options", updatedOptions);
  };

  const handleCopySymbol = (symbol: string) => {
    navigator.clipboard.writeText(symbol);
    setCopiedSymbol(symbol);
    setTimeout(() => setCopiedSymbol(null), 2000);
  };

  const handleSaveTest = async () => {
    setIsSaving(true);
    const testData = {
      ...test,
      questions,
      title: test.title,
      subject: test.subject,
    };
    try {
      if (isNewTest) {
        await api.teacher.createTest(testData);
      } else {
        await api.teacher.updateTest(testId, testData);
      }
      alert("Test saved successfully!");
      // navigate back to the list
    } catch (error) {
      console.error("Error saving test:", error);
      alert("Failed to save test.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!questions[currentQuestionIndex]) {
    return null; // or a loading spinner
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col">
      <div className="mb-6 space-y-2">
        <Input
          placeholder="Enter test title"
          value={test.title}
          onChange={(e) => handleTestChange("title", e.target.value)}
          className="text-3xl font-bold h-auto"
        />
        <div className="flex items-center gap-4">
          <select
            value={test.subject}
            onChange={(e) => handleTestChange("subject", e.target.value)}
            className="border rounded p-1"
          >
            <option value="mathematics">Mathematics</option>
            <option value="reading">Reading</option>
          </select>
          <p className="text-muted-foreground">{questions.length} questions</p>
        </div>
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
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
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
            <h2 className="font-semibold">
              Editing Question {currentQuestionIndex + 1}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <div>
                <Label htmlFor="questionText">Question Text</Label>
                <Textarea
                  id="questionText"
                  value={currentQuestion.text}
                  onChange={(e) =>
                    updateCurrentQuestion("text", e.target.value)
                  }
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
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOption(index)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddOption}
                    className="mt-2"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Option
                  </Button>
                </div>
              </div>

              <div>
                <Label>Correct Answer</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentQuestion.options.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentQuestion.correctAnswer ===
                        String.fromCharCode(65 + index)
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        updateCurrentQuestion(
                          "correctAnswer",
                          String.fromCharCode(65 + index),
                        )
                      }
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
                    <div className="text-xs text-muted-foreground">
                      {symbol.name}
                    </div>
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
            "Saving..."
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
