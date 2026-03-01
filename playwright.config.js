const myConfig = ({
  testDir: './tests',
  timeout: 10 * 3000,

  reporter : 'html',
  use: {
    browserName: 'chromium',
    headless : false
  },
});

module.exports = myConfig;