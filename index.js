const { execSync } = require('child_process');
const package = require('./package.json');

(function() {
    const appVersionInfo = {
        version: "",
        branch: "",
        tag: "",
        revision: "",
        builtTime: ""
    };
    let output;

    try {
        // Extract package version
        appVersionInfo.version = package.version;
    
        // Extract build time
        appVersionInfo.builtTime = Date.now();

        try {
            // Extract branch
            output = executeCommand('git symbolic-ref --short -q HEAD');
            appVersionInfo.branch = output;
        } catch (err){ 
            console.warn("app-version-info warning: couldn't extract branch");
        }

        try {
            // Extract tag
            // 2> /dev/null
            // 2> redirects stderr to file
            // /dev/null null device takes any input and throws away
            output = executeCommand('git describe --tags --exact-match 2> /dev/null');
            appVersionInfo.tag = output;
        } catch (err){
            console.warn("app-version-info warning: couldn't extract tag");
        }

        try {
            // Extract revision
            output = executeCommand('git rev-parse --short HEAD');
            appVersionInfo.revision = output;
        } catch (err){
            console.warn("app-version-info warning: couldn't extract tag");
        }

    } catch (err){ 
        console.warn("app-version-info warning: failed getting some information");
    }
    // TODO make it a generic plugin and separate out Vue specific environment variable setup
    process.env.VUE_APP_VERSION_INFO = JSON.stringify(appVersionInfo);

    function executeCommand(command) {
      // TODO Handle error cases
      // Check if should use spawn instead 
      return execSync(command).toString().trim();
    }
})();