const users = [
  {
    id: 1,
    name: "alexrivera",
    email: "dddfds",
    role: "Pro Athlete",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=1",
    route: "/userdata?id=1",
  },
  {
    id: 2,
    name: "sarahchen",
    email: "dddfds",
    role: "AI Trainer",
    status: "Away",
    avatar: "https://i.pravatar.cc/150?img=2",
    route: "/userdata?id=2",
  },
  {
    id: 3,
    name: "marcusknight",
    email: "dddfds",
    role: "Elite Member",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=3",
    route: "/userdata?id=3",
  },
  {
    id: 4,
    name: "elenarodriguez",
    email: "dddfds",
    role: "Data Scientist",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=4",
    route: "/userdata?id=4",
  },
  {
    id: 5,
    name: "jordansmith",
    email: "dddfds",
    role: "General User",
    status: "Away",
    avatar: "https://i.pravatar.cc/150?img=5",
    route: "/userdata?id=5",
  },
  {
    id: 6,
    name: "priyapatel",
    email: "dddfds",
    role: "Nutritionist",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=6",
    route: "/userdata?id=6",
  },
  {
    id: 7,
    name: "liamocdonald",
    email: "dddfds",
    role: "Fitness Coach",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=7",
    route: "/userdata?id=7",
  },
  {
    id: 8,
    name: "sophialee",
    email: "dddfds",
    role: "Yoga Instructor",
    status: "Away",
    avatar: "https://i.pravatar.cc/150?img=8",
    route: "/userdata?id=8",
  },
  {
    id: 9,
    name: "marcusknight",
    email: "dddfds",
    role: "CrossFit Trainer",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=9",
    route: "/userdata?id=9",
  },
  {
    id: 10,
    name: "miadavis",
    email: "dddfds",
    role: "Pilates Instructor",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=10",
    route: "/userdata?id=10",
  },
];

export const activeUsers = users.filter(
  (user) => user.status === "Active"
);
export const addUser = (
  name,
  role,
  status,
  avatar,
  email
) => {
  const newUser = {
    id: users.length + 1,
    name,
    email,
    role,
    status,
    avatar,
    route: `/userdata?id=${users.length + 1}`,
  };

  users.push(newUser);
  return newUser;
};

export default users;

//done