function visitMars() {
  // Virtual DOM Manipulation
  patch(vdom, vdom2);

  // Real DOM Manipulation
  document.getElementById("planet-earth").style.display = "none";
  document.getElementById("planet-mars").style.display = "block";
}
