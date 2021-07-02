import "./App.css";
import { getUsers } from "./actions/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Bikes from "./components/Bikes";
import Bike from "./components/Bike";
import User from "./components/form/User";

function App() {
  console.log(getUsers());
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
          <Route path="*" render={() => <h1>Sorry, page not found</h1>} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
