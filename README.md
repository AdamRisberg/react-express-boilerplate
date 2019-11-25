# React Express Boilerplate

Boilerplate for React and Node/Express based web apps.

## Client Features

- React
- Babel
- Webpack
- Compatible with CSS, CSS Modules, and SCSS
- CSS Autoprefixing
- Minifies CSS and JavaScript for production build
- Auto restart on file changes
- Proxy for communication with server during development

## Server Features

- Express
- body-parser
- Compression
- Public folder for serving static assets
- Serves client build folder in production mode
- Auto restart on file changes in development mode

## Using CSS and SCSS

Import stylesheets as follows...

```
import "./filename.css";
import "./filename.scss";
```

## Using CSS Modules

Use .module.css extension and import/use as follows...

```JSX
import styles from "./filename.module.css";
<div className={styles.container}>
```

## Using Images

Images can be handled in multiple ways.

### Import

Import from the client/src folder and use as follows...

```JSX
import image from "./image.jpg"
<img src={image} />
```

### In CSS

```CSS
.some-class-name {
  background-image: url("./image.jpg");
}
```

### From the Server

Add images to the server/public/images folder. This works in production and development modes (thanks to the proxy path). You can then access them as usual...

```JSX
<img src="/images/image.jpg">
```

## Static Assets

### Client

While building a production version of the client, files within the client/public folder will be automatically copied to the build folder and served by the express server in production mode.

A favicon.ico file in the client/public folder will be automatically used in both production and development.

Other files in client/public folder (such as images) will not be available while running in development mode. However, while running a production build, they will be served by the express server.

### Server

Files within the server/public folder will be served durring production mode. They will also be accessible during development mode if the proper proxy paths are added. See the following section for more info.

## Communicating With Server (Development)

This project allows for this by using webpack-dev-server with proxies.
To set up the paths that you want passed to the server while running in development mode, open the webpack.config.js file and find the the following code near the bottom...

```
devServer: {
  port: 3000,
  proxy: {
    context: ["/images", "/api"],
    target: "http://localhost:3001"
  },
  historyApiFallback: true
}
```

The proxy context array has two paths setup by default. Any requests made from the client to a path starting with "/images" or "/api" will be sent to the express server. This is where you can add/remove any paths you require.

The "/images" path is included as an example of being able to access files in the server/public folder during development.

## Scripts

`npm run dev` Starts React client (using webpack-dev-server) and express server in development mode.

`npm run client` Starts React client (using webpack-dev-server).

`npm run server` Starts express server in development mode.

`npm run build` Builds a production version of the client.

`npm start` Starts express server in production mode and serves client from the build folder.

## Install and Run

```SH
git clone https://github.com/AdamRisberg/react-express-boilerplate.git <ProjectName>
cd <ProjectName>
npm install
npm run dev
```
