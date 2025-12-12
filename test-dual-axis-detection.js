// test-dual-axis-detection.js
// Run this to test if dual-axis detection works correctly

function requiresDualAxis(prompt) {
  const dualAxisKeywords = [
    'dual axis',
    'dual-axis',
    'two axes',
    'two y-axes',
    'bar and line',
    'line and bar',
    'bar + line',
    'combined chart',
    'overlay',
    'compare.*metrics',
    'versus',
    'vs',
    'against',
  ]
  
  const lowerPrompt = prompt.toLowerCase()
  return dualAxisKeywords.some(keyword => 
    new RegExp(keyword, 'i').test(lowerPrompt)
  )
}

// Test cases
const testCases = [
  // Should detect dual-axis
  { prompt: "Create a dual-axis chart showing turnover ratio and holding cost", expected: true },
  { prompt: "Compare revenue vs profit margin by quarter", expected: true },
  { prompt: "Show bar and line chart for sales versus costs", expected: true },
  { prompt: "Turnover ratio against holding cost per category", expected: true },
  { prompt: "Create chart comparing metrics side by side", expected: true },
  { prompt: "Combined chart showing two different scales", expected: true },
  
  // Should NOT detect dual-axis
  { prompt: "Create a bar chart of quarterly revenue", expected: false },
  { prompt: "Line chart showing sales trends", expected: false },
  { prompt: "Pie chart of market share", expected: false },
  { prompt: "Stacked bar chart with multiple series", expected: false },
]

console.log('🧪 Testing Dual-Axis Detection Function\n')
console.log('=' .repeat(80))

let passed = 0
let failed = 0

testCases.forEach((test, index) => {
  const result = requiresDualAxis(test.prompt)
  const status = result === test.expected ? '✅ PASS' : '❌ FAIL'
  
  if (result === test.expected) {
    passed++
  } else {
    failed++
  }
  
  console.log(`\nTest ${index + 1}: ${status}`)
  console.log(`Prompt: "${test.prompt}"`)
  console.log(`Expected: ${test.expected}, Got: ${result}`)
})

console.log('\n' + '='.repeat(80))
console.log(`\n📊 Results: ${passed}/${testCases.length} passed, ${failed} failed\n`)

if (failed === 0) {
  console.log('🎉 All tests passed! Dual-axis detection is working correctly.\n')
} else {
  console.log('⚠️  Some tests failed. Review the detection logic.\n')
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { requiresDualAxis }
}
