const blessed = require('blessed')
const contrib = require('blessed-contrib')
const screen = blessed.screen()

const table = contrib.table(
  {
    keys: true,
    fg: 'white',
    bg: 'black',
    selectedFg: 'black',
    selectedBg: 'green',
    interactive: true,
    label: 'Tests',
    width: '60%',
    height: '60%',
    border: { type: "line", fg: "cyan" },
    columnSpacing: 10, //in chars
    columnWidth: [16, 12, 12] /*in chars*/
  }
)

//allow control the table with the keyboard
table.focus()

//must append before setting data
screen.append(table)

table.setData(
  {
    headers: ['Test file', 'Passed', 'Failed'],
    data: [[1, 2, 3], [4, 5, 6]]
  }
)

// const grid = new contrib.grid({rows: 12, cols: 12, screen: screen})
// grid.set(0, 0, 0, 0, table, {label: 'Tests'})

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
  return process.exit(0);
})

screen.render()
