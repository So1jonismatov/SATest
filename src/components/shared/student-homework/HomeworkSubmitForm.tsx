import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Homework } from "@/types/index";

interface HomeworkSubmitFormProps {
  homework: Homework;
  onHomeworkSubmit: (homeworkId: string, file: File) => void;
}

export const HomeworkSubmitForm = ({
  homework,
  onHomeworkSubmit,
}: HomeworkSubmitFormProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onHomeworkSubmit(homework.id, selectedFile);
    }
  };

  return (
    <div className="space-y-4 pt-4 w-full">
      <Input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <p className="text-sm text-muted-foreground">
          Selected file: {selectedFile.name}
        </p>
      )}
      <Button
        onClick={handleSubmit}
        disabled={!selectedFile}
        className="w-full"
      >
        Confirm Submission
      </Button>
    </div>
  );
};
