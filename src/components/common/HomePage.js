import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Applicate AI Product Intelligence Dashboard</h1>
    <p>Sell, List and Analyse your products</p>
    <Link to="dashboard" className="btn btn-primary btn-lg">
      Dashboard
    </Link>
    <br></br>
    <br></br>
    <Link to="catalogue" className="btn btn-primary btn-lg">
      Product Catalogue
    </Link>
  </div>
);

export default HomePage;
