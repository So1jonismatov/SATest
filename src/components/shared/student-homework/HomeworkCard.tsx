import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Homework } from "@/types/index";
import { StatusBadge } from "@/components/shared/Badges/StatusBadge";
import { File } from "lucide-react";
import { motion } from "motion/react";

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

interface HomeworkCardProps {
  homework: Homework;
  onClick: () => void;
  layoutId: string;
}

export const HomeworkCard = ({
  homework,
  onClick,
  layoutId,
}: HomeworkCardProps) => {
  const isPending =
    homework.status === "Pending" || homework.status === "Overdue";
  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <motion.div layoutId={`title-${layoutId}`}>
              <CardTitle className="max-w-[80%]">{homework.title}</CardTitle>
            </motion.div>
            <motion.div layoutId={`status-badge-${layoutId}`}>
              <StatusBadge status={homework.status} />
            </motion.div>
          </div>
          <motion.div layoutId={`description-${layoutId}`}>
            <CardDescription>
              {homework.subject} - Due by {formatDate(homework.dueDate)}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {homework.description}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {homework.submittedFile ? (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <File className="h-4 w-4" />
              <span>{homework.submittedFile.name}</span>
              {homework.grade && (
                <span className="font-bold ml-4">Grade: {homework.grade}</span>
              )}
            </div>
          ) : isPending ? (
            <span className="text-sm text-blue-500">Click to submit</span>
          ) : (
            <span className="text-sm text-muted-foreground">
              No submission required.
            </span>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};
