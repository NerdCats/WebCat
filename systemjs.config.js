(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'app':                        'app', // 'dist',
    'tests':                      'tests',
    'rxjs':                       'lib/rxjs',
    'angular2-in-memory-web-api': 'lib/angular2-in-memory-web-api',
    '@angular':                   'lib/@angular',
    'ng2-bootstrap':              'lib/ng2-bootstrap',
    'moment':                     'lib/moment',
    'ng2-bs3-modal':              'lib/ng2-bs3-modal',
  };

  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'app':                        { main: 'main.js',  defaultExtension: 'js' },
    'tests':                      { defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'web-api.js', defaultExtension: 'js' },
    'ng2-bootstrap':              { main: 'ng2-bootstrap.js', defaultExtension: 'js'},
    'moment':                     { main: 'moment.js', defaultExtension: 'js'},
    'ng2-bs3-modal':              { main: 'ng2-bs3-modal.js', defaultExtension: 'js'}
  };

  var packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/testing',
    '@angular/upgrade'
  ];

  // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
  packageNames.forEach(function(pkgName) {
    packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
  });

  var config = {
    map: map,
    packages: packages
  };

  // filterSystemConfig - index.html's chance to modify config before we register it.
  if (global.filterSystemConfig) { global.filterSystemConfig(config); }

  System.config(config);

})(this);
