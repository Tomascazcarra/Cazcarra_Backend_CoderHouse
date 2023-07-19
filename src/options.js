let options = null;

function setOptions(parsedOptions) {
  options = parsedOptions;
}

function getOptions() {
  return options;
}

export { setOptions, getOptions };