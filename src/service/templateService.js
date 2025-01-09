const { Template } = require("../dbModel/template/schema");

// Function to create a new Template 
const createTemplate = async (templateObj) => {
  try {
    const newTemplate = new Template(templateObj);
    await newTemplate.save();
    return newTemplate;
  } catch (error) {
    console.error('Error creating Template:', error);
    throw error;
  }
};

module.exports = {
    createTemplate
};
