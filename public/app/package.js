function newFunction() {
    return {
        name: "Pdubbs Solutions",
        version: "1.0.0",
        main: "/index.html",
        type: "module",
        scripts: {
            test: "firebase serve",
            app: "app.mjs",
            index: "index.mjs",
            express: "express.mjs",
        },
        repository: {
            type: "git",
            url: "https://github.com/PdubbsSolutions/Pdubbs-final.git" 
        },
        author: "Pdubbs Solutions",
        license: "ISC",
        description: "PDubbs Solutions",
        parserOptions: {
            sourceType: "module"
        }
    };
}


// Dev server configuration
const devServer = {
    proxy: {
        '/api': {
            target: 'https://pdubbssolutions.ca',
            changeOrigin: true,
            secure: true,
        },
        '/': {
            target: 'https://pdubbssolutions.com', 
            changeOrigin: true,
            secure: true, 
        }
    }
};

// Example of how you might use these
const packageConfig = newFunction();
console.log(packageConfig);
console.log(devServer);
