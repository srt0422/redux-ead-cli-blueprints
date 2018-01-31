const {
  pwd
} = require("shelljs");

const path = require("path");
const fs = require("fs");

const defaultStatelessPath = "components";

function getNames(namesPath, entityName) {

  const dirPath = path.join(pwd().stdout, namesPath);

  const fileNames = fs.readdirSync(dirPath);

  return convertToEntityNames(fileNames, entityName)
    .filter(it => ["index", entityName].indexOf(it) === -1)
    .filter(function(item, pos, self) {
      return self.indexOf(item) == pos;
    })
    .concat([entityName]);
}

function convertToEntityNames(fileNames) {

  return fileNames.map((it) => {
    if (it.split(".").length > 0) {
      return it.split(".")[0];
    }

    return it;
  });
}

function getStatelessPath(options) {

  const sourceBase = options.settings.getSetting("sourceBase");
  // const effectsPathSegment = options.settings.getSetting("effectsPath") || "effects";
  // const effectsPath = path.join(sourceBase, effectsPathSegment);

  const statelessPathSegment = options.settings.getSetting("statelessPath") || defaultStatelessPath;

  return path.join(sourceBase, statelessPathSegment);
}

function renameIndexFiles(options) {

  const statelessPath = getStatelessPath(options);

  renameIndexFile(statelessPath);
}

function renameIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js");

  if (fs.existsSync(absolutePath))
    fs.renameSync(absolutePath, path.join(pwd().stdout, pathName, "index.js.temp"));
}

function removeIndexFiles(options) {

  const functionName = getStatelessPath(options);

  removeIndexFile(functionName);
}

function removeIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js.temp");

  if (fs.existsSync(absolutePath))
    fs.unlinkSync(absolutePath);
}

module.exports = {
  description() {
    return 'Generates a stateless (pure function) component';
  },
  locals(options){

      statelessPath = getStatelessPath(options);

      // Return custom template variables here.
      return {
        components: getNames(statelessPath, options.entity.name),
        testDescription: ""
      };
  },
  fileMapTokens() {
    return {
      __stateless__: options => {
        return options.settings.getSetting('statelessPath') ||  options.settings.getSetting('dumbPath');
      }
    };
  },

  beforeInstall: function(options) {
    renameIndexFiles(options);
  },

  afterInstall: function(options) {
    removeIndexFiles(options);
  },
};
