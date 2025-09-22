// Personal Finance Calculator App (MVP)

const defaultCategories = [
  { label: 'Asrat (ዐሥራት)', type: 'percent', value: 10 },
  { label: 'Donations', type: 'percent', value: 5 },
  { label: 'Savings', type: 'percent', value: 20 },
  { label: 'Pocket Money', type: 'remainder', value: 0 }
];

let allocationSet = [...defaultCategories];

function renderApp() {
  document.getElementById('app-root').innerHTML = `
    <h1>Personal Finance Calculator</h1>
    <form id="income-form">
      <label>Total Income (ETB):<br><input type="number" id="income" min="0" required></label><br>
      <label>Note:<br><input type="text" id="note" placeholder="e.g. Salary, Freelance"></label><br>
      <button type="submit">Calculate</button>
    </form>
    <div id="allocations"></div>
  `;
  document.getElementById('income-form').onsubmit = handleCalculate;
}

function handleCalculate(e) {
  e.preventDefault();
  const income = parseFloat(document.getElementById('income').value);
  if (isNaN(income) || income <= 0) {
    alert('Please enter a valid income amount.');
    return;
  }
  const results = calculateAllocations(income, allocationSet);
  renderResults(results, income);
}

function calculateAllocations(income, rules) {
  let remaining = income;
  const allocations = [];
  for (const rule of rules) {
    let amount = 0;
    if (rule.type === 'percent') {
      amount = Math.floor((rule.value / 100) * income);
    } else if (rule.type === 'fixed') {
      amount = Math.min(rule.value, remaining);
    } else if (rule.type === 'remainder') {
      amount = remaining;
    }
    allocations.push({
      label: rule.label,
      amount,
      percent: ((amount / income) * 100).toFixed(1)
    });
    remaining -= amount;
  }
  return allocations;
}

function renderResults(allocations, income) {
  let html = `<table class="result-table">
    <tr><th>Category</th><th>Amount (ETB)</th><th>% of Income</th></tr>`;
  allocations.forEach(a => {
    html += `<tr><td>${a.label}</td><td>${a.amount}</td><td>${a.percent}%</td></tr>`;
  });
  const total = allocations.reduce((sum, a) => sum + a.amount, 0);
  html += `<tr><th>Total</th><th>${total}</th><th>${((total/income)*100).toFixed(1)}%</th></tr>`;
  if (total < income) {
    html += `<tr><td colspan="3" style="color:#b91c1c">Unallocated: ${income-total} ETB</td></tr>`;
  }
  html += `</table>`;
  document.getElementById('allocations').innerHTML = html;
}

// Initial render
renderApp();
