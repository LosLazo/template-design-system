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

// Extract interface properties from a component
function extractProps(content) {
  const propsRegex = /interface\s+Props\s*{([^}]*)}/s;
  const propsMatch = content.match(propsRegex);
  
  if (!propsMatch) return [];
  
  const propsBlock = propsMatch[1];
  const propRegex = /\/\*\*\s*([\s\S]*?)\s*\*\/\s*(\w+)(\??)\s*:\s*([^;]*);/g;
  const props = [];
  
  let match;
  while ((match = propRegex.exec(propsBlock)) !== null) {
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

// Generate markdown documentation for a component
function generateComponentMarkdown(componentName, componentComment, props, emits, slots, example) {
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

| Name | Type | Default | Description |
|------|------|---------|-------------|
`;
    
    props.forEach(prop => {
      markdown += `| \`${prop.name}\` | \`${prop.type}\` | ${prop.default || 'Required'} | ${prop.description.replace(/\n/g, ' ')} |\n`;
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
    
    // Extract props, emits, and example
    const props = extractProps(scriptContent);
    const emits = extractEmits(scriptContent);
    const slots = extractSlots(componentComment);
    const example = componentComment.tags.example ? componentComment.tags.example.join('\n') : null;
    
    // Generate markdown
    const markdown = generateComponentMarkdown(
      componentName,
      componentComment,
      props,
      emits,
      slots,
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