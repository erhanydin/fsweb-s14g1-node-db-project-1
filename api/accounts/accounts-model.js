const db = require("../../data/db-config");


const getAll = () => {
  // KODLAR BURAYA
  const accounts = db.select("*").from('accounts');
  return accounts;
}

const getById = id => {
  // KODLAR BURAYA
  const accountById = db('accounts').where('id', id);
  return accountById;
}

const create = account => {
  // KODLAR BURAYA
  const insertedAccount = db("accounts").insert(account).then(id => {
    return getById(id);
  });
  return insertedAccount;
}

const updateById = (id, account) => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).update(account).then(record => {
    return getById(id);
  })
}

const deleteById = id => {
  // KODLAR BURAYA
  return db("accounts").where("id", id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
