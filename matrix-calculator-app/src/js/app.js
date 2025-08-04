/**
 * Matrix Calculator Application - Main Entry Point
 * Frontend Code Generation Agent Implementation
 * 
 * Initializes the application, manages global state, and coordinates between components
 * Following modern JavaScript patterns and error handling best practices
 */

class MatrixCalculatorApp {
  constructor() {
    this.version = '1.0.0';
    this.debug = process?.env?.NODE_ENV === 'development';
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    console.log('🚀 Matrix Calculator App v' + this.version + ' starting...');
    
    try {
      this.setupGlobalErrorHandling();
      this.setupServiceWorker();
      this.loadEnvironmentConfig();
      this.initializeComponents();
      this.setupAnalytics();
      
      console.log('✅ Matrix Calculator App initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize app:', error);
      this.handleCriticalError(error);
    }
  }

  /**
   * Setup global error handling
   */
  setupGlobalErrorHandling() {
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error);
      this.handleError(event.error, 'Global Error');
    });

    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.handleError(event.reason, 'Unhandled Promise Rejection');
    });
  }

  /**
   * Setup service worker for offline functionality (if available)
   */
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
  }

  /**
   * Load environment configuration
   */
  loadEnvironmentConfig() {
    // In a real application, this would load from environment variables
    this.config = {
      apiBaseUrl: 'http://localhost:8080/api',
      enableAnalytics: false,
      enableDebugMode: true,
      maxMatrixSize: 10,
      calculationTimeout: 30000
    };

    if (this.debug) {
      console.log('📋 App configuration:', this.config);
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    // UI Handler is already initialized via DOMContentLoaded in ui-handler.js
    // Additional component initialization can go here
    
    this.setupKeyboardShortcuts();
    this.setupThemeToggle();
    this.setupAccessibilityFeatures();
  }

  /**
   * Setup keyboard shortcuts
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to calculate
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.triggerCalculation();
      }
      
      // Ctrl/Cmd + R to clear (prevent page refresh)
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        this.clearAll();
      }
      
      // ESC to clear results
      if (e.key === 'Escape') {
        this.clearResults();
      }
    });
  }

  /**
   * Setup theme toggle functionality
   */
  setupThemeToggle() {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      }
    });
  }

  /**
   * Setup additional accessibility features
   */
  setupAccessibilityFeatures() {
    // Skip to content link
    this.createSkipLink();
    
    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      document.body.classList.add('high-contrast');
    }
    
    // Reduced motion detection
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.body.classList.add('reduced-motion');
    }
  }

  /**
   * Create skip to content link for screen readers
   */
  createSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-color);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 1000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  /**
   * Setup analytics (if enabled)
   */
  setupAnalytics() {
    if (this.config.enableAnalytics) {
      // Initialize analytics service
      console.log('📊 Analytics initialized');
    }
  }

  /**
   * Trigger calculation based on active section
   */
  triggerCalculation() {
    const matrixSection = document.getElementById('matrix-input-container');
    const equationSection = document.getElementById('equation-input-container');
    
    if (matrixSection && matrixSection.style.display !== 'none') {
      const calculateBtn = document.getElementById('calculate-matrix');
      if (calculateBtn) calculateBtn.click();
    } else if (equationSection && equationSection.style.display !== 'none') {
      const solveBtn = document.getElementById('solve-equation');
      if (solveBtn) solveBtn.click();
    }
  }

  /**
   * Clear all inputs and results
   */
  clearAll() {
    const clearMatrixBtn = document.getElementById('clear-matrix');
    const clearEquationBtn = document.getElementById('clear-equation');
    
    if (clearMatrixBtn) clearMatrixBtn.click();
    if (clearEquationBtn) clearEquationBtn.click();
  }

  /**
   * Clear only results
   */
  clearResults() {
    const matrixResults = document.getElementById('matrix-results');
    const equationResults = document.getElementById('equation-results');
    
    if (matrixResults) matrixResults.style.display = 'none';
    if (equationResults) equationResults.style.display = 'none';
  }

  /**
   * Handle application errors
   */
  handleError(error, context = 'Application Error') {
    console.error(`${context}:`, error);
    
    // Show user-friendly error message
    this.showErrorNotification(`${context}: ${error.message}`);
    
    // Track error for analytics (if enabled)
    if (this.config.enableAnalytics) {
      this.trackError(error, context);
    }
  }

  /**
   * Handle critical errors that prevent app from functioning
   */
  handleCriticalError(error) {
    const errorContainer = document.createElement('div');
    errorContainer.className = 'critical-error';
    errorContainer.innerHTML = `
      <div class="error-content">
        <h2>⚠️ Application Error</h2>
        <p>The Matrix Calculator encountered a critical error and cannot continue.</p>
        <details>
          <summary>Error Details</summary>
          <pre>${error.stack || error.message}</pre>
        </details>
        <button onclick="location.reload()">Reload Application</button>
      </div>
    `;
    
    document.body.innerHTML = '';
    document.body.appendChild(errorContainer);
  }

  /**
   * Show error notification to user
   */
  showErrorNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-exclamation-triangle"></i>
        <span>${message}</span>
        <button class="close-btn" aria-label="Close notification">&times;</button>
      </div>
    `;
    
    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--error-color);
      color: white;
      padding: 16px;
      border-radius: 8px;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      max-width: 400px;
      animation: slideIn 0.3s ease-out;
    `;
    
    // Close functionality
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
    
    document.body.appendChild(notification);
  }

  /**
   * Track errors for analytics
   */
  trackError(error, context) {
    // Implementation would depend on analytics service
    console.log('📊 Error tracked:', { error: error.message, context });
  }

  /**
   * Get application info
   */
  getAppInfo() {
    return {
      version: this.version,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      config: this.config
    };
  }

  /**
   * Performance monitoring
   */
  measurePerformance(operation, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    
    console.log(`⏱️ ${operation} took ${(end - start).toFixed(2)}ms`);
    
    return result;
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.matrixCalculatorApp = new MatrixCalculatorApp();
});

// Export for testing or external access
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MatrixCalculatorApp;
}