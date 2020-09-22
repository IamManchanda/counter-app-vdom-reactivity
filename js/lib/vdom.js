/**
 * Basic Vue 3 like Virtual DOM Implementation
 */

const h = (tag, props, children) => ({ tag, props, children });

const mount = (vnode, container) => {
  const el = (vnode.el = document.createElement(vnode.tag));

  if (vnode.props) {
    for (const key in vnode.props) {
      if (vnode.props.hasOwnProperty(key)) {
        const value = vnode.props[key];
        if (key.startsWith("on")) {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }
  }

  if (vnode.children) {
    if (typeof vnode.children === "string") {
      el.textContent = vnode.children;
    } else {
      vnode.children.forEach((child) => {
        mount(child, el);
      });
    }
  }
  container.appendChild(el);
};

const patch = (n1, n2) => {
  if (n1.tag === n2.tag) {
    const el = (n2.el = n1.el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    for (const key in newProps) {
      if (newProps.hasOwnProperty(key)) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];
        if (newValue !== oldValue) {
          el.setAttribute(key, newValue);
        }
      }
    }

    for (const key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    const oldChildren = n1.children;
    const newChildren = n2.children;

    if (typeof newChildren === "string") {
      if (typeof oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.textContent = newChildren;
        }
      } else {
        el.textContent = oldChildren;
      }
    } else {
      if (typeof oldChildren === "string") {
        el.innerHTML = "";
        newChildren.forEach((child) => {
          mount(child, el);
        });
      } else {
        const commonLength = Math.min(oldChildren.length, newChildren.length);
        for (let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(oldChildren.length).forEach((child) => {
            mount(child, el);
          });
        } else if (newChildren.length < oldChildren.length) {
          oldChildren.slice(newChildren.length).forEach((child) => {
            el.removeChild(child);
          });
        }
      }
    }
  } else {
  }
};
