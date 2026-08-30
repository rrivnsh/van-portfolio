// Utility Functions
// Reusable helper functions for the application

export const cn = (...classes: (string | boolean | undefined | null)[]) => {
  return classes.filter(Boolean).join(" ");
};
