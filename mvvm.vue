// ✅ How MVVM Works?
// Model → Holds the application state.
// View → Displays UI and binds to ViewModel.
// ViewModel → Manages state & interactions (directly bindable to View).
// Two-way data binding, while others (MVP and MVC) only offer one way binding

<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="updateMessage">Change Message</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "Hello from MVVM!",
    };
  },
  methods: {
    updateMessage() {
      this.message = "Updated!";
    },
  },
};
</script>