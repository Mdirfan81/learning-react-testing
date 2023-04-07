import logo from "./logo.svg";
import "./App.css";
import SummaryForm from "./pages/summary/SummaryForm";
import Options from "./pages/entry/Options";
function App() {
  return (
    <div className="App">
      <Options optionType="scoops" />
    </div>
  );
}

export default App;
