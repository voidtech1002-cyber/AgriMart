const Crop = require("../models/Crop");

exports.createCrop = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image is required.",
      });
    }

    const fileData = req.files.map((file) => ({
      public_id: file.filename, // Cloudinary assigns this
      url: file.path,           // secure URL
    }));

    const crop = new Crop({
      ...req.body,
      files: fileData,
    });

    await crop.save();

    res.status(201).json({ success: true, data: crop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const crop = await Crop.findById(id);

    if (!crop) {
      return res.status(404).json({
        success: false,
        message: "Crop not found",
      });
    }

    res.json({ success: true, data: crop });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
