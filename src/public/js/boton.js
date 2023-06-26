function addCart() {
    fetch('http://localhost:8080/api/carts', {
        method: 'POST'
      })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Error: ' + response.status);
        }
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
    }
    
    
    
    
    
    
    
