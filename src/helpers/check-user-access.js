export function checkUserAccess(id, currentUser) {
  return id !== currentUser?._id || currentUser?.roles.includes("ADMIN");
}
