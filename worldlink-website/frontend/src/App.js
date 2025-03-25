import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importing Pages
import Home from "./pages/Home";
import Introduction from "./pages/AboutWorldLink/Introduction";
import CompanyProfile from "./pages/AboutWorldLink/CompanyProfile";
import MissionVision from "./pages/AboutWorldLink/MissionVision";
import Team from "./pages/AboutWorldLink/Team";
import Internet from "./pages/Services/Internet";
import IPTV from "./pages/Services/IPTV";
import Enterprise from "./pages/Services/Enterprise";
import Technical from "./pages/Training/Technical";
import Certifications from "./pages/Training/Certifications";
import Internship from "./pages/Training/Internship";
import Contact from "./pages/Support/Contact";
import FAQs from "./pages/Support/FAQs";
import Troubleshooting from "./pages/Support/Troubleshooting";
import Resources from "./pages/Resources/resources";
import UserManuals from "./pages/Resources/UserManuals";
import Tutorials from "./pages/Resources/Tutorials";
import Policies from "./pages/Resources/Policies";
import NewsEvents from "./pages/NewsEvents";
import Careers from "./pages/Careers";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        
        {/* About WorldLink Routes */}
        <Route path="/about-worldlink/introduction" component={Introduction} />
        <Route path="/about-worldlink/company-profile" component={CompanyProfile} />
        <Route path="/about-worldlink/mission-vision" component={MissionVision} />
        <Route path="/about-worldlink/team" component={Team} />

        {/* Services Routes */}
        <Route path="/services/internet" component={Internet} />
        <Route path="/services/iptv" component={IPTV} />
        <Route path="/services/enterprise" component={Enterprise} />

        {/* Training Programs Routes */}
        <Route path="/training/technical" component={Technical} />
        <Route path="/training/certifications" component={Certifications} />
        <Route path="/training/internship" component={Internship} />

        {/* Support Routes */}
        <Route path="/support/contact" component={Contact} />
        <Route path="/support/faqs" component={FAQs} />
        <Route path="/support/troubleshooting" component={Troubleshooting} />

        {/* Resources Routes */}
        <Route path="/resources/resources" component={Resources} />
        <Route path="/resources/user-manuals" component={UserManuals} />
        <Route path="/resources/tutorials" component={Tutorials} />
        <Route path="/resources/policies" component={Policies} />

        {/* Other Pages */}
        <Route path="/news-and-events" component={NewsEvents} />
        <Route path="/careers" component={Careers} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
