import React from "react";
import type { Test, TestAnswer, Question } from "@/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface TestResultAnalysisProps {
  test: Test;
  result: TestAnswer;
}

export const TestResultAnalysis: React.FC<TestResultAnalysisProps> = ({
  test,
  result,
}) => {
  const getAnswerText = (question: Question, answerId: string): string => {
    const answer = question.answers.find((a) => a.id === answerId);
    return answer ? answer.text : "N/A";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Analysis: {test.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Scored {result.score}% on{" "}
          {new Date(result.submittedAt).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {test.questions.map((question, index) => {
          const studentAnswer = result.answers.find(
            (a) => a.questionId === question.id,
          );
          const studentAnswerId = studentAnswer?.answeredId;
          const isCorrect = studentAnswerId === question.correctAnswerId;

          return (
            <div key={question.id} className="p-4 border rounded-lg">
              <p className="font-semibold">
                Q{index + 1}: {question.text}
              </p>
              {question.imageUrl && (
                <img
                  src={question.imageUrl}
                  alt="Question illustration"
                  className="my-2 rounded-lg max-w-xs"
                />
              )}
              <div className="mt-2 space-y-2 text-sm">
                <div
                  className={`flex items-start p-2 rounded-md ${isCorrect ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                >
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Your Answer:</p>
                    <p className="text-muted-foreground">
                      {getAnswerText(question, studentAnswerId || "")}
                    </p>
                  </div>
                </div>
                {!isCorrect && (
                  <div className="flex items-start p-2 rounded-md bg-gray-100 dark:bg-gray-800">
                    <div className="flex-shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">Correct Answer:</p>
                      <p className="text-muted-foreground">
                        {getAnswerText(question, question.correctAnswerId)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
