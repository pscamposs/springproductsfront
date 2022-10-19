import { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {

  const [btnRegister, setBtnRegister] = useState(true);
  const [products, setProducts] = useState([]);

  const Product = {
    name: "",
    brand: "",
  }



  const [objProduct, setObjProduct] = useState(Product);
  const [alerts, setAlerts] = useState([]);


  const registerProduct = () => {
    fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }

    }).then((response => response.json()))
      .then((data) => {
        let message = data.message;
        let status = data.status;
        if (status === "success") {
          setAlerts([{ type: "success", message: message }]);
          clearForm();

        } else {
          setAlerts([{ type: "danger", message: message }]);
        }
      }).catch((error) => {
        setAlerts([{ type: "danger", message: error.message }]);
      })

  }

  const deleteProduct = (id) => {

    if (id === undefined) {
      setAlerts([{ type: "danger", message: "ID não informado" }]);
      return;
    }

    fetch(`http://localhost:8080/remove/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }).then((response => response.json()))
      .then((data) => {
        let message = data.message;
        let status = data.status;
        if (status === "success") {
          setAlerts([{ type: "success", message: message }]);
          clearForm();

        } else {
          setAlerts([{ type: "danger", message: message }]);
        }
      }).catch((error) => {

        setAlerts([{ type: "danger", message: error.message }]);
      })
    cancelEdit();
  }

  const updateProduct = (id) => {
    fetch(`http://localhost:8080/change`, {
      method: "PUT",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }).then((response => response.json()))
      .then((data) => {
        let message = data.message;
        let status = data.status;
        if (status === "success") {
          setAlerts([{ type: "success", message: message }]);
          clearForm();
        } else {
          setAlerts([{ type: "danger", message: message }]);
        }
      }).catch((error) => {
        setAlerts([{ type: "danger", message: error.message }]);
      })
    cancelEdit();

  }

  const clearForm = () => {
    setObjProduct(Product);
  }


  const formHandler = (e) => {
    setObjProduct({ ...objProduct, [e.target.name]: e.target.value });
  }

  const selectProduct = (id) => {
    setObjProduct(products.find((obj) => obj.id === id));
    setBtnRegister(false);
  }

  const cancelEdit = () => {
    setObjProduct(Product);
    setBtnRegister(true);
  }

  useEffect(() => {
    fetch("http://localhost:8080/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [alerts])

  return (
    <div className="App">
      <div className="alerts">{
        alerts.map((obj, index) => (
          <div key={index} className={`alert alert-${obj.type}`} role="alert">{obj.message}</div>
        ))
      }</div>
      <Form
        register={btnRegister}
        deleteProduct={deleteProduct}
        updateProduct={updateProduct}
        handler={formHandler}
        registerHandler={registerProduct}
        obj={objProduct}
        cancel={cancelEdit}
      />
      <Table
        products={products}
        select={selectProduct}
      />
    </div>
  );
}

export default App;
