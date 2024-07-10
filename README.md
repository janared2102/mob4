# Dayly Inspire App [PWA, Vue.js]

## Project setup
```
npm install
```

### Compiles and hot-reloads for development [PWA features will not work correctly in this mode]
```
npm run serve
```

### Compiles and minifies for production [All PWA features will be available now]
```
npm run build
```

### Run compiled project using 'serve'
```
npm install -g serve
serve -s dist
```
Will host project locally. Flag '-s' is showing to the server, that application is SPA (single page application)

## Libraries, plugins, APIs

<code>axios</code> - Axios is a popular JavaScript library for making HTTP requests, facilitating easy API interactions. It supports promises and provides convenient methods for performing GET, POST, PUT, DELETE, and other HTTP requests, while allowing customization of headers, error handling, and use of interceptors.
<br/>
Used Axios because it's easier to use, it handles JSON automatically, handles errors better, supports interceptors and cancel requests.

<code>pinia</code> - Pinia is a modern state management library for Vue.js, designed as a replacement for Vuex. It offers a simpler, more intuitive API for managing global application state, supports modules, and seamlessly integrates with the Composition API.
<br/>
Used Pinia because it centralizes business logic and makes it easier to control state


<code>Vue3 + Composition api</code> - Vue.js is a progressive framework for creating user interfaces. It has the following advantages: Reactivity, flexibility and small size. In conjunction with the Composition API, it allows you to develop clean and flexible code

## Device APIs

<code>LocalStorage</code> - was used to store journal entries inside. It gives fast and easy access to data, saved inside

<code>Web Share API</code> - allows to share data on devices and in browsers, which supports this type of API. Normally works on phones and allows to share data with contacts or to post it in social media

## How the app works

The application makes the most of the features that the PWA plugin provides. Since our task is to keep the application running even in the absence of internet, all requests to the api with quotes or news are cached, and in future requests, the application accesses the cache, not the api server.
The log is saved locally, allowing the user to use it under any circumstances 