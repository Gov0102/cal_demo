function addNumbers() {
  const input1 = parseFloat(document.getElementById('input1').value);
  const input2 = parseFloat(document.getElementById('input2').value);
  const resultInput = document.getElementById('result');

  if (!isNaN(input1) && !isNaN(input2)) {
    const result = input1 + input2;
    resultInput.value = result;

    // Send to Django
    fetch('/store-result/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCSRFToken(),
      },
      body: JSON.stringify({ input1, input2 })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Saved:', data);
    });
  } else {
    resultInput.value = 'Please enter valid numbers';
  }
}

// Utility to get CSRF token from cookie
function getCSRFToken() {
  const name = 'csrftoken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const parts = decodedCookie.split(';');
  for (let i = 0; i < parts.length; i++) {
    let c = parts[i].trim();
    if (c.startsWith(name)) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
