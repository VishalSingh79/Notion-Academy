// import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 3,
    name: "My Courses",
    path: "/dashboard/my-profile/my-courses",
    type: "Instructor",
    icon: "VscVm",
  },
  {
    id: 4,
    name: "Add Course",
    path: "/dashboard/my-profile/add-course",
    type: "Instructor",
    icon: "VscAdd",
  },
  {
    id: 5,
    name: "Enrolled Courses",
    path: "/dashboard/my-profile/enrolled-courses",
    type: "Student",
    icon: "VscMortarBoard",
  },
  {
    id: 6,
    name: "Wishlist",
    path: "/dashboard/my-profile/wishlist-courses",
    type: "Student",
    icon: "VscSave",
  },
];
