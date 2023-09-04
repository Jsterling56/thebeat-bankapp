const express = require('express');
const app = express();
const balanceRoutes = require('./routes/balances');


function addChild() {
    const childName = document.getElementById('childName').value;
  
    if (!childName) {
      alert('Please provide a child name.');
      return;
    }
  
    fetch('/balance/addChild', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ childName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          // Perform any other necessary actions or updates
        } else {
          alert('Error adding child.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }

  function deleteChild() {
    const childName = document.getElementById('childToDelete').value;
  
    if (!childName) {
      alert('Please provide a child name.');
      return;
    }
  
    fetch('/balance/deleteChild', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ childName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          // Perform any other necessary actions or updates
        } else {
          alert('Error deleting child.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }

  // Fetch and display child balances
  fetch('/balance/getBalances') // Change this to the appropriate URL
  .then(response => response.json())
  .then(data => {
    const userBalances = document.getElementById('userBalances');
  
    data.balances.forEach(balance => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${balance.user}</td>
        <td>${balance.balance}</td>
        <td>
          <button class="balance-button increment-button" data-user="${balance.user}" onclick="incrementBalance('${balance.user}')">+</button>
          <button class="balance-button decrement-button" data-user="${balance.user}" onclick="decrementBalance('${balance.user}')">-</button>
        </td>
      `;
  
      userBalances.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  alert('An error occurred while fetching child balances.');
});

  function incrementBalance() {
    const childName = document.getElementById('childToModify').value;
  
    if (!childName) {
      alert('Please provide a child name.');
      return;
    }
  
    fetch('/balance/incrementBalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ childName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          // Perform any other necessary actions or updates
        } else {
          alert('Error incrementing balance.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }
  
  function decrementBalance() {
    const childName = document.getElementById('childToModify').value;
  
    if (!childName) {
      alert('Please provide a child name.');
      return;
    }
  
    fetch('/balance/decrementBalance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ childName }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          // Perform any other necessary actions or updates
        } else {
          alert('Error decrementing balance.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
      });
  }
function queryChildren() {
  fetch('/balance/getData', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        alert(data.message);
        // Perform any other necessary actions or updates
      } else {
        alert('Error getting data.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred.');
    });
  }

queryChildren();