export const clearLocalStorage = () => {
  const keysToKeep = [
    "favorites"
];

  Object.keys(localStorage).forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });
};
