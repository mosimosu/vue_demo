# vue_demo

A Vue 3 demo project for practicing modern frontend development.

## Features

- **Vue 3**: Core framework for building user interfaces.
- **Pinia**: State management library for Vue.
- **Vue Router**: Official router for Vue 3.
- **Vuetify**: Material Design component framework.
- **@tanstack/vue-query**: Data fetching and caching for Vue.
- **Axios**: Promise-based HTTP client.
- **@mdi/font**: Material Design Icons.

## Design Patterns & Practices

- **Modular Architecture**: Organize code by feature (e.g., `stores/`, `api/`, `pages/`).
- **Centralized State Management**: Use Pinia for global state.
- **API Layer Abstraction**: Encapsulate API calls in the `api/` directory.
- **Component-Based Design**: Build reusable UI components.
- **Query/Mutation Pattern**: Use Vue Query for data fetching and mutations.
- **Routing**: Manage navigation with Vue Router.
- **Material Design**: Style UI with Vuetify and MDI icons.

## Project Structure

```
src/
  api/           # API abstraction and queries
  assets/        # Static assets
  components/    # Reusable components
  pages/         # Page-level components
  plugins/       # Plugin initialization (e.g., Vuetify)
  router/        # Vue Router setup
  stores/        # Pinia stores
  App.vue        # Root component
  main.js        # App entry point
```

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables
This project uses environment variables for API endpoints and keys.
Sensitive values are not included in the repository.
Copy .env.example to .env:
```bash 
cp .env.example .env
```
---

This project is for learning and experimenting with Vue 3 ecosystem libraries and best practices.