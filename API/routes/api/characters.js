const express = require("express");
const router = express.Router();

// Load Character Model
const Character = require("../../models/Character");

// @route  GET api/character/test
// @desc   Test character route
// @access Public
router.get("/test", (req, res) => res.json({ msg: "Characters Works" }));

// @route  GET api/characters
// @desc   Get all characters
// @access Public
router.get("/", (req, res) => {
  Character.find()
    .sort({ date: -1 })
    .then(characters => res.json(characters))
    .catch(() =>
      res.status(404).json({ nocharactersfound: "No characters found" })
    );
});

// @route  POST api/characters
// @desc   Create characters
// @access Public
router.post("/", (req, res) => {
  const newCharacter = new Character({
    name: req.body.name,
    icon: req.body.icon,
    life: req.body.life,
    defense: req.body.defense,
    attack: req.body.attack,
    speed: req.body.speed
  });

  newCharacter
    .save()
    .then(character => res.json(character))
    .catch(err => res.status(400).json(err));
});

module.exports = router;