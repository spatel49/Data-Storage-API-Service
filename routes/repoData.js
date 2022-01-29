const express = require("express");
const router = express();
const data = require("../data");
const repoData = data.repos;
router.use(express.json());

router.get("/:repo/:id", async (req, res) => {
  if (!req.params.repo) {
    res.status(400).json({ error: "You must provide repo name" });
    return;
  }
  if (!req.params.id) {
    res.status(400).json({ error: "You must provide an object id" });
    return;
  }
  try {
    const repo = await repoData.getObjectById(req.params.repo, req.params.id);
    res.status(200).json(repo);
  } catch (e) {
    res.status(404).json({ error: "Repo not found" });
  }
});

router.put("/:repo", async (req, res) => {
  if (!req.params.repo) {
    res.status(400).json({ error: "You must provide repo name" });
    return;
  }
  const postData = req.body;
  if (!postData) {
    res.status(400).json({ error: "You must provide repo body" });
    return;
  }
  try {
    const output = await repoData.createObject(req.params.repo, postData);
    res.status(201).send(output);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/:repo/:id", async (req, res) => {
  if (!req.params.repo) {
    res.status(400).json({ error: "You must provide repo name" });
    return;
  }
  if (!req.params.id) {
    res.status(400).json({ error: "You must provide an object id" });
    return;
  }
  try {
    const repo = await repoData.removeObject(req.params.repo, req.params.id);
    res.status(200).send("");
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
