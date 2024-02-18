export const removeItemByProp = (arr: any[], prop: string, find: string) => {
  return arr.filter((a) => a[prop] !== find);
};

export const removeItemByIdx = (arr: any[], idx: number) => {
  return arr.filter((_, idxA) => idxA !== idx);
};
