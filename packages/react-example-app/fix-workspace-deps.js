const fs = require('fs');
const path = require('path');

// Path to the app's package.json
const appPackageJsonPath = path.resolve(__dirname, './package.json');

// Load the app's package.json
const packageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));

// Replace workspace dependencies
if (packageJson.dependencies) {
  Object.keys(packageJson.dependencies).forEach((dep) => {
    console.log(packageJson.dependencies[dep])
    if (packageJson.dependencies[dep] === 'workspace:*') {
        packageJson.dependencies[dep] = packageJson.version;
      } else {
        console.warn(`Warning: package.json for dependency "${dep}" not found at "${appPackageJsonPath}"`);
    }
  });
}

// Save the updated package.json
fs.writeFileSync(appPackageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');

console.log('Updated workspace dependencies in package.json');