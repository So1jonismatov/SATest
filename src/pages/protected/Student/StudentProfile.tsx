import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import {
  getStudentOverview,
  getGradeColor,
} from "@/function/Student/StudentDashboardFunctions";
import {
  User,
  Mail,
  Phone,
  Calendar,
  GraduationCap,
  Trophy,
  Target,
  BookOpen,
  Edit,
  Camera,
  Save,
} from "lucide-react";

const StudentProfile: React.FC = () => {
  const { user } = useAuth();
  const studentOverview = getStudentOverview();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+1 (555) 123-4567",
    studentId: "STU2024001",
    grade: "10th Grade",
    class: "10-A",
    enrollmentDate: "2024-08-15",
    address: "123 Student Lane, Education City, EC 12345",
    emergencyContact: "Jane Doe - +1 (555) 987-6543",
    interests: ["Mathematics", "Science", "Literature", "Sports"],
    bio: "I am a dedicated student passionate about learning and academic excellence. I enjoy participating in science clubs and math competitions.",
  });

  const academicStats = {
    currentGPA: studentOverview.currentGPA,
    classRank: 15,
    totalStudents: 120,
    completionRate: 92,
    attendanceRate: 96,
  };

  const achievements = [
    { title: "Honor Roll", date: "Fall 2024", type: "academic" },
    { title: "Science Fair Winner", date: "Oct 2024", type: "competition" },
    { title: "Perfect Attendance", date: "Sep 2024", type: "attendance" },
    { title: "Math Olympiad Finalist", date: "Aug 2024", type: "competition" },
  ];

  const currentCourses = [
    { name: "Algebra II", teacher: "Ms. Johnson", grade: "A-", progress: 85 },
    { name: "Biology", teacher: "Dr. Smith", grade: "B+", progress: 78 },
    {
      name: "English Literature",
      teacher: "Mr. Wilson",
      grade: "A",
      progress: 92,
    },
    { name: "World History", teacher: "Ms. Davis", grade: "B", progress: 76 },
    { name: "Spanish II", teacher: "Señora Garcia", grade: "A-", progress: 88 },
    {
      name: "Physical Education",
      teacher: "Coach Brown",
      grade: "A",
      progress: 95,
    },
  ];

  const handleSave = () => {
    // In real app, this would save to backend
    console.log("Saving profile:", profileData);
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case "academic":
        return <GraduationCap className="h-4 w-4" />;
      case "competition":
        return <Trophy className="h-4 w-4" />;
      case "attendance":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  if (!user) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-2">
              View and manage your academic profile and information
            </p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto">
                    {profileData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardTitle className="text-xl">{profileData.name}</CardTitle>
                <p className="text-muted-foreground">
                  {profileData.grade} • {profileData.class}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>ID: {profileData.studentId}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>
                      Enrolled:{" "}
                      {new Date(
                        profileData.enrollmentDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>Academic Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-blue-600">
                      {academicStats.currentGPA}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Current GPA
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">
                      #{academicStats.classRank}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Class Rank
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Assignment Completion</span>
                      <span>{academicStats.completionRate}%</span>
                    </div>
                    <Progress value={academicStats.completionRate} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Attendance Rate</span>
                      <span>{academicStats.attendanceRate}%</span>
                    </div>
                    <Progress value={academicStats.attendanceRate} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5" />
                  <span>Recent Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-2 rounded-lg bg-muted/50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                        {getAchievementIcon(achievement.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">
                          {achievement.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={profileData.emergencyContact}
                      onChange={(e) =>
                        handleInputChange("emergencyContact", e.target.value)
                      }
                      readOnly={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profileData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    readOnly={!isEditing}
                    className={!isEditing ? "bg-muted" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    readOnly={!isEditing}
                    className={`w-full p-2 border rounded-md text-sm min-h-[80px] ${!isEditing ? "bg-muted" : ""}`}
                  />
                </div>
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.interests.map((interest, index) => (
                      <Badge key={index} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Current Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentCourses.map((course, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{course.name}</h4>
                        <Badge
                          className={getGradeColor(course.grade)}
                          variant="secondary"
                        >
                          {course.grade}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Teacher: {course.teacher}
                      </p>
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
