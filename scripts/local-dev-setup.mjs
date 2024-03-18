import fs from 'node:fs/promises';
import { dirname } from 'node:path';
import readline from 'node:readline';

const EXAMPLE_ENV_FILE = 'example.env';
const TARGET_ENV_FILE = '.env';

// ------------------

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


function basePath(...paths) {
    return paths.join(dirname(dirname(new URL(import.meta.url).pathname)), ...paths);
}

async function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, resolve);
    });
}

function checkForExistingEnvFile(targetFn) {
    return fs
        .access(targetFn)
        .then(() => true)
        .catch(() => false);
}

function ensureStringIsHttpsUrl(url) {
    let result = url || 'https://techbychoice.org';

    if (!result.includes('://')) {
        result = `https://${result}`;
    }

    const parsed = new URL(result);

    if (parsed.protocol !== 'https:') {
        parsed.protocol = 'https:';
    }

    return `${parsed.toString().replace(/\/+$/, '')}/`;
}

function updateEnvSettings(content, devApiUrl) {
    return content.replace(/^VITE_APP_API_BASE_URL=.+$/gim, `VITE_APP_API_BASE_URL=${ensureStringIsHttpsUrl(devApiUrl)}`);
}

async function main() {
    const targetEnvironmentFile = basePath(TARGET_ENV_FILE);
    const exampleEnvironmentFile = basePath(EXAMPLE_ENV_FILE);

    if (checkForExistingEnvFile(targetEnvironmentFile)) {
        console.log(`The target environment file already exists: ${targetEnvironmentFile}`);
        process.exit(0);
    }

    const devApiUrl = await askQuestion('Enter the TechByChoice Dev API URL: ');
    const exampleEnvFileContents = await fs.readFile(exampleEnvironmentFile, 'utf-8');

    await fs.writeFile(targetEnvironmentFile, updateEnvSettings(exampleEnvFileContents, devApiUrl));

    console.log(`The target environment file has been created: ${targetEnvironmentFile}`);
    console.log('The next step is to have your ip address whitelisted on the dev firewall so you can access the server from your local.');
}

main().finally(() => {
    rl.close();
});
