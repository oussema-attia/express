const Server = require("../models/Server");

const getServerResponse = (server) => {
  return {
    id: server._id,
    name: server.name,
    description: server.description,
    isActive: server.isActive,
  };
};

exports.getAllServers = (req, res, next) => {
  Server.find()
    .then((servers) => {
      const roots = servers.map((server) => {
        return getServerResponse(server);
      });
      res.status(200).json(roots);
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.createServer = (req, res) => {
  const server = new Server({
    ...req.body,
  });
  server
    .save()
    .then((server) => res.status(201).json(getServerResponse(server)))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneServer = (req, res, next) => {
  Server.findOne({ _id: req.params.id })
    .then((server) => res.status(200).json(getServerResponse(server)))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateServer = (req, res) => {
  Server.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Server updated !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteServer = (req, res) => {
  Server.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Server deleted !" }))
    .catch((error) => res.status(400).json({ error }));
};
