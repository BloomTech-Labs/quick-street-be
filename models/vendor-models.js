const db = require("../data/db-config");

module.exports = {
  findBy,
  add,
  find,
  addVendorProduct,
  findVendorProducts,
  findVendorPosts,
  updateVendor,
  deleteVendor,
};

function findBy(filter) {
  return db("users as u")
    .join("vendors as v", "u.id", "v.users_id")
    .select("v.*")
    .where({ "u.id": filter });
}

function findVendorPosts(user_id) {
  return db("posts as p")
  .join("vendors as v", "v.id", "p.vendors_id")
  .join("users as u", "u.id", "v.users_id")
  .where({ "u.id" : user_id })
  .select("p.*");
}

function updateVendor(users_id, data) {
   return db("vendors as v")
   .where({ "v.users_id": users_id })
   .update(data, ["v.*"])
   .returning("v.*")
}

function findVendorProducts(filter) {
  return db("users as u")
    .join("vendors as v", "u.id", "v.users_id")
    .join("products as p", "v.id", "p.vendor_id")
    .select("p.*")
    .where({ "u.id": filter });
}
//product update
function addVendorProduct(data) {
// return db("products as p")
// .join("vendors as v", "v.id", "p.vendors_id")
// .where({"u.id": })

  return db("products").insert(data).returning("*");
}

function deleteVendor(id) {
  return db("vendors").where({ id }).del();
}

function add(newVendor) {
  return db("vendors").insert(newVendor);
}

function find() {
  return db("vendors").select("*");
}

