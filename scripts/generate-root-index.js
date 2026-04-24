const fs = require('fs');
const path = require('path');

// Read the generated index.html
const generatedIndexPath = path.join(__dirname, '../dist/breadcrumbs/browser/index.html');
let indexContent = fs.readFileSync(generatedIndexPath, 'utf-8');

// Update all relative paths to point to angular-breadcrumbs/dist/breadcrumbs/browser/
// This makes assets resolvable from the repo root
indexContent = indexContent
  .replace(/href="favicon\.ico"/g, 'href="dist/breadcrumbs/browser/favicon.ico"')
  .replace(/href="(styles-[^"]+\.css)"/g, 'href="dist/breadcrumbs/browser/$1"')
  .replace(/src="(main-[^"]+\.js)"/g, 'src="dist/breadcrumbs/browser/$1"');

// Write to repo root
const rootIndexPath = path.join(__dirname, '../index.html');
fs.writeFileSync(rootIndexPath, indexContent);

console.log('✓ Generated index.html at repo root with updated asset paths');
