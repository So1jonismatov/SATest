import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";
import type { Test } from "@/types";

const UpcomingTestsCard = () => {
  const upcomingTests: Test[] = []; // mockTests.filter(
  //   (test: Test) => test.status === "Not Started",
  // );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Tests</CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTests.length > 0 ? (
            <ul className="space-y-4">
              {upcomingTests.map((test) => (
                <li
                  key={test.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
                >
                  <div className="flex items-center gap-4">
                    <FileText className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">{test.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {test.subject} - {test.questionCount} questions
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/student/testing/${test.id}`}>Start Test</Link>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              You have no upcoming tests. Great job!
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UpcomingTestsCard;
