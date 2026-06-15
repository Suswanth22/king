const API_URL = 'http://localhost:5000/api';

let currentDesign = null;
let currentSimulation = null;
let charts = {};

// Tab Switching
function switchTab(index) {
  const panels = document.querySelectorAll('.tab-panel');
  const tabs = document.querySelectorAll('.tab');
  
  panels.forEach(p => p.classList.remove('active'));
  tabs.forEach(t => t.classList.remove('active'));
  
  panels[index].classList.add('active');
  tabs[index].classList.add('active');
  
  if (index === 3) {
    init3DView();
  }
}

// Get motor specifications from form
function getMotorSpecs() {
  return {
    power: parseFloat(document.getElementById('power').value),
    voltage: parseFloat(document.getElementById('voltage').value),
    frequency: parseFloat(document.getElementById('frequency').value),
    poles: parseFloat(document.getElementById('poles').value),
    efficiency: parseFloat(document.getElementById('efficiency').value),
    powerFactor: parseFloat(document.getElementById('powerFactor').value)
  };
}

// Calculate Motor Specifications
async function calculateSpecs() {
  try {
    const specs = getMotorSpecs();
    const response = await fetch(`${API_URL}/motor/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(specs)
    });
    
    const result = await response.json();
    
    if (response.ok) {
      currentDesign = { motorSpecs: specs, calculations: result };
      displayCalculations(result);
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error calculating specs:', error);
    alert('Failed to calculate specifications');
  }
}

function displayCalculations(result) {
  const output = document.getElementById('design-output');
  output.innerHTML = `
    <div class="resp-section">
      <div class="resp-section-hdr hdr-amber">⚙️ CALCULATION RESULTS</div>
      <div class="resp-section-body">
        <table class="data-table">
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Unit</th>
          </tr>
          <tr>
            <td>Synchronous Speed</td>
            <td class="val">${result.syncSpeed}</td>
            <td>RPM</td>
          </tr>
          <tr>
            <td>Operating Speed</td>
            <td class="val">${result.rotorSpeed}</td>
            <td>RPM</td>
          </tr>
          <tr>
            <td>Full Load Current</td>
            <td class="val">${result.current}</td>
            <td>A</td>
          </tr>
          <tr>
            <td>Torque</td>
            <td class="val">${result.torque}</td>
            <td>N·m</td>
          </tr>
          <tr>
            <td>Slip</td>
            <td class="val">${result.slip}</td>
            <td>%</td>
          </tr>
        </table>
      </div>
    </div>
  `;
}

// Run Simulation
async function runSimulation() {
  try {
    const specs = getMotorSpecs();
    const response = await fetch(`${API_URL}/simulation/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motorSpecs: specs })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      currentSimulation = result;
      displaySimulationChart(result.results);
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error running simulation:', error);
    alert('Failed to run simulation');
  }
}

function displaySimulationChart(results) {
  const ctx = document.getElementById('simulationChart');
  
  if (charts.simulation) {
    charts.simulation.destroy();
  }
  
  const labels = results.map(r => r.load + '%');
  const powerData = results.map(r => parseFloat(r.power));
  const efficiencyData = results.map(r => parseFloat(r.efficiency));
  const currentData = results.map(r => parseFloat(r.current));
  
  charts.simulation = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Power (kW)',
          data: powerData,
          borderColor: '#f5a623',
          backgroundColor: 'rgba(245,166,35,0.1)',
          tension: 0.4
        },
        {
          label: 'Efficiency (%)',
          data: efficiencyData,
          borderColor: '#2ddf7a',
          backgroundColor: 'rgba(45,223,122,0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#c8dff0' }
        }
      },
      scales: {
        y: {
          ticks: { color: '#c8dff0' },
          grid: { color: 'rgba(30,72,107,0.2)' }
        },
        x: {
          ticks: { color: '#c8dff0' },
          grid: { color: 'rgba(30,72,107,0.2)' }
        }
      }
    }
  });
}

// Thermal Analysis
async function analyzeThermal() {
  try {
    const specs = getMotorSpecs();
    const response = await fetch(`${API_URL}/simulation/thermal-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ motorSpecs: specs, ambientTemp: 40 })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      displayThermalChart(result.profile);
    } else {
      alert('Error: ' + result.error);
    }
  } catch (error) {
    console.error('Error analyzing thermal behavior:', error);
    alert('Failed to analyze thermal behavior');
  }
}

function displayThermalChart(profile) {
  const ctx = document.getElementById('thermalChart');
  
  if (charts.thermal) {
    charts.thermal.destroy();
  }
  
  const labels = profile.map(p => (p.time / 60).toFixed(1) + ' min');
  const tempData = profile.map(p => parseFloat(p.temperature));
  
  charts.thermal = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: tempData,
          borderColor: '#ff4040',
          backgroundColor: 'rgba(255,64,64,0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: { color: '#c8dff0' }
        }
      },
      scales: {
        y: {
          ticks: { color: '#c8dff0' },
          grid: { color: 'rgba(30,72,107,0.2)' },
          min: 40,
          max: 100
        },
        x: {
          ticks: { color: '#c8dff0' },
          grid: { color: 'rgba(30,72,107,0.2)' }
        }
      }
    }
  });
}

// 3D Visualization
function init3DView() {
  const container = document.getElementById('canvas3d');
  if (!container || container.children.length > 0) return;
  
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060a0f);
  
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;
  
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);
  
  // Create motor body
  const bodyGeometry = new THREE.CylinderGeometry(2, 2, 4, 32);
  const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  scene.add(body);
  
  // Create shaft
  const shaftGeometry = new THREE.CylinderGeometry(0.3, 0.3, 5, 16);
  const shaftMaterial = new THREE.MeshPhongMaterial({ color: 0x404040 });
  const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
  scene.add(shaft);
  
  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);
  
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    body.rotation.y += 0.01;
    shaft.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

// Export Functions
async function exportDesignPDF() {
  if (!currentDesign || !currentSimulation) {
    alert('Please run calculations and simulation first');
    return;
  }
  
  const response = await fetch(`${API_URL}/export/pdf`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ design: currentDesign, simulationData: currentSimulation })
  });
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'motor-design-report.pdf';
  a.click();
}

async function exportDesignJSON() {
  if (!currentDesign) {
    alert('Please run calculations first');
    return;
  }
  
  const response = await fetch(`${API_URL}/export/json`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ design: currentDesign, simulationData: currentSimulation })
  });
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'motor-design-export.json';
  a.click();
}

async function exportCADData() {
  if (!currentDesign) {
    alert('Please run calculations first');
    return;
  }
  
  const response = await fetch(`${API_URL}/export/cad`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ design: currentDesign })
  });
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'motor-cad-export.json';
  a.click();
}

// Utility Functions
function showDimensions() {
  alert('Dimensions feature - to be implemented with motor database');
}

function export3D() {
  switchTab(3);
}

async function loadStandard(standard) {
  try {
    const response = await fetch(`${API_URL}/motor/standards/${standard}`);
    const data = await response.json();
    console.log(`${standard} Standards:`, data);
    alert(`${standard} Standards loaded. Check console for details.`);
  } catch (error) {
    console.error('Error loading standards:', error);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Motor-AI-Design v2.0 loaded');
});
