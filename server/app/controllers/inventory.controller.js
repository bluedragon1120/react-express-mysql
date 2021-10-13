const Inventory = require("../models/inventory.model.js");

// Create and Save a new Inventory
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Inventory
  const inventory = new Inventory({
    name: req.body.name,
    model: req.body.model,
    price: req.body.price,
    sku: req.body.sku,
    created_at: (new Date()).getFullYear() + '-' + ((new Date()).getMonth() + 1) + '-' + (new Date()).getDate()
  });

  Inventory.create(inventory, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Inventory."
      });
    else res.send(data);
  });
};

// Retrieve all Inventories from the database.
exports.findAll = (req, res) => {
  Inventory.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving inventories."
      });
    else res.send(data);
  });
};

// Update a Inventory identified by the inventoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Inventory.updateById(
    req.params.inventoryId,
    new Inventory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Inventory with id ${req.params.inventoryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Inventory with id " + req.params.inventoryId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Inventory with the specified inventoryId in the request
exports.delete = (req, res) => {
  Inventory.remove(req.params.inventoryId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Inventory with id ${req.params.inventoryId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Inventory with id " + req.params.inventoryId
        });
      }
    } else res.send({ message: `Inventory was deleted successfully!` });
  });
};