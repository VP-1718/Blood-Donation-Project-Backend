const OrganDonor = require("../models/OrganDonor.model");

const registerOrganDonor = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      phone,
      email,
      address,
      emergencyContact,
      medicalConditions,
      organPreferences,
      consent
    } = req.body;

    if (!consent) {
      return res.status(400).json({ message: "Consent is required for registration." });
    }

    const newDonor = new OrganDonor({
      fullName,
      dateOfBirth,
      phone,
      email,
      address,
      emergencyContact,
      medicalConditions,
      organPreferences,
      consent
    });

    await newDonor.save();

    res.status(201).json({ message: "Organ donor registered successfully", donor: newDonor });
  } catch (error) {
    console.error("Error registering organ donor:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOrganDonors = async (req, res) => {
    const { location, organ } = req.query;
  
    try {
      const filter = {
        organDonor: true,
        ...(location && { location }),
        ...(organ && { organs: organ }), // checks if 'organ' is in organs array
      };
  
      const donors = await OrganDonor.find(filter);
      console.log('executed successfully');
      console.log(donors);
      res.json(donors);
    } catch (error) {
      console.error("Error fetching organ donors:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = {registerOrganDonor, getOrganDonors};