/**
 * Coordinate Converter Component
 * Converts between polar and rectangular coordinates
 */

class CoordinateConverter {
  constructor() {
    this.currentMode = 'polar-to-rect';
    this.init();
  }

  init() {
    this.bindModeToggle();
    this.bindConvertButton();
    this.bindInputEvents();
    this.bindNavigationEvent();
  }

  /**
   * Bind navigation event for coordinates section
   */
  bindNavigationEvent() {
    const coordNavBtn = document.querySelector('[data-section="coordinates"]');
    if (coordNavBtn) {
      coordNavBtn.addEventListener('click', () => {
        // Clear previous results when entering section
        this.clearResult();
      });
    }
  }

  /**
   * Bind mode toggle buttons
   */
  bindModeToggle() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.dataset.mode;
        this.switchMode(mode);
      });
    });
  }

  /**
   * Switch between conversion modes
   */
  switchMode(mode) {
    this.currentMode = mode;
    
    // Update button states
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Update input groups
    document.querySelectorAll('.input-group').forEach(group => {
      group.classList.remove('active');
    });
    
    if (mode === 'polar-to-rect') {
      document.getElementById('polar-inputs').classList.add('active');
    } else {
      document.getElementById('rect-inputs').classList.add('active');
    }
    
    // Clear result
    this.clearResult();
  }

  /**
   * Bind convert button
   */
  bindConvertButton() {
    const convertBtn = document.getElementById('coordinate-convert');
    if (convertBtn) {
      convertBtn.addEventListener('click', () => {
        this.performConversion();
      });
    }
  }

  /**
   * Bind input events for real-time conversion
   */
  bindInputEvents() {
    const inputs = document.querySelectorAll('#polar-r, #polar-theta, #rect-x, #rect-y');
    
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Auto-convert if all required fields are filled
        setTimeout(() => this.checkAutoConvert(), 100);
      });
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.performConversion();
        }
      });
    });
  }

  /**
   * Check if auto-conversion should be performed
   */
  checkAutoConvert() {
    if (this.currentMode === 'polar-to-rect') {
      const r = document.getElementById('polar-r').value;
      const theta = document.getElementById('polar-theta').value;
      if (r && theta) {
        this.performConversion();
      }
    } else {
      const x = document.getElementById('rect-x').value;
      const y = document.getElementById('rect-y').value;
      if (x && y) {
        this.performConversion();
      }
    }
  }

  /**
   * Perform the coordinate conversion
   */
  performConversion() {
    try {
      let result;
      
      if (this.currentMode === 'polar-to-rect') {
        result = this.polarToRectangular();
      } else {
        result = this.rectangularToPolar();
      }
      
      this.displayResult(result);
      
    } catch (error) {
      this.displayError('Invalid input values');
      console.error('Conversion error:', error);
    }
  }

  /**
   * Convert polar to rectangular coordinates
   */
  polarToRectangular() {
    const r = parseFloat(document.getElementById('polar-r').value);
    const thetaDegrees = parseFloat(document.getElementById('polar-theta').value);
    
    if (isNaN(r) || isNaN(thetaDegrees)) {
      throw new Error('Invalid input values');
    }
    
    const thetaRadians = (thetaDegrees * Math.PI) / 180;
    const x = r * Math.cos(thetaRadians);
    const y = r * Math.sin(thetaRadians);
    
    return {
      type: 'rectangular',
      x: this.round(x),
      y: this.round(y),
      display: `(${this.round(x)}, ${this.round(y)})`
    };
  }

  /**
   * Convert rectangular to polar coordinates
   */
  rectangularToPolar() {
    const x = parseFloat(document.getElementById('rect-x').value);
    const y = parseFloat(document.getElementById('rect-y').value);
    
    if (isNaN(x) || isNaN(y)) {
      throw new Error('Invalid input values');
    }
    
    const r = Math.sqrt(x * x + y * y);
    const thetaRadians = Math.atan2(y, x);
    const thetaDegrees = (thetaRadians * 180) / Math.PI;
    
    return {
      type: 'polar',
      r: this.round(r),
      theta: this.round(thetaDegrees),
      display: `${this.round(r)}∠${this.round(thetaDegrees)}°`
    };
  }

  /**
   * Round number to specified decimal places
   */
  round(val, decimals = 2) {
    return Math.round(val * 10 ** decimals) / 10 ** decimals;
  }

  /**
   * Display conversion result
   */
  displayResult(result) {
    const resultElement = document.getElementById('result-text');
    if (resultElement) {
      resultElement.textContent = result.display;
      resultElement.className = 'result-value success';
      
      // Add copy functionality
      resultElement.style.cursor = 'pointer';
      resultElement.title = 'Click to copy';
      
      resultElement.onclick = () => {
        navigator.clipboard.writeText(result.display).then(() => {
          const originalText = resultElement.textContent;
          resultElement.textContent = 'Copied!';
          setTimeout(() => {
            resultElement.textContent = originalText;
          }, 1000);
        }).catch(err => {
          console.error('Failed to copy:', err);
        });
      };
    }
  }

  /**
   * Display error message
   */
  displayError(message) {
    const resultElement = document.getElementById('result-text');
    if (resultElement) {
      resultElement.textContent = message;
      resultElement.className = 'result-value error';
      resultElement.style.cursor = 'default';
      resultElement.onclick = null;
      resultElement.title = '';
    }
  }

  /**
   * Clear result display
   */
  clearResult() {
    const resultElement = document.getElementById('result-text');
    if (resultElement) {
      resultElement.textContent = 'Enter values and click Convert';
      resultElement.className = 'result-value';
      resultElement.style.cursor = 'default';
      resultElement.onclick = null;
      resultElement.title = '';
    }
  }
}

// Initialize the coordinate converter when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const coordinateConverter = new CoordinateConverter();
  
  // Make it globally accessible for debugging
  window.coordinateConverter = coordinateConverter;
  
  console.log('Coordinate Converter initialized');
});
