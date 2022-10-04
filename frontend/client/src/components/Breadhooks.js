import React, { useEffect } from "react";
import { buyBread } from "../redux";
import { addBread } from "../redux";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Breadhooks() {
  const bought = useRef(0);
  const previousQty = useRef(0);
  const [selling, setSelling] = useState(false);
  const [sell, setSell] = useState("");
  const [add, setAdd] = useState("");
  const [valid, setValid] = useState(true);

  const breads = useSelector((state) => state.breads.numOfBreads);
  const breadsold = useSelector((state) => state.breads.numOfBreadsSold);
  const breadbought = useSelector((state) => state.breads.numOfBreadsBought);

  const beans = useSelector((state) => state.beans.numOfBeans);
  const tea = useSelector((state) => state.tea.numOfTea);

  const total = (function AddProducts() {
    return breads + tea + beans;
  })();

  const dispatch = useDispatch();

  useEffect(() => {
    previousQty.current = breads;
    window.alert(`Manager Added  ${breadbought} Bread(s)`);
    setSelling(true);
  }, [breads]);

  useEffect(() => {
    bought.current = breads;
    window.alert(`Seller Sold ${breadsold} Bread(s).`);
  }, [breads]);

  function Selling(e) {
    setSell(e.target.value);
  }
  return (
    <>
      <h4> BREAD SHOP</h4>
      <div className="stores">
        <div className="card center">
          <h3>SELLER</h3>
          {breads <= 0 ? (
            "bread store is empty"
          ) : (
            <p> Current Number of breads={breads}</p>
          )}
          <p>previous Quantity of breads = {previousQty.current}</p>
          <hr></hr>
          <p> numOfBreadsSold= {breadsold}</p>

          <input type="text" placeholder="sell breads" onChange={Selling} />
          <br></br>
          {breads <= 0 ? (
            <button
              className="disabled"
              disabled={true}
              title="Store is Empty,Add Breads."
            >
              can't sell
            </button>
          ) : (
            <button onClick={() => dispatch(buyBread(sell))}>
              {sell == 1 ? "sell a bread" : `sell ${sell} breads`}
            </button>
          )}
        </div>
        <div className="card center">
          <h3>MANAGER</h3>
          {breads <= 0 ? (
            "bread store is empty"
          ) : (
            <p> Current Number of breads= {breads}</p>
          )}
          <p>Previous Number of breads={bought.current}</p>
          <p> numOfBreadsSold= {breadsold}</p>
          <hr></hr>
          <p>Number of Breads Added={breadbought}</p>

          <input
            type="text"
            placeholder="sell breads"
            onChange={(e) => setAdd(e.target.value)}
          />
          <br></br>

          <button onClick={() => dispatch(addBread(add))}>
            {add == 1 ? "Add a bread " : `add ${add} breads`}
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <h4>total products in shop - {total}</h4>
        <Link to="/sales/summary">
          <button>View Sales Summary</button>
        </Link>
      </div>
    </>
  );
}
