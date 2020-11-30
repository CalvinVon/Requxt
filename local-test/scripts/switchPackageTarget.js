const path = require('path');
const fs = require('fs');
const target = process.env.PKG_TARGET;
const packagesPath = path.resolve(__dirname, '../../packages');

const folders = fs.readdirSync(packagesPath, {
    withFileTypes: true
});
folders.forEach(folder => {
    if (folder.isDirectory && folder.name.match(/requxt/)) {
        const packageJsonPath = path.join(packagesPath, folder.name, 'package.json');
        const file = fs.readFileSync(packageJsonPath);
        let content;

        if (target === 'src') {
            content = file.toString()
                .replace('"main": "es/index.js"', '"main": "src/index.ts"')
                .replace('"types": "es/index.d.ts"', '"types": "src/index.d.ts"')
        }
        else if (target === 'es') {
            content = file.toString()
                .replace('"main": "src/index.ts"', '"main": "es/index.js"')
                .replace('"types": "src/index.d.ts"', '"types": "es/index.d.ts"')
        }

        content &&
            fs.writeFileSync(
                packageJsonPath,
                content
            );
    }
});
