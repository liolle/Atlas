export const CurateError = (error: string) => {
  if (error.includes("duplicate")) return "Already exist";
  return error;
};
