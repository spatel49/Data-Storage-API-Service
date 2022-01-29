const { ObjectID } = require("mongodb");
const mongoCollections = require("../config/mongoCollections");

async function getObjectById(repoName, id) {
  try {
    var objectId = new ObjectID(id);
  } catch (e) {
    throw "Id provided is not a valid Object ID.";
  }
  if (!objectId) throw "Id provided is not a valid Object ID.";
  const repoCollection = await mongoCollections.getCollectionFn(repoName)();
  const obj = await repoCollection.findOne({ _id: objectId });
  if (!obj) throw "No object found for specified id.";
  delete obj._id;
  return obj;
}

async function createObject(repoName, body) {
  if (!repoName) throw "You must provide a repository name";
  if (typeof repoName != "string" || !repoName.replace(/\s/g, "").length)
    throw "Name must be a nonempty string";

  const repoCollection = await mongoCollections.getCollectionFn(repoName)();
  const insertInfo = await repoCollection.insertOne(body);
  if (insertInfo.insertedCount === 0) throw "Could not add Repo";
  const newId = insertInfo.insertedId.toString();
  const output = {
    oid: newId,
    size: Object.keys(body).length,
  };
  return output;
}

async function removeObject(repoName, id) {
  const getObj = await getObjectById(repoName, id);
  var objectId = new ObjectID(id);
  const repoCollection = await mongoCollections.getCollectionFn(repoName)();
  const deletionInfo = await repoCollection.deleteOne({ _id: objectId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not object book with id of ${id}`;
  }
  let output = {};
  output.bookId = id;
  output.deleted = true;
  return output;
}

module.exports = {
  getObjectById,
  createObject,
  removeObject,
};
