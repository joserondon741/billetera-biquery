$(document).ready(function() {
  if (!localStorage.getItem('wallet_history')) {
    var historialInicial = [{ detalle: 'Abono Inicial Cuenta', monto: '+$450.000', clase: 'text-success' }];
    localStorage.setItem('wallet_history', JSON.stringify(historialInicial));
  }

  if ($('#loginForm').length) {
    $('#loginForm').submit(function(event) {
      event.preventDefault();
      var username = $('#username').val();
      var password = $('#password').val();
      if (username === 'jose@inacap.cl' && password === '1234') {
        window.location.href = 'menu.html';
      } else {
        alert('Usuario o contraseña invalido. Inténtalo de nuevo.');
      }
    });
  }

  if ($('#balance').length) {
    var balance = parseFloat(localStorage.getItem('wallet_balance')) || 450000;
    $('#balance').text('$' + balance.toLocaleString('es-CL'));
  }

  if ($('#saldoEnDeposito').length) {
    var balanceDep = parseFloat(localStorage.getItem('wallet_balance')) || 450000;
    $('#saldoEnDeposito').text('$' + balanceDep.toLocaleString('es-CL'));

    $('#formDep').submit(function(event) {
      event.preventDefault();
      var amount = parseFloat($('#montoADepositar').val());
      if (!isNaN(amount) && amount > 0) {
        balanceDep += amount;
        localStorage.setItem('wallet_balance', balanceDep);
        
        var lista = JSON.parse(localStorage.getItem('wallet_history')) || [];
        lista.push({ detalle: 'Depósito de fondos', monto: '+$' + amount.toLocaleString('es-CL'), clase: 'text-success' });
        localStorage.setItem('wallet_history', JSON.stringify(lista));

        alert('¡Depósito realizado con éxito!');
        window.location.href = 'menu.html';
      } else {
        alert('Monto inválido.');
      }
    });
  }

  if ($('#saldoEnRetiro').length) {
    var balanceRet = parseFloat(localStorage.getItem('wallet_balance')) || 450000;
    $('#saldoEnRetiro').text('$' + balanceRet.toLocaleString('es-CL'));

    $('#formRetiro').submit(function(event) {
      event.preventDefault();
      var amount = parseFloat($('#montoARetirar').val());
      if (!isNaN(amount) && amount > 0 && amount <= balanceRet) {
        balanceRet -= amount;
        localStorage.setItem('wallet_balance', balanceRet);

        var lista = JSON.parse(localStorage.getItem('wallet_history')) || [];
        lista.push({ detalle: 'Retiro de efectivo', monto: '-$' + amount.toLocaleString('es-CL'), clase: 'text-danger' });
        localStorage.setItem('wallet_history', JSON.stringify(lista));

        alert('¡Retiro completado exitosamente!');
        window.location.href = 'menu.html';
      } else {
        alert('Monto inválido o fondos insuficientes.');
      }
    });
  }

  if ($('#saldoEnEnvio').length) {
    var balanceEnv = parseFloat(localStorage.getItem('wallet_balance')) || 450000;
    $('#saldoEnEnvio').text('$' + balanceEnv.toLocaleString('es-CL'));

    $('#formEnviar').submit(function(event) {
      event.preventDefault();
      var amount = parseFloat($('#montoAEnviar').val());
      var dest = $('#destinatario').val();
      if (!isNaN(amount) && amount > 0 && amount <= balanceEnv) {
        balanceEnv -= amount;
        localStorage.setItem('wallet_balance', balanceEnv);

        var lista = JSON.parse(localStorage.getItem('wallet_history')) || [];
        lista.push({ detalle: 'Envío de dinero a ' + dest, monto: '-$' + amount.toLocaleString('es-CL'), clase: 'text-danger' });
        localStorage.setItem('wallet_history', JSON.stringify(lista));

        alert('Envío exitoso a ' + dest);
        window.location.href = 'menu.html';
      } else {
        alert('Cantidad no válida o saldo insuficiente.');
      }
    });
  }

  if ($('#listaTransacciones').length) {
    var historial = JSON.parse(localStorage.getItem('wallet_history')) || [];
    var tabla = $('#listaTransacciones');
    tabla.empty();
    
    historial.forEach(function(item) {
      tabla.append('<tr><td>' + item.detalle + '</td><td class="' + item.clase + '">' + item.monto + '</td></tr>');
    });

    $('#btnLimpiarHistorial').click(function() {
      var inicial = [{ detalle: 'Abono Inicial Cuenta', monto: '+$450.000', clase: 'text-success' }];
      localStorage.setItem('wallet_history', JSON.stringify(inicial));
      localStorage.setItem('wallet_balance', 450000);
      location.reload();
    });
  }
});