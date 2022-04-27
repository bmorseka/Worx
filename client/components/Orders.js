import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../store/orders";
import OrdersFilter from "./OrdersFilter";

const Orders = (props) => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const currentOrders = useSelector((state) => state.ordersReducer);
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    const { data } = dispatch(getOrders());
    setOrders(data);
  }, []);

  const filterChangeHandler = (selectedStatus) => {
    setFilterStatus(selectedStatus);
  };

  const ordersToShow = () => {
    if (filterStatus) {
      const filteredOrders = currentOrders.filter(
        (order) => order.status === filterStatus
      );
      return filteredOrders;
    } else {
      return currentOrders;
    }
  };

  return (
    <div>
      <OrdersFilter
        selected={filterStatus}
        onChangeFilter={filterChangeHandler}
      />
      <h3>View Orders</h3>
      <div>
        {ordersToShow().length === 0 ? (
          <p>No current orders.</p>
        ) : (
          ordersToShow().map((order) => {
            return (
              <div key={order.id}>
                <h5>{order.id}</h5>
                <div>{order.status}</div>
                <div>{order.shippingAddress}</div>
                <div>{order.paymentInfo}</div>
                <div>{order.shippingAmt}</div>
                <div>{order.taxAmt}</div>
                <Link to={`/orders/${order.id}`}>View Order</Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;
