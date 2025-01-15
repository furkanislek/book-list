const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, required: true },
});

const Counter = mongoose.model("Counter", CounterSchema);

module.exports = Counter;
