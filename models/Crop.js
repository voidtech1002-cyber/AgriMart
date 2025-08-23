const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const cropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },
    cropType: { type: String, required: true },
    userId: { type: String, required: true },
    cultivationSeason: { type: String },
    fertilizerUsed: { type: String },
    pesticidesUsed: { type: String },
    phone: { type: String },
    basePrice: { type: Number, required: true },
    minimumExpectedPrice: { type: Number },
    maximumExpectedPrice: { type: Number },
    marketRegion: { type: String },
    bidTimeLimit: { type: Date },
    healthScore: { type: Number, min: 0, max: 100 },
    files: [fileSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
