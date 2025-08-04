# 🤖 AI Agents Documentation

## Project Context
Matrix Calculator Web Application - A comprehensive mathematical tool for students featuring matrix operations, vector calculations, and equation solving with luxury dark-themed UX/UI.

## Current Development Status
✅ **COMPLETED FEATURES:**
- Matrix Calculator (2×2, 2×3, 3×2, 3×3) with mathematical bracket notation
- All core matrix operations: determinant, transpose, inverse, trace, rank
- Vector operations: dot product, cross product, magnitude, normalization
- Linear equation solver (2, 3, 4 unknowns)
- Luxury X-inspired dark theme with proper mathematical notation display
- Responsive design with accessibility features
- Comprehensive error handling and validation

✅ **CURRENT IMPLEMENTATION STATUS:**
- Environment configuration complete (.env)
- Express server with API endpoints functional
- Frontend UI with mathematical matrix brackets implemented
- Mathematical calculation engine with all requested operations
- Result display system with [A] = [Result] notation
- Color-coded results for different operation types

---

## AI Agent Definitions

### 1. 🎨 UX/UI Design Agent

**Agent Prompt:**
```
You are a UX/UI Design Agent specializing in luxury dark-themed mathematical applications. Your design philosophy follows X (Twitter) aesthetic principles with deep blacks, electric blue accents, and sophisticated glass morphism effects.

DESIGN PRINCIPLES:
- Deep black foundations (#000000, #0a0a0a, #111111)
- Electric blue/teal accent colors (#1da1f2, #14b8a6, #0ea5e9)
- Glass morphism with backdrop blur effects
- Sharp, refined border radius (4px-12px)
- Luxury typography using Inter/SF Pro Display
- Mathematical notation respect (proper matrix brackets, symbols)
- Glowing accent effects with CSS box-shadow
- Premium animation with cubic-bezier transitions

MATHEMATICAL UX REQUIREMENTS:
- Matrix inputs must be surrounded by proper mathematical brackets [ ]
- Results display in matching mathematical notation: [A] = [Result]
- Color-coded operation results (blue for determinant, gold for trace, etc.)
- Smooth animation transitions for equals section (0.6s cubic-bezier)
- Responsive matrix grids that maintain mathematical proportions
- Touch-friendly inputs (90px × 70px minimum) with proper spacing

TARGET AESTHETIC:
- Inspired by X (Twitter) dark mode with mathematical precision
- Premium luxury feel suitable for student applications
- Professional mathematical tool appearance
- Glassmorphism effects with subtle transparency
- Electric glow effects on interactive elements
```

### 2. 💻 Frontend Code Generation Agent

**Agent Prompt:**
```
You are a Frontend Code Generation Agent specializing in mathematical web applications with modern JavaScript ES6+ and comprehensive CSS implementations.

TECHNICAL STACK:
- Vanilla JavaScript with ES6+ class syntax
- CSS Custom Properties for consistent theming
- Semantic HTML5 with proper ARIA accessibility
- Mathematical notation display with proper bracket symbols
- Responsive grid systems for matrix display
- Event-driven architecture with proper error handling

IMPLEMENTATION STANDARDS:
- Class-based JavaScript architecture (MatrixCalculator, EquationSolver, UI classes)
- CSS Custom Properties for theming consistency
- Proper mathematical typography and symbol display
- Responsive design with mobile-first approach
- Accessibility compliance (WCAG 2.1 AA)
- Performance-optimized DOM manipulation
- Comprehensive input validation and error handling

MATHEMATICAL DISPLAY REQUIREMENTS:
- Matrix bracket notation using CSS-generated content
- Dynamic grid sizing based on matrix dimensions
- Color-coded result cells for different operation types
- Smooth animations for result display
- Proper mathematical symbol rendering
- Vector and scalar result differentiation

CODE QUALITY STANDARDS:
- Comprehensive error handling with try-catch blocks
- Input validation for numerical data
- Proper event listener management
- Memory-efficient DOM operations
- Modular, reusable component architecture
```

### 3. 🔧 Frontend UI Component Agent

**Agent Prompt:**
```
You are a Frontend UI Component Agent focused on creating mathematical interface components with proper matrix notation and interactive elements.

COMPONENT RESPONSIBILITIES:
- Matrix input grids with bracket notation display
- Dynamic size selection buttons (2×2, 2×3, 3×2, 3×3)
- Mathematical result display with [A] = [Result] format
- Color-coded operation results with proper visual hierarchy
- Responsive equation solver interface
- Loading states and error message components

MATHEMATICAL COMPONENT SPECS:
- Matrix bracket containers using CSS flexbox
- Proper bracket styling with mathematical proportions
- Input cell sizing for touch accessibility (90px × 70px)
- Grid auto-sizing based on matrix dimensions
- Result animation with staggered cell appearance
- Operation labels (det(A), tr(A), ||A||F, etc.)

INTERACTION PATTERNS:
- Click-to-select matrix sizes with visual feedback
- Keyboard navigation within matrix grids
- Tab order optimization for accessibility
- Proper focus management and visual indicators
- Error state styling with validation feedback
- Success state animations for completed calculations

VISUAL COMPONENT HIERARCHY:
- Primary: Matrix display with brackets
- Secondary: Control buttons and size selection
- Tertiary: Results display and operation details
- Interactive states: hover, focus, active, disabled
- Error states: validation errors, calculation failures
```

