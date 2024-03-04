const mongoose = require('mongoose');

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure each building has a unique name
  }
});

const Building = mongoose.model('Building', buildingSchema);

// Insert predefined buildings into the database
const insertPredefinedBuildings = async () => {
    const predefinedBuildings = [
        { name: 'ST. LA SALLE HALL' },
        { name: 'GOKONGWEI HALL' },
        { name: 'YUCHENGCO HALL' },
        { name: 'VELASCO HALL' },
        { name: 'ST JOSEPH HALL' }
    ];

    try {
        for (const buildingData of predefinedBuildings) {
        const existingBuilding = await Building.findOne({ name: buildingData.name });
        if (!existingBuilding) {
            await Building.create(buildingData);
        }
        }
        console.log('Predefined buildings inserted successfully');
    } catch (err) {
        console.error('Error inserting predefined buildings:', err);
    }
};

// Call the function to insert predefined buildings
insertPredefinedBuildings();

module.exports = Building;
