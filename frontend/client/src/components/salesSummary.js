import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SalesSummary() {
  const navigate = useNavigate();
  const [records, setRecords] = useState(100000);
  const [time, setTime] = useState("");

  const breads = useSelector((state) => state.breads.numOfBreads);
  const breadsold = useSelector((state) => state.breads.numOfBreadsSold);
  const beansold = useSelector((state) => state.beans.numOfBeansSold);

  const beans = useSelector((state) => state.beans.numOfBeans);
  const tea = useSelector((state) => state.tea.numOfTea);
  const teasold = useSelector((state) => state.tea.numOfTeaSold);

  const total = (function AddProducts() {
    return breads + tea + beans;
  })();
  const [data, setData] = useState({
    numOfBeansSold: beansold,
    numOfTeaSold: teasold,
    numOfBreadsSold: breadsold,
    totalProducts: total,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  setInterval(handleSubmit, 200000);
  function Set(e) {
    console.log("ran");
    setTime(e.target.value);
    setRecords(e.target.value * 1000);
  }
  console.log(time);
  function handleSubmit() {
    console.log("called");
    fetch("http://localhost:3000/mall", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      navigate("/");
    });
  }
  return (
    <div style={{ textAlign: "center", marginBottom: "60px" }}>
      <div className="card">
        <h4>Current Quantity Products</h4>
        <ul>
          <li>Tea - {tea}</li>
          <li>Breads - {breads}</li>
          <li>Beans - {beans}</li>
        </ul>
        <h4> Quantity Sold</h4>
        <ul>
          <li>Tea -{teasold} </li>
          <li>Breads - {breadsold}</li>
          <li>Beans -{beansold}</li>
        </ul>
      </div>
      <h4>total products in shop - {total}</h4>
      <Link to="/TeaStore">
        <button>Back to Mall</button>
      </Link>
      <br></br>
      <button onClick={handleSubmit}>Save summary</button>
    </div>
  );
}
