import React, { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import type { Test, Question } from "@/types/index";
import { Plus, Trash2, Eye, FileText, Search, ImagePlus } from "lucide-react";

const TeacherTestManagement: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);

  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newTest, setNewTest] = useState<Partial<Test>>({
    title: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    answers: [
      { id: "1", text: "" },
      { id: "2", text: "" },
      { id: "3", text: "" },
      { id: "4", text: "" },
    ],
    correctAnswerId: "1",
    imageUrl: "",
  });

  const fetchTests = async () => {
    if (user) {
      const fetchedTests = await api.teacher.getTests(user.id);
      setTests(fetchedTests);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [user]);

  const filteredTests = useMemo(
    () =>
      tests.filter((test) => {
        const matchesSearch = test.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesSearch;
      }),
    [tests, searchTerm],
  );

  // ---------- Actions ----------
  const handleCreateTest = async () => {
    if (user) {
      await api.teacher.createTest({
        ...(newTest as Test),
        teacherId: user.id,
      });
      fetchTests();
      setNewTest({
        title: "",
        questions: [],
      });
      setIsCreateDialogOpen(false);
    }
  };

  const handleAddQuestion = () => {
    const q: Question = {
      id: `q-${Date.now()}`,
      text: newQuestion.text || "",
      answers: newQuestion.answers || [],
      correctAnswerId: newQuestion.correctAnswerId || "",
      ...(newQuestion.imageUrl && { imageUrl: newQuestion.imageUrl }),
    };

    setNewTest((prev) => ({
      ...prev,
      questions: [...(prev.questions ?? []), q],
    }));

    setNewQuestion({
      text: "",
      answers: [
        { id: "1", text: "" },
        { id: "2", text: "" },
        { id: "3", text: "" },
        { id: "4", text: "" },
      ],
      correctAnswerId: "1",
      imageUrl: "",
    });
  };

  const handleRemoveQuestion = (qid: string) => {
    setNewTest((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== qid) ?? [],
    }));
  };

  const handleDeleteTest = async (testId: string) => {
    await api.teacher.deleteTest(testId);
    fetchTests();
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Test Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and manage your tests and assignments
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create New Test
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Test</DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Test Details</TabsTrigger>
                  <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList>

                {/* -------- DETAILS TAB -------- */}
                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Test Title</Label>
                      <Input
                        id="title"
                        value={newTest.title}
                        onChange={(e) =>
                          setNewTest({ ...newTest, title: e.target.value })
                        }
                        placeholder="Enter test title"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* -------- QUESTIONS TAB -------- */}
                <TabsContent value="questions" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">
                        Questions ({newTest.questions?.length || 0})
                      </h3>
                    </div>

                    {/* Add Question Form */}
                    <Card className="border-dashed">
                      <CardHeader>
                        <CardTitle className="text-base">
                          Add New Question
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="questionText">Question Text</Label>
                          <Textarea
                            id="questionText"
                            value={newQuestion.text}
                            onChange={(e) =>
                              setNewQuestion({
                                ...newQuestion,
                                text: e.target.value,
                              })
                            }
                            placeholder="Enter your question here..."
                            rows={2}
                          />
                        </div>

                        <div>
                          <Label htmlFor="questionImageUrl">
                            Image URL (Optional)
                          </Label>
                          <div className="relative">
                            <ImagePlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="questionImageUrl"
                              value={newQuestion.imageUrl || ""}
                              onChange={(e) =>
                                setNewQuestion({
                                  ...newQuestion,
                                  imageUrl: e.target.value,
                                })
                              }
                              placeholder="https://example.com/image.png"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Answer Options</Label>
                          {(newQuestion.answers ?? []).map((answer, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <Input
                                value={answer.text}
                                onChange={(e) => {
                                  const newAnswers = [
                                    ...(newQuestion.answers ?? []),
                                  ];
                                  newAnswers[index] = {
                                    ...newAnswers[index],
                                    text: e.target.value,
                                  };
                                  setNewQuestion({
                                    ...newQuestion,
                                    answers: newAnswers,
                                  });
                                }}
                                placeholder={`Option ${index + 1}`}
                              />
                              <input
                                type="radio"
                                name="correctAnswer"
                                checked={
                                  newQuestion.correctAnswerId === answer.id
                                }
                                onChange={() =>
                                  setNewQuestion({
                                    ...newQuestion,
                                    correctAnswerId: answer.id,
                                  })
                                }
                              />
                              <Label className="text-sm">Correct</Label>
                            </div>
                          ))}
                        </div>

                        <Button
                          onClick={handleAddQuestion}
                          disabled={!newQuestion.text}
                        >
                          Add Question
                        </Button>
                      </CardContent>
                    </Card>

                    {/* Questions List */}
                    {(newTest.questions?.length ?? 0) > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Questions Added:</h4>
                        {newTest.questions!.map((question, index) => (
                          <Card key={question.id} className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="font-medium">
                                  Q{index + 1}: {question.text}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleRemoveQuestion(question.id)
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateTest}
                  disabled={!newTest.title || !newTest.questions?.length}
                >
                  Create Test
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <Card key={test.id} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">
                      {test.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{test.questions.length} questions</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => {
                      setSelectedTest(test);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTest(test.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View Test Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedTest?.title}</DialogTitle>
            </DialogHeader>

            {selectedTest && (
              <div className="space-y-6">
                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Questions
                  </Label>
                  <div className="space-y-4">
                    {selectedTest.questions.map((question, index) => (
                      <Card key={question.id} className="p-4">
                        <div className="space-y-2">
                          <div className="font-medium">
                            Q{index + 1}: {question.text}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeacherTestManagement;
