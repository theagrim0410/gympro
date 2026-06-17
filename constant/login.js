export const users = [
  { username: "agrim", password: "222" , role: "user"},
  { username: "oaoa", password: "e3e" , role: "user"},
  { username: "admin", password: "1234", role: "admin" }
];

// function to add new user
export function addUser(username, password, role = "user") {
  users.push({ username, password, role });
}