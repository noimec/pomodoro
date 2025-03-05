export const formatTime = (time: number) => {
  const hours = Math.round(time / 60);
  const minutes = time % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes}`;
};
