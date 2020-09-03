require("dotenv").config();
const express = require("express");
const Tutorial = require("./models/tutorial");

const PORT = process.env.PORT || 4000;

const app = new express();
app.use(express.json());

app.post("/api/post", (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
  });
  newProduct.save().then((d) => {
    res.status(200).json(d);
  });
});

//Homework methods
app.get("/api/tutorials", (req, res) => {
  Tutorial.find({}).then((tutorials) => res.json(tutorials));
});

app.get("/api/tutorials/published", (req, res) => {
  Tutorial.find({ published: true }).then((results) => res.json(results));
});

app.get("/api/tutorials/:id", (req, res) => {
  Tutorial.findById(req.params.id).then((tutorial) => res.json(tutorial));
});

app.post("/api/tutorials", (req, res) => {
  const body = req.body;

  const newTuto = new Tutorial({
    title: body.title,
    content: body.content,
    published: body.published,
  });

  newTuto.save().then((doc) => res.json(doc));
});

app.put("/api/tutorials/:id", (req, res) => {
  const body = req.body;

  const updatedTuto = {
    title: body.title,
    content: body.content,
    published: body.published,
  };

  Tutorial.findByIdAndUpdate(req.params.id, updatedTuto, {
    new: true,
  }).then((ut) => res.json(ut));
});

app.delete("/api/tutorials/:id", (req, res) => {
  Tutorial.findByIdAndRemove(req.params.id).then(res.status(204).end());
});

app.delete("/api/tutorials", (req, res) => {
  Tutorial.deleteMany({}).then(res.status(204).end());
});

app.get("/api/tutorialsByTitle", (req, res) => {
  const title = req.query.title;

  try {
    Tutorial.find({ title: { $regex: `.*${title}.*` } }).then((results) =>
      res.json(results)
    );
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
