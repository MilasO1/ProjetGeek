const Ad = require("../models/Annonce");
const connectDb = require("../config/db");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//Récuperer les annonces
exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ad.find();
    res.status(200).json(ads);
  } catch (error) {
    res.status(500).json({
      message: `Erreur lors de la récupération des annonces`,
      error,
    });
  }
};

//Créer une annonce
exports.createAd = async (req, res) => {
  const { categorie, title, description, type, price } = req.body;
  try {
    if (type === "vente" && !(price >= 0)) {
      return res
        .status(400)
        .json({ message: "Les prix est requis pour cette annonce" });
    }
    let urlImage = "";
    // upload image
    if (!req.file) {
      return res.status(400).json({ error: "No file uploades" });
    }
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "images",
    });

    urlImage = uploadResult.secure_url;

    fs.unlinkSync(req.file.path);

    const newAd = await Ad.create({
      categorie,
      title,
      description,
      type,
      price,
      urlImage,
    });
    res.status(201).json(newAd);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'annonce",
      error: `${error}`,
    });
  }
};

// Détails de l'annonce
exports.getAdDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const ad = await Ad.findById(id);
    if (ad) res.status(200).json(annonce);
    else res.status(404).json({ message: "Ad not found" });
  } catch (error) {
    res.status(500).json({ message: `Erreur lors de la connexion`, error });
  }
};

// Supprimer annonces
exports.removeAd = async (req, res) => {
  try {
    const { id } = req.params;
    const annonce = await Ad.findByIdAndDelete(id);
    res.status(200).json({ message: `Annonce supprimé`, annonce });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Erreur lors de la suppression de l'annonce`, err });
  }
};
