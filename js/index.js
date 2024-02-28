function contactarVendedor(numero, producto) {
    const mensaje = "Quiero comprar este producto: " + producto;
    const url = "https://api.whatsapp.com/send?phone=" + numero + "&text=" + encodeURIComponent(mensaje);
    window.open(url, '_blank');
  }