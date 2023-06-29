export function formatTime(time_str) {
  const now = new Date();
  const time = new Date(time_str);

  if (!time_str) {
    return "";
  }

  const diff = now - time;
  const minutes = Math.round(diff / 60000);
  const hours = Math.round(diff / 3600000);
  const days = Math.round(diff / 86400000);

  if (minutes <= 1) {
    return "1 минуту назад";
  } else if (minutes < 5) {
    return `${minutes} минуты назад`;
  } else if (minutes < 60) {
    return `${minutes} минут назад`;
  } else if (hours === 1 && now.getDate() === time.getDate()) {
    return "1 час назад";
  } else if (hours < 5 && now.getDate() === time.getDate()) {
    return `${hours} часа назад`;
  } else if (hours < 24 && now.getDate() === time.getDate()) {
    return `${hours} часов назад`;
  } else if (days === 1) {
    return (
      "Вчера в " +
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } else if (days < 365) {
    return time.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return time.toLocaleDateString([], {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}
