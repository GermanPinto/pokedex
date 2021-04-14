
$(document).ready(function () {

//primero para manejar la musica le digo si el checkbox está seleccionado que comiense la musica, si no, que la pause
  var x = document.getElementById("musicaPokemon"); //captura el elemento de audio del dom
  $(document).on( 'click', '#customSwitch2', function(){
    if ($( this ).is( ':checked' )) {
      x.play();
    } else {
      x.pause();
    }
  });

  //el ir arriba snorlax durmiendo. Ocupa div con clase ir-arriba, una vez presionado (click) cambia la imagen al snorlax despierto
  $('.ir-arriba').click(function(){
    $('.ir-arriba').css("background-image", "url('img/snorlaxDespierto.png')"); 
    $('body,html').animate({
      scrollTop:'0px'
    },1500);
  });

  // al hacer el scroll del mouse aparece el snorlax
  $(window).scroll(function(){
		if( $(this).scrollTop() > 0 ){
			$('.ir-arriba').slideDown(2000); //velocidad con que desaparece el snorlax
		} else {
      $('.ir-arriba').css("background-image", "url('img/snorlax2.png')"); //aprece snorlax
			$('.ir-arriba').slideUp(1000);
		}
	});

//carga select con las generaciones consultando a la api
  cargaSelectGeneraciones();
  $("#mazo").hide();
  $("#detallePokemon").hide();

  //Al apretear el boton de busqueda previene el refresco de la pantalla. Vacia el mazo de card layaot por si tiene datos de busquedas
  // anteriores oculta el div que tiene el detalle del pokemon seleccionado, porque estamos en la pantalla de ver el mazo,
  // Luego imprime el pokemon consultado a la api, o sea una card del mazo
  $("#formBusqueda").submit(function (event) {
    event.preventDefault();
    $('#mazo').empty();
    $("#mazo").show();

    $("#detallePokemon").hide();
    var valueNombreONumber = $("#inputBuscaPokemon").val();
    imprimeUnPokemon(valueNombreONumber);
  });


// como trae los tipo de pokemon en inglés, y no son tantos los tipos, usamos un un switch para setear los nombres en español
  function formateaTipo(nombreTipo) {
    nombreFormateado = "";
    switch (nombreTipo) {
      case "grass":
        nombreFormateado = 'planta';
        break;
      case "poison":
        nombreFormateado = 'veneno';
        break;
      case "fire":
        nombreFormateado = 'fuego';
        break;
      case "water":
        nombreFormateado = 'agua';
        break;
      case "bug":
        nombreFormateado = 'bicho';
        break;
      case "normal":
        nombreFormateado = 'normal';
        break;
      case "flying":
        nombreFormateado = 'volador';
        break;
      case "psychic":
        nombreFormateado = 'psíquico';
        break;
      case "electric":
        nombreFormateado = 'eléctrico';
        break;
      case "rock":
        nombreFormateado = 'roca';
        break;
      case "ground":
        nombreFormateado = 'tierra';
        break;
      case "fighting":
        nombreFormateado = 'lucha';
        break;
      case "fairy":
        nombreFormateado = 'hada';
        break;
      case "steel":
        nombreFormateado = 'acero';
        break;
      case "ice":
        nombreFormateado = 'hielo';
        break;
      case "ghost":
        nombreFormateado = 'fantasma';
        break;
      default:
        nombreFormateado = nombreTipo;
        break;
    }
    return nombreFormateado;
  }

  //a los tipos le damos un backgraund con un color mediante una clase en css, para ello antes seteamos el nombre de la clase a buscar en el archivo css
  function claseColorTipo(nombreTipo) {
    nombreClase = "";
    switch (nombreTipo) {
      case "grass":
        nombreClase = "verdeTipoPanta"
        break;
      case "poison":
        nombreClase = "moradoTipoVeneno";
        break;
      case "fire":
        nombreClase = "naranjaTipoFuego";
        break;
      case "water":
        nombreClase = "azulTipoAgua";
        break;
      case "bug":
        nombreClase = "verdeTipoBicho";
        break;
      case "normal":
        nombreClase = "grisTipoNormal";
        break;
      case "flying":
        nombreClase = "colorTipoVolador";
        break;
      case "psychic":
        nombreClase = "moradoTipoPsiquico";
        break;
      default:
        break;
    }
    return nombreClase;
  }

//al seleccionar un elemento del select de regiones, cargamos las card con los pokemones cargados de la api (o sea pokemones filtrados por esa region).
//con el foreach imprime todos los pokemones, o sea un mazo de cards
  $('#opcionRegion').change(function () {
    var seleccion = $('select[id=opcionRegion]').val();
    if (seleccion !== null && seleccion !== undefined) {
      $('#mazo').empty();
      $("#mazo").show();

      $("#detallePokemon").hide();
      $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/generation/${seleccion}`,
        success: function (data) {
          data.pokemon_species.forEach(element => {
            imprimeUnPokemon(element.name);
          });
        }, dataType: 'json',
      });
    } else {
      alert("no esta definido  el elemto seleccionado");
    }
  })

  //funcion que imprime un pokemon según el parametro de entrada, nombre o numero (imprime una card)
  function imprimeUnPokemon(valueNombreONumber) {
    if (valueNombreONumber !== null && valueNombreONumber !== undefined) {
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${valueNombreONumber}/`, //ajax
      }).done(function (data) {
        if (data) {
          var idTituloP = `tituloP${data.name}`;
          var idImagenP = `imagenP${data.name}`;
          var idTiposP = `tiposP${data.name}`;

          $('#mazo').append(`<div ><div style="width:300px;" class="col-md-12 col-sm-12 my-1 card cartaPokemon shadow  bg-white rounded">  
          <div id="${idTituloP}" class="col-md-12 col-sm-12"></div>
          <div id="${idImagenP}"class="imagenP col-md-12 col-sm-12 p-0"></div>
          <div id="${idTiposP}" class="col-md-12 col-sm-12"></div>
          </div></div>`);

          $('#' + idTituloP).append(`<div class="text-center"> <h3>${data.name}<h3> <div>`); //jquery

          if ($('.imagenCheck').prop('checked')) {
            $('#' + idImagenP).append(`<img class="imagenPokemon" src="${data.sprites.other.dream_world.front_default}" alt="${data.name}"> <img>`);
          } else {
            $('#' + idImagenP).append(`<img class="imagenPokemon" src="${data.sprites.front_default}" alt="${data.name}"> <img>`);
          }

          $('#' + idTiposP).append(`<div id="tipoA" class="tipoPokemon ${claseColorTipo(data.types[0].type.name)}">${formateaTipo(data.types[0].type.name)}</div>`);
          if (data.types.length > 1) {
            $('#' + idTiposP).append(`<div id="tipoB" class="tipoPokemon ${claseColorTipo(data.types[1].type.name)}">${formateaTipo(data.types[1].type.name)}</div>`);
          }
          //al seleccionar pokemon segun su imagen
          $('#' + idImagenP).click(function () {
            // alert(`mi pokemon ${data.name}`);
            muestraSeccionDetalle(data.name);
          })

        }
      });
    }
  }
  //en esta parte mostramos el detalle del pokemon seleccionado (carta clickeada)
  function muestraSeccionDetalle(nombrePokemon) {
    //primero ocultamos el maso con la o las cartas de pokemon y mostramos la seccion que tiene el detalle del pokemon pinchado
    $("#mazo").hide();
    $("#detallePokemon").show();

    if (nombrePokemon !== null && nombrePokemon !== undefined) {
      $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}/`, //ajax
      }).done(function (dataApi) {
        if (dataApi) {

          var nombre = dataApi.name;
          var imagen;
          var peso = (dataApi.weight / 10);
          var tipoA = formateaTipo(dataApi.types[0].type.name);
          var tipoB;

          if (dataApi.types.length > 1) {
            tipoB = formateaTipo(dataApi.types[1].type.name);
          }
          // tenemos un chekbox tipo switch que seleccionamos si mostramos los pokemones con dibujo elaborado o con dibujos por defecto.
          if ($('.imagenCheck').prop('checked')) {
            imagen = dataApi.sprites.other.dream_world.front_default;
          } else {
            imagen = dataApi.sprites.front_default;
          }

          $("#info").html(`<h2 class="tituloPokemonDes" pt-4>${nombre}</h2>`);
          $("#info").append(`<div class="divImagenDetallePokemon" ><img class="imagenDetallePokemon" src="${imagen}" alt="${nombre}"> <img></div>`);
          $("#info").append(`<p class="parrafoPokemonDes" > peso: ${peso} [kg]</p>`);
          $("#info").append(`<div style="color:black" class="mb-4 parrafoPokemonDes tipoPokemon ${claseColorTipo(dataApi.types[0].type.name)}">${tipoA}</div>`);
        //algunos pokemones tienen un solo tipo en vez de dos, para saber cuales son y para evitar errores filtramos con el if
          if (dataApi.types.length > 1) {
            $("#info").append(`<div tyle="color:black" class="mb-4 parrafoPokemonDes tipoPokemon ${claseColorTipo(dataApi.types[1].type.name)}">${tipoB}</div>`);
          }

        }

        /* Amchart (grafico)*/
        // Themes begin
        am4core.useTheme(am4themes_dark);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("graficaDiv", am4charts.XYChart3D);


        // Add data
        //acá llenamos con las estadisticas del pokemon, pero antes seteamos a español el nombre
        chart.data = [{
          "estadistica": formateaEstadistica(dataApi.stats[0].stat.name),
          "valor": dataApi.stats[0].base_stat
        }, {
          "estadistica": formateaEstadistica(dataApi.stats[1].stat.name),
          "valor": dataApi.stats[1].base_stat
        }, {
          "estadistica": formateaEstadistica(dataApi.stats[2].stat.name),
          "valor": dataApi.stats[2].base_stat
        }, {
          "estadistica": formateaEstadistica(dataApi.stats[3].stat.name),
          "valor": dataApi.stats[3].base_stat
        }, {
          "estadistica": formateaEstadistica(dataApi.stats[4].stat.name),
          "valor": dataApi.stats[4].base_stat
        }, {
          "estadistica": formateaEstadistica(dataApi.stats[5].stat.name),
          "valor": dataApi.stats[5].base_stat
        }];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "estadistica";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.tooltip.label.rotation = 270;
        categoryAxis.tooltip.label.horizontalCenter = "right";
        categoryAxis.tooltip.label.verticalCenter = "middle";

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Estadisticas";
        valueAxis.title.fontWeight = "bold";

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "valor";
        series.dataFields.categoryX = "estadistica";
        series.name = "Valores";
        series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
        columnTemplate.stroke = am4core.color("#FFFFFF");

        columnTemplate.adapter.add("fill", function (fill, target) {
          return chart.colors.getIndex(target.dataItem.index);
        })

        columnTemplate.adapter.add("stroke", function (stroke, target) {
          return chart.colors.getIndex(target.dataItem.index);
        })

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineY.strokeOpacity = 0;


      });
    }
  }
//como las estadisticas no son muchas, las seteamos de ingles a español con el switch
  function formateaEstadistica(nombreEstadistica) {
    let nombreSeteado;
    switch (nombreEstadistica) {
      case 'hp':
        nombreSeteado = 'Vida';
        break;
      case 'attack':
        nombreSeteado = 'Ataque';
        break;
      case 'defense':
        nombreSeteado = 'Defensa';
        break;
      case 'special-attack':
        nombreSeteado = 'Ataque-Especial';
        break;
      case 'special-defense':
        nombreSeteado = 'Defensa-Especial';
        break;
      case 'speed':
        nombreSeteado = 'Velocidad';
        break;
      default:
        nombreSeteado = nombreEstadistica;
        break;
    }
    return nombreSeteado;
  }


  function cargaSelectGeneraciones() { //funcion para llenar el select de generaciones/regiones

    $.ajax({
      type: "GET",
      url: "https://pokeapi.co/api/v2/generation/",
      success: function (data) {
        for (let index = 0; index < data.count; index++) {
          $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/generation/${index + 1}`,
            success: function (data) {
              $('#opcionRegion').append(`<option value="${index + 1}"> Generación:${index + 1}/ Región: ${data.main_region.name}</option>`); //jquery
            }, dataType: 'json',
          });
        }
      },
      dataType: 'json',
    });
  }

});


