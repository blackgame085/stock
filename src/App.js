import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import '@progress/kendo-theme-default/dist/all.css'
import Home from './components/home.component'
import AddStock from './components/addStock.component'
import AddUnit from './components/addUnit.component'
import StockList from './components/stockList.component'
import EditStock from './components/editList.component'
import Test from './components/test.component'
import HistoryList from './components/history.component'
import addProduct from './components/addProduct.component'
import addTest from './components/testfile'
import productList from './components/productList.component'
import editProduct from './components/editProduct.component'


class App extends Component {
  render() {
    return (
      <Router>
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'} className="navbar-brand">React CRUD Example</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link to={'/'} className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/stock'} className="nav-link">Stock</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/history'} className="nav-link">History</Link>
                    </li>
                    <li className="nav-item">
                      <Link to={'/productList'} className="nav-link">Product List</Link>
                    </li>
                  </ul>
                </div>
              </nav><br />
            
            <h2>React CRUD Item Add</h2>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/addStock" component={AddStock} />
              <Route path='/addUnit' component={AddUnit} />
              <Route path="/stock" component={StockList} />
              <Route path="/edit/:id" component={EditStock} />
              <Route path="/history" component={HistoryList} />
              <Route path="/productList" component={productList} />
              <Route path="/addProduct" component={addProduct} />
              <Route path="/editProduct/:id" component={editProduct} />
              <Route path="/test" component={Test} />
              <Route path="/addTest" component={addTest} />
            </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
