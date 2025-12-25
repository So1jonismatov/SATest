import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getGradeColor,
  formatDate,
} from "@/function/Student/StudentDashboardFunctions";
import {
  BookOpen,
  User,
  Clock,
  MapPin,
  Mail,
  Calendar,
  Trophy,
  Target,
} from "lucide-react";

const StudentAcademicOverview: React.FC = () => {
  // Mock student courses data
  const currentCourses = [
    {
      id: "course-1",
      name: "Algebra II",
      subject: "Mathematics",
      teacher: {
        name: "Ms. Sarah Johnson",
        email: "sarah.johnson@school.edu",
        contactHours: "9:00 AM - 3:00 PM",
      },
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "10:00 AM - 11:00 AM",
        room: "Room 201",
      },
      currentGrade: "B+",
      progress: 85,
      credits: 3,
      description: "Advanced algebra concepts and problem solving",
      nextClass: "2024-12-31T10:00:00Z",
      assignments: {
        total: 15,
        completed: 12,
        pending: 3,
      },
      recentGrades: [
        { assignment: "Quiz 5", grade: "A-", date: "2024-12-20" },
        { assignment: "Homework 8", grade: "B+", date: "2024-12-18" },
        { assignment: "Test 2", grade: "B", date: "2024-12-15" },
      ],
    },
    {
      id: "course-2",
      name: "Biology",
      subject: "Science",
      teacher: {
        name: "Dr. Emily Chen",
        email: "emily.chen@school.edu",
        contactHours: "10:00 AM - 4:00 PM",
      },
      schedule: {
        days: ["Monday", "Wednesday", "Friday"],
        time: "1:00 PM - 2:00 PM",
        room: "Lab 301",
      },
      currentGrade: "A",
      progress: 92,
      credits: 4,
      description: "Introduction to biological sciences and laboratory work",
      nextClass: "2024-12-31T13:00:00Z",
      assignments: {
        total: 12,
        completed: 11,
        pending: 1,
      },
      recentGrades: [
        { assignment: "Lab Report 3", grade: "A", date: "2024-12-22" },
        { assignment: "Chapter Test", grade: "A-", date: "2024-12-19" },
        { assignment: "Quiz 4", grade: "A", date: "2024-12-17" },
      ],
    },
    {
      id: "course-3",
      name: "English Literature",
      subject: "English",
      teacher: {
        name: "Mr. David Wilson",
        email: "david.wilson@school.edu",
        contactHours: "8:00 AM - 4:00 PM",
      },
      schedule: {
        days: ["Tuesday", "Thursday"],
        time: "9:00 AM - 10:30 AM",
        room: "Room 105",
      },
      currentGrade: "A-",
      progress: 88,
      credits: 4,
      description: "Study of American and British literary works",
      nextClass: "2024-12-31T09:00:00Z",
      assignments: {
        total: 10,
        completed: 8,
        pending: 2,
      },
      recentGrades: [
        { assignment: "Essay - Shakespeare", grade: "A-", date: "2024-12-21" },
        { assignment: "Reading Quiz", grade: "B+", date: "2024-12-16" },
        { assignment: "Discussion Post", grade: "A", date: "2024-12-14" },
      ],
    },
  ];

  const academicSummary = {
    overallGPA: 3.6,
    totalCredits: 11,
    completedAssignments: 31,
    pendingAssignments: 6,
    averageGrade: "B+",
    classRank: 15,
    totalStudents: 120,
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Academic Overview</h1>
            <p className="text-muted-foreground mt-2">
              Your current courses, grades, and academic progress
            </p>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Trophy className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {academicSummary.overallGPA}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Overall GPA
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    #{academicSummary.classRank}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Class Rank
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {academicSummary.totalCredits}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Credits
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      (academicSummary.completedAssignments /
                        (academicSummary.completedAssignments +
                          academicSummary.pendingAssignments)) *
                        100,
                    )}
                    %
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Completion Rate
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Current Courses</h2>
          <div className="space-y-6">
            {currentCourses.map((course) => (
              <Card
                key={course.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>{course.name}</span>
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {course.subject} • {course.credits} Credits
                      </p>
                    </div>
                    <Badge
                      className={getGradeColor(course.currentGrade)}
                      variant="secondary"
                    >
                      {course.currentGrade}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Course Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Course Information</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {course.description}
                        </p>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{course.schedule.days.join(", ")}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{course.schedule.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{course.schedule.room}</span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            Course Progress
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {course.progress}%
                          </span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    </div>

                    {/* Teacher Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Teacher</h4>
                        <div className="border rounded-lg p-3 bg-muted/20">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {course.teacher.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {course.subject}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3" />
                              <span>{course.teacher.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3" />
                              <span>
                                Office Hours: {course.teacher.contactHours}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full mt-2"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Message Teacher
                          </Button>
                        </div>
                      </div>

                      {/* Assignment Stats */}
                      <div>
                        <h4 className="font-medium mb-2">Assignments</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span>Total:</span>
                            <span className="font-medium">
                              {course.assignments.total}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Completed:</span>
                            <span className="font-medium text-green-600">
                              {course.assignments.completed}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Pending:</span>
                            <span className="font-medium text-yellow-600">
                              {course.assignments.pending}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Grades */}
                    <div>
                      <h4 className="font-medium mb-2">Recent Grades</h4>
                      <div className="space-y-2">
                        {course.recentGrades.map((grade, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                {grade.assignment}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(grade.date)}
                              </div>
                            </div>
                            <Badge
                              className={getGradeColor(grade.grade)}
                              variant="secondary"
                            >
                              {grade.grade}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        View All Grades
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAcademicOverview;
