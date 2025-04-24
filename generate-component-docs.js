import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const stat = promisify(fs.stat);

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const COMPONENTS_DIR = path.join(__dirname, 'composables', 'components');
const DOCS_OUTPUT_DIR = path.join(__dirname, 'docs', 'components');

// Create docs directory if it doesn't exist
async function ensureDocsDir() {
  try {
    await stat(DOCS_OUTPUT_DIR);
  } catch (e) {
    await mkdir(DOCS_OUTPUT_DIR, { recursive: true });
    console.log(`Created docs directory: ${DOCS_OUTPUT_DIR}`);
  }
}

// Extract JSDoc comments from a file
function extractJSDocComments(content) {
  const jsdocRegex = /\/\*\*\s*([\s\S]*?)\s*\*\//g;
  const comments = [];
  let match;
  
  while ((match = jsdocRegex.exec(content)) !== null) {
    comments.push(match[1].trim());
  }
  
  return comments;
}

// Parse JSDoc comment to extract tags
function parseJSDocComment(comment) {
  const result = {
    description: '',
    tags: {}
  };
  
  // Split lines and process
  const lines = comment.split('\n');
  let currentTag = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim().replace(/^\*\s*/, '');
    
    // Check if line contains a tag
    const tagMatch = trimmedLine.match(/^@(\w+)(?:\s+(.*))?$/);
    
    if (tagMatch) {
      currentTag = tagMatch[1];
      result.tags[currentTag] = result.tags[currentTag] || [];
      
      if (tagMatch[2]) {
        result.tags[currentTag].push(tagMatch[2]);
      }
    } else if (currentTag && trimmedLine) {
      // If we're processing a tag and line is not empty, append to last tag value
      if (result.tags[currentTag].length > 0) {
        result.tags[currentTag][result.tags[currentTag].length - 1] += ' ' + trimmedLine;
      } else {
        result.tags[currentTag].push(trimmedLine);
      }
    } else if (trimmedLine) {
      // If not a tag and not empty, it's part of the description
      result.description += result.description ? '\n' + trimmedLine : trimmedLine;
    }
  }
  
  return result;
}

// Extract props from the component in multiple ways
function extractProps(content) {
  let allProps = [];
  
  // Method 1: Get props from interfaces
  const propsInterface = extractPropsFromInterface(content);
  allProps = [...allProps, ...propsInterface];
  
  // Method 2: Extract props from defineProps
  const definePropsRegex = /defineProps<(?:{([^}]*)}|([^>]*)>\(\))/s;
  const definePropsMatch = content.match(definePropsRegex);
  
  if (definePropsMatch) {
    const propsContent = definePropsMatch[1] || definePropsMatch[2];
    if (propsContent) {
      const propsFromDefine = extractPropsFromInterfaceBody(propsContent);
      
      // Add only props that aren't already in the array
      propsFromDefine.forEach(prop => {
        if (!allProps.some(p => p.name === prop.name)) {
          allProps.push(prop);
        }
      });
    }
  }
  
  // Method 3: Look for direct withDefaults declarations
  const withDefaultsRegex = /withDefaults\s*\(\s*defineProps<(?:{([^}]*)}|([^>]*)>\(\))\s*,\s*({[^}]*})\s*\)/s;
  const withDefaultsMatch = content.match(withDefaultsRegex);
  
  if (withDefaultsMatch) {
    const propsContent = withDefaultsMatch[1] || withDefaultsMatch[2];
    const defaultsObj = withDefaultsMatch[3];
    
    if (propsContent) {
      const propsFromWithDefaults = extractPropsFromInterfaceBody(propsContent);
      
      // Extract default values
      const defaultValues = extractDefaultValuesFromObject(defaultsObj);
      
      // Merge with defaults
      propsFromWithDefaults.forEach(prop => {
        if (defaultValues[prop.name]) {
          prop.default = defaultValues[prop.name];
        }
        
        // Add only props that aren't already in the array
        if (!allProps.some(p => p.name === prop.name)) {
          allProps.push(prop);
        }
      });
    }
  }
  
  // Method 4: Direct property declarations
  const propDeclarationRegex = /(?:const|let|var)\s+(\w+)\s*=\s*(?:ref|reactive)\s*\(([^)]*)\)/g;
  let propMatch;
  
  while ((propMatch = propDeclarationRegex.exec(content)) !== null) {
    const propName = propMatch[1];
    const initialValue = propMatch[2].trim();
    
    // Only consider public props (filter out internal state variables)
    if (!propName.startsWith('_') && 
        !propName.endsWith('Ref') && 
        !allProps.some(p => p.name === propName)) {
      
      allProps.push({
        name: propName,
        type: 'any', // We can't reliably determine the type from reactive/ref
        optional: true,
        description: `Property ${propName}`,
        default: initialValue !== '' ? initialValue : null
      });
    }
  }
  
  return allProps;
}

