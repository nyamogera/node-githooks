console.log("pre-push success!");

const util = require("../index").util;

console.log( util.equalBranches("master", "develop") ) ;
console.log( util.equalBranches("hoge", "develop") ) ;
console.log( util.equalBranches("master") ) ;
console.log( util.equalBranches("piyo","master") ) ;

console.log( "src branch changed:" + util.directoryHasChanged("src",util.getCurrentBranch(),util.getRemoteBranch()) ) ;

process.exit(0);
