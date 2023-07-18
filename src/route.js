const express = require("express");
const multer = require("multer");
const uploadController = require("./uploadController");
const Order = require("./orderSchema");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadController.uploadFile);

router.get("/get-invoice", async (req, res) => {
  //send all invoices
  try {
    const invoices = await Order.find({});

    res.send(invoices);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/get-invoice-one/:id", async (req, res) => {
  // console.log(req.params.id);
  const orderID = parseInt(req.params.id);

  try {
    const invoice = await Order.findOne({ OrderID: orderID });
    if (!invoice) {
      return res.status(404).send();
    }
    res.send(invoice);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
