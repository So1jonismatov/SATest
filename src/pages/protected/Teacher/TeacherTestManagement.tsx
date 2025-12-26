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
import { mockApi as api } from "@/api/mock";
import { useAuth } from "@/context/AuthContext";
import { type Test, type Question } from "@/types/index";
import { Plus, Trash2, Eye, FileText, Search, ImagePlus, Users, UserCheck } from "lucide-react";
import type { TestWithAccess, UserWithAccessList } from "@/api/real/types";

const TeacherTestManagement: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<TestWithAccess[]>([]);
  const [users, setUsers] = useState<UserWithAccessList[]>([]);
  const [selectedTest, setSelectedTest] = useState<TestWithAccess | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isGrantAccessOpen, setIsGrantAccessOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedTestForAccess, setSelectedTestForAccess] = useState<string | null>(null);

  const [newTest, setNewTest] = useState<Partial<Test>>({
    title: "",
    questions: [],
  });

  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: "",
    options: [],
    correctAnswer: "",
  });

  const fetchTests = async () => {
    try {
      // For now, we'll simulate test data since the API isn't fully implemented
      const mockTests: TestWithAccess[] = [
        {
          testId: "1",
          nomi: "SAT Math Practice Test 1",
          subject: "mathematics",
          questionCount: 58,
          isPremium: false,
          hasAccess: true,
          jami_urinishlar: 120,
          average: 750.5
        },
        {
          testId: "2",
          nomi: "SAT Reading Practice Test 1",
          subject: "reading",
          questionCount: 52,
          isPremium: false,
          hasAccess: true,
          jami_urinishlar: 95,
          average: 680.0
        },
        {
          testId: "3",
          nomi: "Advanced SAT Math Test",
          subject: "mathematics",
          questionCount: 58,
          isPremium: true,
          hasAccess: false,
          jami_urinishlar: 15,
          average: 720.0
        }
      ];
      setTests(mockTests);
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      // For now, we'll simulate user data since the API isn't fully implemented
      const mockUsers: UserWithAccessList[] = [
        {
          id: "1",
          full_name: "John Doe",
          email: "john@example.com",
          access_list: ["1"]
        },
        {
          id: "2",
          full_name: "Jane Smith",
          email: "jane@example.com",
          access_list: ["1", "2"]
        },
        {
          id: "3",
          full_name: "Bob Johnson",
          email: "bob@example.com",
          access_list: []
        }
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTests();
    fetchUsers();
  }, [user]);

  const filteredTests = useMemo(
    () =>
      tests.filter((test) => {
        const matchesSearch = test.nomi
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesSearch;
      }),
    [tests, searchTerm],
  );

  const filteredUsers = useMemo(
    () =>
      users.filter((usr) => {
        const matchesSearch = usr.full_name
          .toLowerCase()
          .includes(userSearchTerm.toLowerCase()) ||
          usr.email.toLowerCase().includes(userSearchTerm.toLowerCase());
        return matchesSearch;
      }),
    [users, userSearchTerm],
  );

  // ---------- Actions ----------
  const handleCreateTest = async () => {
    // For now, we'll just simulate creating a test
    const newTestWithId: TestWithAccess = {
      testId: `test-${Date.now()}`,
      nomi: newTest.title || "New Test",
      subject: "mathematics",
      questionCount: newTest.questions?.length || 0,
      isPremium: false,
      hasAccess: true,
      jami_urinishlar: 0,
      average: 0
    };

    setTests([...tests, newTestWithId]);
    setNewTest({
      title: "",
      questions: [],
    });
    setIsCreateDialogOpen(false);
  };

  const handleAddQuestion = () => {
    if (!newQuestion.text || !newQuestion.options || newQuestion.options.length === 0) {
      return;
    }

    const q: Question = {
      id: `q-${Date.now()}`,
      text: newQuestion.text,
      type: "multiple_choice",
      options: newQuestion.options.map((opt, idx) => ({
        key: String.fromCharCode(65 + idx), // A, B, C, D...
        text: opt
      })),
      correctAnswer: newQuestion.correctAnswer || "A",
    };

    setNewTest((prev) => ({
      ...prev,
      questions: [...(prev.questions ?? []), q],
    }));

    setNewQuestion({
      text: "",
      options: [],
      correctAnswer: "",
    });
  };

  const handleRemoveQuestion = (qid: string) => {
    setNewTest((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== qid) ?? [],
    }));
  };

  const handleGrantAccess = async () => {
    if (selectedUser && selectedTestForAccess) {
      try {
        // For now, simulate granting access
        console.log(`Granting access to user ${selectedUser} for test ${selectedTestForAccess}`);

        // Update the local state to reflect the access grant
        const updatedUsers = users.map(user => {
          if (user.id === selectedUser) {
            const newAccessList = [...user.access_list, selectedTestForAccess];
            return { ...user, access_list: newAccessList };
          }
          return user;
        });

        setUsers(updatedUsers);
        setIsGrantAccessOpen(false);
        setSelectedUser(null);
        setSelectedTestForAccess(null);
      } catch (error) {
        console.error("Error granting access:", error);
      }
    }
  };

  const handleRevokeAccess = async (userId: string, testId: string) => {
    try {
      // For now, simulate revoking access
      console.log(`Revoking access from user ${userId} for test ${testId}`);

      // Update the local state to reflect the access revocation
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const newAccessList = user.access_list.filter(id => id !== testId);
          return { ...user, access_list: newAccessList };
        }
        return user;
      });

      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error revoking access:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">SAT Test Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, manage, and assign SAT tests to students
            </p>
          </div>

          <div className="flex gap-2">
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
                  <DialogTitle>Create New SAT Test</DialogTitle>
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
                          placeholder="Enter SAT test title"
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={newTest.subject}
                          onChange={(e) =>
                            setNewTest({ ...newTest, subject: e.target.value })
                          }
                          placeholder="e.g., mathematics, reading"
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
                              placeholder="Enter your SAT question here..."
                              rows={2}
                            />
                          </div>

                          <div>
                            <Label htmlFor="questionOptions">
                              Answer Options
                            </Label>
                            <div className="space-y-2">
                              {newQuestion.options?.map((option, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <span className="w-6 text-sm font-medium">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(newQuestion.options || [])];
                                      newOptions[index] = e.target.value;
                                      setNewQuestion({
                                        ...newQuestion,
                                        options: newOptions,
                                      });
                                    }}
                                    placeholder={`Option ${String.fromCharCode(65 + index)}`}
                                  />
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setNewQuestion({
                                    ...newQuestion,
                                    options: [...(newQuestion.options || []), ""],
                                  });
                                }}
                              >
                                Add Option
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label>Correct Answer</Label>
                            <div className="flex flex-wrap gap-2">
                              {newQuestion.options?.map((_, index) => (
                                <div key={index} className="flex items-center">
                                  <input
                                    type="radio"
                                    name="correctAnswer"
                                    checked={newQuestion.correctAnswer === String.fromCharCode(65 + index)}
                                    onChange={() =>
                                      setNewQuestion({
                                        ...newQuestion,
                                        correctAnswer: String.fromCharCode(65 + index),
                                      })
                                    }
                                  />
                                  <Label className="ml-1 text-sm">
                                    {String.fromCharCode(65 + index)}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button
                            onClick={handleAddQuestion}
                            disabled={!newQuestion.text || !newQuestion.options || newQuestion.options.length === 0}
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
                                  <div className="text-sm text-muted-foreground mt-1">
                                    Correct: {question.correctAnswer}
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

            <Dialog
              open={isGrantAccessOpen}
              onOpenChange={setIsGrantAccessOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Grant Access
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Grant Test Access to Student</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="test-select">Select Test</Label>
                    <select
                      id="test-select"
                      className="w-full p-2 border rounded"
                      value={selectedTestForAccess || ""}
                      onChange={(e) => setSelectedTestForAccess(e.target.value)}
                    >
                      <option value="">Select a test</option>
                      {tests.map(test => (
                        <option key={test.testId} value={test.testId}>
                          {test.nomi}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="user-search">Search Student</Label>
                    <Input
                      id="user-search"
                      placeholder="Search by name or email..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto border rounded">
                    {filteredUsers.map(user => (
                      <div
                        key={user.id}
                        className={`p-3 border-b cursor-pointer hover:bg-muted ${
                          selectedUser === user.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedUser(user.id)}
                      >
                        <div className="font-medium">{user.full_name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleGrantAccess}
                    disabled={!selectedUser || !selectedTestForAccess}
                    className="w-full"
                  >
                    Grant Access
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
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
            <Card key={test.testId} className="transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">
                      {test.nomi}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {test.subject} • {test.questionCount} questions
                    </div>
                  </div>
                  {test.isPremium && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{test.questionCount} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{test.jami_urinishlar} attempts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Avg:</span>
                    <span className="font-medium">{test.average}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Access:</span>
                    <span className="font-medium">{test.hasAccess ? 'Yes' : 'No'}</span>
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
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedTestForAccess(test.testId);
                      setIsGrantAccessOpen(true);
                    }}
                  >
                    <UserCheck className="h-4 w-4" />
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
              <DialogTitle>{selectedTest?.nomi}</DialogTitle>
            </DialogHeader>

            {selectedTest && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Subject:</span> {selectedTest.subject}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Questions:</span> {selectedTest.questionCount}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attempts:</span> {selectedTest.jami_urinishlar}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Average Score:</span> {selectedTest.average}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Test Information
                  </Label>
                  <p className="text-sm">
                    This is a SAT practice test designed to help students prepare for the SAT exam.
                  </p>
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
