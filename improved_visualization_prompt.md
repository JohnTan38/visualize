# Enhanced Prompt Template for Combined Bar + Line Charts

## Step 1: Clear Chart Type Specification

**BAD (Current):** 
```
"Create a chart showing turnover ratio and holding cost for top 5 categories"
```

**GOOD (Improved):**
```
"Create a DUAL-AXIS COMBINATION CHART using matplotlib's twinx() where:
- PRIMARY Y-AXIS (left): Bar chart showing average turnover ratio
- SECONDARY Y-AXIS (right): Line chart with markers showing average holding cost per unit/day
- X-AXIS: Top 5 categories sorted by turnover ratio (descending)
- Both metrics must be plotted on the SAME figure using dual y-axes"
```

---

## Step 2: Specific Implementation Requirements

Add these technical details to your prompt:

```python
REQUIRED IMPLEMENTATION DETAILS:
1. Use matplotlib.pyplot with figure and TWO axes (ax1, ax2 = ax1.twinx())
2. Bar chart on ax1 (primary y-axis, left side) - color: purple/blue gradient
3. Line chart on ax2 (secondary y-axis, right side) - color: green, with circular markers
4. X-axis categories must be shared between both axes
5. Add distinct y-axis labels with matching colors:
   - Left label: "Average Turnover Ratio" (purple/blue)
   - Right label: "Average Holding Cost per Unit/Day ($)" (green)
6. Include value labels on both bars AND line points
7. Add legend distinguishing both metrics
8. Use appropriate y-axis scaling to show differences clearly
```

---

## Step 3: Complete Prompt Structure

**FULL PROMPT TEMPLATE:**

```
TASK: Generate a Python visualization script for logistics data analysis

CHART TYPE: Dual-axis combination chart (bar + line overlay)

DATA SOURCE: 
- CSV file: logistics_dataset.csv
- Columns needed: category, turnover_ratio, holding_cost_per_unit_day

ANALYSIS REQUIREMENTS:
1. Calculate average turnover_ratio and average holding_cost_per_unit_day by category
2. Select top 5 categories with highest turnover_ratio
3. Create a combined visualization with BOTH metrics on the same chart

VISUALIZATION SPECIFICATIONS:
- Chart Type: Matplotlib dual-axis chart using twinx()
- Figure size: 14 x 8 inches
- Background: Light gray (#f8f9fa)

PRIMARY CHART (Left Y-Axis):
- Type: Bar chart
- Data: Average turnover ratio
- Colors: Purple/blue gradient ['#667eea', '#764ba2', '#ed64a6', '#ff9a9e', '#ffc693']
- Y-axis label: "Average Turnover Ratio" (color: #667eea)
- Bar width: 0.6
- Add value labels on top of each bar

SECONDARY CHART (Right Y-Axis):
- Type: Line chart with markers
- Data: Average holding cost per unit/day
- Line color: Green (#10b981)
- Line width: 4
- Marker: Circle (size: 14)
- Y-axis label: "Average Holding Cost per Unit/Day ($)" (color: #10b981)
- Add value labels above each point with $ prefix

SHARED ELEMENTS:
- X-axis: Category names
- Title: "Combined Performance Analysis: Turnover Ratio vs Holding Cost\nTop 5 Categories"
- Legend: Must show both metrics clearly
- Grid: Y-axis only, dashed lines
- Annotation box: Key insights (highest turnover, lowest cost, range)

OUTPUT:
- Save as: combined_chart.png
- DPI: 300
- Format: PNG with white background

IMPLEMENTATION REQUIREMENTS:
1. Use pandas for data manipulation
2. Use matplotlib.pyplot with twinx() for dual axes
3. Ensure both charts share the same x-axis positions
4. Scale y-axes appropriately to show differences
5. Add proper styling (fonts, colors, labels)
6. Include error handling for missing data

CODE STRUCTURE:
```python
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load and process data
df = pd.read_csv('logistics_dataset.csv')
category_metrics = df.groupby('category').agg({
    'turnover_ratio': 'mean',
    'holding_cost_per_unit_day': 'mean'
}).round(2)
top_5 = category_metrics.sort_values('turnover_ratio', ascending=False).head(5)

# Create figure with dual axes
fig, ax1 = plt.subplots(figsize=(14, 8))

# PRIMARY AXIS - Bar chart
categories = top_5.index.tolist()
x_pos = np.arange(len(categories))
bars = ax1.bar(x_pos, top_5['turnover_ratio'], ...)
ax1.set_ylabel('Average Turnover Ratio', color='#667eea')

# SECONDARY AXIS - Line chart
ax2 = ax1.twinx()
line = ax2.plot(x_pos, top_5['holding_cost_per_unit_day'], ...)
ax2.set_ylabel('Average Holding Cost per Unit/Day ($)', color='#10b981')

# Labels, legend, styling...
plt.savefig('combined_chart.png', dpi=300, bbox_inches='tight')
```

CRITICAL: The output must be a SINGLE chart with TWO y-axes, not two separate charts.
```

---

## Step 4: Prompt Validation Checklist

Before sending to Claude API, verify your prompt includes:

- [ ] Explicit mention of "dual-axis" or "twinx()"
- [ ] Clear specification of which metric goes on which axis
- [ ] Color coding for y-axis labels matching the chart elements
- [ ] Shared x-axis requirement
- [ ] Sample code structure showing twinx() usage
- [ ] Output requirements (file name, format, DPI)
- [ ] Warning: "NOT two separate charts"

---

## Step 5: API Request Structure

```python
# Example API call structure
import anthropic

client = anthropic.Anthropic(api_key=YOUR_API_KEY)

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    messages=[{
        "role": "user",
        "content": """
        [INSERT FULL PROMPT FROM STEP 3 HERE]
        
        Additional Context:
        - The chart must use matplotlib's twinx() to create dual y-axes
        - Both metrics (bar and line) must appear on the SAME figure
        - This is critical for comparing two different scale metrics on one visualization
        
        Generate the complete Python script now.
        """
    }]
)

# Extract and execute the code
code = extract_code_from_response(message.content)
exec(code)
```

---

## Step 6: Common Pitfalls to Avoid

**DON'T:**
- Use vague terms like "show both metrics"
- Say "create two charts" (implies separate charts)
- Omit the twinx() technical detail
- Forget to specify which axis is primary/secondary

**DO:**
- Explicitly state "dual-axis combination chart"
- Provide matplotlib code structure with twinx()
- Specify colors for each y-axis label
- Include example output description
- Add validation: "SINGLE figure with TWO y-axes"

---

## Step 7: Testing the Prompt

After implementation, verify:
1. Generated code contains `ax2 = ax1.twinx()`
2. Bar chart and line chart share same figure object
3. Two distinct y-axis labels with different colors
4. Legend shows both metrics
5. Output is ONE image file, not multiple

---

## Example Output Verification

**Correct Output Should Show:**
```
✓ Single chart with bars (turnover ratio)
✓ Overlaid line with markers (holding cost)
✓ Two y-axis labels (left = turnover, right = cost)
✓ Different colors for left/right axes
✓ Shared x-axis with category names
```

**Incorrect Output Would Show:**
```
✗ Two separate charts side by side
✗ Single y-axis for both metrics
✗ Two figures generated separately
```
