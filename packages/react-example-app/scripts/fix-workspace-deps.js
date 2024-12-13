const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const appPackageJsonPath = path.resolve(__dirname, '../package.json');

// Parse command-line arguments
const args = process.argv.slice(2);
let mode = null;

// Look for the --mode argument
args.forEach((arg, index) => {
  if (arg === '--mode' && args[index + 1]) {
    mode = args[index + 1];
  }
});

// Validate mode
if (!mode || (mode !== 'build' && mode !== 'dev')) {
  console.error('Error: Please specify --mode with either "build" or "dev".');
  process.exit(1);
}

try {
  const packageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));

  if (!packageJson.dependencies || !packageJson.dependencies["supra-starkey-connect"]) {
    console.error('Error: "supra-starkey-connect" dependency not found in package.json.');
    process.exit(1);
  }

  // Get the version from packageJson.version
  const originalVersion = packageJson.version;

  // Set "supra-starkey-connect" to "workspace:*"
  packageJson.dependencies["supra-starkey-connect"] = "workspace:*";
  fs.writeFileSync(appPackageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log('Updated "supra-starkey-connect" to "workspace:*" for local build.');

  try {
    // Run the specified mode
    if (mode === 'build') {
      console.log('Running build...');
      execSync('pnpm run build', { stdio: 'inherit' });
    } else if (mode === 'dev') {
      console.log('Running dev...');
      execSync('pnpm vite', { stdio: 'inherit' });
    }
  } catch (buildError) {
    console.error(`Error during ${mode}:`, buildError.message);
    process.exit(1);
  }

  // Restore the original version from packageJson.version
  packageJson.dependencies["supra-starkey-connect"] = originalVersion;
  fs.writeFileSync(appPackageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
  console.log(`Restored "supra-starkey-connect" to version "${originalVersion}" after ${mode}.`);
} catch (error) {
  console.error(`Error: Unable to process package.json. ${error.message}`);
  process.exit(1);
}