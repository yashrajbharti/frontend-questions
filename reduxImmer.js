import { produce } from "immer";

// 1️⃣ Custom createStore function
function createStore(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  return {
    getState: () => state,

    dispatch: (action) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },

    subscribe: (listener) => {
      listeners.push(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },
  };
}

// 2️⃣ Reducer using Immer (immutable updates)
const counterReducer = (state = { count: 0 }, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "INCREMENT":
        draft.count += 1;
        break;
      case "DECREMENT":
        draft.count -= 1;
        break;
      case "RESET":
        draft.count = 0;
        break;
      default:
        return state;
    }
  });
};

// 3️⃣ Create store with reducer
const store = createStore(counterReducer, { count: 0 });

// 4️⃣ Subscribe to store updates
store.subscribe(() => {
  console.log("Updated State:", store.getState());
});

// 5️⃣ Dispatch Actions
store.dispatch({ type: "INCREMENT" }); // { count: 1 }
store.dispatch({ type: "INCREMENT" }); // { count: 2 }
store.dispatch({ type: "DECREMENT" }); // { count: 1 }
store.dispatch({ type: "RESET" }); // { count: 0 }
