// Motor Specification Calculations
export const calculateMotorSpecs = (req, res) => {
  try {
    const { power, voltage, frequency, poles, efficiency, powerFactor } = req.body;

    if (!power || !voltage || !frequency || !poles) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Calculate motor specifications
    const syncSpeed = (120 * frequency) / poles;
    const current = (power * 1000) / (voltage * Math.sqrt(3) * (efficiency || 0.85) * (powerFactor || 0.9));
    const torque = (power * 1000 * 9.55) / syncSpeed;
    const slip = ((syncSpeed - syncSpeed * 0.95) / syncSpeed) * 100; // Assuming 95% running speed

    res.json({
      syncSpeed: syncSpeed.toFixed(2),
      current: current.toFixed(2),
      torque: torque.toFixed(2),
      slip: slip.toFixed(2),
      rotorSpeed: (syncSpeed * (1 - slip / 100)).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get NEMA/IEC Standards
export const getMotorStandards = (req, res) => {
  const standards = {
    NEMA: {
      efficiency_classes: ['Standard', 'High (NEMA Premium®)', 'Ultra-High'],
      voltage_ratings: [208, 230, 460, 575],
      frame_sizes: ['56', '66', '143T', '145T', '180T', '184T', '213T', '215T'],
      duty_cycles: ['S1-Continuous', 'S2-Short Time', 'S3-Intermittent', 'S4-Intermittent Periodic']
    },
    IEC: {
      efficiency_classes: ['IE1 (Standard)', 'IE2 (High)', 'IE3 (Premium)', 'IE4 (Super-Premium)'],
      voltage_ratings: [220, 230, 380, 400, 415, 460, 500],
      frame_sizes: ['63', '71', '80', '90', '100', '112', '132', '160'],
      duty_cycles: ['S1-Continuous', 'S2-Short Time', 'S3-Intermittent', 'S4-Intermittent Periodic', 'S5-Electric Braking']
    }
  };

  const standard = req.params.standard.toUpperCase();
  if (standards[standard]) {
    res.json(standards[standard]);
  } else {
    res.status(404).json({ error: 'Standard not found' });
  }
};

// Validate Motor Parameters
export const validateMotorParameters = (req, res) => {
  try {
    const { power, voltage, frequency, poles, efficiency } = req.body;
    const errors = [];

    if (power < 0.5 || power > 1000) errors.push('Power must be between 0.5 kW and 1000 kW');
    if (![50, 60].includes(frequency)) errors.push('Frequency must be 50 Hz or 60 Hz');
    if (![2, 4, 6, 8, 10, 12].includes(poles)) errors.push('Poles must be 2, 4, 6, 8, 10, or 12');
    if (efficiency < 0.7 || efficiency > 0.98) errors.push('Efficiency must be between 0.7 and 0.98');

    if (errors.length > 0) {
      return res.json({ valid: false, errors });
    }

    res.json({ valid: true, message: 'Parameters are valid' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
