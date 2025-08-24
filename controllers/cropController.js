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
      url: file.path, // secure URL
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

// Get all crops for a specific user
exports.getAllCropsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // get userId from query params

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const crops = await Crop.find(query).sort({ createdAt: -1 });
    res.json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateCropByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;
    // console.log("update request called")
    // Find and update crop
    const updatedCrop = await Crop.findOneAndUpdate(
      { userId }, // filter by userId
      { $set: updateData }, // update fields
      { new: true } // return updated document
    );

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found for this userId" });
    }

    res.status(200).json({
      message: "Crop updated successfully",
      crop: updatedCrop,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating crop", error: error.message });
  }
};

