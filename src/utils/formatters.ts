export const msToDuration = (ms: number | undefined): string => {
  if (!ms) return "00:00";
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secondsStr = seconds < 10 ? `0${seconds}` : seconds;

  return `${
    hoursStr === "00" ? "" : `${hoursStr}:`
  }${minutesStr}:${secondsStr}`;
};

export const parseBreakLinesToHtml = (text: string | undefined) =>
  text ? text.replace(/\n/g, "<br />") : "";

export const parseUrlToHtml = (text: string | undefined) =>
  text
    ? text.replace(
        /(https?:\/\/[^\s]+)/g,
        "<a target='_blank' href='$1'>$1</a>",
      )
    : "";

export const parseTextToHtml = (text: string | undefined) => {
  return parseBreakLinesToHtml(parseUrlToHtml(text));
};
