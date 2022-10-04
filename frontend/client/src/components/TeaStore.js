import { useDispatch, useSelector } from "react-redux";
import { buy_tea } from "../redux/tea/teaActions";
import { add_tea } from "../redux/tea/teaActions";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function TeaStore() {
  const beans = useSelector((state) => state.beans.numOfBeans);
  const breads = useSelector((state) => state.breads.numOfBreads);
  const tea = useSelector((state) => state.tea.numOfTea);
  const teasold = useSelector((state) => state.tea.numOfTeaSold);
  const teaBought = useSelector((state) => state.tea.numOfTeaBought);

  const dispatch = useDispatch();
  const [sell, setSell] = useState("");
  const [add, setAdd] = useState("");

  const total = (function AddProducts() {
    return breads + tea + beans;
  })();

  return (
    <>
      <div className="tea" style={{ marginTop: "50px" }}>
        <h4>MY TEA SHOP</h4>
        <div className="stores">
          <div className="card center">
            <h3>SELLER</h3>
            <h4>number of tea-{tea}</h4>
            <p>number of tea sold-{teasold}</p>

            <input
              type="text"
              placeholder="sell tea"
              onChange={(e) => setSell(e.target.value)}
            />
            <br></br>
            <button onClick={() => dispatch(buy_tea(sell))}>sell tea</button>
          </div>
          <div className="card center">
            <h3>MANAGER</h3>
            <h4>number of tea-{tea}</h4>
            <p>number of tea Added -{teaBought}</p>

            <input
              type="text"
              placeholder="Add Tea"
              onChange={(e) => setAdd(e.target.value)}
            />
            <br></br>
            <button onClick={() => dispatch(add_tea(add))}>add tea</button>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <h4>total products in shop - {total}</h4>

          <Link to="/sales/summary">
            <button>View Sales Summary</button>
          </Link>
        </div>
      </div>
    </>
  );
}
