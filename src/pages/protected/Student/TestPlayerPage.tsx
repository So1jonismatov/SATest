import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Test } from "@/types";
import { TestPlayer } from "@/components/shared/student-testing/TestPlayer";
import { api } from "@/api/simulation/v2";
import { useAuth } from "@/context/AuthContext";

const TestPlayerPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [test, setTest] = useState<Test | undefined>(undefined);

  useEffect(() => {
    if (testId) {
      api.student.getTest(testId).then(setTest);
    }
  }, [testId, token]);

  const handleSubmitTest = async (
    answers: { questionId: string; answeredId: string }[],
  ) => {
    if (testId && user && test) {
      let correctAnswersCount = 0;
      const totalQuestions = test.questions.length;

      const correctAnswersMap = new Map<string, string>();
      test.questions.forEach(q => {
        if (q.correctAnswer) {
          correctAnswersMap.set(q.id, q.correctAnswer);
        }
      });

      for (const submittedAnswer of answers) {
        if (correctAnswersMap.has(submittedAnswer.questionId) &&
            correctAnswersMap.get(submittedAnswer.questionId) === submittedAnswer.answeredId) {
          correctAnswersCount++;
        }
      }

      const score = totalQuestions > 0 ? Math.floor((correctAnswersCount / totalQuestions) * 100) : 0;

      await api.student.submitTest(testId, { score });

      const detailedResult = {
        id: `result-${Date.now()}`,
        testId: testId,
        studentId: user.id,
        submittedAt: new Date().toISOString(),
        score: score,
        answers: answers,
        correctAnswers: correctAnswersCount,
        totalQuestions: totalQuestions,
      };

      navigate(`/result/${testId}`, {
        replace: true,
        state: { result: detailedResult },
      });
    }
  };

  if (test === undefined) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading test...
      </div>
    );
  }

  if (!test) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Test not found. It may have been taken or does not exist.
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/20 p-4">
      <TestPlayer test={test} onSubmit={handleSubmitTest} />
    </div>
  );
};

export default TestPlayerPage;
