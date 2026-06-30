export const users = [
  {
    username: "alexrivera",
    password: "1234",
    role: "user",
    id: 1,
  },
  {
    username: "sarahchen",
    password: "1234",
    role: "user",
    id: 2,
  },
  {
    username: "marcusknight",
    password: "1234",
    role: "user",
    id: 3,
  },
  {
    username: "elenarodriguez",
    password: "1234",
    role: "user",
    id: 4,
  },
  {
    username: "jordansmith",
    password: "1234",
    role: "user",
    id: 5,
  },
  {
    username: "priyapatel",
    password: "1234",
    role: "user",
    id: 6,
  },
  {
    username: "liamoconnor",
    password: "1234",
    role: "user",
    id: 7,
  },
  {
    username: "sophialee",
    password: "1234",
    role: "user",
    id: 8,
  },
  {
    username: "ethanbrown",
    password: "1234",
    role: "user",
    id: 9,
  },
  {
    username: "miadavis",
    password: "1234",
    role: "user",
    id: 10,
  },
  {
    username: "admin",
    password: "1234",
    role: "admin",
    id: 11,
  },
];

// function to add new user
export function addUser(username, password, role = "user") {
  const newUser = { username, password, role, id: users.length + 1 };
  users.push(newUser);
  return newUser;
}

//done