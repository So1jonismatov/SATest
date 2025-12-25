import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Upload, File } from "lucide-react";
import { type Homework } from "@/types/index";

interface HomeworkSubmitDialogProps {
  homework: Homework;
  onHomeworkSubmit: (homeworkId: string, file: File) => void;
}

export const HomeworkSubmitDialog = ({
  homework,
  onHomeworkSubmit,
}: HomeworkSubmitDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onHomeworkSubmit(homework.id, selectedFile);
      setIsOpen(false); // Close the dialog on submit
      setSelectedFile(null); // Reset the file input
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Submit Work
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit: {homework.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input type="file" onChange={handleFileChange} />
          {selectedFile && (
            <div className="flex items-center gap-2 rounded-md border p-2 text-sm">
              <File className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{selectedFile.name}</span>
            </div>
          )}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="w-full"
        >
          Confirm Submission
        </Button>
      </DialogContent>
    </Dialog>
  );
};
