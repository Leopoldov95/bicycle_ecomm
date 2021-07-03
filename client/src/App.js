import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Bikes from "./components/Bikes";
import Bike from "./components/Bike";
import User from "./components/form/User";
import Register from "./components/form/Register";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/bikes" exact component={Bikes} />
          <Route
            path="/bikes/:id"
            exact
            render={(props) => <Bike {...props} />}
          />
          <Route path="/login" exact component={User} />
          <Route path="/register" exact component={Register} />
          <Route path="/cart" exact component={Cart} />
          <Route path="*" render={() => <h1>Sorry, page not found</h1>} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
