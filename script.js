/**
 * Basic Vue 3 like Virtual DOM Implementation
 */

const h = (tag, props, children) => ({ tag, props, children });

function mount(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.tag));
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
}

const vdom = h("div", { class: "red" }, [h("span", null, "Hello Earth")]);

mount(vdom, document.getElementById("app"));

function patch(n1, n2) {}

const vdom2 = h("div", { class: "green" }, [h("span", null, "Hello Mars")]);

patch(vdom, vdom2);
