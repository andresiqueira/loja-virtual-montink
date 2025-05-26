import { useCallback } from "react";

type ExpiringValue<T> = {
  value: T;
  expiry: number;
};

export const useExpiringLocalStorage = () => {
  const setItem = useCallback(
    <T>(key: string, value: T, ttlMinutes: number) => {
      const now = new Date();
      const item: ExpiringValue<T> = {
        value,
        expiry: now.getTime() + ttlMinutes * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(item));

      setTimeout(() => {
        localStorage.removeItem(key);
      }, ttlMinutes * 60 * 1000);
    },
    []
  );

  const getItem = useCallback(<T>(key: string): T | null => {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
      const item: ExpiringValue<T> = JSON.parse(itemStr);
      const now = new Date();

      if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
      }

      return item.value;
    } catch {
      localStorage.removeItem(key);
      return null;
    }
  }, []);

  const removeItem = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return { setItem, getItem, removeItem };
};
