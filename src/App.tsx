import ShopsAndScales from "./pages/ShopsAndScales/ShopsAndScales";
import ButtonBlack from "./components/UI/Buttons/ButtonBlack/ButtonBlack";
import ButtonStroke from "./components/UI/Buttons/ButtonStroke/ButtonStroke";
import SearchField from "./components/UI/SearchField/SearchField";
import Products from "./pages/Products/Products";
import Categories from "./pages/Categories/Categories";
import {Routes, Route, Link} from "react-router-dom";
import OldScales from "./pages/OldScales/OldScales";


function App() {
  return (
    <div>
        <Routes>
            <Route path="/" element={ <ShopsAndScales/>}/>
            <Route path="/products" element={ <Products />}/>
            <Route path="/categories" element={ <Categories />}/>
            <Route path="/oldScales" element={ <OldScales />}/>
        </Routes>
    </div>
  );
}

export default App;
