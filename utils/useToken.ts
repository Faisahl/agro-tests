export default function useToken() {
  // read token from cookies
  const fs = require("fs");
  const raw = fs.readFileSync("pwt/.auth/user.json", "utf-8");
  const storage = JSON.parse(raw);
  const jwt = storage.cookies.find((c: any) => c.name === "strapi_jwt")?.value;
  return jwt;
}
