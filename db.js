const fs = require("fs");
const path = require("path");

let db = {};

const dbFilePath = path.join(__dirname, "mock_db.json");

const initialise_db = () => {
  if (fs.existsSync(dbFilePath)) {
    try {
      const data = fs.readFileSync(dbFilePath, "utf8");
      db = JSON.parse(data);
      console.log("Database initialized.");
    } catch (error) {
      console.error("Error reading mock_db.json:", error);
    }
  } else {
    console.error("mock_db.json does not exist.");
  }
};

// Gender

const get_target = () => {
  return db["target"];
};

const update_target = (target) => {
  // Use of spread operator to merge the new trip data with the existing target data
  db["target"] = {
    ...db["target"],
    ...target,
  };
};

// Items

const get_items = () => {
  return db["items"];
};

const get_item_by_id = (id) => {
  const items = get_items();
  return items.find((item) => item.id === Number.parseInt(id));
};

// Wishlist Items

const get_wishlist_items = () => {
  return db["wishlist"];
};

const add_wishlist_item = (wishlistItem) => {
  const wishlistItems = get_wishlist_items();
  wishlistItems.push(wishlistItem);
  db["wishlist"] = wishlistItems;
};

const remove_wishlist_item = (wishlistItemId) => {
  const wishlistItems = get_wishlist_items();
  const updatedWishlistItems = wishlistItems.filter(
    (item) => item.id !== Number.parseInt(wishlistItemId)
  );
  db["wishlist"] = updatedWishlistItems;
};

const update_wishlist_item = (itemId, updatedQuantity) => {
  const wishlistItems = get_wishlist_items();

  let wishlistItemToUpdate = wishlistItems.find(
    (item) => item.id === Number.parseInt(itemId)
  );

  wishlistItemToUpdate.quantity = updatedQuantity;

  const updatedWishlistItems = wishlistItems.map((item) =>
    item.id === wishlistItemToUpdate.id ? wishlistItemToUpdate : item
  );

  db["wishlist"] = updatedWishlistItems;

  return wishlistItemToUpdate;
};

module.exports = {
  initialise_db,
  get_target,
  update_target,
  get_items,
  get_item_by_id,
  get_wishlist_items,
  add_wishlist_item,
  remove_wishlist_item,
  update_wishlist_item,
};
