// Personal Finance Calculator App (MVP)


const defaultCategories = [
  { label: 'Asrat (ዐሥራት)', type: 'percent', value: 10 },
  { label: 'Donations', type: 'percent', value: 5 },
  { label: 'Savings', type: 'percent', value: 20 },
  { label: 'Pocket Money', type: 'remainder', value: 0 }
];

function loadAllocations() {
  const data = localStorage.getItem('allocations');
  if (!data) return [...defaultCategories];
  try {
    return JSON.parse(data);
  } catch {
    return [...defaultCategories];
  }
}

function saveAllocations(allocs) {
  localStorage.setItem('allocations', JSON.stringify(allocs));
}

let allocationSet = loadAllocations();

function renderApp() {
  document.getElementById('app-root').innerHTML = `
    <h1>Personal Finance Calculator</h1>
    <form id="income-form">
      <label>Total Income (ETB):<br><input type="number" id="income" min="0" required></label><br>
      <label>Note:<br><input type="text" id="note" placeholder="e.g. Salary, Freelance"></label><br>
      <button type="submit">Calculate</button>
    </form>
    <h2>Edit Allocations</h2>
    <form id="allocations-form">
      <table class="result-table">
        <tr><th>Name</th><th>Type</th><th>Value</th></tr>
        ${allocationSet.map((a, i) => `
          <tr>
            <td><input type="text" value="${a.label}" data-idx="${i}" class="alloc-label" /></td>
            <td>
              <select data-idx="${i}" class="alloc-type">
                <option value="percent"${a.type==='percent'?' selected':''}>Percent</option>
                <option value="fixed"${a.type==='fixed'?' selected':''}>Fixed</option>
                <option value="remainder"${a.type==='remainder'?' selected':''}>Remainder</option>
              </select>
            </td>
            <td><input type="number" min="0" value="${a.value}" data-idx="${i}" class="alloc-value" ${a.type==='remainder'?'disabled':''} /></td>
          </tr>
        `).join('')}
      </table>
      <button type="button" id="add-allocation">Add Allocation</button>
      <button type="submit">Save Allocations</button>
    </form>
    <div id="allocations"></div>
  `;
  document.getElementById('income-form').onsubmit = handleCalculate;
  document.getElementById('allocations-form').onsubmit = handleSaveAllocations;
  document.getElementById('add-allocation').onclick = handleAddAllocation;
  document.querySelectorAll('.alloc-type').forEach(sel => {
    sel.onchange = (e) => {
      const idx = +e.target.dataset.idx;
      allocationSet[idx].type = e.target.value;
      if (e.target.value === 'remainder') {
        allocationSet[idx].value = 0;
      }
      renderApp();
    };
  });
}

function handleAddAllocation() {
  allocationSet.push({ label: 'New', type: 'percent', value: 0 });
  renderApp();
}

function handleSaveAllocations(e) {
  e.preventDefault();
  const labels = Array.from(document.querySelectorAll('.alloc-label')).map(input => input.value.trim() || 'Unnamed');
  const types = Array.from(document.querySelectorAll('.alloc-type')).map(sel => sel.value);
  const values = Array.from(document.querySelectorAll('.alloc-value')).map((input, i) => types[i] === 'remainder' ? 0 : parseFloat(input.value) || 0);
  allocationSet = labels.map((label, i) => ({ label, type: types[i], value: values[i] }));
  saveAllocations(allocationSet);
  renderApp();
}

function handleCalculate(e) {
  e.preventDefault();
  const income = parseFloat(document.getElementById('income').value);
  if (isNaN(income) || income <= 0) {
    alert('Please enter a valid income amount.');
    return;
  }
  // Always use the latest saved allocations
  const latestAllocations = loadAllocations();
  const results = calculateAllocations(income, latestAllocations);
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
