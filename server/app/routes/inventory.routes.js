module.exports = app => {
  const inventories = require("../controllers/inventory.controller.js");

  // Create a new Inventory
  app.post("/inventories", inventories.create);

  // Retrieve all Inventories
  app.get("/inventories", inventories.findAll); 

  // Update a Inventory with inventoryId
  app.put("/inventories/:inventoryId", inventories.update);

  // Delete a Inventory with inventoryId
  app.delete("/inventories/:inventoryId", inventories.delete);
};
