globalThis.minitelWaitingList = 0;

export default async (message) => {
  const { key, num } = JSON.parse(message);
  if (key === "minitel_launch") return { num };
  return {
    num: -1,
  };
};
