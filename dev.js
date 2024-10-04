import { spawn } from 'child_process';

const startApiServer = () => {
    return new Promise((resolve, reject) => {
        const apiServer = spawn('node', ['api-server.js'], { stdio: 'inherit' });

        apiServer.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`API server exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
};

const startShopifyApp = () => {
    return new Promise((resolve, reject) => {
        const shopifyApp = spawn('shopify', ['app', 'dev'], { stdio: 'inherit' });

        shopifyApp.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Shopify app dev server exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
};

(async() => {
    try {
        await startApiServer();
        await startShopifyApp();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();