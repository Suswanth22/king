// Motor Performance Simulation
export const runSimulation = (req, res) => {
  try {
    const { motorSpecs, loadProfile } = req.body;
    const { power, voltage, frequency, poles, efficiency } = motorSpecs;

    if (!power || !voltage) {
      return res.status(400).json({ error: 'Missing motor specifications' });
    }

    // Simulate motor operation across load range
    const results = [];
    for (let load = 0; load <= 100; load += 10) {
      const loadPercentage = load / 100;
      const loadPower = power * loadPercentage;
      const efficiencyAtLoad = efficiency * (0.8 + 0.2 * loadPercentage); // Efficiency varies with load
      const current = (loadPower * 1000) / (voltage * Math.sqrt(3) * efficiencyAtLoad * 0.95);
      const powerLoss = loadPower * (1 - efficiencyAtLoad);

      results.push({
        load: load,
        power: loadPower.toFixed(2),
        efficiency: (efficiencyAtLoad * 100).toFixed(2),
        current: current.toFixed(2),
        powerLoss: powerLoss.toFixed(2),
        temperature_rise: (20 + 50 * loadPercentage).toFixed(2) // °C
      });
    }

    res.json({
      simulationId: `SIM-${Date.now()}`,
      duration: 'Full Load Range Analysis',
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Performance Curves
export const getPerformanceCurves = (req, res) => {
  try {
    const { motorSpecs } = req.body;
    const { power, efficiency } = motorSpecs;

    // Generate performance curve data
    const curves = {
      torque: [],
      efficiency: [],
      current: [],
      powerFactor: []
    };

    for (let slip = 0; slip <= 0.1; slip += 0.01) {
      curves.torque.push((power * (1 - slip)).toFixed(2));
      curves.efficiency.push((efficiency * (1 - slip * 2)).toFixed(3));
      curves.current.push((100 + slip * 500).toFixed(2));
      curves.powerFactor.push((0.9 - slip * 0.2).toFixed(2));
    }

    res.json(curves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Thermal Analysis
export const analyzeThermalBehavior = (req, res) => {
  try {
    const { motorSpecs, ambientTemp = 40, duration = 3600 } = req.body;
    const { power, efficiency } = motorSpecs;

    // Simulate temperature rise over time
    const thermalTimeConstant = 1200; // seconds
    const maxTempRise = 50 * (1 - efficiency); // °C

    const thermalProfile = [];
    for (let t = 0; t <= duration; t += 300) {
      const tempRise = maxTempRise * (1 - Math.exp(-t / thermalTimeConstant));
      thermalProfile.push({
        time: t,
        temperature: (ambientTemp + tempRise).toFixed(2),
        tempRise: tempRise.toFixed(2)
      });
    }

    res.json({
      ambientTemperature: ambientTemp,
      maxTempRise: maxTempRise.toFixed(2),
      thermalTimeConstant: thermalTimeConstant,
      profile: thermalProfile
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
