import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { type Test } from "@/types";
import { TestPlayer } from "@/components/shared/student-testing/TestPlayer";
import { mockApi as api } from "@/api/mock";
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
    if (testId && user) {
      // Calculate score - this is a simplified version
      const score = answers.length > 0 ? Math.floor(Math.random() * 100) : 0; // Mock score
      const result = await api.student.submitTest(testId, { score });
      navigate(`/result/${testId}`, {
        replace: true,
        state: { result },
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
