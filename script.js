/**
 * Basic Virtual DOM Implementation
 */

const h = (tag, props, children) => ({ tag, props, children });

const mount = (vnode, container) => {
  const el = document.createElement(vnode.tag);
  if (vnode.props) {
    for (const key in vnode.props) {
      if (vnode.props.hasOwnProperty(key)) {
        const value = vnode.props[key];
        el.setAttribute(key, value);
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

const vdom = h("div", { class: "red" }, [h("span", null, "hello")]);

mount(vdom, document.getElementById("app"));
