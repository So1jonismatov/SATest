import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getAllStudents,
  getStudentResults,
  formatDate,
} from "@/function/Teacher/TeacherDashboardFunctions";
import { User, Search, Eye, Mail, Clock } from "lucide-react";

const TeacherStudentManagement: React.FC = () => {
  const [students] = useState(getAllStudents());
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [filterClass, setFilterClass] = useState("all");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    const matchesClass = filterClass === "all" || student.class === filterClass;
    return matchesSearch && matchesGrade && matchesClass;
  });

  const getStudentStats = (studentId: string) => {
    const results = getStudentResults(studentId);
    if (results.length === 0) {
      return {
        totalTests: 0,
        averageScore: 0,
        testsCompleted: 0,
        highestScore: 0,
      };
    }

    const scores = results.map((r) => r.percentage);
    return {
      totalTests: results.length,
      averageScore:
        scores.reduce((sum, score) => sum + score, 0) / scores.length,
      testsCompleted: results.length,
      highestScore: Math.max(...scores),
    };
  };

  const uniqueGrades = [...new Set(students.map((s) => s.grade))].filter(
    Boolean,
  ) as string[];
  const uniqueClasses = [...new Set(students.map((s) => s.class))].filter(
    Boolean,
  ) as string[];

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Student Management</h1>
            <p className="text-muted-foreground mt-2">
              Monitor student progress and performance across all tests
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={filterGrade} onValueChange={setFilterGrade}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {uniqueGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {uniqueClasses.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => {
            const stats = getStudentStats(student.id);
            return (
              <Card
                key={student.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {student.grade} • {student.class}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{student.email}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>ID: {student.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Last login: {formatDate(student.name)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Test Stats</div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary">
                        Total: {stats.totalTests}
                      </Badge>
                      <Badge variant="secondary">
                        Completed: {stats.testsCompleted}
                      </Badge>
                      <Badge variant="secondary">
                        Avg: {stats.averageScore.toFixed(1)}%
                      </Badge>
                      <Badge variant="secondary">
                        High: {stats.highestScore}%
                      </Badge>
                    </div>
                  </div>

                  <Dialog
                    open={isViewDialogOpen}
                    onOpenChange={setIsViewDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{student.name}'s Details</DialogTitle>
                      </DialogHeader>
                      {/* Add detailed view content here */}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherStudentManagement;
