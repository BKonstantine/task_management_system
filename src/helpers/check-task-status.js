import { colors } from "@/constants/colors";

const taskStatus = {
  DRAFT: { text: "Черновик", color: colors.bronze },
  IN_PROCESS: { text: "В работе", color: colors.bronze },
  COMPLETED: { text: "Завершена", color: colors.primary },
  TESTING: { text: "Тестирование", color: colors.bronze },
  TESTING_DONE: { text: "Выполнена", color: colors.primary },
  CLOSED: { text: "Закрыта", color: colors.primary },
  DELETED: { text: "Удалена", color: colors.error },
};

export function checkTaskStatus(status) {
  return taskStatus[status];
}
