export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "Guest" | "Staff" | "Admin";
  registeredOn: string;
  status: "Active" | "Inactive";
  image: string;
}

export const usersData: User[] = [
  {
    id: "#USR1256",
    name: "Rohit Sharma",
    email: "rohit@gmail.com",
    phone: "+91 98765 43210",
    role: "Guest",
    registeredOn: "May 31, 2024",
    status: "Active",
    image: "/images/users/user-1.jpg",
  },
  {
    id: "#USR1255",
    name: "Ananya Patel",
    email: "ananya@gmail.com",
    phone: "+91 91234 56789",
    role: "Guest",
    registeredOn: "May 31, 2024",
    status: "Active",
    image: "/images/users/user-2.jpg",
  },
  {
    id: "#USR1254",
    name: "Vikram Singh",
    email: "vikram@gmail.com",
    phone: "+91 99887 66554",
    role: "Guest",
    registeredOn: "May 30, 2024",
    status: "Active",
    image: "/images/users/user-3.jpg",
  },
  {
    id: "#USR1253",
    name: "Neha Gupta",
    email: "neha@gmail.com",
    phone: "+91 98712 34567",
    role: "Guest",
    registeredOn: "May 30, 2024",
    status: "Active",
    image: "/images/users/user-4.jpg",
  },
  {
    id: "#USR1252",
    name: "Arjun Mehta",
    email: "arjun@gmail.com",
    phone: "+91 90909 09090",
    role: "Guest",
    registeredOn: "May 29, 2024",
    status: "Active",
    image: "/images/users/user-5.jpg",
  },
  {
    id: "#USR1251",
    name: "Sneha Iyer",
    email: "sneha@gmail.com",
    phone: "+91 88223 34455",
    role: "Guest",
    registeredOn: "May 29, 2024",
    status: "Inactive",
    image: "/images/users/user-6.jpg",
  },
  {
    id: "#USR1250",
    name: "Karan Verma",
    email: "karan@gmail.com",
    phone: "+91 77665 44332",
    role: "Guest",
    registeredOn: "May 28, 2024",
    status: "Active",
    image: "/images/users/user-7.jpg",
  },
  {
    id: "#USR1249",
    name: "Pooja Nair",
    email: "pooja@gmail.com",
    phone: "+91 93344 55667",
    role: "Guest",
    registeredOn: "May 28, 2024",
    status: "Active",
    image: "/images/users/user-8.jpg",
  },
  {
    id: "#USR1248",
    name: "Manish Yadav",
    email: "manish@gmail.com",
    phone: "+91 99991 23456",
    role: "Staff",
    registeredOn: "May 27, 2024",
    status: "Active",
    image: "/images/users/user-9.jpg",
  },
  {
    id: "#USR1247",
    name: "Riya Kapoor",
    email: "riya@gmail.com",
    phone: "+91 88888 77777",
    role: "Staff",
    registeredOn: "May 26, 2024",
    status: "Active",
    image: "/images/users/user-10.jpg",
  },
];