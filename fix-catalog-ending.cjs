const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/lib/components-catalog.ts');
let content = fs.readFileSync(targetPath, 'utf8');

content = content.replace(/\] as const;[\s\S]*?export type ComponentId = \(typeof COMPONENTS_CATALOG\)\[number\]\["id"[\s\S]*$/, `
] as const;

export type ComponentId = (typeof COMPONENTS_CATALOG)[number]["id"];
`);

fs.writeFileSync(targetPath, content, 'utf8');
