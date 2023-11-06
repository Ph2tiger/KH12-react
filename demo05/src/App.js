import { NavLink, Route, Routes} from "react-router-dom";
import Pocketmon from "./components/Pocketmon";
import Book from "./components/Book";
import Home from "./components/Home";
import Menu from "./components/Menu";


function App() {
  return (
    <div className="contanier-fluid">
      {/* 상단 매뉴 영역 */}
      
      <div>
        
        <Menu/>
        
      </div>

      {/* 본문 영역 */}
      <div>
          <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route path="/pocketmon" element={<Pocketmon/>}></Route>
            <Route path="/book" element={<Book/>}></Route>
          </Routes>
      </div>
      
    </div>
  );
}

export default App;
