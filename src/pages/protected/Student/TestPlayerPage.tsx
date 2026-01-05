import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TestPlayer } from "@/components/shared/student-testing/TestPlayer";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const TestPlayerPage = () => {
  const { testId } = useParams<{ testId: string }>();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [test, setTest] = useState<any | undefined>(undefined); // Using any to access additional properties
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      if (testId) {
        try {
          const testResponse = await api.student.getTest(testId);

          // Check if the user has access to this test
          if (testResponse.isPremium && !testResponse.hasAccess) {
            setError("access_denied");
            setLoading(false);
            return;
          }

          setTest(testResponse);
        } catch (err) {
          console.error("Error fetching test:", err);
          setError("not_found");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTest();
  }, [testId, token]);

  const handleSubmitTest = async (
    answers: { questionId: string; answeredId: string }[],
  ) => {
    if (testId && user && test) {
      let correctAnswersCount = 0;
      const totalQuestions = test.questions.length;

      const correctAnswersMap = new Map<string, string>();
      test.questions.forEach((q: any) => {
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

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Loading test...
      </div>
    );
  }

  if (error === "access_denied") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Access Required</h2>
          <p className="mb-6 text-muted-foreground">
            This is a premium test. You need to purchase premium access to take this test.
          </p>
          <Button onClick={() => navigate('/payment')}>
            Go to Payment
          </Button>
        </div>
      </div>
    );
  }

  if (error === "not_found" || !test) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Test Not Found</h2>
          <p className="mb-6 text-muted-foreground">
            The test you're looking for doesn't exist or may have been removed.
          </p>
          <Button onClick={() => navigate('/')}>
            Go to Dashboard
          </Button>
        </div>
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
