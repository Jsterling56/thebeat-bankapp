let balances = {};
    
function addUser() {
  const userInput = document.getElementById('user');
  const user = userInput.value.trim();
  
  if (user === '') {
    alert('Please enter a user name.');
    return;
  }
  
  if (user in balances) {
    alert('User already exists.');
    return;
  }
  
  balances[user] = 0;
  userInput.value = '';
  
  updateBalanceList();
  
  alert('User added successfully.');
}

function updateBalance() {
  const amountInput = document.getElementById('amount');
  const amount = parseFloat(amountInput.value);
  
  const user = document.getElementById('user').value.trim();
  if (user === '') {
    alert('Please enter a user name.');
    return;
  }
  
  if (!(user in balances)) {
    alert('User does not exist. Please add the user first.');
    return;
  }
  
  balances[user] += amount;
  
  amountInput.value = '';
  amountInput.focus();
  
  localStorage.setItem('balances', JSON.stringify(balances));
  updateBalanceList();
}

function incrementBalance(user) {
  if (!(user in balances)) {
    alert('User does not exist.');
    return;
  }
  
  balances[user] += 1;
  localStorage.setItem('balances', JSON.stringify(balances));
  updateBalanceList();
}

function decrementBalance(user) {
  if (!(user in balances)) {
    alert('User does not exist.');
    return;
  }
  
  balances[user] -= 1;
  localStorage.setItem('balances', JSON.stringify(balances));
  updateBalanceList();
}

function updateBalanceList() {
  const userBalancesElement = document.querySelector('#userBalances tbody');
  userBalancesElement.innerHTML = '';
  
  for (const user in balances) {
    const row = document.createElement('tr');
    
    const userCell = document.createElement('td');
    userCell.textContent = user;
    
    const balanceCell = document.createElement('td');
    balanceCell.textContent = '$' + Math.round(balances[user]);
    
    const actionsCell = document.createElement('td');
    
    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.className = 'balance-button';
    incrementButton.onclick = function() { incrementBalance(user); };
    
    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.className = 'balance-button';
    decrementButton.onclick = function() { decrementBalance(user); };
    
    actionsCell.appendChild(incrementButton);
    actionsCell.appendChild(decrementButton);
    
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