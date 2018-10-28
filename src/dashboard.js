const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()

function Dashboard() {
  this.screen = screen
}

const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})

// Dashboard.prototype.render = (this) => {
//   this.screen.render()
// }

// Dashboard.prototype.bootstrap = (this) => {

// }
const table = grid.set(0, 0, 5, 5, contrib.table, {
  keys: true,
  fg: 'white',
  bg: 'black',
  selectedFg: 'black',
  selectedBg: 'green',
  interactive: true,
  label: 'Tests',
  width: '30%',
  height: '30%',
  border: { type: 'line', fg: 'cyan' },
  columnSpacing: 10, //in chars
  columnWidth: [16, 8, 8, 8] /*in chars*/
})

//allow control the table with the keyboard
table.focus()

//must append before setting data
// screen.append(table)

table.setData({
  headers: ['Test file', 'Passed', 'Failed', 'Pending'],
  data: [[1, 2, 3, 4], [5, 6, 7, 8]]
})

const log = grid.set(0, 5, 5, 5, contrib.log, {
  fg: 'green',
  selectedFg: 'green',
  label: 'Server Log'
})

log.log('new log line')

// const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})
// grid.set(0, 0, 0, 0, table, {label: 'Tests'})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0)
})

screen.on('resize', () => {
  table.emit('attach')
})

screen.render()

module.exports = Dashboard
