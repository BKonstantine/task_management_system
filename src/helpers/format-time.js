function getNounEnding(number, endings) {
  const cases = [2, 0, 1, 1, 1, 2];
  return endings[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[Math.min(number % 10, 5)]
  ];
}

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
    const endings = ["минуту", "минуты", "минут"];
    const ending = getNounEnding(minutes, endings);
    return `${minutes} ${ending} назад`;
  } else if (minutes < 60) {
    const endings = ["минуту", "минуты", "минут"];
    const ending = getNounEnding(minutes, endings);
    return `${minutes} ${ending} назад`;
  } else if (hours === 1 && now.getDate() === time.getDate()) {
    return "1 час назад";
  } else if (hours < 5 && now.getDate() === time.getDate()) {
    const endings = ["час", "часа", "часов"];
    const ending = getNounEnding(hours, endings);
    return `${hours} ${ending} назад`;
  } else if (hours < 24 && now.getDate() === time.getDate()) {
    const endings = ["час", "часа", "часов"];
    const ending = getNounEnding(hours, endings);
    return `${hours} ${ending} назад`;
  } else if (days === 1) {
    return (
      "Вчера в " +
      time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  } else if (days < 365) {
    return time.toLocaleDateString([], {
      day: "numeric",
      month: "long",
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
