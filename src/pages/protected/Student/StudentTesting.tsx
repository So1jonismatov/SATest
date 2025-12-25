import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, List } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import type { Test } from "@/types/index";

const StudentTesting = () => {
  const { user, token } = useAuth();
  const [availableTests, setAvailableTests] = useState<Test[]>([]);

  useEffect(() => {
    if (user && user.role === "student") {
      api.student.getAssignedTests(user.id).then(setAvailableTests);
    }
  }, [user, token]);

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold">Available Tests</h1>
        <p className="mt-2 text-muted-foreground">
          Choose a test to begin. Good luck!
        </p>
      </div>

      {availableTests.length > 0 ? (
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableTests.map((test) => (
            <Card key={test.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{test.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>{test.questions.length} questions</span>
                </div>
              </CardContent>
              <div className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link to={`/student/test/${test.id}`}>Start Test</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center p-12">
          <List className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">All Clear!</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            You have no pending tests at the moment.
          </p>
        </Card>
      )}
    </div>
  );
};

export default StudentTesting;
