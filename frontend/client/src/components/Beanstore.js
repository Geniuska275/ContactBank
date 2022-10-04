import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { buy_beans } from "../redux/beans/beansActions";
import { add_beans } from "../redux/beans/beansActions";
import { Link } from "react-router-dom";
export default function BeansShop() {
  const beans = useSelector((state) => state.beans.numOfBeans);
  const breads = useSelector((state) => state.breads.numOfBreads);
  const tea = useSelector((state) => state.tea.numOfTea);

  const beansold = useSelector((state) => state.beans.numOfBeansSold);
  const beansBought = useSelector((state) => state.beans.numOfBeansBought);

  const total = (function AddProducts() {
    return breads + tea + beans;
  })();

  const dispatch = useDispatch();
  const [sell, setSell] = useState("");
  const [add, setAdd] = useState("");
  return (
    <div className="beans">
      <h4>BEANS SHOP</h4>

      <div className="stores">
        <div className="card center">
          <h3>SELLER</h3>
          <h4>number of beans-{beans}</h4>
          <p>number of beans sold - {beansold}</p>
          <input
            type="text"
            placeholder="sell bread"
            onChange={(e) => setSell(e.target.value)}
          />
          <br></br>
          <button onClick={() => dispatch(buy_beans(sell))}>buy beans</button>
        </div>
        <div className="card center">
          <h3>MANAGER</h3>
          <h4>number of beans-{beans}</h4>
          <p>number of Beans Bought -{beansBought}</p>
          <input
            type="text"
            placeholder="add breads"
            onChange={(e) => setAdd(e.target.value)}
          />{" "}
          <br></br>
          <button onClick={() => dispatch(add_beans(add))}>Add beans</button>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <h4>total products in shop - {total}</h4>
        <Link to="/sales/summary">
          <button>View Sales Summary</button>
        </Link>
      </div>
    </div>
  );
}