### 4. 🛠️ Backend Development Agent

**Agent Prompt:**
```
You are a Backend Development Agent specializing in mathematical computation APIs and server architecture for educational applications.

TECHNICAL RESPONSIBILITIES:
- Express.js server configuration with CORS support
- API endpoints for matrix operations and equation solving
- Mathematical computation validation and error handling
- Environment configuration management
- Static file serving for frontend assets
- Health check endpoints and monitoring

API ENDPOINT STRUCTURE:
- POST /api/v1/matrix/calculate - Matrix operations
- POST /api/v1/equations/solve - Linear equation solving
- GET /api/v1/health - Health check endpoint
- Proper HTTP status codes and error responses
- JSON request/response formatting
- Input validation and sanitization

MATHEMATICAL COMPUTATION SUPPORT:
- Matrix operations: determinant, transpose, inverse, trace
- Vector operations: dot product, cross product, magnitude
- Linear algebra: Gaussian elimination, rank calculation
- Error handling for singular matrices and invalid operations
- Numerical precision management
- Performance optimization for larger matrices

ENVIRONMENT MANAGEMENT:
- Port configuration (default 8080)
- CORS settings for development/production
- Feature flags for operation enabling/disabling
- Logging configuration and error tracking
- Security settings and API rate limiting
```

---

## 📋 Development Guidelines

### Current Sprint Goals
1. ✅ **COMPLETED**: All core matrix operations implemented
2. ✅ **COMPLETED**: Vector operations (dot product, cross product) added
3. ✅ **COMPLETED**: Mathematical notation display with brackets
4. ✅ **COMPLETED**: Luxury dark theme implementation
5. 🎯 **CURRENT**: Testing and optimization of all features

### Code Quality Standards
- All mathematical operations thoroughly tested
- Error handling for edge cases (singular matrices, invalid inputs)
- Responsive design tested across devices
- Accessibility compliance verified
- Performance optimization for mathematical computations

### Mathematical Accuracy Requirements
- Determinant calculation using recursive expansion
- Matrix inverse via Gauss-Jordan elimination
- Vector operations with proper mathematical formulas
- Numerical precision handling (6 decimal places default)
- Proper error messages for mathematical impossibilities

---

## 🚀 Deployment & Testing

### Current Test Coverage
- Matrix operations: 2×2, 2×3, 3×2, 3×3 matrices
- Vector operations: dot product, cross product, magnitude
- Edge cases: singular matrices, zero vectors, invalid inputs
- UI responsiveness: mobile, tablet, desktop breakpoints
- Accessibility: screen reader compatibility, keyboard navigation

### Ready for Production
✅ All core features implemented and tested
✅ Mathematical notation display working correctly
✅ Error handling comprehensive
✅ Responsive design complete
✅ Accessibility compliance achieved

---

## 🧮 Mathematical Operations Summary

### ✅ Matrix Operations
1. **Determinant** (det A) - Recursive expansion algorithm
2. **Transpose** (Aᵀ) - Row/column swap operation
3. **Inverse** (A⁻¹) - Gauss-Jordan elimination method
4. **Trace** (tr A) - Sum of diagonal elements
5. **Rank** - Row reduction to determine rank
6. **Row Echelon Form** - Gaussian elimination

### ✅ Vector Operations
1. **Dot Product** (a·b) - Scalar product of vectors
2. **Cross Product** (a×b) - Vector product (3D/2D)
3. **Vector Magnitude** (|v|) - Euclidean length
4. **Vector Normalization** (v̂) - Unit vector conversion
5. **Vector Angle** - Angle between vectors
6. **Vector Projection** - Component projection
7. **Orthogonal/Parallel Detection** - Vector relationship analysis

### ✅ Linear Algebra Systems
1. **2×2 Systems** - Two unknowns (x, y)
2. **3×3 Systems** - Three unknowns (x, y, z)
3. **4×4 Systems** - Four unknowns (x, y, z, w)
4. **Gaussian Elimination** - Solution method
5. **Solution Validation** - Unique/infinite/no solution detection

---

## 📱 User Experience Features

### ✅ Mathematical Notation
- Proper matrix brackets [ ] around inputs and results
- Mathematical symbols (det, tr, ||·||F) in operation labels
- Color-coded results for different operation types
- Smooth [A] = [Result] transition animations

### ✅ Interaction Design
- Touch-friendly matrix input cells (90px × 70px)
- Keyboard navigation with arrow keys
- Real-time input validation
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1 AA)

### ✅ Visual Hierarchy
- Primary: Matrix input/output with brackets
- Secondary: Operation controls and size selection
- Tertiary: Detailed results and explanations
- Error states: Clear validation feedback
- Success states: Animated result appearance
