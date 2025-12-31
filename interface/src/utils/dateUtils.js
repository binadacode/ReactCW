export const getAddedDate = (added) => {
  return new Date(`${added.month} ${added.day}, ${added.year}`);
};
