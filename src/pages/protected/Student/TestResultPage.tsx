import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type TestAnswer as TestResult } from "@/types";

const TestResultPage = () => {
  const location = useLocation();
  // We'll pass the result object via navigation state
  const result: TestResult = location.state?.result;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg text-muted-foreground">No result data found.</p>
        <Button asChild variant="link" className="mt-4">
          <Link to="/student/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // We will build the detailed UI here in a later step.
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20 p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Test Results</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-6xl font-bold text-primary">{result.score}%</p>
          <p className="text-lg text-muted-foreground mt-2">
            You answered {result.correctAnswers} out of {result.totalQuestions}{" "}
            questions correctly.
          </p>
          <Button asChild className="mt-8">
            <Link to="/student/dashboard">Back to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResultPage;
