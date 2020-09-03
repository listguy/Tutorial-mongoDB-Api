const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const url = process.env.DB_URI;

console.log(`trying to connect to ${url}`);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((r) => console.log("connected successfully to MongoDB"))
  .catch((e) => console.log(`failed to connect to MongoDB\n${e.message}`));

const tutorialSchema = mongoose.Schema({
  title: String,
  connect: String,
  published: { type: Boolean, default: false },
});

module.exports = mongoose.model("Tutorial", tutorialSchema);
