var express = require('express');
var router = express.Router();

var pokemonController = require("../controllers/pokemon-controller");

router.get("/", pokemonController.index);
router.get("/:id", pokemonController.show);
router.post("/", pokemonController.create);
router.put("/:id", pokemonController.update);
router.delete("/:id", pokemonController.destroy);

module.exports = router;
