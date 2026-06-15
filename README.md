# Motor-AI-Design v2.0

**Advanced AI-Powered Motor Design Engineer with NEMA/IEC Standards Compliance**

## 🎯 Overview

Motor-AI-Design is a comprehensive, full-stack web application for designing, simulating, and analyzing AC induction motors. It combines advanced engineering calculations with an intuitive interface for motor design optimization.

## ✨ Features

### 1. **Full-Stack Architecture**
- **Frontend**: Modern HTML/CSS/JavaScript with Three.js 3D visualization
- **Backend**: Node.js/Express REST API with comprehensive engineering algorithms
- **Real-time**: Instant calculations and performance analytics

### 2. **Motor Design Capabilities**
- **Specification Calculation**: Synchronous speed, torque, current, slip calculations
- **NEMA Standards**: US/Canada motor specifications and ratings
- **IEC Standards**: International motor design compliance
- **Parameter Validation**: Automatic validation of motor parameters

### 3. **Simulation & Analysis**
- **Load Analysis**: Full-range load simulation (0-100%)
- **Performance Curves**: Torque, efficiency, current, and power factor curves
- **Thermal Analysis**: Temperature rise and thermal behavior modeling
- **Real-time Charts**: Interactive Chart.js visualizations

### 4. **Advanced Features**
- **3D Visualization**: Three.js-based 3D motor model rendering
- **Export Functions**:
  - PDF Report Generation
  - JSON Data Export
  - CAD-compatible data export
- **Design History**: Save and manage multiple motor designs
- **Standards Reference**: Quick access to NEMA and IEC standards

## 📁 Project Structure

```
Motor-AI-Design/
├── server/
│   ├── index.js                 # Express app initialization
│   ├── routes/
│   │   ├── motor.js            # Motor calculation routes
│   │   ├── design.js           # Design management routes
│   │   ├── simulation.js       # Simulation routes
│   │   └── export.js           # Export routes
│   └── controllers/
│       ├── motorController.js  # Motor calculation logic
│       ├── designController.js # Design CRUD operations
│       ├── simulationController.js # Simulation algorithms
│       └── exportController.js # Export functionality
├── client/
│   ├── index.html              # Main HTML
│   ├── css/
│   │   └── style.css           # Styling (dark theme)
│   └── js/
│       └── app.js              # Frontend logic
├── package.json
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd Motor-AI-Design

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000 (when served via webpack-dev-server)
- **Backend API**: http://localhost:5000

### Development Mode

```bash
# Terminal 1: Start backend
npm run dev

# Terminal 2: Start frontend dev server
npm run dev:client
```

## 🔧 API Endpoints

### Motor Calculations
- `POST /api/motor/calculate` - Calculate motor specifications
- `GET /api/motor/standards/:standard` - Get NEMA/IEC standards
- `POST /api/motor/validate` - Validate motor parameters

### Design Management
- `POST /api/design` - Create new design
- `GET /api/design` - List all designs
- `GET /api/design/:id` - Get specific design
- `PUT /api/design/:id` - Update design
- `DELETE /api/design/:id` - Delete design

### Simulation
- `POST /api/simulation/run` - Run motor simulation
- `POST /api/simulation/performance-curves` - Generate performance curves
- `POST /api/simulation/thermal-analysis` - Perform thermal analysis

### Export
- `POST /api/export/pdf` - Export design as PDF
- `POST /api/export/json` - Export design as JSON
- `POST /api/export/cad` - Export CAD-compatible data

## 📊 Example Usage

### Calculate Motor Specifications
```bash
curl -X POST http://localhost:5000/api/motor/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "power": 15,
    "voltage": 460,
    "frequency": 60,
    "poles": 4,
    "efficiency": 0.92,
    "powerFactor": 0.92
  }'
```

### Run Simulation
```bash
curl -X POST http://localhost:5000/api/simulation/run \
  -H "Content-Type: application/json" \
  -d '{
    "motorSpecs": {
      "power": 15,
      "voltage": 460,
      "frequency": 60,
      "poles": 4,
      "efficiency": 0.92
    }
  }'
```

## 🎨 UI Features

- **Dark Theme**: Professional dark interface with amber/cyan accents
- **Responsive Tabs**: Design, Simulation, Analysis, 3D View, Export sections
- **Real-time Charts**: Interactive performance and thermal analysis visualizations
- **3D Motor Model**: Interactive 3D visualization using Three.js
- **Quick Actions**: One-click buttons for common operations
- **Standards Reference**: Easy access to NEMA/IEC specifications

## 📈 Performance Metrics

The system calculates:
- Synchronous and operating speeds
- Full-load current and torque
- Motor slip percentage
- Efficiency across load range
- Temperature rise over time
- Performance curves (torque, efficiency, current, PF)

## 🔐 Security Considerations

- CORS enabled for cross-origin requests
- Input validation on all endpoints
- Error handling throughout the application
- No sensitive data storage (current implementation)

## 📦 Dependencies

### Backend
- **Express**: Web framework
- **CORS**: Cross-origin support
- **PDFKit**: PDF report generation
- **Body-Parser**: Request body parsing

### Frontend
- **Three.js**: 3D visualization
- **Chart.js**: Interactive charts
- **D3.js**: (Optional) Advanced visualizations

## 🚧 Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] User authentication & design history
- [ ] Advanced thermal modeling
- [ ] Electromagnetic field simulation
- [ ] CAD model export (STEP/IGES)
- [ ] Multi-language support
- [ ] Mobile application
- [ ] Real-time collaboration features
- [ ] Machine learning for optimal design suggestions
- [ ] Integration with motor manufacturer databases

## 📝 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

Suswanth22

## 📧 Support

For issues, suggestions, or contributions, please open a GitHub issue.

---

**Motor-AI-Design v2.0** - Bringing advanced motor engineering to the web! ⚙️
