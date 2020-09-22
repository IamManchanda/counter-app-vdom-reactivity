const state = reactive({
  count: 0,
});

effect(() => {
  console.log(state.count);
});

state.count++;
