import React from "react";
import "./App.css";

function App() {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    fetch("/api/demo")
      .then(res => res.json())
      .then(data => {
        setText(JSON.stringify(data, null, 2));
      })
      .catch(err => {
        setText("Failed to fetch data from server.");
        console.log(err);
      });
  }, []);

  return (
    <div className="app">
      <h1>React Express Boilerplate</h1>
      {/* <p>
        React Express Boilerplate uses proxies to allow requests to be made to
        the express server during development, as demonstrated below...
      </p> */}
      <p className="app-info">
        React Express Boilerplate uses webpack-dev-server with proxies to allow
        requests to be made to the express server during development, as
        demonstrated below...
      </p>
      <div className="app-container">
        <p className="app-json">{text}</p>
        <p className="app-paragraph">
          This JSON was fetched from the express server using the path:
          "/api/test".
        </p>
      </div>
      <div className="app-container">
        <img className="app-image" src="/images/demo-image.jpg" alt="" />
        <p className="app-paragraph">
          This image was loaded from the express server using
          src="/images/demo-image.jpeg".
        </p>
      </div>
    </div>
  );
}

export default App;
