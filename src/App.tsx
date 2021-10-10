import "./App.css";
import MdEditor from "./component/MdEditor";

function App() {
  const list = [
    { name: "Sachin", url: "https://sachin.com" },
    { name: "Ankush", url: "https://ankush.com" },
  ];
  return (
    <div className="App">
      <MdEditor mentionTrigger="@" mentionList={list} />
    </div>
  );
}

export default App;
