import type { Test } from "@/types/index";
import { useState } from "react";
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
import { PanelLeft, Loader2 } from "lucide-react";

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
            <h2 className="text-lg font-semibold">
              Question {currentQuestionIndex + 1} of {test.questions.length}
            </h2>
          </div>

          {/* Right side: Timer + Mobile Nav Button */}
          <div className="flex items-center gap-4">
            <Timer
              initialSeconds={3600} // Placeholder
              onTimeUp={handleFinishTest}
            />
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
      <div className="flex w-full max-w-7xl gap-6 md:flex-row flex-col">
        <Card className="flex flex-col flex-1 w-full">
          <CardHeader>
            <CardTitle>{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex md:flex-row flex-col gap-6">
              {currentQuestion.imageUrl && (
                <div className="md:w-1/4 w-full">
                  <img
                    src={currentQuestion.imageUrl}
                    alt="Question illustration"
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              )}
              <div
                className={
                  currentQuestion.imageUrl ? "md:w-3/4 w-full" : "w-full"
                }
              >
                <div className="space-y-4">
                  {currentQuestion.answers.map((answer) => (
                    <div
                      key={answer.id}
                      onClick={() =>
                        !isSubmitting &&
                        handleAnswerSelect(currentQuestion.id, answer.id)
                      }
                      className={`flex items-center p-4 border rounded-md transition-colors ${
                        selectedAnswer === answer.id
                          ? "bg-primary/10 border-primary"
                          : "hover:bg-accent"
                      } ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={answer.id}
                        checked={selectedAnswer === answer.id}
                        onChange={() =>
                          handleAnswerSelect(currentQuestion.id, answer.id)
                        }
                        disabled={isSubmitting}
                        className="mr-4 h-4 w-4 accent-primary"
                      />
                      <span className="flex-1">{answer.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