// Extract default values from an object literal
function extractDefaultValuesFromObject(objectStr) {
  const defaultValues = {};
  
  // Extract individual property defaults
  const propertyRegex = /(\w+)\s*:\s*([^,}]*)/g;
  let propertyMatch;
  
  while ((propertyMatch = propertyRegex.exec(objectStr)) !== null) {
    const propName = propertyMatch[1];
    const defaultValue = propertyMatch[2].trim();
    defaultValues[propName] = defaultValue;
  }
  
  return defaultValues;
}

// Extract props from interface definition
function extractPropsFromInterface(content) {
  const props = [];
  
  // Find all interfaces that could define props
  const interfaceRegex = /interface\s+(\w+)(?:\s+extends\s+(\w+))?\s*{([^}]*)}/gs;
  let match;
  
  while ((match = interfaceRegex.exec(content)) !== null) {
    const interfaceName = match[1];
    const extendsInterface = match[2]; // Might be undefined
    const interfaceBody = match[3];
    
    // Skip if it's not related to props
    if (!interfaceName.includes('Props') && interfaceName !== 'Props') {
      continue;
    }
    
    // Extract properties from this interface
    const propsFromThisInterface = extractPropsFromInterfaceBody(interfaceBody);
    props.push(...propsFromThisInterface);
    
    // TODO: If the interface extends another interface, we should also extract those props
    // This would require recursively finding the extended interface
  }
  
  // If no interfaces found but there's a direct Props type
  if (props.length === 0) {
    // Try to find props defined with type syntax
    const typePropsRegex = /type\s+Props\s*=\s*{([^}]*)}/s;
    const typeMatch = content.match(typePropsRegex);
    if (typeMatch) {
      const typeBody = typeMatch[1];
      const propsFromType = extractPropsFromInterfaceBody(typeBody);
      props.push(...propsFromType);
    }
  }
  
  return props;
}

// Extract props from the interface body
function extractPropsFromInterfaceBody(interfaceBody) {
  const props = [];
  const propRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(?:readonly\s+)?(\w+)(\??)\s*:\s*([^;]*);/g;
  
  let match;
  while ((match = propRegex.exec(interfaceBody)) !== null) {
    const comment = match[1].trim();
    const name = match[2];
    const optional = match[3] === '?';
    const type = match[4].trim();
    
    // Parse the JSDoc comment for this prop
    const parsedComment = parseJSDocComment(comment);
    
    props.push({
      name,
      type,
      optional,
      description: parsedComment.description,
      default: parsedComment.tags.default ? parsedComment.tags.default[0] : null
    });
  }
  
  // Try to find props without JSDoc comments
  const simplePropRegex = /(?:readonly\s+)?(\w+)(\??)\s*:\s*([^;]*);/g;
  while ((match = simplePropRegex.exec(interfaceBody)) !== null) {
    const name = match[1];
    
    // Skip if we already found this prop with JSDoc
    if (props.some(p => p.name === name)) {
      continue;
    }
    
    const optional = match[2] === '?';
    const type = match[3].trim();
    
    props.push({
      name,
      type,
      optional,
      description: '', // No description available
      default: null
    });
  }
  
  return props;
}

// Extract emits from a component
function extractEmits(content) {
  const emitsRegex = /const\s+emit\s*=\s*defineEmits<{([^}]*)}>\(\)/s;
  const emitsMatch = content.match(emitsRegex);
  
  if (!emitsMatch) return [];
  
  const emitsBlock = emitsMatch[1];
  const emitRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*'([^']+)'\s*:\s*\[(.*)\];/g;
  const emits = [];
  
  let match;
  while ((match = emitRegex.exec(emitsBlock)) !== null) {
    const comment = match[1].trim();
    const name = match[2];
    const params = match[3].trim();
    
    // Parse the JSDoc comment for this emit
    const parsedComment = parseJSDocComment(comment);
    
    emits.push({
      name,
      params,
      description: parsedComment.description,
      paramDescriptions: parsedComment.tags.param || []
    });
  }
  
  return emits;
}

