/**
 * Mock data for parent functionality
 */

import type {
  Child,
  Teacher,
  Course,
  Enrollment,
  Message,
  ChildPerformance,
  Announcement,
  SchoolEvent,
  ParentDashboardData,
} from "@/types/index";

// Mock Teachers
export const mockTeachers: Teacher[] = [
  {
    id: "teacher-1",
    name: "Ms. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "123-456-1111", // ✅ added
    role: "teacher", // ✅ added
    subject: "Mathematics",
    department: "Mathematics",
    contactHours: "9:00 AM - 3:00 PM",
    studentIds: [], // ✅ already included
  },
  {
    id: "teacher-2",
    name: "Mr. David Wilson",
    email: "david.wilson@school.edu",
    phone: "123-456-2222", // ✅ added
    role: "teacher", // ✅ added
    subject: "English Literature",
    department: "English",
    contactHours: "8:00 AM - 4:00 PM",
    studentIds: [], // ✅ added
  },
  {
    id: "teacher-3",
    name: "Dr. Emily Chen",
    email: "emily.chen@school.edu",
    phone: "123-456-3333", // ✅ added
    role: "teacher", // ✅ added
    subject: "Science",
    department: "Science",
    contactHours: "10:00 AM - 4:00 PM",
    studentIds: [], // ✅ added
  },
  {
    id: "teacher-4",
    name: "Mr. Robert Martinez",
    email: "robert.martinez@school.edu",
    phone: "123-456-4444", // ✅ added
    role: "teacher", // ✅ added
    subject: "History",
    department: "Social Studies",
    contactHours: "9:00 AM - 3:30 PM",
    studentIds: [], // ✅ added
  },
];

// Mock Courses
export const mockCourses: Course[] = [
  {
    id: "course-1",
    name: "Algebra II",
    subject: "Mathematics",
    teacher: mockTeachers[0],
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "10:00 AM - 11:00 AM",
      room: "Room 201",
    },
    description: "Advanced algebra concepts and problem solving",
    credits: 3,
  },
  {
    id: "course-2",
    name: "American Literature",
    subject: "English",
    teacher: mockTeachers[1],
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "9:00 AM - 10:30 AM",
      room: "Room 105",
    },
    description: "Study of American literary works and authors",
    credits: 4,
  },
  {
    id: "course-3",
    name: "Biology",
    subject: "Science",
    teacher: mockTeachers[2],
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      time: "1:00 PM - 2:00 PM",
      room: "Lab 301",
    },
    description: "Introduction to biological sciences",
    credits: 4,
  },
  {
    id: "course-4",
    name: "World History",
    subject: "History",
    teacher: mockTeachers[3],
    schedule: {
      days: ["Tuesday", "Thursday"],
      time: "11:00 AM - 12:30 PM",
      room: "Room 150",
    },
    description: "Survey of world civilizations and cultures",
    credits: 3,
  },
];

// Mock Children
export const mockChildren: Child[] = [
  {
    id: "child-1",
    name: "Alex Johnson",
    email: "alex.johnson@student.school.edu",
    phone: "111-222-3333", // ✅ added
    role: "student", // ✅ added
    grade: "10th Grade",
    class: "10-A",
    enrollmentDate: "2024-08-15",
    status: "Active",
    parentId: "parent-1",
    teacherIds: [], // ✅ added
  },
  {
    id: "child-2",
    name: "Emma Johnson",
    email: "emma.johnson@student.school.edu",
    phone: "111-222-4444", // ✅ added
    role: "student", // ✅ added
    grade: "8th Grade",
    class: "8-B",
    enrollmentDate: "2024-08-15",
    status: "Active",
    parentId: "parent-1",
    teacherIds: [], // ✅ added
  },
];

// Mock Enrollments
export const mockEnrollments: Enrollment[] = [
  {
    id: "enrollment-1",
    childId: "child-1",
    courseId: "course-1",
    enrollmentDate: "2024-08-15",
    status: "Active",
    currentGrade: "B+",
  },
  {
    id: "enrollment-2",
    childId: "child-1",
    courseId: "course-2",
    enrollmentDate: "2024-08-15",
    status: "Active",
    currentGrade: "A-",
  },
  {
    id: "enrollment-3",
    childId: "child-1",
    courseId: "course-3",
    enrollmentDate: "2024-08-15",
    status: "Active",
    currentGrade: "A",
  },
  {
    id: "enrollment-4",
    childId: "child-2",
    courseId: "course-4",
    enrollmentDate: "2024-08-15",
    status: "Active",
    currentGrade: "B",
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "msg-1",
    senderId: "parent-1",
    receiverId: "teacher-1",
    senderName: "John Johnson",
    receiverName: "Ms. Sarah Johnson",
    subject: "Question about Alex's Math Progress",
    content:
      "Hi Ms. Johnson, I wanted to discuss Alex's recent performance in algebra. Could we schedule a meeting?",
    timestamp: "2024-12-30T10:30:00Z",
    isRead: false,
    threadId: "thread-1",
  },
  {
    id: "msg-2",
    senderId: "teacher-1",
    receiverId: "parent-1",
    senderName: "Ms. Sarah Johnson",
    receiverName: "John Johnson",
    subject: "Re: Question about Alex's Math Progress",
    content:
      "Hello Mr. Johnson, I'd be happy to discuss Alex's progress. I'm available this Thursday after 3 PM. Alex is doing well overall but could benefit from extra practice with quadratic equations.",
    timestamp: "2024-12-30T14:15:00Z",
    isRead: true,
    threadId: "thread-1",
  },
];

