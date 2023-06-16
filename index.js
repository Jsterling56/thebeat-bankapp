let balances = {};
    
function addUser() {
  const userInput = document.getElementById('user');
  const user = userInput.value.trim();
  
  if (user === '') {
    alert('Please enter a child name.');
    return;
  }
  
  if (user in balances) {
    alert('Child already exists.');
    return;
  }
  
  balances[user] = 0;
  userInput.value = '';
  
  updateBalanceList();
  
  alert('Child added successfully.');
}

function incrementBalance(user) {
  if (!(user in balances)) {
    alert('Child does not exist.');
    return;
  }
  
  balances[user] += 1;
  localStorage.setItem('balances', JSON.stringify(balances));
  updateBalanceList();
}

function decrementBalance(user) {
  if (!(user in balances)) {
    alert('Child does not exist.');
    return;
  }
  
  balances[user] -= 1;
  localStorage.setItem('balances', JSON.stringify(balances));
  updateBalanceList();
}

function clearUser(user) {
  if (confirm('Are you sure you want to remove this child?')) {
    delete balances[user];
    localStorage.setItem('balances', JSON.stringify(balances));
    updateBalanceList();
    alert('Child removed.');
  }
}

function updateBalanceList() {
  const userBalancesElement = document.querySelector('#userBalances tbody');
  userBalancesElement.innerHTML = '';

  const sortedUsers = Object.keys(balances).sort();

  for (const user of sortedUsers) {
    const row = document.createElement('tr');

    const userCell = document.createElement('td');
    userCell.textContent = user;

    const balanceCell = document.createElement('td');
    balanceCell.textContent = '$' + Math.round(balances[user]);

    const actionsCell = document.createElement('td');

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.className = 'balance-button increment-button';
    incrementButton.onclick = function() { incrementBalance(user); };

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.className = 'balance-button decrement-button';
    decrementButton.onclick = function() { decrementBalance(user); };

    const clearButton = document.createElement('button');
    clearButton.textContent = 'Remove Child';
    clearButton.className = 'balance-button clear-button';
    clearButton.onclick = function() { clearUser(user); };

    actionsCell.appendChild(incrementButton);
    actionsCell.appendChild(decrementButton);
    actionsCell.appendChild(clearButton);

    row.appendChild(userCell);
    row.appendChild(balanceCell);
    row.appendChild(actionsCell);

    userBalancesElement.appendChild(row);
  }
}

window.addEventListener('load', function() {
  balances = JSON.parse(localStorage.getItem('balances')) || {};
  updateBalanceList();
  
  const userInput = document.getElementById('user');
  userInput.focus();
});