const Pastpaper = require('../models/pastpaper');

exports.getPastpaper = async (req, res) => {
  const pastpapers = await Pastpaper.find();
  res.status(200).json({ pastpapers });
};

exports.postPastpaper = async (req, res) => {
  const { name } = req.body;
  const paperPath = 'http://localhost:3000/pastpapers/' + req.file.filename; // Note: set path dynamically
  const pastpaper = new Pastpaper({
    name,
    paperPath,
  });
  const createdPastpaper = await pastpaper.save();
  res.status(201).json({
    pastpaper: {
      ...createdPastpaper._doc,
    },
  });
};

//console.log(paperPath)