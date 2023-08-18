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
    function deleteProduct(id) {
      fetch(`http://localhost:8080/api/products/${id}`, {
          method: 'DELETE'
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
          alert('Producto eliminado con éxito');
          location.reload(); // Actualizar la página después de eliminar el producto
        })
        .catch(error => {
          console.error(error);
        });
    }
    
    
    
    
    
