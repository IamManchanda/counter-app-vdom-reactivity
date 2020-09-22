const CounterApp = {
  data: reactive({
    count: 0,
  }),
  render() {
    /*
      <template>
        <div>
          <div class="button-container">
            <button class="btn btn-success btn-lg" @click="...logic">Increment</button>
            <button class="btn btn-danger btn-lg" :class="...logic" @click="...logic">
              Decrement
            </button>
          </div>
          <h4>Current Count: {...logic}</h4>
        </div>
      </template>
    */
    return h("div", null, [
      h("div", { class: "button-container" }, [
        h(
          "button",
          {
            class: "btn btn-success btn-lg",
            onClick: () => (this.data.count += 1),
          },
          "Increment",
        ),
        h(
          "button",
          {
            class: `btn btn-danger btn-lg ${
              this.data.count <= 0 ? "disabled" : ""
            }`,
            onClick: () => this.data.count > 0 && (this.data.count -= 1),
          },
          "Decrement",
        ),
      ]),
      h("h4", null, `Current Count: ${this.data.count}.`),
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
