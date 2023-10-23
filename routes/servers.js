var express = require("express");
var router = express.Router();
const serverCtrl = require("../controllers/server");
const auth = require('../middleware/auth');

router.get("/", serverCtrl.getAllServers);

router.post("/", serverCtrl.createServer);

router.get("/:id", serverCtrl.getOneServer);

router.put("/:id", serverCtrl.updateServer);

router.delete("/:id", serverCtrl.deleteServer);

module.exports = router;
