import { formatTime } from "./format-time";
import { abbreviateName } from "./replace-text";

export const textInfo = (userName, text, date) => {
  if (!userName && !date) {
    return "";
  }
  return `${abbreviateName(userName)} ${text} ${formatTime(date)}`;
};
