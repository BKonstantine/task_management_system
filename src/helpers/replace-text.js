export function replaceText(text) {
  return text
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function abbreviateName(fullName) {
  if (!fullName) {
    return "";
  }
  const nameParts = fullName.split(" ");
  const surname = nameParts[0];

  if (nameParts.length === 1) {
    return surname;
  }

  let abbreviation = nameParts[1].charAt(0).toUpperCase() + ".";

  if (nameParts.length > 2) {
    abbreviation += nameParts[2].charAt(0).toUpperCase() + ".";
  }

  return surname + " " + abbreviation;
}
