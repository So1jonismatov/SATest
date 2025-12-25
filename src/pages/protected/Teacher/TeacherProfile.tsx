import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { User, Bell, Shield, Globe, Save, BookOpen } from "lucide-react";

const TeacherSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // Profile Settings
    name: user?.name || "",
    email: user?.email || "",
    teacherId: "TCH2024001",
    department: "Mathematics",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    testSubmissionAlerts: true,
    gradeReminders: true,
    studentQuestionAlerts: true,
    systemAnnouncements: true,
    weeklyReports: true,

    // Privacy Settings
    profileVisibility: "students-parents",
    showContactInfo: true,
    allowMessages: true,
    shareTestResults: false,

    // Teaching Preferences
    language: "en",
    timezone: "EST",
    defaultTestDuration: 30,
    autoGrading: true,
    showCorrectAnswers: true,
    allowRetakes: false,
    shuffleQuestions: true,

    // Security Settings
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 120, // minutes
    requireStrongPassword: true,

    // Accessibility
    highContrast: false,
    largeText: false,
    screenReader: false,
  });

  const handleSave = () => {
    console.log("Saving settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleInputChange = (field: string, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your teaching preferences and account settings
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="teacherId">Teacher ID</Label>
                <Input
                  id="teacherId"
                  value={settings.teacherId}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  value={settings.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Geography">Geography</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("emailNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive browser push notifications
                  </div>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("pushNotifications", checked)
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Teaching Notifications</h4>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Test Submission Alerts</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when students submit tests
                  </div>
                </div>
                <Switch
                  checked={settings.testSubmissionAlerts}
                  onCheckedChange={(checked) =>
                    handleInputChange("testSubmissionAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Grade Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Reminders to grade pending tests
                  </div>
                </div>
                <Switch
                  checked={settings.gradeReminders}
                  onCheckedChange={(checked) =>
                    handleInputChange("gradeReminders", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Student Questions</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when students ask questions
                  </div>
                </div>
                <Switch
                  checked={settings.studentQuestionAlerts}
                  onCheckedChange={(checked) =>
                    handleInputChange("studentQuestionAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Receive weekly performance summaries
                  </div>
                </div>
                <Switch
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) =>
                    handleInputChange("weeklyReports", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teaching Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Teaching Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="defaultDuration">
                  Default Test Duration (minutes)
                </Label>
                <Input
                  id="defaultDuration"
                  type="number"
                  value={settings.defaultTestDuration}
                  onChange={(e) =>
                    handleInputChange(
                      "defaultTestDuration",
                      parseInt(e.target.value),
                    )
                  }
                  min="5"
                  max="300"
                />
              </div>
              <div>
                <Label htmlFor="sessionTimeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    handleInputChange(
                      "sessionTimeout",
                      parseInt(e.target.value),
                    )
                  }
                  min="30"
                  max="480"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-Grading</div>
                  <div className="text-sm text-muted-foreground">
                    Automatically grade multiple choice questions
                  </div>
                </div>
                <Switch
                  checked={settings.autoGrading}
                  onCheckedChange={(checked) =>
                    handleInputChange("autoGrading", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Show Correct Answers</div>
                  <div className="text-sm text-muted-foreground">
                    Show correct answers to students after submission
                  </div>
                </div>
                <Switch
                  checked={settings.showCorrectAnswers}
                  onCheckedChange={(checked) =>
                    handleInputChange("showCorrectAnswers", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Allow Retakes</div>
                  <div className="text-sm text-muted-foreground">
                    Allow students to retake tests
                  </div>
                </div>
                <Switch
                  checked={settings.allowRetakes}
                  onCheckedChange={(checked) =>
                    handleInputChange("allowRetakes", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Shuffle Questions</div>
                  <div className="text-sm text-muted-foreground">
                    Randomize question order for each student
                  </div>
                </div>
                <Switch
                  checked={settings.shuffleQuestions}
                  onCheckedChange={(checked) =>
                    handleInputChange("shuffleQuestions", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Profile Visibility</div>
                <div className="text-sm text-muted-foreground">
                  Who can see your profile information
                </div>
              </div>
              <Select
                value={settings.profileVisibility}
                onValueChange={(value) =>
                  handleInputChange("profileVisibility", value)
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="students-parents">
                    Students & Parents
                  </SelectItem>
                  <SelectItem value="students-only">Students Only</SelectItem>
                  <SelectItem value="admin-only">
                    Administrators Only
                  </SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show Contact Information</div>
                <div className="text-sm text-muted-foreground">
                  Display email and office hours
                </div>
              </div>
              <Switch
                checked={settings.showContactInfo}
                onCheckedChange={(checked) =>
                  handleInputChange("showContactInfo", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Allow Messages</div>
                <div className="text-sm text-muted-foreground">
                  Allow students and parents to send messages
                </div>
              </div>
              <Switch
                checked={settings.allowMessages}
                onCheckedChange={(checked) =>
                  handleInputChange("allowMessages", checked)
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add extra security to your account
                </div>
              </div>
              <Switch
                checked={settings.twoFactorAuth}
                onCheckedChange={(checked) =>
                  handleInputChange("twoFactorAuth", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Login Alerts</div>
                <div className="text-sm text-muted-foreground">
                  Get notified of new sign-ins
                </div>
              </div>
              <Switch
                checked={settings.loginAlerts}
                onCheckedChange={(checked) =>
                  handleInputChange("loginAlerts", checked)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>System Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) =>
                    handleInputChange("language", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) =>
                    handleInputChange("timezone", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Time (CST)</SelectItem>
                    <SelectItem value="MST">Mountain Time (MST)</SelectItem>
                    <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <h4 className="font-medium">Accessibility</h4>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">High Contrast Mode</div>
                  <div className="text-sm text-muted-foreground">
                    Increase contrast for better visibility
                  </div>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) =>
                    handleInputChange("highContrast", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Large Text</div>
                  <div className="text-sm text-muted-foreground">
                    Increase text size throughout the application
                  </div>
                </div>
                <Switch
                  checked={settings.largeText}
                  onCheckedChange={(checked) =>
                    handleInputChange("largeText", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Change Password</div>
                  <div className="text-sm text-muted-foreground">
                    Update your account password
                  </div>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Export Teaching Data</div>
                  <div className="text-sm text-muted-foreground">
                    Download your tests and student results
                  </div>
                </div>
                <Button variant="outline">Export Data</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Backup Tests</div>
                  <div className="text-sm text-muted-foreground">
                    Create a backup of all your tests
                  </div>
                </div>
                <Button variant="outline">Backup Now</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherSettings;
