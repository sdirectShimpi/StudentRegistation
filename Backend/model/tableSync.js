const cartRecords = require("./cartModel");
const orderRecord = require("./orderModel");
const productRecords = require("./productModel");

const userRecords = require("./userModel")

async function syncingTable() {
    await userRecords.sync();
    await productRecords.sync();
    await cartRecords.sync();
    await orderRecord.sync()
}

module.exports = syncingTable;