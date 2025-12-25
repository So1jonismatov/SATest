import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { AdminUserSchema } from "@/lib/zod-schemas/admin-schema";
import type { User } from "@/types/index";
import { Plus } from "lucide-react";

interface UserEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (values: z.infer<typeof AdminUserSchema>) => void;
  editingUser: User | null;
  classes: string[];
  onAddClass: (className: string) => void;
}

export const UserEditDialog: React.FC<UserEditDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingUser,
  classes,
  onAddClass,
}) => {
  const [newClassName, setNewClassName] = useState("");

  const form = useForm<z.infer<typeof AdminUserSchema>>({
    resolver: zodResolver(AdminUserSchema),
  });

  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        form.reset(editingUser);
      } else {
        form.reset({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "student",
          class: "",
        });
      }
    }
  }, [isOpen, editingUser, form]);

  const handleAddClass = () => {
    if (newClassName && !classes.includes(newClassName)) {
      onAddClass(newClassName);
      setNewClassName("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{editingUser ? "Edit" : "Add"} User</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSave)} className="space-y-4">
          <Select
            onValueChange={(value) => form.setValue("role", value as any)}
            defaultValue={form.getValues("role")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Input {...form.register("name")} placeholder="Full Name" />
          {form.formState.errors.name && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.name.message}
            </p>
          )}
          <Input {...form.register("email")} placeholder="Email (Optional)" />
          {form.formState.errors.email && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.email.message}
            </p>
          )}
          <Input {...form.register("phone")} placeholder="Phone" />
          {form.formState.errors.phone && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.phone.message}
            </p>
          )}
          {!editingUser && (
            <Input
              {...form.register("password")}
              type="password"
              placeholder="Password"
            />
          )}
          {form.formState.errors.password && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.password.message}
            </p>
          )}
          {form.watch("role") === "student" && (
            <>
              <Label>Class</Label>
              <div className="flex gap-2">
                <Select
                  onValueChange={(value) => form.setValue("class", value)}
                  defaultValue={form.getValues("class")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Input
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Or add new class"
                />
                <Button type="button" onClick={handleAddClass}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {form.formState.errors.class && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.class.message}
                </p>
              )}
            </>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {editingUser ? "Save Changes" : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
