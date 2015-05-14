System.config({
  "baseURL": "/",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.3.3",
    "babel-runtime": "npm:babel-runtime@5.3.3",
    "core-js": "npm:core-js@0.9.8",
    "eduardolundgren/tracking.js": "github:eduardolundgren/tracking.js@1.1.0",
    "jquery": "github:components/jquery@2.1.4",
    "rcombs/Cube.js": "github:rcombs/Cube.js@master",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.8": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

