import {
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' exact element={<Home/>}/>
      <Route path='/dashboard' exact element={<Dashboard/>}/>
      {/* <Route path="/" element={<Navbar/>} >
        <Route path='/' exact element={<Home/>}/>
      </Route> */}
    </Routes>
    </div>
  );
}

export default App;
