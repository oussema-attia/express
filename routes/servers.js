var express = require("express");
var router = express.Router();
const Server = require("../models/Server");

const useFormatServer = (server) => {
  return {
    id: server._id,
    title: server.title,
    description: server.description,
    isActive: server.isActive,
  };
};

/* GET users listing. */
router.get("/", function (req, res, next) {
  Server.find()
    .then((servers) => {
      const roots = servers.map((server) => {
        return useFormatServer(server);
      });
      res.status(200).json(roots);
    })
    .catch((error) => res.status(400).json({ error }));
});

router.post("/", (req, res) => {
  const server = new Server({
    ...req.body,
  });
  server
    .save()
    .then((server) => res.status(201).json(useFormatServer(server)))
    .catch((error) => res.status(400).json({ error }));
});

router.get("/:id", (req, res, next) => {
  Server.findOne({ _id: req.params.id })
    .then((server) => res.status(200).json(useFormatServer(server)))
    .catch((error) => res.status(404).json({ error }));
});
router.put("/:id", (req, res) => {
  Server.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Server updated !" }))
    .catch((error) => res.status(400).json({ error }));
});

router.delete("/:id", (req, res) => {
  Server.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Server deleted !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
