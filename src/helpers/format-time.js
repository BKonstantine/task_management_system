export function formatTime(dateString) {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const now = new Date();

  const timeDiff = now.getTime() - date.getTime();
  const seconds = timeDiff / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  let result = "";

  if (days >= 1) {
    if (days >= 2) {
      result =
        date.toLocaleString("ru", { month: "short", day: "numeric" }) +
        " в " +
        date.toLocaleTimeString("ru", { hour: "numeric", minute: "numeric" });
    } else {
      result =
        "Вчера в " +
        date.toLocaleTimeString("ru", { hour: "numeric", minute: "numeric" });
    }
  } else {
    if (hours >= 1) {
      result =
        Math.ceil(hours) +
        " час" +
        getEnding(Math.ceil(hours), ["", "а", "ов"]) +
        " назад";
    } else {
      result =
        Math.ceil(minutes) +
        " минут" +
        getEnding(Math.ceil(minutes), ["а", "ы", ""]) +
        " назад";
    }
  }

  return result;
}

function getEnding(value, endings) {
  const mod = value % 10;

  if (mod === 1 && value !== 11) {
    return endings[0];
  } else if (mod >= 2 && mod <= 4 && (value < 10 || value >= 20)) {
    return endings[1];
  } else {
    return endings[2];
  }
}
