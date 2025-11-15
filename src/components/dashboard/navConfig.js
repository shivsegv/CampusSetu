import {
  Squares2X2Icon,
  ClipboardDocumentCheckIcon,
  UserCircleIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

export const dashboardNavConfig = {
  student: [
    { title: "Dashboard", icon: Squares2X2Icon, path: "/student/dashboard" },
    {
      title: "Interview Hub",
      icon: CalendarDaysIcon,
      path: "/student/interview-hub",
    },
    {
      title: "Applications",
      icon: ClipboardDocumentCheckIcon,
      path: "/student/applications",
    },
    { title: "Profile", icon: UserCircleIcon, path: "/student/profile" },
  ],
  recruiter: [
    { title: "Dashboard", icon: Squares2X2Icon, path: "/recruiter/dashboard" },
    {
      title: "Interview Hub",
      icon: CalendarDaysIcon,
      path: "/recruiter/interview-hub",
    },
    { title: "Post Job", icon: BriefcaseIcon, path: "/recruiter/post-job" },
    {
      title: "Job Listings",
      icon: ClipboardDocumentCheckIcon,
      path: "/recruiter/jobs",
    },
  ],
  placement: [
    { title: "Dashboard", icon: Squares2X2Icon, path: "/placement/dashboard" },
    {
      title: "Job Approvals",
      icon: ClipboardDocumentCheckIcon,
      path: "/placement/approvals",
    },
    {
      title: "Manage Students",
      icon: UserCircleIcon,
      path: "/placement/students",
    },
    { title: "Analytics", icon: ChartBarIcon, path: "/analytics" },
  ],
};

export const getDashboardNav = (role) => {
  if (!role) return dashboardNavConfig.student;
  const key = role.toLowerCase();
  return dashboardNavConfig[key] || dashboardNavConfig.student;
};
