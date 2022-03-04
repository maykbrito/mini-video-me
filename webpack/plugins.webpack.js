exports.createPackageJSONDistVersion = (buffer) => {
  const packageJSON = JSON.parse(buffer.toString());

  const {
    main,
    config,
    scripts,
    devDependencies,
    ...restOfProps
  } = packageJSON;

  packageJSONDistVersion = JSON.stringify(
    Object.assign(restOfProps, {
      main: './main/index.js',
      scripts: {
        start: 'electron .'
      }
    }),
    null,
    2
  );

  return packageJSONDistVersion;
}
