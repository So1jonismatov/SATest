import { type Question } from "@/types";
import { cn } from "@/lib/utils";

interface QuestionNavigationProps {
  questions: Question[];
  currentQuestionIndex: number;
  onQuestionSelect: (index: number) => void;
  answers: Record<string, string>;
}

export const QuestionNavigation = ({
  questions,
  currentQuestionIndex,
  onQuestionSelect,
  answers,
}: QuestionNavigationProps) => {
  return (
    <div className="w-full rounded-lg bg-card border p-4">
      <h3 className="text-lg font-semibold mb-4">Questions</h3>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => {
          const isAnswered = answers[question.id] !== undefined;
          const isCurrent = index === currentQuestionIndex;

          return (
            <button
              key={question.id}
              onClick={() => onQuestionSelect(index)}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-md text-sm transition-colors",
                isCurrent
                  ? "bg-primary text-primary-foreground"
                  : isAnswered
                    ? "bg-accent/50 hover:bg-accent"
                    : "hover:bg-accent",
              )}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};
