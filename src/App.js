import ShopsAndScales from "./components/ShopsAndScales/ShopsAndScales";
import ButtonBlack from "./components/UI/Buttons/ButtonBlack/ButtonBlack";
import ButtonStroke from "./components/UI/Buttons/ButtonStroke/ButtonStroke";
import SearchField from "./components/UI/SearchField/SearchField";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import {Routes, Route, Link} from "react-router-dom";
import OldScales from "./components/OldScales/OldScales";


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
