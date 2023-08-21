import React, { useEffect, useState } from "react";
import cytoscape from "cytoscape";
import "./App.css";

const GraphVisualization = () => {
  const [selectedConnection, setSelectedConnection] = useState<{
    source: string;
    target: string;
  } | null>(null);

  useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: [
        { data: { id: "user1", label: "User 1", entity: "Entity A" } },
        { data: { id: "user2", label: "User 2", entity: "Entity B" } },
        { data: { id: "user3", label: "User 3", entity: "Entity C" } },
        { data: { id: "user4", label: "User 4", entity: "Entity D" } },
        { data: { id: "user5", label: "User 5", entity: "Entity E" } },
        { data: { id: "user6", label: "User 6", entity: "Entity F" } },
        { data: { id: "user7", label: "User 7", entity: "Entity G" } },
        { data: { id: "user8", label: "User 8", entity: "Entity H" } },
        { data: { id: "user9", label: "User 9", entity: "Entity I" } },
        { data: { id: "user10", label: "User 10", entity: "Entity J" } },

        { data: { source: "user1", target: "user2" } },
        { data: { source: "user1", target: "user3" } },
        { data: { source: "user1", target: "user4" } },
        { data: { source: "user1", target: "user5" } },
        { data: { source: "user1", target: "user6" } },
        { data: { source: "user1", target: "user7" } },
        { data: { source: "user1", target: "user8" } },
        { data: { source: "user1", target: "user9" } },
        { data: { source: "user4", target: "user10" } },
      ],
      style: [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-color": "#3498db",
          },
        },
        {
          selector: "edge",
          style: {
            "line-color": "#95a5a6",
          },
        },
        {
          selector: ".hidden",
          style: {
            display: "none",
          },
        },
      ],
    });

    // Expand and collapse nodes
    cy.on("tap", "node", (event: cytoscape.EventObject) => {
      const node = event.target;
      node.connectedEdges().toggleClass("hidden");
      node.connectedNodes().toggleClass("hidden");
    });

    // Filter connections by entity
    const filterConnections = (entity: string) => {
      cy.elements().addClass("hidden");
      cy.elements(`[entity="${entity}"]`).removeClass("hidden");
    };

    const filterButton = document.getElementById("filterButton");
    filterButton?.addEventListener("click", () => filterConnections("Entity C"));

    // Handle edge clicks to display connection details
    cy.on("tap", "edge", (event: cytoscape.EventObject) => {
      const edge = event.target;
      const sourceNode = edge.source();
      const targetNode = edge.target();

      setSelectedConnection({
        source: sourceNode.data("label"),
        target: targetNode.data("label"),
      });
    });

    // Cleanup event listeners when component unmounts
    return () => {
      filterButton?.removeEventListener("click", () => filterConnections("Entity C"));
      cy.off("tap", "node");
      cy.off("tap", "edge");
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div id="cy" style={{ height: "500px", width: "100%" }} />
      {/* Case 3: Remove & readd edges.
      In this use-case, we'll demonstrate how to use Cytoscape.js to add and remove connections based on entities on click. */}
      {selectedConnection && (
        <div>
          <h2>Selected Connection Details</h2>
          <p>Source: {selectedConnection.source}</p>
          <p>Target: {selectedConnection.target}</p>
        </div>
      )}
      <button className="button" id="filterButton">
        Filter Connections for Entity C
      </button>
    </div>
  );
};

export default GraphVisualization;
