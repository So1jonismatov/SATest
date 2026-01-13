import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/api/real";
import type { Test } from "@/api/real/types";
import {
  Plus,
  Trash2,
  Eye,
  FileText,
  Search,
  Users,
} from "lucide-react";

const TeacherTestManagement: React.FC = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTests = async () => {
    try {
      const response = await api.student.getTests();
      setTests(response || []);
    } catch (error) {
      console.error("Error fetching tests:", error);
      setTests([]);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

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

  // ---------- Actions ----------
  const handleDeleteTest = async (testId: number) => {
    try {
      await api.teacher.deleteTest(testId.toString());
      fetchTests(); // Refresh the list of tests
    } catch (error) {
      console.error("Error deleting test:", error);
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
            <Button onClick={() => navigate("/admin/tests/new")}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Test
            </Button>
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
            <Card
              key={test.id}
              className="transition-shadow hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg line-clamp-1">
                      {test.nomi}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground mt-1">
                      {test.subject} • {test.savollar_soni || 0} questions
                    </div>
                  </div>
                  {test.is_premium && (
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
                    <span>{test.savollar_soni || 0} questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{test.jami_urinishlar} attempts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Avg:</span>
                    <span className="font-medium">{test.average || 0}</span>
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
                    className="flex-1"
                    onClick={() => navigate(`/admin/tests/${test.id}`)}
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDeleteTest(test.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
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
                    <span className="text-muted-foreground">Subject:</span>{" "}
                    {selectedTest.subject}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Questions:</span>{" "}
                    {selectedTest.savollar_soni || 0}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Attempts:</span>{" "}
                    {selectedTest.jami_urinishlar}
                  </div>
                  <div>
                    <span className="text-muted-foreground">
                      Average Score:
                    </span>{" "}
                    {selectedTest.average || 0}
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Test Information
                  </Label>
                  <p className="text-sm">
                    This is a SAT practice test designed to help students
                    prepare for the SAT exam.
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
