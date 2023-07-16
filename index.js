window.addEventListener('load', function () {
    updateBalanceList();
  
    const userInput = document.getElementById('user');
    userInput.focus();
  });

  function addUser() {
    const userInput = document.getElementById('user');
    const user = userInput.value.trim();
    if (user === '') {
      alert('Please enter a child name.');
      return;
    }
    // Send a POST request to the server to add the user to the database
    fetch('/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // User added successfully, update the balance list
          updateBalanceList();
        } else {
          // Handle the case where user addition failed
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        alert('An error occurred while adding the user.');
      });
    // Clear the input field
    userInput.value = '';
  }

  
  function incrementBalance(user) {
    // Perform the necessary actions to increment the balance of the user in the database
    // ...
  
    // Update the balance list
    updateBalanceList();
  }
  
  function decrementBalance(user) {
    // Perform the necessary actions to decrement the balance of the user in the database
    // ...
  
    // Update the balance list
    updateBalanceList();
  }
  
  function clearUser(user) {
    if (confirm('Are you sure you want to remove this child?')) {
      // Perform the necessary actions to remove the user from the database
      // ...
  
      // Update the balance list
      updateBalanceList();
    }
  }
  
  function updateBalanceList() {
    const userBalancesElement = document.querySelector('#userBalances tbody');
    userBalancesElement.innerHTML = '';
  
    // Fetch the balance list from the server/database
    // ...
  
    // Iterate over the balance list and update the HTML table
    // ...
  
    // Example structure for updating the balance list in the HTML table:
    /*
    for (const user of balanceList) {
      const row = document.createElement('tr');
      // Create and append table cells for each data (user, balance, actions)
      // ...
  
      userBalancesElement.appendChild(row);
    }
    */
  }