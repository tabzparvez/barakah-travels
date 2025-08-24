
// Simple plaintext check for demo (replace with hash in production)
export async function authenticate(username: string, password: string) {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;
  return username === adminUser && password === adminPass;
}
