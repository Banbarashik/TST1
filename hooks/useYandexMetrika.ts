import { YandexMetrikaHitOptions, YandexMetrikaMethod } from "@/types";

declare const ym: (
  id: number,
  method: YandexMetrikaMethod,
  ...params: unknown[]
) => void;

const enabled = !!(process.env.NODE_ENV === "production");

const useYandexMetrika = (id: number) => {
  const hit = (url?: string, options?: YandexMetrikaHitOptions) => {
    if (enabled) {
      ym(id, "hit", url, options);
    } else {
      console.log(`%c[YandexMetrika](hit)`, `color: orange`, url);
    }
  };

  return { hit };
};

export default useYandexMetrika;
