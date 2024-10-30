function newFunction() {
    return {
        name: "Pdubbs-final",
        version: "1.0.0",
        main: "index.js",
        type: "module",
        scripts: {
            test: "firebase serve"
        },
        repository: {
            type: "git",
            url: "https://github.com/PdubbsSolutions/Pdubbs-final.git" 
        },
        author: "Pdubbs Solutions",
        license: "ISC",
        description: "",
        parserOptions: {
            sourceType: "module"
        }
    };
}

// Dev server configuration
const devServer = {
    proxy: {
        '/api': {
            target: 'http://localhost:5001',
            changeOrigin:  true,
            key:'AIzaSyAwwveYRqdPTsnLosZJzR8L-jk8DjzwvLo',
            domain: 'https://pdubbs-final.web.app//'
        }
    }
};

// Example of how you might use these
const packageConfig = newFunction();
console.log(packageConfig);
console.log(devServer);
