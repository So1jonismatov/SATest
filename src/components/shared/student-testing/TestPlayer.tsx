import type { Test } from "@/types/index";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Timer } from "./Timer";
import { QuestionNavigation } from "./QuestionNavigation";
import { PanelLeft, Loader2, Calculator } from "lucide-react";
import MathTextRenderer from "@/components/shared/math/MathTextRenderer";
import DesmosCalculator from "@/components/shared/math/DesmosCalculator";

interface TestPlayerProps {
  test: Test;
  onSubmit: (
    answers: { questionId: string; answeredId: string }[],
  ) => Promise<void>;
}

export const TestPlayer = ({ test, onSubmit }: TestPlayerProps) => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isQuestionListOpen, setIsQuestionListOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCalculator, setShowCalculator] = useState(
    test.subject === "mathematics",
  );
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    updateScreenSize();

    // Add event listener
    window.addEventListener("resize", updateScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const handleFinishTest = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const formattedAnswers = Object.entries(answers).map(
        ([questionId, answeredId]) => ({
          questionId,
          answeredId,
        }),
      );
      await onSubmit(formattedAnswers);
    } catch (error) {
      console.error("Failed to submit test:", error);
      // Optionally show an error message to the user
      setIsSubmitting(false);
    }
  };

  const handleExitTest = () => {
    if (
      window.confirm(
        "Are you sure you want to exit? Your progress will not be saved.",
      )
    ) {
      navigate("/");
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  };

  const handleQuestionSelectFromNav = (index: number) => {
    setCurrentQuestionIndex(index);
    setIsQuestionListOpen(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestion.id];

  return (
    <div className="relative flex w-full flex-col gap-6 self-center items-center">
      {isSubmitting && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex items-center text-lg font-semibold">
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Submitting your test...
          </div>
        </div>
      )}

      {/* --- Top Navigation Bar (full width) --- */}
      <div className="w-full max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          {/* Left side: Exit + Question Number */}
          <div className="flex items-center gap-3">
            <Button
              variant="destructive"
              onClick={handleExitTest}
              disabled={isSubmitting}
            >
              Exit
            </Button>
            <h2 className="text-lg font-semibold hidden sm:block">
              Question {currentQuestionIndex + 1} of {test.questions.length}
            </h2>
          </div>

          {/* Right side: Timer + Mobile Nav Button + Calculator */}
          <div className="flex items-center gap-4">
            <Timer
              initialSeconds={3600} // Placeholder
              onTimeUp={handleFinishTest}
            />
            <Button
              variant={showCalculator ? "default" : "outline"}
              size="icon"
              onClick={() => setShowCalculator(!showCalculator)}
              disabled={isSubmitting}
            >
              <Calculator className="h-4 w-4" />
            </Button>
            <Dialog
              open={isQuestionListOpen}
              onOpenChange={setIsQuestionListOpen}
            >
              <DialogTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon" disabled={isSubmitting}>
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Questions</DialogTitle>
                </DialogHeader>
                <QuestionNavigation
                  questions={test.questions}
                  currentQuestionIndex={currentQuestionIndex}
                  onQuestionSelect={handleQuestionSelectFromNav}
                  answers={answers}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Desktop full-width question navigation */}
        <div className="hidden md:block w-full">
          <QuestionNavigation
            questions={test.questions}
            currentQuestionIndex={currentQuestionIndex}
            onQuestionSelect={setCurrentQuestionIndex}
            answers={answers}
          />
        </div>
      </div>

      {/* --- Image + Question Side by Side --- */}
      <div className="w-full max-w-7xl">
        <Card className="flex flex-col w-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">
              <MathTextRenderer text={currentQuestion.text} />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-col gap-4">
              {currentQuestion.imageUrl && (
                <div className="w-full">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Question illustration"
                    className="rounded-lg object-contain max-h-60 w-full"
                  />
                </div>
              )}
              <div className="w-full">
                <div className="space-y-3">
                  {(
                    currentQuestion.answers ||
                    currentQuestion.options ||
                    []
                  ).map((answer) => (
                    <div
                      key={answer.id || answer.key}
                      onClick={() =>
                        !isSubmitting &&
                        handleAnswerSelect(
                          currentQuestion.id,
                          answer.id || answer.key,
                        )
                      }
                      className={`flex items-start p-3 sm:p-4 border rounded-md transition-colors ${
                        selectedAnswer === (answer.id || answer.key)
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-accent"
                      } ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={answer.id || answer.key}
                        checked={selectedAnswer === (answer.id || answer.key)}
                        onChange={() =>
                          handleAnswerSelect(
                            currentQuestion.id,
                            answer.id || answer.key,
                          )
                        }
                        disabled={isSubmitting}
                        className="mt-1 mr-3 sm:mr-4 h-4 w-4 accent-primary"
                      />
                      <span className="flex-1 text-sm sm:text-base">
                        <MathTextRenderer text={answer.text} />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Desmos Calculator - only shown when enabled */}
      {showCalculator && (
        <div className="w-full max-w-7xl mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Desmos Calculator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-96">
                <DesmosCalculator
                  width={screenSize.width > 768 ? 800 : screenSize.width - 40}
                  height={screenSize.width > 768 ? 350 : 250}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* --- Navigation Buttons --- */}
      <div className="flex w-full max-w-7xl justify-between">
        <Button
          variant="outline"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          Previous
        </Button>
        <Button onClick={handleNextQuestion} disabled={isSubmitting}>
          {isSubmitting &&
          currentQuestionIndex === test.questions.length - 1 ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
            </>
          ) : currentQuestionIndex === test.questions.length - 1 ? (
            "Finish Test"
          ) : (
            "Next"
          )}
        </Button>
      </div>
    </div>
  );
};
