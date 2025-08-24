const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  public_id: { type: String, required: true },
  url: { type: String, required: true },
});

const cropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true },          // Crop Name *
    type: { type: String },                              // Type
    variety: { type: String },                           // Variety
    quantityKg: { type: Number },                        // Quantity (kg)
    qualityGrade: { type: String },                      // Quality Grade
    startingPrice: { type: Number },                     // Starting Price
    location: { type: String },                          // Location
    description: { type: String },                       // Description
    farmerName: { type: String },                        // Farmer Name
    farmerContact: { type: String },                     // Farmer Contact
    healthScore: { type: Number, min: 0, max: 100 }, 
    files: [fileSchema],
    status: { 
      type: String, 
      enum: ["success", "failure", "pending"], 
      default: "success" 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);

