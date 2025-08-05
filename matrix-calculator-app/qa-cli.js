#!/usr/bin/env node

/**
 * Matrix QA Testing Agent - Command Line Runner
 * Node.js version for automated testing in CI/CD pipelines
 */

const fs = require('fs');
const path = require('path');

// Mock browser globals for Node.js environment
global.console = console;

// Load calculator classes
function loadCalculatorClasses() {
    try {
        // Read and evaluate JavaScript files
        const matrixCalcPath = path.join(__dirname, 'src/js/matrix-calculator.js');
        const enhancedCalcPath = path.join(__dirname, 'src/js/enhanced-matrix-calculator.js');
        const equationSolverPath = path.join(__dirname, 'src/js/equation-solver.js');
        
        if (fs.existsSync(matrixCalcPath)) {
            let matrixCalcCode = fs.readFileSync(matrixCalcPath, 'utf8');
            // Remove export statements for Node.js compatibility
            matrixCalcCode = matrixCalcCode.replace(/export\s+default\s+\w+;?\s*$/gm, '');
            matrixCalcCode = matrixCalcCode.replace(/export\s+{[^}]*};?\s*$/gm, '');
            eval(matrixCalcCode);
            console.log('✅ MatrixCalculator loaded');
        }
        
        if (fs.existsSync(enhancedCalcPath)) {
            let enhancedCalcCode = fs.readFileSync(enhancedCalcPath, 'utf8');
            // Remove export statements for Node.js compatibility
            enhancedCalcCode = enhancedCalcCode.replace(/export\s+default\s+\w+;?\s*$/gm, '');
            enhancedCalcCode = enhancedCalcCode.replace(/export\s+{[^}]*};?\s*$/gm, '');
            eval(enhancedCalcCode);
            console.log('✅ EnhancedMatrixCalculator loaded');
        }
        
        if (fs.existsSync(equationSolverPath)) {
            let equationSolverCode = fs.readFileSync(equationSolverPath, 'utf8');
            // Remove export statements for Node.js compatibility
            equationSolverCode = equationSolverCode.replace(/export\s+default\s+\w+;?\s*$/gm, '');
            equationSolverCode = equationSolverCode.replace(/export\s+{[^}]*};?\s*$/gm, '');
            equationSolverCode = equationSolverCode.replace(/export\s+\{[\s\S]*?\};?\s*$/gm, '');
            eval(equationSolverCode);
            console.log('✅ EquationSolver loaded');
        }
        
    } catch (error) {
        console.error('❌ Error loading calculator classes:', error.message);
    }
}

// Load QA Testing Agent
function loadQAAgent() {
    try {
        const qaAgentPath = path.join(__dirname, 'qa-testing-agent.js');
        let qaAgentCode = fs.readFileSync(qaAgentPath, 'utf8');
        
        // Remove module.exports and browser-specific code for Node.js compatibility
        qaAgentCode = qaAgentCode.replace(/if \(typeof module.*\{[\s\S]*?module\.exports = MatrixQAAgent;[\s\S]*?\}/g, '');
        qaAgentCode = qaAgentCode.replace(/document\.addEventListener.*?\);[\s\S]*?\}/g, '');
        qaAgentCode = qaAgentCode.replace(/if \(typeof window === 'undefined'\)[\s\S]*?else \{[\s\S]*?\}/g, '');
        
        eval(qaAgentCode);
        console.log('✅ QA Testing Agent loaded');
        return true;
    } catch (error) {
        console.error('❌ Error loading QA Testing Agent:', error.message);
        return false;
    }
}

// Enhanced console output for better CLI experience
function enhanceConsole() {
    const originalLog = console.log;
    
    console.log = (...args) => {
        const message = args.join(' ');
        
        // Add colors for different message types
        if (message.includes('✅')) {
            originalLog('\x1b[32m%s\x1b[0m', message); // Green
        } else if (message.includes('❌')) {
            originalLog('\x1b[31m%s\x1b[0m', message); // Red
        } else if (message.includes('⚠️')) {
            originalLog('\x1b[33m%s\x1b[0m', message); // Yellow
        } else if (message.includes('🔬') || message.includes('📊')) {
            originalLog('\x1b[36m%s\x1b[0m', message); // Cyan
        } else if (message.includes('🚀')) {
            originalLog('\x1b[35m%s\x1b[0m', message); // Magenta
        } else {
            originalLog(message);
        }
    };
}

// Main execution function
async function main() {
    console.log('🔬 Matrix Calculator QA Testing Agent - CLI Version\n');
    console.log('=' .repeat(60));
    
    // Enhance console for better CLI experience
    enhanceConsole();
    
    // Load all required classes
    console.log('\n📦 Loading Calculator Classes...');
    loadCalculatorClasses();
    
    console.log('\n📦 Loading QA Testing Agent...');
    if (!loadQAAgent()) {
        process.exit(1);
    }
    
    // Create QA agent instance
    console.log('\n🚀 Initializing QA Testing Agent...');
    const qa = new MatrixQAAgent();
    
    // Run all tests
    console.log('\n▶️ Starting Comprehensive Testing...\n');
    const startTime = Date.now();
    
    try {
        await qa.runAllTests();
        
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        console.log(`\n⏱️ Testing completed in ${duration}ms`);
        
        // Generate final report
        const report = qa.generateTestReport();
        
        // Save report to file
        const reportPath = path.join(__dirname, `qa-report-${new Date().toISOString().split('T')[0]}.json`);
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        console.log(`\n📄 Report saved to: ${reportPath}`);
        
        // Exit with appropriate code
        if (report.summary.failed > 0) {
            console.log('\n❌ Some tests failed. Check the report for details.');
            process.exit(1);
        } else {
            console.log('\n🎉 All tests passed successfully!');
            process.exit(0);
        }
        
    } catch (error) {
        console.error('\n💥 Critical error during testing:', error);
        process.exit(1);
    }
}

// Handle command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Matrix QA Testing Agent - Command Line Interface

Usage: node qa-cli.js [options]

Options:
  --help, -h     Show this help message
  --version, -v  Show version information
  --verbose      Enable verbose output
  --export       Export detailed test results

Examples:
  node qa-cli.js                 # Run all tests
  node qa-cli.js --verbose       # Run with detailed output
  node qa-cli.js --export        # Run and export results
`);
    process.exit(0);
}

if (args.includes('--version') || args.includes('-v')) {
    console.log('Matrix QA Testing Agent v1.0.0');
    process.exit(0);
}

// Set verbose mode if requested
if (args.includes('--verbose')) {
    global.VERBOSE_MODE = true;
}

// Run the main function
main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
});
