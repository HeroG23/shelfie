import logo from './logo.svg';
import './App.css';
import Form from "./Components/Form/Form";
import Dashboard from './Components/Dashboard/Dashboard';
import Header from './Components/Header/Header';

function App() {
  return (
    <div className="App">
      this is the App.js component
      <Header/>
      <Dashboard/>
      <Form/>      
    </div>
  );
}

export default App;
