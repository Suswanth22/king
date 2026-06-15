import PDFDocument from 'pdfkit';

export const exportPDF = (req, res) => {
  try {
    const { design, simulationData } = req.body;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${design.name}-report.pdf"`);

    doc.pipe(res);

    // Title
    doc.fontSize(24).text('Motor Design Report', 100, 50);
    doc.fontSize(12).text(`Design: ${design.name}`, 100, 100);
    doc.fontSize(10).text(`Created: ${new Date().toLocaleDateString()}`, 100, 120);

    // Specifications
    doc.fontSize(14).text('Motor Specifications', 100, 160);
    const specs = design.motorSpecs;
    doc.fontSize(10).text(`Power: ${specs.power} kW`, 100, 190);
    doc.fontSize(10).text(`Voltage: ${specs.voltage} V`, 100, 210);
    doc.fontSize(10).text(`Frequency: ${specs.frequency} Hz`, 100, 230);
    doc.fontSize(10).text(`Poles: ${specs.poles}`, 100, 250);
    doc.fontSize(10).text(`Efficiency: ${(specs.efficiency * 100).toFixed(2)}%`, 100, 270);

    // Simulation Results
    if (simulationData) {
      doc.fontSize(14).text('Simulation Results', 100, 320);
      doc.fontSize(10).text(`Simulation ID: ${simulationData.simulationId}`, 100, 350);
    }

    doc.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exportJSON = (req, res) => {
  try {
    const { design, simulationData } = req.body;

    const exportData = {
      design,
      simulationData,
      exportedAt: new Date(),
      version: '2.0.0'
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${design.name}-export.json"`);
    res.json(exportData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exportCAD = (req, res) => {
  try {
    const { design } = req.body;

    // Generate CAD-friendly data (STEP/IGES format data)
    const cadData = {
      modelName: design.name,
      motorType: 'AC Induction Motor',
      specifications: design.motorSpecs,
      dimensions: {
        frameSize: design.motorSpecs.frameSize || 'TBD',
        shaft: design.motorSpecs.shaftDiameter || 'TBD',
        length: design.motorSpecs.length || 'TBD'
      },
      materials: {
        stator: 'Silicon Steel',
        rotor: 'Aluminum Alloy',
        shaft: 'Steel',
        frame: 'Cast Iron'
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${design.name}-cad.json"`);
    res.json(cadData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
