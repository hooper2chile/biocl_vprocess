$(document).ready(function() {

var Iph   = 0;
var Itemp = 0;
var Iod   = 0;

// Connect to the Socket.IO server.
namespace = '/biocl';
var socket = io.connect(location.protocol + '//' +
             document.domain + ':' +
             location.port + namespace);

          //mediciones de ph, OD, Temp. Socket regenera el grafico con cada llamada!!!
          socket.on('Medidas', function(msg) {
              $('#med1_c').text('Iph: '   + msg.data[0] + ' [mA]' ).html();
              $('#med2_c').text('Iod: '   + msg.data[1] + ' [mA]' ).html();
              $('#med3_c').text('Itemp: ' + msg.data[2] + ' [mA]' ).html();

              Iph   = msg.data[0];
              Iod   = msg.data[1];
              Itemp = msg.data[2];
          });//fin de la función socket.on




          //CALIBRAR PH
          //se emiten la calibración hacia el servidor
          $('form#calibrar_ph').submit(function(event) {
              socket.emit('ph_calibrar',
                          {   ph : $('#ph').val(),
                             iph : Iph,
                            medx : $('#medx_ph').val()
                           });

                console.log("en socket.emit PH:");
                console.log( $('#ph').val() );
                console.log(Iph);
              return false;
          });

          //se escuchan desde el servidor los valores seteados para calibración.
          socket.on('ph_calibrar', function(msg) {
            $('#ph1_set').text('Set pH1:   ' + msg.set[0]).html();
            $('#iph1_set').text('Set IpH1: ' + msg.set[1]).html();
            $('#ph2_set').text('Set pH2:   ' + msg.set[2]).html();
            $('#iph2_set').text('Set IpH2: ' + msg.set[3]).html();
          });




          //CALIBRAR OD
          //se emiten la calibración hacia el servidor
          $('form#calibrar_od').submit(function(event) {
              socket.emit('od_calibrar',
                          {   od : $('#od').val(),
                             iod : Iod,
                            medx : $('#medx_od').val()
                           });

                console.log("en socket.emit OD:");
                console.log( $('#od').val() );
                console.log(Iod);
              return false;
          });

          //se escuchan desde el servidor los valores seteados para calibración.
          socket.on('od_calibrar', function(msg) {
            $('#od1_set').text('Set OD1:   ' + msg.set[0]).html();
            $('#iod1_set').text('Set IOd1: ' + msg.set[1]).html();
            $('#od2_set').text('Set OD2:   ' + msg.set[2]).html();
            $('#iod2_set').text('Set IOd2: ' + msg.set[3]).html();
          });




          //CALIBRAR TEMP
          //se emiten la calibración hacia el servidor
          $('form#calibrar_temp').submit(function(event) {
              socket.emit('temp_calibrar',
                          {   temp : $('#temp').val(),
                             itemp : Itemp,
                              medx : $('#medx_temp').val()
                           });

                console.log("en socket.emit TEMP:");
                console.log( $('#temp').val() );
                console.log(Itemp);
              return false;
          });

          //se escuchan desde el servidor los valores seteados para calibración.
          socket.on('temp_calibrar', function(msg) {
            $('#temp1_set').text('Set Temp1:   ' + msg.set[0]).html();
            $('#itemp1_set').text('Set Itemp1: ' + msg.set[1]).html();
            $('#temp2_set').text('Set Temp2:   ' + msg.set[2]).html();
            $('#itemp2_set').text('Set Itemp2: ' + msg.set[3]).html();
          });


});