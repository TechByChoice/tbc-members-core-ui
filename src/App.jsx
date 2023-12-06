import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
// import TestPage from ;
const TestPage = React.lazy(() => import("open_doors/TestPage"  ));


const App = () => (
    <div>
        <h1>We Are Tech</h1>
        <h2>🎶bum bum bum 🎶</h2>
    </div>
);
ReactDOM.render(<App/>, document.getElementById("app"));
