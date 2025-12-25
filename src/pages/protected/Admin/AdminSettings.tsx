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
import {
  Settings,
  Shield,
  Bell,
  Globe,
  Database,
  Users,
  Save,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

interface AdminSettingsType {
  siteName: string;
  siteDescription: string;
  adminEmail: string;
  supportEmail: string;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
  defaultUserRole: string;
  autoApproveTeachers: boolean;
  sessionTimeout: number;
  maxFileUploadSize: number;
  backupFrequency: string;
  maintenanceMode: boolean;
  debugMode: boolean;
  enforceStrongPasswords: boolean;
  enableTwoFactor: boolean;
  maxLoginAttempts: number;
  lockoutDuration: number;
  enableEmailNotifications: boolean;
  smtpServer: string;
  smtpPort: string;
  smtpUsername: string;
  defaultTestDuration: number;
  allowTestRetakes: boolean;
  showResultsImmediately: boolean;
  randomizeQuestions: boolean;
  notifyOnNewRegistration: boolean;
  notifyOnTestCompletion: boolean;
  notifyOnSystemErrors: boolean;
  weeklyReports: boolean;
}

const AdminSettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<AdminSettingsType>({
    // General Settings
    siteName: "AnorTest Platform",
    siteDescription: "Educational Testing and Management System",
    adminEmail: user?.email || "",
    supportEmail: "support@AnorTest.com",

    // User Management
    allowUserRegistration: true,
    requireEmailVerification: true,
    defaultUserRole: "student",
    autoApproveTeachers: false,
    sessionTimeout: 120, // minutes

    // System Settings
    maxFileUploadSize: 10, // MB
    backupFrequency: "daily",
    maintenanceMode: false,
    debugMode: false,

    // Security Settings
    enforceStrongPasswords: true,
    enableTwoFactor: true,
    maxLoginAttempts: 5,
    lockoutDuration: 30, // minutes

    // Email Settings
    enableEmailNotifications: true,
    smtpServer: "smtp.anorTest.com",
    smtpPort: "587",
    smtpUsername: "notifications@AnorTest.com",

    // Test Settings
    defaultTestDuration: 60, // minutes
    allowTestRetakes: false,
    showResultsImmediately: true,
    randomizeQuestions: true,

    // Notification Settings
    notifyOnNewRegistration: true,
    notifyOnTestCompletion: false,
    notifyOnSystemErrors: true,
    weeklyReports: true,
  });

  const handleSave = () => {
    console.log("Saving admin settings:", settings);
    alert("Settings saved successfully!");
  };

  const handleInputChange = (
    field: keyof AdminSettingsType,
    value: string | number | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleBackup = () => {
    alert("System backup initiated. You will be notified when complete.");
  };

  const handleRestore = () => {
    if (
      confirm(
        "Are you sure you want to restore from backup? This will overwrite current data.",
      )
    ) {
      alert("Restore process initiated. This may take several minutes.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">System Settings</h1>
            <p className="text-muted-foreground mt-2">
              Configure system-wide settings and preferences
            </p>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>General Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) =>
                    handleInputChange("siteName", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) =>
                    handleInputChange("adminEmail", e.target.value)
                  }
                />
              </div>
              <div>
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input
                  id="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) =>
                    handleInputChange("supportEmail", e.target.value)
                  }
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
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Input
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  handleInputChange("siteDescription", e.target.value)
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* User Management Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow User Registration</div>
                    <div className="text-sm text-muted-foreground">
                      Allow new users to register accounts
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowUserRegistration}
                    onCheckedChange={(checked) =>
                      handleInputChange("allowUserRegistration", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Require Email Verification
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Users must verify their email before accessing the system
                    </div>
                  </div>
                  <Switch
                    checked={settings.requireEmailVerification}
                    onCheckedChange={(checked) =>
                      handleInputChange("requireEmailVerification", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-approve Teachers</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically approve teacher registrations
                    </div>
                  </div>
                  <Switch
                    checked={settings.autoApproveTeachers}
                    onCheckedChange={(checked) =>
                      handleInputChange("autoApproveTeachers", checked)
                    }
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="defaultUserRole">Default User Role</Label>
                <Select
                  value={settings.defaultUserRole}
                  onValueChange={(value) =>
                    handleInputChange("defaultUserRole", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enforce Strong Passwords</div>
                    <div className="text-sm text-muted-foreground">
                      Require passwords to meet complexity requirements
                    </div>
                  </div>
                  <Switch
                    checked={settings.enforceStrongPasswords}
                    onCheckedChange={(checked) =>
                      handleInputChange("enforceStrongPasswords", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      Enable Two-Factor Authentication
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Allow users to enable 2FA for their accounts
                    </div>
                  </div>
                  <Switch
                    checked={settings.enableTwoFactor}
                    onCheckedChange={(checked) =>
                      handleInputChange("enableTwoFactor", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={settings.maxLoginAttempts}
                    onChange={(e) =>
                      handleInputChange(
                        "maxLoginAttempts",
                        parseInt(e.target.value),
                      )
                    }
                    min="3"
                    max="10"
                  />
                </div>
                <div>
                  <Label htmlFor="lockoutDuration">
                    Lockout Duration (minutes)
                  </Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={settings.lockoutDuration}
                    onChange={(e) =>
                      handleInputChange(
                        "lockoutDuration",
                        parseInt(e.target.value),
                      )
                    }
                    min="5"
                    max="120"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Test Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="defaultTestDuration">
                    Default Test Duration (minutes)
                  </Label>
                  <Input
                    id="defaultTestDuration"
                    type="number"
                    value={settings.defaultTestDuration}
                    onChange={(e) =>
                      handleInputChange(
                        "defaultTestDuration",
                        parseInt(e.target.value),
                      )
                    }
                    min="15"
                    max="300"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Allow Test Retakes</div>
                    <div className="text-sm text-muted-foreground">
                      Allow students to retake tests by default
                    </div>
                  </div>
                  <Switch
                    checked={settings.allowTestRetakes}
                    onCheckedChange={(checked) =>
                      handleInputChange("allowTestRetakes", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Results Immediately</div>
                    <div className="text-sm text-muted-foreground">
                      Show test results immediately after completion
                    </div>
                  </div>
                  <Switch
                    checked={settings.showResultsImmediately}
                    onCheckedChange={(checked) =>
                      handleInputChange("showResultsImmediately", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Randomize Questions</div>
                    <div className="text-sm text-muted-foreground">
                      Randomize question order by default
                    </div>
                  </div>
                  <Switch
                    checked={settings.randomizeQuestions}
                    onCheckedChange={(checked) =>
                      handleInputChange("randomizeQuestions", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Email Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Email & Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Enable Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Allow the system to send email notifications
                </div>
              </div>
              <Switch
                checked={settings.enableEmailNotifications}
                onCheckedChange={(checked) =>
                  handleInputChange("enableEmailNotifications", checked)
                }
              />
            </div>

            {settings.enableEmailNotifications && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 border rounded-lg">
                <div>
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input
                    id="smtpServer"
                    value={settings.smtpServer}
                    onChange={(e) =>
                      handleInputChange("smtpServer", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input
                    id="smtpPort"
                    value={settings.smtpPort}
                    onChange={(e) =>
                      handleInputChange("smtpPort", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input
                    id="smtpUsername"
                    value={settings.smtpUsername}
                    onChange={(e) =>
                      handleInputChange("smtpUsername", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium">Notification Preferences</h4>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    New Registration Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Notify admins when new users register
                  </div>
                </div>
                <Switch
                  checked={settings.notifyOnNewRegistration}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifyOnNewRegistration", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    Test Completion Notifications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Notify teachers when students complete tests
                  </div>
                </div>
                <Switch
                  checked={settings.notifyOnTestCompletion}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifyOnTestCompletion", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">System Error Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Notify admins of system errors and issues
                  </div>
                </div>
                <Switch
                  checked={settings.notifyOnSystemErrors}
                  onCheckedChange={(checked) =>
                    handleInputChange("notifyOnSystemErrors", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Send weekly activity reports to admins
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

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>System Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="maxFileUploadSize">
                    Max File Upload Size (MB)
                  </Label>
                  <Input
                    id="maxFileUploadSize"
                    type="number"
                    value={settings.maxFileUploadSize}
                    onChange={(e) =>
                      handleInputChange(
                        "maxFileUploadSize",
                        parseInt(e.target.value),
                      )
                    }
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={settings.backupFrequency}
                    onValueChange={(value) =>
                      handleInputChange("backupFrequency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Maintenance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable maintenance mode to restrict access
                    </div>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleInputChange("maintenanceMode", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Debug Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable debug mode for troubleshooting
                    </div>
                  </div>
                  <Switch
                    checked={settings.debugMode}
                    onCheckedChange={(checked) =>
                      handleInputChange("debugMode", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Actions */}
        <Card>
          <CardHeader>
            <CardTitle>System Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Backup System</div>
                  <div className="text-sm text-muted-foreground">
                    Create a full system backup
                  </div>
                </div>
                <Button variant="outline" onClick={handleBackup}>
                  <Download className="h-4 w-4 mr-2" />
                  Backup
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Restore System</div>
                  <div className="text-sm text-muted-foreground">
                    Restore from a previous backup
                  </div>
                </div>
                <Button variant="outline" onClick={handleRestore}>
                  <Upload className="h-4 w-4 mr-2" />
                  Restore
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">Clear Cache</div>
                  <div className="text-sm text-muted-foreground">
                    Clear system cache and temp files
                  </div>
                </div>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
