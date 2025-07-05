export const isActive = (prefix: string, target: string) => {
  return target.startsWith(prefix);
};

export const isActiveSubNav = (prefix: string, target: string) => {
  return target === prefix;
};
