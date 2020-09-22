const vdom = h("div", { class: "blue" }, [
  h("p", null, "Hello Earth World, this Virtual DOM is cool as blue here!"),
]);

const vdom2 = h("div", { class: "red" }, [
  h("p", null, "Hello Mars World, this Virtual DOM is hot as red here!"),
]);

mount(vdom, document.getElementById("app"));

const visitMars = () => {
  // Virtual DOM Manipulation
  patch(vdom, vdom2);

  // Real DOM Manipulation
  document.getElementById("planet-earth").style.display = "none";
  document.getElementById("planet-mars").style.display = "block";
};
