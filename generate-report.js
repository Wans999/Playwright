const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports',
  reportPath: 'reports/html',
  metadata: {
    browser: { name: 'chrome', version: '120' },
    device: 'Local Machine',
    platform: { name: 'macOS' }
  },
  customData: {
    title: 'Test Report',
    data: [
      { label: 'Project', value: 'Playwright + Cucumber' },
      { label: 'Environment', value: 'Development' }
    ]
  }
});