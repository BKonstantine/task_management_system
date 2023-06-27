import { colors } from "@/constants/colors";

const userStatus = {
  ACTIVE: { text: "Активен", color: colors.primary },
  BLOCKED: { text: "Не активен", color: colors.disabled },
  DELETED: { text: "Удалена", color: colors.error },
};

export function checkUserStatus(status) {
  return userStatus[status];
}
