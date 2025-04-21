import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importing Pages
import Home from "./pages/Home";
import Introduction from "./pages/AboutWorldLink/Introduction";
import MissionVision from "./pages/AboutWorldLink/MissionVision";
import Team from "./pages/AboutWorldLink/Team";
import Services from "./pages/Services";
import Curriculum from "./pages/Curriculum";
import Database from "./pages/Database";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources/resources";
import UserManuals from "./pages/Resources/UserManuals";
import Tutorials from "./pages/Resources/Tutorials";
import Policies from "./pages/Resources/Policies";
import NewsEvents from "./pages/NewsEvents";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        
        {/* About WorldLink Routes */}
        <Route path="/about-worldlink/introduction" component={Introduction} />
        <Route path="/about-worldlink/mission-vision" component={MissionVision} />
        <Route path="/about-worldlink/team" component={Team} />

        {/* Resources Routes */}
        <Route path="/resources/resources" component={Resources} />
        <Route path="/resources/user-manuals" component={UserManuals} />
        <Route path="/resources/tutorials" component={Tutorials} />
        <Route path="/resources/policies" component={Policies} />

        {/* Other Pages */}
        <Route path="/services" component={Services} />
        <Route path="/news-and-events" component={NewsEvents} />
        <Route path="/curriculum" component={Curriculum} />
        <Route path="/database" component={Database} />
        <Route path="/contact" component={Contact} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
