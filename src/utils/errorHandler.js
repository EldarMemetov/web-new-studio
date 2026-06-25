export const handleError = (error) => {
  if (error instanceof Error) {
    return error;
  }
  return new Error('Network error. Please check your connection.');
};
