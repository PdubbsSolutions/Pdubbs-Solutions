function newFunction() {
    return {
        name: "Pdubbs-final",
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
            target: 'pdubbs-final.web.app',
            changeOrigin: true,
            domain: 'https://pdubbs-final.web.app'
        }
    }
};


// Example of how you might use these
const packageConfig = newFunction();
console.log(packageConfig);
console.log(devServer);
