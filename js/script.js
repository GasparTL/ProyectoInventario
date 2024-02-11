document.addEventListener('DOMContentLoaded', function() {
    const productForm = document.getElementById('productForm');
    const productTable = document.getElementById('productTable');
    const sellTable = document.getElementById('sellTable');
    const inventoryTable = document.getElementById('inventoryTable');
    const exportBtn = document.getElementById('exportBtn');
  
    productForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const productName = document.getElementById('productName').value;
      const quantity = parseInt(document.getElementById('quantity').value);
      const price = parseFloat(document.getElementById('price').value);
  
      const totalInvestment = quantity * price;
  
      const newRow = `
        <tr>
          <td>${productName}</td>
          <td>${quantity}</td>
          <td>$${price.toFixed(2)}</td>
          <td>$${totalInvestment.toFixed(2)}</td>
        </tr>
      `;
  
      productTable.querySelector('tbody').insertAdjacentHTML('beforeend', newRow);
      updateSellTable();
      updateInventoryTable();
      productForm.reset();
    });
  
    function updateSellTable() {
      // Implementar lógica para actualizar la tabla de venta
    }
  
    function updateInventoryTable() {
      // Implementar lógica para actualizar la tabla de inventario
    }
  
    exportBtn.addEventListener('click', function() {
      // Implementar lógica para exportar la información a Excel
    });
  });
  