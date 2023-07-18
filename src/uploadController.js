const csv = require("csv-parser");
const fs = require("fs");
const Order = require("./orderSchema");

exports.uploadFile = (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const results = [];
  fs.createReadStream(file.path)
    .pipe(csv())
    .on("data", (data) => {
      results.push(data);
    })
    .on("end", () => {
      const groupedOrders = {};
      results.forEach((data) => {
        const OrderID = data.OrderID;
        if (!groupedOrders[OrderID]) {
          groupedOrders[OrderID] = {
            OrderID: data.OrderID,
            Customer: data.Customer,
            OrderDate: data.OrderDate,
            products: [],
          };
        }
        groupedOrders[OrderID].products.push({
          ItemName: data.ItemName,
          Quantity: parseInt(data.Quantity),
          UnitPrice: parseFloat(data.UnitPrice),
        });
      });

      const orders = Object.values(groupedOrders);
      Order.insertMany(orders)
        .then(() => {
          res
            .status(200)
            .send({ message: "CSV file uploaded and data saved to MongoDB." });
        })
        .catch((error) => {
          console.error("Error occurred while saving data to MongoDB:", error);
          res.status(500).send("Error occurred while saving data to MongoDB.");
        });
    });
};
