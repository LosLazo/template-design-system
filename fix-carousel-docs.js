import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAROUSEL_DOC_PATH = path.join(__dirname, 'docs', 'components', 'Carousel.md');

async function fixCarouselDocs() {
  try {
    console.log('Fixing Carousel documentation...');
    
    // Read the current file
    const content = fs.readFileSync(CAROUSEL_DOC_PATH, 'utf8');
    
    // Check if the file already has a props section
    if (content.includes('## Props')) {
      console.log('Carousel documentation already has props section.');
      return;
    }
    
    // Find where to insert the props section (after example, before methods)
    const exampleEndPos = content.indexOf('```\n\n') + 4;
    const methodsPos = content.indexOf('## Methods');
    
    if (exampleEndPos === -1 || methodsPos === -1) {
      console.log('Could not find insertion point in Carousel documentation.');
      return;
    }
    
    // Create the props section
    const propsSection = `

## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| \`title\` | \`string\` | No | \`undefined\` | Optional title to display above the carousel |
| \`itemSelector\` | \`string\` | No | \`'.carousel-item'\` | CSS selector to identify carousel items |

`;
    
    // Insert the props section
    const updatedContent = 
      content.slice(0, exampleEndPos + 2) + 
      propsSection + 
      content.slice(methodsPos);
    
    // Update the Component API Overview section too
    const apiOverviewPos = updatedContent.indexOf('## Component API Overview');
    const apiOverviewEndPos = updatedContent.indexOf('```typescript') + 13;
    
    if (apiOverviewPos !== -1 && apiOverviewEndPos !== -1) {
      const apiSection = updatedContent.slice(apiOverviewPos, apiOverviewEndPos);
      const component = updatedContent.slice(apiOverviewEndPos, updatedContent.indexOf('```', apiOverviewEndPos));
      
      // Add props to the component interface
      const updatedComponent = component.replace(
        'interface CarouselComponent {',
        'interface CarouselComponent {\n  title?: string;\n  itemSelector?: string;\n'
      );
      
      const finalContent = 
        updatedContent.slice(0, apiOverviewEndPos) + 
        updatedComponent + 
        updatedContent.slice(updatedContent.indexOf('```', apiOverviewEndPos));
      
      // Write the updated content
      fs.writeFileSync(CAROUSEL_DOC_PATH, finalContent);
      console.log('Carousel documentation updated successfully.');
    } else {
      // Write the updated content without fixing the API overview
      fs.writeFileSync(CAROUSEL_DOC_PATH, updatedContent);
      console.log('Carousel documentation updated (without fixing API overview).');
    }
    
  } catch (error) {
    console.error('Error fixing Carousel documentation:', error);
  }
}

fixCarouselDocs(); 