import { useLocation, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Test, type TestAnswer as TestResult } from "@/types";
import { api } from "@/api/simulation/v2";
import { CheckCircle, XCircle } from "lucide-react";
import MathTextRenderer from "@/components/shared/math/MathTextRenderer";

const TestResultPage = () => {
  const location = useLocation();
  const { testId } = useParams<{ testId: string }>();
  const result: TestResult = location.state?.result;
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => {
    if (testId) {
      api.student.getTest(testId).then(setTest);
    }
  }, [testId]);

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">No result data found.</p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const getOptionText = (questionId: string, optionKey: string) => {
    const question = test?.questions.find((q) => q.id === questionId);
    if (!question?.options) return "";
    const option = question.options.find((o: any) => o && typeof o === 'object' && o.key === optionKey);
    if (!option) return "";
    if (typeof option === 'string') {
      return option;
    } else {
      return (option as any)?.text || "";
    }
  };

  return (
    <div className="bg-muted/20 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="w-full mb-8">
          <CardHeader>
            <CardTitle className="text-center text-3xl">Test Results</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold text-primary">{result.score}%</p>
            <p className="text-lg text-muted-foreground mt-2">
              You answered {result.correctAnswers} out of{" "}
              {result.totalQuestions} questions correctly.
            </p>
            <Button asChild className="mt-8">
              <Link to="/">Back to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4">Detailed Review</h2>
        <div className="space-y-4">
          {test &&
            result.answers.map((answer, index) => {
              const question = test.questions.find(
                (q) => q.id === answer.questionId,
              );
              if (!question) return null;

              const userAnswer = answer.answeredId;
              const correctAnswer = question.correctAnswer;
              const isCorrect = userAnswer === correctAnswer;

              return (
                <Card key={question.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold flex-1">
                        Question {index + 1}:{" "}
                        <MathTextRenderer text={question.text} />
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500 ml-4" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500 ml-4" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>
                        <strong>Your answer:</strong>{" "}
                        <MathTextRenderer
                          text={getOptionText(question.id, userAnswer || "")}
                        />
                      </p>
                      {!isCorrect && (
                        <p>
                          <strong>Correct answer:</strong>{" "}
                          <MathTextRenderer
                            text={getOptionText(question.id, correctAnswer || "")}
                          />
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
