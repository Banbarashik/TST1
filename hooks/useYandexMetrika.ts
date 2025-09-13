import { YandexMetrikaHitOptions } from "@/types";

import { YM_COUNTER_ID } from "@/constants";

declare const ym: (...params: unknown[]) => void;

const enabled = !!(process.env.NODE_ENV === "production");

const reachGoal = (
  target: string,
  params?: unknown,
  callback?: () => void,
  ctx?: unknown,
) => {
  if (enabled) {
    ym(YM_COUNTER_ID, "reachGoal", target, params, callback, ctx);
  } else {
    console.log(`%c[YandexMetrika](reachGoal)`, `color: orange`, target);
  }
};

const useYandexMetrika = () => {
  const hit = (url?: string, options?: YandexMetrikaHitOptions) => {
    if (enabled) {
      ym(YM_COUNTER_ID, "hit", url, options);
    } else {
      console.log(`%c[YandexMetrika](hit)`, `color: orange`, url);
    }
  };

  return { hit, reachGoal };
};

export default useYandexMetrika;