// Extract slots from a component (from JSDoc comment)
function extractSlots(componentComment) {
  if (!componentComment.tags.slot) return [];
  
  return componentComment.tags.slot.map(slotComment => {
    // Parse slot comment like "default - Place carousel items here"
    const parts = slotComment.split(' - ');
    return {
      name: parts[0].trim(),
      description: parts.length > 1 ? parts[1].trim() : ''
    };
  });
}

// Extract methods from the component
function extractMethods(content) {
  const methods = [];
  
  // Match function declarations
  const funcRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(?:export\s+)?(?:async\s+)?(?:function\s+)?(?:const\s+)?(\w+)\s*=\s*(?:async\s*)?\(([^)]*)\)[^=]*=>/g;
  let match;
  
  while ((match = funcRegex.exec(content)) !== null) {
    const comment = match[1].trim();
    const name = match[2];
    const params = match[3].trim();
    
    // Skip lifecycle hooks and internal methods that start with underscore
    if (name.startsWith('on') || name.startsWith('_') || name === 'setup') {
      continue;
    }
    
    // Parse the JSDoc comment
    const parsedComment = parseJSDocComment(comment);
    
    // Check if this is marked as private
    if (parsedComment.tags.private || parsedComment.tags.internal) {
      continue;
    }
    
    methods.push({
      name,
      params,
      description: parsedComment.description,
      returns: parsedComment.tags.returns ? parsedComment.tags.returns[0] : null,
      paramDescriptions: parsedComment.tags.param || []
    });
  }
  
  return methods;
}

// Extract computed properties from the component
function extractComputedProps(content) {
  const computedProps = [];
  
  // Match computed property declarations with JSDoc
  const computedRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*const\s+(\w+)\s*=\s*computed\s*\(\s*\(\)\s*=>/g;
  let match;
  
  while ((match = computedRegex.exec(content)) !== null) {
    const comment = match[1].trim();
    const name = match[2];
    
    // Parse the JSDoc comment
    const parsedComment = parseJSDocComment(comment);
    
    // Skip private computed props
    if (parsedComment.tags.private || parsedComment.tags.internal) {
      continue;
    }
    
    computedProps.push({
      name,
      description: parsedComment.description,
      returns: parsedComment.tags.returns ? parsedComment.tags.returns[0] : null
    });
  }
  
  return computedProps;
}

// Generate markdown documentation for a component
function generateComponentMarkdown(
  componentName, 
  componentComment, 
  props, 
  emits, 
  slots, 
  methods, 
  computedProps, 
  example
) {
  let markdown = `---
title: ${componentName}
description: ${componentComment.description.split('\n')[0]}
---

# ${componentName} Component

${componentComment.description}

`;

  // Add example if available
  if (example) {
    markdown += `## Example

\`\`\`vue
${example}
\`\`\`

`;
  }

  // Add props section
  if (props.length > 0) {
    markdown += `## Props

| Name | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
`;
    
    props.forEach(prop => {
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.optional ? 'No' : 'Yes'} | ${prop.default || '-'} | ${prop.description.replace(/\n/g, ' ')} |\n`;
    });
    
    markdown += '\n';
  }
  
  // Add computed properties section
  if (computedProps.length > 0) {
    markdown += `## Computed Properties

| Name | Description | Returns |
|------|-------------|---------|
`;
    
    computedProps.forEach(prop => {
      markdown += `| \`${prop.name}\` | ${prop.description.replace(/\n/g, ' ')} | ${prop.returns || '-'} |\n`;
    });
    
    markdown += '\n';
  }
  
  // Add methods section
  if (methods.length > 0) {
    markdown += `## Methods

| Name | Parameters | Description | Returns |
|------|------------|-------------|---------|
`;
    
    methods.forEach(method => {
      markdown += `| \`${method.name}(${method.params})\` | ${method.paramDescriptions.join(', ') || '-'} | ${method.description.replace(/\n/g, ' ')} | ${method.returns || '-'} |\n`;
    });
    
    markdown += '\n';
  }
  
  // Add emits section
  if (emits.length > 0) {
    markdown += `## Events

| Event Name | Parameters | Description |
|------------|------------|-------------|
`;
    
    emits.forEach(emit => {
      markdown += `| \`${emit.name}\` | \`${emit.params}\` | ${emit.description.replace(/\n/g, ' ')} |\n`;
    });
    
    markdown += '\n';
  }
  
  // Add slots section
  if (slots.length > 0) {
    markdown += `## Slots

| Name | Description |
|------|-------------|
`;
    
    slots.forEach(slot => {
      markdown += `| \`${slot.name}\` | ${slot.description.replace(/\n/g, ' ')} |\n`;
    });
    
    markdown += '\n';
  }

  // Add component API summary
  markdown += `## Component API Overview

\`\`\`typescript
interface ${componentName}Component {
${props.map(p => `  ${p.name}${p.optional ? '?' : ''}: ${p.type};`).join('\n')}
${computedProps.map(c => `  readonly ${c.name}: /* computed */;`).join('\n')}
${methods.map(m => `  ${m.name}(${m.params}): void;`).join('\n')}
}
\`\`\`

`;
  
  return markdown;
}

