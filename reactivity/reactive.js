/**
 * Modern Reactivity System in Vanilla JavaScript
 * (With ES6+ JavaScript - Proxy & Reflect)
 * Vue.js version 3 like implementation
 */

let activeEffect = null;
const targetMap = new WeakMap();

const track = (target, key) => {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
      dep.add(activeEffect);
    }
  }
};

const trigger = (target, key) => {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (dep) {
    dep.forEach((effect) => {
      effect();
    });
  }
};

const reactive = (target) => {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if (result && oldValue != value) {
        trigger(target, key);
      }
      return result;
    },
  };
  return new Proxy(target, handler);
};

const ref = (raw) => {
  const r = {
    get value() {
      track(r, "value");
      return raw;
    },
    set value(newVal) {
      raw = newVal;
      trigger(r, "value");
    },
  };
  return r;
};

const effect = (eff) => {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
};
