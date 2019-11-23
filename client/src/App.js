import React from "react";

function App() {
  const [text, setText] = React.useState("");

  React.useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => {
        setText(data.text);
      })
      .catch(err => {
        setText("Failed to fetch data from server.");
        console.log(err);
      });
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React Express Boilerplate</h1>
      <p>{text}</p>
    </div>
  );
}

export default App;
