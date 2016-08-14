module.exports = function () {

    const fs = require("fs");
    const chmod = require('chmod');
    const path = require("path");
    const mkdirp = require('mkdirp');

    require('shelljs/global');

    const nodePath = which("node");
    const pathArr = nodePath.split("/");
    pathArr.pop();
    const binPath = pathArr.join("/");
    const binStr = `export PATH=$PATH:${binPath}`;

    // Get
    const gitRoot = exec("git rev-parse --show-toplevel", {silent: true}).replace(/\r?\n/g, "");
    const pwd = exec("pwd", {silent: true}).replace(/\r?\n/g, "");
    const hooksPath = path.relative(`${gitRoot}`, `${pwd}/.githooks`);

    const addHooks = (hookName) => {
        const hooksScriptPath = path.join(hooksPath, hookName + ".js");
        const fileName = path.normalize(`${gitRoot}/.git/hooks/${hookName}`);

        const data = `#!/bin/bash
${binStr}
# file exits check
if [ -e ${hooksScriptPath} ]; then
  node ${hooksScriptPath}
fi`;

        const dataScripts = `console.log("${hookName} success!");
process.exit(0);
    `;

        const fileScripts = path.normalize(`${pwd}/.githooks/${hookName}.js`);

        fs.writeFileSync(fileName, data);
        chmod(fileName, 755);

        try {
            fs.accessSync("filename.ext", fs.R_OK | fs.W_OK)
            console.log("file exits : " + fileScripts)
        } catch (e) {

            fs.writeFileSync(fileScripts, dataScripts);
            chmod(fileScripts, 755);
            console.log("writeFile : " + fileScripts);
        }
    };

    mkdirp('.githooks', function (err) {
        if (err) {
            console.error(err)
            process.exit(1);
        }

        addHooks("pre-push");
    });

};