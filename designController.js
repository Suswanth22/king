// In-memory storage (replace with database in production)
let designs = [];
let designIdCounter = 1;

export const createDesign = (req, res) => {
  try {
    const { name, description, motorSpecs, standard } = req.body;

    if (!name || !motorSpecs) {
      return res.status(400).json({ error: 'Name and motorSpecs are required' });
    }

    const newDesign = {
      id: designIdCounter++,
      name,
      description,
      motorSpecs,
      standard,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    designs.push(newDesign);
    res.status(201).json(newDesign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDesigns = (req, res) => {
  try {
    res.json(designs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDesignById = (req, res) => {
  try {
    const design = designs.find(d => d.id === parseInt(req.params.id));
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    res.json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDesign = (req, res) => {
  try {
    const design = designs.find(d => d.id === parseInt(req.params.id));
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    Object.assign(design, req.body, { updatedAt: new Date() });
    res.json(design);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDesign = (req, res) => {
  try {
    const index = designs.findIndex(d => d.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).json({ error: 'Design not found' });
    }

    const deletedDesign = designs.splice(index, 1);
    res.json({ message: 'Design deleted', design: deletedDesign[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
