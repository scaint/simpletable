let t = new SimpleTable(document.querySelector('table'))

t.setFormatter(0, (v) => {
  let el = document.createElement('A')
  el.href = v
  el.textContent = v
  el.title = 'Show record ' + v
  return el
})

let data = [
  [1, 'Admin', 'admin@example.com'],
  [2, 'Alice', 'alice@localhost']
]

data.forEach((values) => { t.appendRow(values) })
