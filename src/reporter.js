const mocha = require('mocha')
module.exports = MyReporter

function MyReporter(runner) {
  mocha.reporters.Base.call(this, runner)
  let passes = 0
  let failures = 0

  runner.on('pass', (test) => {
    passes++
    console.log('pass: %s', test.fullTitle())
  })

  runner.on('fail', (test, err) => {
    console.log('err', err)
    failures++
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message)
  })

  runner.on('end', () => {
    console.log('end: %d/%d', passes, passes + failures)
  })
}
