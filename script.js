function addNumbers() {
  const input1 = document.getElementById('input1');
  const input2 = document.getElementById('input2');
  const resultInput = document.getElementById('result');

  const val1 = parseInt(input1.value);
  const val2 = parseInt(input2.value);

  if (!isNaN(val1) && !isNaN(val2)) {
    const sum = val1 + val2;
    resultInput.value = sum; // ✅ show in result field, keep input values

    // Send to backend only if valid integer
    fetch(`http://127.0.0.1:8000/api/v1/store-result/?sum=${sum}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 'saved') {
          appendToList(data.value);
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error saving:', error);
        alert('Failed to save result.');
      });
  } else {
    resultInput.value = 'Please enter valid integers';
  }
}

function appendToList(value) {
  const list = document.getElementById('resultList');
  const li = document.createElement('li');
  li.textContent = `Result: ${value}`;
  list.appendChild(li);
}

function loadResults() {
  fetch('http://127.0.0.1:8000/api/v1/get-results/')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('resultList');
      list.innerHTML = '';
      data.results.forEach((val, i) => {
        const li = document.createElement('li');
        li.textContent = `Result ${i + 1}: ${val}`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error('Load error:', err));
}

document.addEventListener('DOMContentLoaded', loadResults);
