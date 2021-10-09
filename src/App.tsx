import "./App.css";
import MdEditor from "./MdEditor";

function App() {
  const list = [
    { name: "Sachin", url: "https://sachin.com" },
    { name: "Ankush", url: "https://ankush.com" },
  ];
  return (
    <div className="App">
      <MdEditor list={list} />
    </div>
  );
}

export default App;
