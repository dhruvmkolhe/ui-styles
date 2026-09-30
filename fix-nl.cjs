const fs = require('fs');
let c = fs.readFileSync('src/lib/components-catalog.ts', 'utf8');
c = c.split('\\\\n').join('\\n');
fs.writeFileSync('src/lib/components-catalog.ts', c, 'utf8');
