const sql = require("./db.js");

// constructor
const Inventory = function(inventory) {
  this.name       = inventory.name;
  this.model      = inventory.model;
  this.price      = inventory.price;
  this.sku        = inventory.sku;
  this.created_at = inventory.created_at;
};

Inventory.create = (newInventory, result) => {
  sql.query("INSERT INTO inventory_tb SET ?", newInventory, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newInventory });
  });
};

Inventory.getAll = result => {
  sql.query("SELECT * FROM inventory_tb", (err, res) => {
    if (err) {      
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Inventory.updateById = (id, inventory, result) => {
  sql.query(
    "UPDATE inventory_tb SET name = ?, model = ?, price = ?, sku = ? WHERE id = ?",
    [inventory.name, inventory.model, inventory.price, inventory.sku, id],
    (err, res) => {
      if (err) {        
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id, ...inventory });
    }
  );
};

Inventory.remove = (id, result) => {
  sql.query("DELETE FROM inventory_tb WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    result(null, res);
  });
};

module.exports = Inventory;
