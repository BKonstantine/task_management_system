import { colors } from "@/constants/colors";

const userStatus = {
  ACTIVE: { text: "Активен", color: colors.primary },
  BLOCKED: { text: "Заблокирован", color: colors.disabled },
  DELETED: { text: "Удален", color: colors.error },
};

export function checkUserStatus(status) {
  return userStatus[status];
}
