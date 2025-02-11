import Cookie from "js-cookie";

export const storage = {
  localStorage: {
    set: <Item>(key: string, value: Item): void =>
      localStorage?.setItem(key, JSON.stringify(value)),
    get: <Item>(key: string): Item =>
      JSON?.parse(localStorage?.getItem(key) || '""') || undefined,
    remove: (key: string): void => localStorage?.removeItem(key),
    has: (key: string): boolean => localStorage.getItem(key) !== null,
  },
  cookieStorage: {
    set: <Item>(
      key: string,
      value: Item,
      options?: (typeof Cookie)["attributes"]
    ) => Cookie?.set(key, JSON.stringify(value), options),
    get: (key: string) => JSON.parse(Cookie?.get(key) || '""') || undefined,
    remove: (key: string, options?: (typeof Cookie)["attributes"]): void =>
      Cookie.remove(key, options),
    has: (key: string): boolean => Boolean(Cookie.get(key)),
  },
  sessionStorage: {
    set: <Item>(key: string, value: Item): void =>
      sessionStorage?.setItem(key, JSON.stringify(value)),
    get: <Item>(key: string): Item | undefined =>
      JSON.parse(sessionStorage?.getItem(key) || '""') || undefined,
    remove: (key: string): void => sessionStorage?.removeItem(key),
    has: (key: string): boolean => sessionStorage.getItem(key) !== null,
  },
  // indexedDB: {

  // }
};
