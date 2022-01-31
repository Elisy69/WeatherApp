export function convertTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const formattedTime = hours + ":" + minutes.slice(-2);

  return formattedTime;
}

export function convertDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });

  const formattedDate = `${day} ${month}`;

  return formattedDate;
}
