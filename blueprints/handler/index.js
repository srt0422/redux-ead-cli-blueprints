const {
  pwd
} = require("shelljs");

const path = require("path");
const fs = require("fs");

const defaultHandlersPath = "handlers";
const defaultEffectsPath = "effects";

function getNames(namesPath) {

  const dirPath = path.join(pwd().stdout, namesPath);

  const fileNames = fs.readdirSync(dirPath);

  return convertToEntityNames(fileNames)
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

function getHandlersPath(options) {

  const sourceBase = options.settings.getSetting("sourceBase");
  const effectsPathSegment = options.settings.getSetting("effectsPath") || defaultEffectsPath;
  const effectsPath = path.join(sourceBase, effectsPathSegment);

  const functionsPathSegment = options.settings.getSetting("handlersPath") || defaultHandlersPath;

  return path.join(effectsPath, functionsPathSegment);
}

function renameIndexFiles(options) {

  const functionsPath = getHandlersPath(options);

  renameIndexFile(functionsPath);
}

function renameIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js");

  if (fs.existsSync(absolutePath))
    fs.renameSync(absolutePath, path.join(pwd().stdout, pathName, "index.js.temp"));
}

function removeIndexFiles(options) {

  const functionName = getHandlersPath(options);

  removeIndexFile(functionName);
}

function removeIndexFile(pathName) {

  const absolutePath = path.join(pwd().stdout, pathName, "index.js.temp");

  if (fs.existsSync(absolutePath))
    fs.unlinkSync(absolutePath);
}

module.exports = {

  description() {
    return 'Generates a reducer/actions/constant Duck Module for redux with effects-as-data boilerplate.';
  },

  locals: function(options) {

    functionsPath = getHandlersPath(options);
    // Return custom template variables here.
    return {
      handlers: getNames(functionsPath, options.entity.name),
      testDescription: ""
    };
  },

  fileMapTokens() {
    return {
      __ead__: options => options.settings.getSetting('effectsPath') || defaultEffectsPath,
      __handlers__: options => options.settings.getSetting('handlersPath') || defaultHandlersPath
    };
  },

  beforeInstall: function(options) {
    renameIndexFiles(options);
  },

  afterInstall: function(options) {
    removeIndexFiles(options);
  },
};
