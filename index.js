const express = require("express");
const {
  initialise_db,
  get_items,
  get_item_by_id,
  get_target,
  update_target,
  get_wishlist_items,
  add_wishlist_item,
  remove_wishlist_item,
  update_wishlist_item,
} = require("./db.js");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

initialise_db();

// Gender

let target;

app.get("/target", (req, res) => {
  target = get_target();
  res.status(200);
  res.json(target);
});

app.patch("/target", (req, res) => {
  target = req.body;
  update_target(target);
  res.status(200);
  res.json(target);
});

// Items

app.get("/items", (req, res) => {
  const items = get_items();

  if (target && target.gender) {
    const filteredItems = items.filter((item) => item.gender === target.gender);
    res.status(200).json(filteredItems);
  } else {
    res.status(200).json(items);
  }
});

app.get("/items/:id", (req, res) => {
  const id = req.params.id;
  const item = get_item_by_id(id);
  if (item === undefined) {
    res.status(404);
    res.json({ error: "Item not found" });
    return;
  }

  res.status(200);
  res.json(item);
});

// Wishlist Items

app.get("/wishlist", (req, res) => {
  const items = get_wishlist_items();
  res.status(200);
  res.json(items);
});

app.post("/wishlist", (req, res) => {
  wishlistItem = req.body;
  add_wishlist_item(wishlistItem);
  res.status(200);
  res.json(wishlistItem);
});

app.delete("/wishlist/:id", (req, res) => {
  const wishlistItemId = req.params.id;
  remove_wishlist_item(wishlistItemId);
  res.status(200).send();
});

app.patch("/wishlist/:id", (req, res) => {
  const itemId = req.params.id;
  const updatedQuantity = req.body.quantity;
  const updatedItem = update_wishlist_item(itemId, updatedQuantity);

  if (updatedItem) {
    res.status(200).json(updatedItem);
  } else {
    res.status(404).json({ error: "Whishlist item not found" });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my GiftHub API running 🥳");
});
