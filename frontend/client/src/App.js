import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addblogs from "./components/Addblogs";
import Allblogs from "./components/Allblogs";
import Reactforms from "./components/Reactforms";
import store from "./redux/store";
import Blogdetails from "./components/blogdetails";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import About from "./components/About";
import Notfound from "./components/Notfound";
import Breadshop from "./components/Breadshop";
import Breadhooks from "./components/Breadhooks";
import Callbacks from "./components/Callbacks";
import BeansShop from "./components/Beanstore";
import TeaStore from "./components/TeaStore";
import Summary from "./components/summary";
import SalesSummary from "./components/salesSummary";
function App() {
  const [mode, setMode] = useState(true);
  const [loading, setisLoading] = useState(false);
  const spinner = document.getElementById("spinner");
  const spin = document.getElementById("spin");
  const dj = document.getElementById("djspinner");
  console.log(spinner);
  if (spinner) {
    setTimeout(() => {
      spinner.style.display = "none";
      dj.style.display = "none";
      spin.style.display = "none";
      setisLoading(true);
    }, 3000);
  }
  function changeMode() {
    console.log("ran");
    setMode((prev) => !prev);
  }
  console.log(mode);
  const styles = {
    backgroundColor: mode ? "white" : "black",
  };
  return (
    loading && (
      <Provider store={store}>
        <div className="app" style={styles}>
          <Router>
            <Navbar />
            <Homepage />
            <Routes>
              <Route path="/Addblogs" element={<Addblogs />} />
              <Route path="/Allblogs" element={<Allblogs />} />
              <Route path="/Blogs/:id" element={<Blogdetails />} />
              <Route path="/reactForms" element={<Reactforms />} />
              <Route path="/breadshop" element={<Breadhooks />} />
              <Route path="/TeaStore" element={<TeaStore />} />
              <Route path="/BeansStore" element={<BeansShop />} />
              <Route path="/sales/summary" element={<SalesSummary />} />

              <Route path="*" element={<Notfound />} />
            </Routes>
            {/* <About/> */}
            {/* <Breadhooks/>
           <Callbacks/>         */}

            <Footer />
          </Router>
          <div className="whats">
            <label className="switch">
              <input
                type="checkbox"
                onChange={changeMode}
                className="clicked"
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </Provider>
    )
  );
}

export default App;
