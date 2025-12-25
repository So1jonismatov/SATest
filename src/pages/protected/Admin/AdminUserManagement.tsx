import React, { useState, useEffect, useMemo } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/api/simulation/v2";
import type { User, Student, Teacher, Parent } from "@/types";
import { AdminUserSchema } from "@/lib/zod-schemas/admin-schema";
import { UserEditDialog } from "@/components/shared/admin-portal/UserEditDialog";
import {
  Users,
  Edit,
  Trash2,
  Search,
  UserPlus,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Link as LinkIcon,
} from "lucide-react";

const UserCard = ({
  user,
  onEdit,
  onDelete,
  onAssign,
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onAssign: (user: User) => void;
}) => (
  <Card className="transition-shadow hover:shadow-md">
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {user.role === "student" && (
              <GraduationCap className="h-5 w-5 text-blue-600" />
            )}
            {user.role === "teacher" && (
              <BookOpen className="h-5 w-5 text-purple-600" />
            )}
            {user.role === "parent" && (
              <Users className="h-5 w-5 text-green-600" />
            )}
            {user.role === "admin" && (
              <ShieldCheck className="h-5 w-5 text-red-600" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {user.email || user.phone}
            </p>
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex gap-2 mt-2">
      <Button variant="outline" size="sm" onClick={() => onEdit(user)}>
        <Edit className="h-4 w-4 mr-1" />
        Edit
      </Button>
      {user.role !== "admin" && (
        <Button variant="outline" size="sm" onClick={() => onAssign(user)}>
          <LinkIcon className="h-4 w-4 mr-1" />
          Assign
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(user.id)}
        className="text-red-600 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [assigningUser, setAssigningUser] = useState<User | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<string>("");
  const [selectedTeacher, setSelectedTeacher] = useState<string>("");
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [classes, setClasses] = useState<string[]>([
    "10A",
    "10B",
    "11A",
    "11B",
  ]);

  const fetchUsers = async () => {
    const users = await api.admin.getUsers();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openUserDialog = (user: User | null) => {
    setEditingUser(user);
    setIsUserDialogOpen(true);
  };

  const openAssignDialog = (user: User) => {
    setAssigningUser(user);
    setIsAssignDialogOpen(true);
  };

  const handleSaveUser = async (values: z.infer<typeof AdminUserSchema>) => {
    if (editingUser) {
      await api.admin.updateUser(editingUser.id, values);
    } else {
      await api.admin.createUser(values as Omit<User, "id">);
    }
    fetchUsers();
    setIsUserDialogOpen(false);
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await api.admin.deleteUser(userId);
      fetchUsers();
    }
  };

  const handleAddClass = (className: string) => {
    if (className && !classes.includes(className)) {
      setClasses([...classes, className]);
    }
  };

  const handleAssign = async () => {
    if (!assigningUser) return;

    if (assigningUser.role === "teacher" && selectedStudent) {
      await api.admin.assignTeacherToStudent(assigningUser.id, selectedStudent);
    } else if (assigningUser.role === "student" && selectedTeacher) {
      await api.admin.assignTeacherToStudent(selectedTeacher, assigningUser.id);
    } else if (assigningUser.role === "parent" && selectedStudent) {
      await api.admin.assignParentToStudent(assigningUser.id, selectedStudent);
    } else if (assigningUser.role === "student" && selectedParent) {
      await api.admin.assignParentToStudent(selectedParent, assigningUser.id);
    }

    fetchUsers();
    setIsAssignDialogOpen(false);
    setAssigningUser(null);
    setSelectedStudent("");
    setSelectedTeacher("");
    setSelectedParent("");
  };

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email &&
          user.email.toLowerCase().includes(searchTerm.toLowerCase())),
    );
  }, [users, searchTerm]);

  const students = filteredUsers.filter(
    (u) => u.role === "student",
  ) as Student[];
  const teachers = filteredUsers.filter(
    (u) => u.role === "teacher",
  ) as Teacher[];
  const parents = filteredUsers.filter((u) => u.role === "parent") as Parent[];
  const admins = filteredUsers.filter((u) => u.role === "admin");

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage all users in the system.
            </p>
          </div>
          <Button onClick={() => openUserDialog(null)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">
              Students ({students.length})
            </TabsTrigger>
            <TabsTrigger value="teachers">
              Teachers ({teachers.length})
            </TabsTrigger>
            <TabsTrigger value="parents">
              Parents ({parents.length})
            </TabsTrigger>
            <TabsTrigger value="admins">Admins ({admins.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openUserDialog}
                  onDelete={handleDeleteUser}
                  onAssign={openAssignDialog}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="teachers">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teachers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openUserDialog}
                  onDelete={handleDeleteUser}
                  onAssign={openAssignDialog}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="parents">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parents.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openUserDialog}
                  onDelete={handleDeleteUser}
                  onAssign={openAssignDialog}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="admins">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {admins.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={openUserDialog}
                  onDelete={handleDeleteUser}
                  onAssign={openAssignDialog}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <UserEditDialog
          isOpen={isUserDialogOpen}
          onClose={() => setIsUserDialogOpen(false)}
          onSave={handleSaveUser}
          editingUser={editingUser}
          classes={classes}
          onAddClass={handleAddClass}
        />

        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign to {assigningUser?.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {assigningUser?.role === "student" && (
                <>
                  <Select onValueChange={setSelectedTeacher}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select onValueChange={setSelectedParent}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a parent" />
                    </SelectTrigger>
                    <SelectContent>
                      {parents.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </>
              )}
              {(assigningUser?.role === "teacher" ||
                assigningUser?.role === "parent") && (
                <Select onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleAssign}>Assign</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminUserManagement;
