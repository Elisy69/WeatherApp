import { format, fromUnixTime } from "date-fns";

export function convertTime(timestamp) {
  const fromUnix = fromUnixTime(timestamp);
  const formattedTime = format(fromUnix, "p");
  return formattedTime;
}

export function convertDate(timestamp) {
  const fromUnix = fromUnixTime(timestamp);
  const formattedDate = format(fromUnix, "d LLL");
  return formattedDate;
}
