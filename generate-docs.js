const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create docs directory if it doesn't exist
if (!fs.existsSync('docs')) {
  fs.mkdirSync('docs');
}

// Create components directory within docs
if (!fs.existsSync('docs/components')) {
  fs.mkdirSync('docs/components', { recursive: true });
}

// Run TypeDoc to generate markdown
console.log('Generating documentation...');
execSync('npx typedoc', { stdio: 'inherit' });

// Define component names to match in the documentation
const componentNames = [
  'Carousel',
  'Divider',
  'InputDropdown',
  'ProjectCard',
  'SegmentedControls',
  'Slider'
];

// Function to extract component documentation from modules.md
function extractComponentDocs() {
  try {
    const modulesPath = path.join('docs', 'modules.md');
    
    if (!fs.existsSync(modulesPath)) {
      console.error('modules.md not found. TypeDoc may have failed to generate documentation.');
      return;
    }
    
    const moduleContent = fs.readFileSync(modulesPath, 'utf8');
    
    // Process each component
    componentNames.forEach(componentName => {
      // Find component section in the modules.md file
      const componentRegex = new RegExp(`## (Interface|Class|Component): ${componentName}[\\s\\S]*?(?=## (Interface|Class|Component)|$)`, 'i');
      const match = moduleContent.match(componentRegex);
      
      if (match && match[0]) {
        // Format the component documentation
        let componentDoc = match[0].trim();
        
        // Add title and front matter
        const formattedDoc = `---
title: ${componentName}
description: Documentation for the ${componentName} component
---

# ${componentName} Component

${componentDoc}
`;
        
        // Write to individual file
        const outputPath = path.join('docs', 'components', `${componentName}.md`);
        fs.writeFileSync(outputPath, formattedDoc);
        console.log(`Created documentation for ${componentName}`);
      } else {
        console.warn(`Documentation for ${componentName} not found in modules.md`);
      }
    });
    
    console.log('Component documentation extraction complete!');
  } catch (error) {
    console.error('Error extracting component documentation:', error);
  }
}

// Call the extraction function
extractComponentDocs(); 