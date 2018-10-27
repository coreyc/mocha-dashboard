const mocha = require('mocha')
// const Dashboard = require('./dashboard')

function convertMilliseconds(millis) {
  const minutes = Math.floor(millis / 60000)
  const seconds = ((millis % 60000) / 1000).toFixed(0)
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds
}

function MochaDashboardReporter(runner) {
  mocha.reporters.Base.call(this, runner)

  let passes = 0
  let failures = 0
  let pending = 0
  let startTime
  let endTime
  let totalTime
  const history = new Map()
  // const dashboard = new Dashboard()

  runner.on('start', () => {
    startTime = Date.now()
    console.log('start time', startTime)
  })

  runner.on('pass', (test) => {
    passes++
    history.set(test.fullTitle(), {status: 'passed'})
    console.log('pass: %s', test.fullTitle())
  })

  runner.on('fail', (test, err) => {
    const {stack, message} = err
    console.log('stack trace:', stack)
    failures++
    const testTitle = test.fullTitle()
    console.log('fail: %s -- error: %s', testTitle, message)
    history.set(testTitle, {status: 'failed', stack, message})
    console.log('history', Array.from(history))
  })

  runner.on('pending', (test, err) => {
    pending++
    history.set(test.fullTitle(), {status: 'pending'})
  })

  runner.on('end', () => {
    endTime = Date.now()
    totalTime = endTime - startTime
    console.log('end time', endTime)
    console.log('total time', totalTime, 'milliseconds')
    console.log('end: %d/%d', passes, passes + failures + pending)
    // pass 'passes' and 'failures' to dashboard setData for table method
    // render?
  })
}

module.exports = MochaDashboardReporter
