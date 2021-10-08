import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BackToTop from "components/BackToTop";
import Gallery from "layout/Gallery";
import Hero from "layout/Hero";

function App() {
  return (
    <div>
      <BrowserRouter>
        <BackToTop />
        <div className="main-content">
          <Hero />
          <Switch>
            <Route exact path="/">
              <Gallery />
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
