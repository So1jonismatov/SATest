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
import { User, Bell, Shield, Globe, Save } from "lucide-react";

const StudentSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    // Profile Settings
    name: user?.name || "",
    email: user?.email || "",
    studentId: "STU2024001",
    phone: "",
    emergencyContact: "",

    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    homeworkReminders: true,
    testReminders: true,
    gradeNotifications: true,
    announcementNotifications: true,

    // Privacy Settings
    profileVisibility: "classmates",
    showEmail: false,
    shareProgress: true,

    // Study Preferences
    language: "en",
    timezone: "EST",
    studyReminders: true,
    focusMode: false,
    darkMode: false,

    // Security
    twoFactorAuth: false,
    loginAlerts: true,
    passwordChangeRequired: false,
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
              Manage your account preferences and study settings
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Profile Information</span>
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
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  value={settings.studentId}
                  readOnly
                  className="bg-muted"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                value={settings.emergencyContact}
                onChange={(e) =>
                  handleInputChange("emergencyContact", e.target.value)
                }
                placeholder="Parent/Guardian contact information"
              />
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
              <h4 className="font-medium">Academic Notifications</h4>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Homework Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get reminded about upcoming assignments
                  </div>
                </div>
                <Switch
                  checked={settings.homeworkReminders}
                  onCheckedChange={(checked) =>
                    handleInputChange("homeworkReminders", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Test Reminders</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified about upcoming tests
                  </div>
                </div>
                <Switch
                  checked={settings.testReminders}
                  onCheckedChange={(checked) =>
                    handleInputChange("testReminders", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Grade Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Get notified when grades are posted
                  </div>
                </div>
                <Switch
                  checked={settings.gradeNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("gradeNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">School Announcements</div>
                  <div className="text-sm text-muted-foreground">
                    Receive school-wide announcements
                  </div>
                </div>
                <Switch
                  checked={settings.announcementNotifications}
                  onCheckedChange={(checked) =>
                    handleInputChange("announcementNotifications", checked)
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
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
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="classmates">Classmates</SelectItem>
                  <SelectItem value="teachers">Teachers Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show Email</div>
                <div className="text-sm text-muted-foreground">
                  Allow others to see your email address
                </div>
              </div>
              <Switch
                checked={settings.showEmail}
                onCheckedChange={(checked) =>
                  handleInputChange("showEmail", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Share Progress</div>
                <div className="text-sm text-muted-foreground">
                  Allow teachers to share your progress with parents
                </div>
              </div>
              <Switch
                checked={settings.shareProgress}
                onCheckedChange={(checked) =>
                  handleInputChange("shareProgress", checked)
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

        {/* Study Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Study Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Study Reminders</div>
                <div className="text-sm text-muted-foreground">
                  Get reminded to start studying
                </div>
              </div>
              <Switch
                checked={settings.studyReminders}
                onCheckedChange={(checked) =>
                  handleInputChange("studyReminders", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Focus Mode</div>
                <div className="text-sm text-muted-foreground">
                  Hide distracting elements during study time
                </div>
              </div>
              <Switch
                checked={settings.focusMode}
                onCheckedChange={(checked) =>
                  handleInputChange("focusMode", checked)
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  Use dark theme for easier reading
                </div>
              </div>
              <Switch
                checked={settings.darkMode}
                onCheckedChange={(checked) =>
                  handleInputChange("darkMode", checked)
                }
              />
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
                  <div className="font-medium">Download My Data</div>
                  <div className="text-sm text-muted-foreground">
                    Download your academic records and data
                  </div>
                </div>
                <Button variant="outline">Download</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Academic Transcript</div>
                  <div className="text-sm text-muted-foreground">
                    Request official academic transcript
                  </div>
                </div>
                <Button variant="outline">Request</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentSettings;
