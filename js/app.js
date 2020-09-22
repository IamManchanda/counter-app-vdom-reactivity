const CounterApp = {
  data: reactive({
    count: 0,
  }),
  render() {
    return h("div", null, [
      h("p", { class: "button-group" }, [
        h(
          "button",
          {
            onClick: () => (this.data.count += 1),
          },
          `Add item`,
        ),
        h(
          "button",
          {
            onClick: () => this.data.count > 0 && (this.data.count -= 1),
          },
          `Remove item`,
        ),
      ]),
      h("p", null, `Current Count: ${this.data.count}`),
    ]);
  },
};

const mountApp = (component, container) => {
  let isMounted = false;
  let prevVdom;
  effect(() => {
    if (!isMounted) {
      prevVdom = component.render();
      mount(prevVdom, container);
      isMounted = true;
    } else {
      const newVdom = component.render();
      patch(prevVdom, newVdom);
      prevVdom = newVdom;
    }
  });
};

mountApp(CounterApp, document.getElementById("app"));