// Mock Performance Data
export const mockChildrenPerformance: ChildPerformance[] = [
  {
    childId: "child-1",
    overallGrade: "B+",
    gpa: 3.4,
    totalHomeworks: 25,
    completedHomeworks: 22,
    pendingHomeworks: 3,
    averageTestScore: 85,
    recentTests: [
      {
        testId: "test-1",
        score: 88,
        correctAnswers: 22,
        totalQuestions: 25,
        completedOn: "2024-12-28",
      },
      {
        testId: "test-2",
        score: 82,
        correctAnswers: 41,
        totalQuestions: 50,
        completedOn: "2024-12-25",
      },
    ],
    recentHomeworks: [
      {
        id: "hw-1",
        title: "Quadratic Equations Practice",
        subject: "Mathematics",
        description: "Solve 15 quadratic equation problems",
        dueDate: "2024-12-31",
        status: "Pending",
      },
      {
        id: "hw-2",
        title: "Literature Essay",
        subject: "English",
        description: "Write a 500-word essay on American authors",
        dueDate: "2024-12-29",
        status: "Graded",
        grade: "A-",
      },
    ],
    attendance: {
      totalDays: 85,
      presentDays: 82,
      absentDays: 2,
      tardyDays: 1,
    },
  },
  {
    childId: "child-2",
    overallGrade: "A-",
    gpa: 3.7,
    totalHomeworks: 20,
    completedHomeworks: 19,
    pendingHomeworks: 1,
    averageTestScore: 91,
    recentTests: [
      {
        testId: "test-3",
        score: 94,
        correctAnswers: 47,
        totalQuestions: 50,
        completedOn: "2024-12-27",
      },
    ],
    recentHomeworks: [
      {
        id: "hw-3",
        title: "Ancient Civilizations Report",
        subject: "History",
        description: "Research report on Roman Empire",
        dueDate: "2025-01-02",
        status: "Pending",
      },
    ],
    attendance: {
      totalDays: 85,
      presentDays: 84,
      absentDays: 1,
      tardyDays: 0,
    },
  },
];

// Mock Announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: "ann-1",
    title: "Parent-Teacher Conference Scheduling Open",
    content:
      "Parent-teacher conferences for the fall semester are now open for scheduling. Please visit the school portal to book your preferred time slot.",
    author: "Principal Smith",
    authorRole: "admin",
    targetAudience: "parents",
    createdAt: "2024-12-28T09:00:00Z",
    isImportant: true,
  },
  {
    id: "ann-2",
    title: "Winter Break Homework Reminder",
    content:
      "Please remind your children to complete their winter break assignments. All assignments are due on January 3rd, 2025.",
    author: "Ms. Sarah Johnson",
    authorRole: "teacher",
    targetAudience: "parents",
    createdAt: "2024-12-27T15:30:00Z",
    isImportant: false,
  },
];

// Mock School Events
export const mockSchoolEvents: SchoolEvent[] = [
  {
    id: "event-1",
    title: "Winter Concert",
    description: "Annual winter music concert featuring all grade levels",
    date: "2025-01-15",
    time: "7:00 PM",
    location: "School Auditorium",
    type: "performance",
    isAllDay: false,
    targetAudience: "all",
  },
  {
    id: "event-2",
    title: "Parent-Teacher Conferences",
    description:
      "Individual meetings with teachers to discuss student progress",
    date: "2025-01-20",
    time: "1:00 PM - 8:00 PM",
    location: "Various Classrooms",
    type: "meeting",
    isAllDay: false,
    targetAudience: "parents",
  },
];

// Mock Dashboard Data
export const mockParentDashboardData: ParentDashboardData = {
  children: mockChildren,
  totalChildren: 2,
  activeChildren: 2,
  unreadMessages: 1,
  upcomingEvents: mockSchoolEvents,
  recentAnnouncements: mockAnnouncements,
  childrenPerformance: mockChildrenPerformance,
};
