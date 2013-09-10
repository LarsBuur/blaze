Package.describe({
  summary: "Meteor UI Components framework"
});

Package.on_use(function (api) {
  api.export(['UI']);
  api.use('deps');
  api.use('random');
  api.use('ejson');
  api.use('underscore'); // very slight
  api.use('ordered-dict');
  api.use('minimongo');  // for idStringify

  api.add_files(['base.js']);

  api.add_files(['dombackend.js',
                 'domrange.js'], 'client');

  api.add_files(['attrs.js',
                 'render.js',
                 'fields.js',
                 'template.js',
                 'components.js',
                 'each.js']);
});

Package.on_test(function (api) {
  api.use('tinytest');
  api.use('ui');
  api.use(['test-helpers', 'underscore'], 'client');

  api.add_files([
    'base_tests.js',
    'render_tests.js',
    'domrange_tests.js'
  ], 'client');
});
