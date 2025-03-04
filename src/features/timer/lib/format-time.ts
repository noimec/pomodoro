export const formatTime = (time: number) => {
  const hours = Math.round(time / 60);
  const minutes = time % 60;

  return `${hours}:${minutes}`;
};
