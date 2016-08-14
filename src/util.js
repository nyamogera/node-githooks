"use strict";
var util;
(function (util) {
    function getCurrentBranch() {
        require('shelljs/global');
        return exec("git rev-parse --abbrev-ref HEAD", { silent: true }).replace(/\r?\n/g, "");
    }
    util.getCurrentBranch = getCurrentBranch;
    function equalBranches() {
        var branchNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            branchNames[_i - 0] = arguments[_i];
        }
        require('shelljs/global');
        var currentBranch = exec("git rev-parse --abbrev-ref HEAD", { silent: true }).replace(/\r?\n/g, "");
        return branchNames.some(function (currentValue) { return currentBranch === currentValue; });
    }
    util.equalBranches = equalBranches;
    function fileHasChanged(filePath, branchA, branchB) {
        return true;
    }
    util.fileHasChanged = fileHasChanged;
    function getRemoteBranch(remote) {
        if (remote === void 0) { remote = "origin"; }
        return remote + "/" + getCurrentBranch();
    }
    util.getRemoteBranch = getRemoteBranch;
    function directoryHasChanged(directoryPath, branchA, branchB) {
        require('shelljs/global');
        // hasn't diff
        return "" !== exec("git diff " + branchA + " " + branchB + " --name-only  --relative=\"" + directoryPath + "\"", { silent: true }).replace(/\r?\n/g, "");
    }
    util.directoryHasChanged = directoryHasChanged;
})(util = exports.util || (exports.util = {}));
//# sourceMappingURL=util.js.map