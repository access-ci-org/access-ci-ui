import React from 'react';

import baseStyle from "../base.css?inline";
import contentStyle from "../content.css?inline";
import resourceCatalogStyle from "../resource-catalog.css?inline";
import { renderShadow } from "../utils.jsx";
import { ResourceCatalog } from "./components/resource-catalog.jsx";

function App() {
    const target = document.getElementById("resource-catalog");
    return (
        renderShadow(
            <ResourceCatalog />, target, [baseStyle, contentStyle, resourceCatalogStyle]
        )
    );
}

export default App;
