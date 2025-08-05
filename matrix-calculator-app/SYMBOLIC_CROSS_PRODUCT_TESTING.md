# Symbolic Cross Product Testing Guide

## New Feature: Symbolic Cross Product Button

A new **"Symbolic Cross Product (A × B)"** button has been added to the matrix operations panel. This button allows you to perform cross product calculations with constants and variables instead of just numbers.

## How to Test

### 1. **Numeric Cross Product** (Original functionality)
- Use the regular **"Cross Product (A × B)"** button
- Input numbers like: `1, 2, 3` and `4, 5, 6`
- Result: Shows numerical values like `[-3, 6, -3]`

### 2. **Symbolic Cross Product** (New functionality)
- Use the new **"Symbolic Cross Product (A × B)"** button (purple gradient styling)
- Input variables/constants like: `a, b, c` and `x, y, z`
- Result: Shows symbolic expressions like:
  - i-component: `b * z - c * y`
  - j-component: `c * x - a * z`  
  - k-component: `a * y - b * x`

## Example Test Cases

### 2D Symbolic Cross Product
- Matrix A: `[a, b]`
- Matrix B: `[x, y]`
- Expected Result: `a * y - b * x`

### 3D Symbolic Cross Product
- Matrix A: `[a, b, c]`
- Matrix B: `[x, y, z]`
- Expected Result: 
  ```
  [(b) * (z) - (c) * (y), (c) * (x) - (a) * (z), (a) * (y) - (b) * (x)]
  ```

## Visual Features
- **Purple gradient button** to distinguish from regular cross product
- **Hover animations** with shimmer effect
- **Special symbolic result display** with matrix bracket formatting
- **Math.js simplification** when available

## Implementation Details
- Uses your exact `crossProduct3DSymbolic()` function specification
- Automatic Math.js simplification with fallback to raw expressions
- Supports both 2D and 3D vectors
- Integrates seamlessly with existing UI components

## Notes
- Both numeric and symbolic cross products work independently
- The system automatically chooses the right calculation method
- Math.js library handles expression simplification
- Results display in proper matrix bracket format as requested
