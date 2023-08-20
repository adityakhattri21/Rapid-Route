import Header from "./components/Header";
import Home from "./components/Home";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Redirect from "./components/Redirect.jsx";

function App() {
  return (
    <div className="App">
    <Header/>
    <Router>
      <Routes>
        <Route exact path ='/' element={<Home/>}/>
        <Route exact path='/:urlCode' element={<Redirect/>}/>
      </Routes>
    </Router>
   
    </div>
  );
}

export default App;
