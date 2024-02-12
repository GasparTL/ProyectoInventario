document.addEventListener('DOMContentLoaded', function() {
  const productForm = document.getElementById('productForm');
  const productTableBody = document.getElementById('productTableBody');
  const inventoryTable = document.getElementById('inventoryTable');
  const investmentTable = document.getElementById('investmentTable');
  const sellProductForm = document.getElementById('sellProductForm');
  const selectProduct = document.getElementById('selectProduct');
  const sellQuantity = document.getElementById('sellQuantity');
  const newPrice = document.getElementById('newPrice');
  const sellButton = document.getElementById('sellButton');
  const stockForm = document.getElementById('stockForm');
  const stockProduct = document.getElementById('stockProduct');
  const stockAction = document.getElementById('stockAction');
  const stockQuantity = document.getElementById('stockQuantity');
  const generateTicketButton = document.getElementById('generateTicketButton');
  const exportToExcelButton = document.getElementById('exportToExcelButton');
  const clearDataButton = document.getElementById('clearDataButton');
  let products = [];
  let totalEarnings = 0; // Variable para almacenar las ganancias totales

  // Obtener productos almacenados del localStorage, si los hay
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    products = JSON.parse(storedProducts);
    updateProductTable();
    updateInventoryTable();
    updateInvestmentTable();
    updateSellProductOptions();
    updateStockOptions();
  }

  productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const totalInvestment = quantity * price;

    const product = {
      name: productName,
      quantity: quantity,
      price: price,
      totalInvestment: totalInvestment,
      soldByPiece: 0, // Inicializar cantidad vendida por pieza
      soldByPackage: 0 // Inicializar cantidad vendida por paquete
    };

    products.push(product);
    updateProductTable();
    updateInventoryTable();
    updateInvestmentTable();
    updateSellProductOptions();
    updateStockOptions();
    productForm.reset();

    // Almacenar productos en localStorage después de agregar uno nuevo
    localStorage.setItem('products', JSON.stringify(products));
  });

  sellButton.addEventListener('click', function(event) {
    event.preventDefault();

    const selectedProductName = selectProduct.value;
    const selectedProduct = products.find(product => product.name === selectedProductName);
    const quantityToSell = parseInt(sellQuantity.value);
    const sellType = document.getElementById('sellType').value; // Obtener el tipo de venta seleccionado

    if (selectedProduct) {
      let quantityToSellAdjusted = quantityToSell; // Inicializar la cantidad a vender ajustada

      document.getElementById('sellType').addEventListener('change', function() {
        if (this.value === 'paquete') {
          const selectedProductName = selectProduct.value;
          const selectedProduct = products.find(product => product.name === selectedProductName);
          if (selectedProduct) {
            sellQuantity.value = 3; // Seleccionar por defecto 3 piezas del stock
          }
        }
      });

      if (quantityToSellAdjusted > 0 && quantityToSellAdjusted <= selectedProduct.quantity) {
        const totalSellPrice = quantityToSellAdjusted * (newPrice.value !== '' ? parseFloat(newPrice.value) : selectedProduct.price);
        const remainingQuantity = selectedProduct.quantity - quantityToSellAdjusted;

        // Calcular ganancias de esta venta
        const earningsFromSale = totalSellPrice - (selectedProduct.totalInvestment / selectedProduct.quantity) * quantityToSellAdjusted;
        totalEarnings += earningsFromSale; // Sumar ganancias al total

        // Actualizar cantidad vendida
        if (sellType === 'pieza') {
          selectedProduct.soldByPiece += quantityToSellAdjusted;
        } else if (sellType === 'paquete') {
          selectedProduct.soldByPackage += quantityToSellAdjusted;
        }
        selectedProduct.quantity = remainingQuantity;

        // Actualizar tablas
        updateProductTable();
        updateInventoryTable();
        updateInvestmentTable();

        // Mostrar venta en tabla de ventas
        const sellRow = `
          <tr>
            <td>${selectedProductName}</td>
            <td>${quantityToSellAdjusted}</td>
            <td>${newPrice.value !== '' ? parseFloat(newPrice.value) : selectedProduct.price}</td>
            <td>${totalSellPrice}</td>
          </tr>
        `;
        sellTable.insertAdjacentHTML('beforeend', sellRow);

        // Reiniciar formulario de venta
        sellQuantity.value = '';
        newPrice.value = '';
      } else {
        alert('No se puede realizar la venta. Verifica la cantidad y el producto seleccionado.');
      }
    } else {
      alert('Producto no encontrado.');
    }
  });

  stockForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedProductName = stockProduct.value;
    const selectedProduct = products.find(product => product.name === selectedProductName);
    const quantity = parseInt(stockQuantity.value);
    const action = stockAction.value;

    if (selectedProduct) {
      if (action === 'add') {
        selectedProduct.quantity += quantity;
        selectedProduct.totalInvestment += quantity * selectedProduct.price;
      } else if (action === 'remove') {
        if (quantity <= selectedProduct.quantity) {
          selectedProduct.quantity -= quantity;
          selectedProduct.totalInvestment -= quantity * selectedProduct.price;
        } else {
          alert('No hay suficiente stock para quitar.');
          return;
        }
      }
      updateProductTable();
      updateInventoryTable();
      updateInvestmentTable();
    } else {
      alert('Producto no encontrado.');
    }
  });

  generateTicketButton.addEventListener('click', function() {
    generateTicket();
  });

  function generateTicket() {
    // Obtener los datos de la venta
    const selectedProductName = selectProduct.value;
    const selectedProduct = products.find(product => product.name === selectedProductName);
    const quantityToSell = parseInt(sellQuantity.value);
    const sellType = document.getElementById('sellType').value;
    const newPriceValue = newPrice.value !== '' ? parseFloat(newPrice.value) : selectedProduct.price;
    const totalSellPrice = quantityToSell * newPriceValue;
  
    // Crear el contenido del ticket
    const ticketContent = `
      <div class="ticket">
        <h2 class="ticket-title">Ticket de Venta</h2>
        <div class="ticket-details">
          <p><strong>Producto:</strong> ${selectedProductName}</p>
          <p><strong>Cantidad:</strong> ${quantityToSell}</p>
          <p><strong>Tipo de venta:</strong> ${sellType}</p>
          <p><strong>Precio total:</strong> ${totalSellPrice}</p>
        </div>
      </div>
    `;
  
    // Abrir una nueva ventana con el contenido del ticket
    const ticketWindow = window.open('', '_blank');
    ticketWindow.document.body.innerHTML = ticketContent;

    // Crear el contenido del ticket
  
  
    // Crear un nuevo documento PDF
    const doc = new jsPDF();
    
    // Agregar el contenido del ticket al PDF
    doc.text(ticketContent, 10, 10);
    
    // Descargar el PDF automáticamente
    doc.save('ticket.pdf');
  }

  function updateProductTable() {
    productTableBody.innerHTML = '';
    products.forEach(product => {
      const row = `
        <tr>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${product.price}</td>
          <td>${product.totalInvestment}</td>
        </tr>
      `;
      productTableBody.insertAdjacentHTML('beforeend', row);
    });
  }

  function updateInventoryTable() {
    let inventoryData = {};
    products.forEach(product => {
      if (inventoryData[product.name]) {
        inventoryData[product.name].totalQuantity += product.quantity;
        inventoryData[product.name].remainingQuantity += product.quantity;
        inventoryData[product.name].soldByPiece += product.soldByPiece;
        inventoryData[product.name].soldByPackage += product.soldByPackage;
      } else {
        inventoryData[product.name] = {
          totalQuantity: product.quantity,
          remainingQuantity: product.quantity,
          soldByPiece: product.soldByPiece,
          soldByPackage: product.soldByPackage
        };
      }
    });

    // Nueva tabla para mostrar cantidad por pieza y por paquete vendida
    const inventoryTableHTML = `
      <thead>
        <tr>
          <th>Nombre Producto</th>
          <th>Stock Total</th>
          <th>Stock Actual</th>
          <th>Vendido por Piezas</th>
          <th>Vendido por Paquetes</th>
        </tr>
      </thead>
      <tbody>
        ${Object.keys(inventoryData).map(name => `
          <tr>
            <td>${name}</td>
            <td>${inventoryData[name].totalQuantity}</td>
            <td>${inventoryData[name].remainingQuantity}</td>
            <td>${inventoryData[name].soldByPiece}</td>
            <td>${inventoryData[name].soldByPackage}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

    inventoryTable.innerHTML = inventoryTableHTML;
  }

  function updateInvestmentTable() {
    const totalInvestment = products.reduce((acc, curr) => acc + curr.totalInvestment, 0);
    investmentTable.innerHTML = `
      <thead>
        <tr>
          <th>Inversión Total</th>
          <th>Ganancias Totales</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${totalInvestment}</td>
          <td>${totalEarnings}</td>
        </tr>
      </tbody>
    `;
  }

  function updateSellProductOptions() {
    selectProduct.innerHTML = '';
    products.forEach(product => {
      const option = document.createElement('option');
      option.text = product.name;
      option.value = product.name;
      selectProduct.add(option);
    });
  }

  function updateStockOptions() {
    stockProduct.innerHTML = '';
    products.forEach(product => {
      const option = document.createElement('option');
      option.text = product.name;
      option.value = product.name;
      stockProduct.add(option);
    });
  }

  exportToExcelButton.addEventListener('click', function() {
    exportTablesToExcel();
  });

  function exportTablesToExcel() {
    const workbook = new ExcelJS.Workbook();
    const productWorksheet = workbook.addWorksheet('Productos');
    const inventoryWorksheet = workbook.addWorksheet('Inventario');
    const investmentWorksheet = workbook.addWorksheet('Inversión y Ganancias');

    exportTableToExcel(productTable, productWorksheet);
    exportTableToExcel(inventoryTable, inventoryWorksheet);
    exportTableToExcel(investmentTable, investmentWorksheet);

    workbook.xlsx.writeBuffer().then(function(buffer) {
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'gestion_productos.xlsx');
    });
  }

  function exportTableToExcel(table, worksheet) {
    const rows = table.querySelectorAll('tr');
    rows.forEach(function(row, rowIndex) {
      const cols = row.querySelectorAll('th, td');
      cols.forEach(function(col, colIndex) {
        const cellValue = col.textContent.trim();
        worksheet.getCell(rowIndex + 1, colIndex + 1).value = cellValue;
      });
    });

    worksheet.columns.forEach(function(column, colIndex) {
      let maxLength = 0;
      column.eachCell(function(cell) {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });
  }
  
  clearDataButton.addEventListener('click', function() {
    clearAllData();
  });
  
  function clearAllData() {
    localStorage.removeItem('products');
    products = [];
    updateProductTable();
    updateInventoryTable();
    updateInvestmentTable();
    updateSellProductOptions();
    updateStockOptions();
  }

});