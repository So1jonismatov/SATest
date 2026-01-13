import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/api/real";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TestCreationPage = () => {
  const navigate = useNavigate();
  const [testData, setTestData] = useState({
    nomi: "",
    subject: "mathematics",
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTestData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };



  const handleSaveTest = async () => {
    setIsSaving(true);
    try {
      const newTest = await api.teacher.createTest(testData);
      alert("Test created successfully!");
      navigate(`/admin/tests/${newTest.id}`);
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Failed to create test.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nomi">Test Title</Label>
            <Input
              id="nomi"
              name="nomi"
              value={testData.nomi}
              onChange={handleInputChange}
              placeholder="e.g. Backend Test"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              name="subject"
              value={testData.subject}
              onChange={handleInputChange}
              placeholder="e.g. Node.js"
            />
          </div>

          <Button onClick={handleSaveTest} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save and Add Questions"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestCreationPage;