// Process a component file
async function processComponentFile(filePath, fileName) {
  console.log(`Processing ${fileName}...`);
  
  try {
    const content = await readFile(filePath, 'utf8');
    
    // Extract component JSDoc comment
    const scriptSection = content.match(/<script[^>]*>([\s\S]*?)<\/script>/);
    if (!scriptSection) {
      console.warn(`No script section found in ${fileName}`);
      return;
    }
    
    const scriptContent = scriptSection[1];
    const componentJSDocComments = extractJSDocComments(scriptContent);
    
    // Find component comment (should be the first one with @component tag)
    let componentComment = null;
    for (const comment of componentJSDocComments) {
      const parsed = parseJSDocComment(comment);
      if (parsed.tags.component) {
        componentComment = parsed;
        break;
      }
    }
    
    if (!componentComment) {
      console.warn(`No @component JSDoc found in ${fileName}`);
      return;
    }
    
    // Component name
    const componentName = fileName.replace('.vue', '');
    
    // Extract props from interface and withDefaults
    let props = extractProps(scriptContent);
    
    // Filter out internal refs and state variables
    const internalRefs = [
      'containerRef', 'itemsRef', 'translateX', 'currentIndex', 
      'itemGap', 'isAtStart', 'isAtEnd', 'isDragging', 'sliderEl', 
      'railEl', 'isExpanded', 'displayValue'
    ];
    
    // Only keep actual props
    props = props.filter(prop => {
      // Keep if explicitly marked with @prop
      if (prop.description && prop.description.includes('@prop')) {
        return true;
      }
      
      // Skip common internal state variables by name pattern
      if (internalRefs.includes(prop.name) || 
          prop.name.endsWith('Ref') || 
          prop.name.startsWith('_') || 
          prop.name === 'emit' || 
          prop.name === 'slots') {
        return false;
      }
      
      return true;
    });
    
    // Extract emits, slots, methods, and computed properties
    const emits = extractEmits(scriptContent);
    const slots = extractSlots(componentComment);
    const methods = extractMethods(scriptContent);
    
    // Filter out private methods that might have been incorrectly captured
    const publicMethods = methods.filter(method => {
      return !method.name.startsWith('_') && 
             !method.name.startsWith('on') &&
             !['updateNavigationState', 'calculateItemGap', 'getCarouselItems', 
               'handleClickOutside', 'updateValueFromEvent', 'onDrag', 
               'stopDrag'].includes(method.name);
    });
    
    const computedProps = extractComputedProps(scriptContent);
    const example = componentComment.tags.example ? componentComment.tags.example.join('\n') : null;
    
    // Generate markdown
    const markdown = generateComponentMarkdown(
      componentName,
      componentComment,
      props,
      emits,
      slots,
      publicMethods,
      computedProps,
      example
    );
    
    // Write markdown file
    const outputPath = path.join(DOCS_OUTPUT_DIR, `${componentName}.md`);
    await writeFile(outputPath, markdown);
    
    console.log(`Created documentation for ${componentName}`);
    
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error);
  }
}

// Main function
async function generateDocs() {
  try {
    await ensureDocsDir();
    
    // Get all Vue component files
    const files = await readdir(COMPONENTS_DIR);
    const vueFiles = files.filter(file => file.endsWith('.vue'));
    
    console.log(`Found ${vueFiles.length} Vue components to document`);
    
    // Process each component file
    for (const file of vueFiles) {
      const filePath = path.join(COMPONENTS_DIR, file);
      await processComponentFile(filePath, file);
    }
    
    console.log('Documentation generation complete!');
    
  } catch (error) {
    console.error('Error generating documentation:', error);
  }
}

// Run the script
generateDocs(); 