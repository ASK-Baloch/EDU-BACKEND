import School from "../models/school.js";

// 1. Register a new school
export const registerSchool = async (req, res) => {
    const { schoolName, address, email, password, contactNumber, principalName } = req.body;
  
    if (!schoolName || !address || !email || !password || !contactNumber || !principalName) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    try {
      const existingSchool = await School.findOne({ email });
      if (existingSchool) {
        return res.status(400).json({ message: "School with this email already exists." });
      }
  
      const newSchool = new School({
        schoolName,
        address,
        email,
        password,
        contactNumber,
        principalName,
      });
  
      await newSchool.save();
  
      res.status(201).json({ message: "School registered successfully.", school: newSchool });
    } catch (error) {
      res.status(500).json({ message: "Failed to register school.", error: error.message });
    }
  };

// 2. Get all registered schools
export const getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.status(200).json(schools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching schools: " + error.message });
  }
};

// 3. Make a school active or inactive
export const updateSchoolStatus = async (req, res) => {
    const { id } = req.params; // Use the ID from the route parameter
    const { isActive } = req.body; // Boolean to set status
  
    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "Invalid isActive value. Must be a boolean." });
    }
  
    try {
      const school = await School.findByIdAndUpdate(id, { isActive }, { new: true });
      if (!school) {
        return res.status(404).json({ message: "School not found." });
      }
      res.status(200).json({ message: "School status updated successfully.", school });
    } catch (error) {
      res.status(500).json({ message: "Error updating school status: " + error.message });
    }
  };
  

// 4. List all active schools
export const getActiveSchools = async (req, res) => {
  try {
    const activeSchools = await School.find({ isActive: true });
    res.status(200).json(activeSchools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active schools: " + error.message });
  }
};

// 5. List all inactive schools
export const getInactiveSchools = async (req, res) => {
  try {
    const inactiveSchools = await School.find({ isActive: false });
    res.status(200).json(inactiveSchools);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inactive schools: " + error.message });
  }
};