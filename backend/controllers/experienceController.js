import Experience from '../models/Experience.js';

// Get all experiences
export const getAllExperiences = async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;
    
    let filter = {};
    if (category) {
      filter.category = category;
    }
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = Number(minPrice);
      if (maxPrice) filter.basePrice.$lte = Number(maxPrice);
    }

    const experiences = await Experience.find(filter);
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single experience by ID
export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }
    
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

