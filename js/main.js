import {
    modulos
} from './modules.js';
import {
    municipios
} from './municipios.js';
import {
    gestor
} from './gestor.js';


var app = {
    mapa: null,
    capas: [],
    contadorCapas: 0, //control paralelo al control de capas de laflet
    control: L.control.layers(null, null, {
        collapsed: true
    }),
    indice: null, //posicion del arreglo para traer el geoJson
    nombreCapa: null, // nombre de la capa extraído del menu lateral
    manejaMapa: function() {
        modulos.getMapaJson(this.indice)
            .then(data => {
                var layer = null;

                if (this.control != null) {
                    this.mapa.removeControl(this.control);
                }

                /**
                 * Personaliza  los colores de cada mapa de acuerdo a la
                 * simbología estándar para cada caso.
                 */
                
                var capa = JSON.parse(data);
                layer = gestor.capas(this.indice, capa);

                //Se crea un arreglo para manipular el control de capas
                this.capas.push(layer);

                //Agrega la capa poligono, multipolígono, puntos al mapa
                this.control.addOverlay(layer, this.nombreCapa).addTo(this.mapa);

                //Cuando se agregue la capa de forma exitosa se incrementa el control
                //de capas en el menu izquierdo
                this.contadorCapas++;

            })
            .catch(error => {
                console.log('Status: ' + error + ' =>  Error: ' + error.statusText);
            });
    },
    initComponents: function() {
        document.getElementById('selector-capas').addEventListener('click', (e) => {
            /**
             * Controla los eventos para obtencion de mapa y control dinamico de componentes
             */
            if (e.target && e.target.matches("a")) {
                var elemento = e.target;
                var nodos = elemento.childNodes.length;

                /**
                 * Se valida la existencia de el atributo data-index y que no haya un nodo existente 
                 * de boton de cerrar, para evitar duplicidades en el control de capas.
                 */
				if ((this.indice = elemento.getAttribute('data-index')) && nodos <= 1) {
                    this.nombreCapa = elemento.innerHTML;
                    console.log("Clicked: " + this.indice);

                    /**
                     * Crea un elemento visual para eliminar la capa del control de capas 
                     * y se agrega al final del elemento
                     */
                    var nodo = document.createElement('span');
    				nodo.innerHTML =
                        '<i class="fas fa-question-circle fa-lg"></i>'+
                        '<div type="button" class="btnEliminaCapa close">'+
                            '<small>'+
                                '<span data-i="' + this.contadorCapas + '" class="fas fa-times fa-xs"></span>'+
                            '</small>'+
                        '</div>';
                    elemento.appendChild(nodo);

                    // Obtiene el mapa
                    this.manejaMapa(this.indice);
                }
            }

            /**
             * Evento que controla la gestión de capas en el administrador de
             * capas de LeaFlet
             */
            if (e.target && e.target.matches("span")) {
                if (e.target.hasAttribute('data-i')) {
                    var indiceSeleccionado = null;
                    if (indiceSeleccionado = e.target.getAttribute('data-i')) {
                        /*
                        	Al hacer click en el boton de eliminar "X" que se crea
                        	de forma dinámica, al momento de agregar una capa
                        	se obtienen los nodos padre del elemento
                        	hasta dos nodos arriba para poder eliminarlo y reindizar
                        	los TAG "data-i" validando para un correcto re-indizado
                        	que sean mayores al elemento seleccionado, de esta forma
                        	se asegura que solo sea a partir del numero y no todos
                        	los elementos existentes.

                        	<span>
                                <i class="fas fa-question-circle fa-lg"></i>
                        		<div type="button" class="btnEliminaCapa close">
                                    <small>
                        			    <span aria-hidden="true" data-i="this.contadorCapas">&times;</span>
                                    </small>
                        		</button>
                        	</span>
                        */
                        var nodoSmall = e.target.parentNode;
                        var spanBoton = nodoSmall.parentNode;
                        var elementoMenu = spanBoton.parentNode;
                        var spanPadre = elementoMenu.parentNode;
                        spanPadre.removeChild(elementoMenu);

                        //Obtiene los botones para eliminar la capa del administrador de capas
                        var botones = document.getElementsByClassName('btnEliminaCapa');

                        //Se recorren validando que sean mayores al valor del indice eliminado
                        // y se resta 1 para reorganizar el índice
                        for (var i = 0; i <= botones.length - 1; i++) {
                            var indiceCapa = botones[i].childNodes[0].childNodes[0].getAttribute('data-i');
                            console.log(indiceCapa);

                            if (indiceCapa > indiceSeleccionado) {
                                botones[i].childNodes[0].childNodes[0].setAttribute('data-i', (indiceCapa - 1));
                            }
                        }

                        /*
                        	Elimina la capa del control de capas de Leaflet en el mapa para esto
                        	se almacena un arreglo de layers del que se obtiene según el
                        	indice data-i y se elimina de L.control.layers

                        	Posterior a esto se elimina del arreglo para permitir la coincidencia
                        	de el contador de capas, data-i y el arreglo de capas.
                        */
                        var capa = this.capas[indiceSeleccionado];

                        this.mapa.removeLayer(capa);
                        this.control.removeLayer(capa);
                        this.capas.splice(indiceSeleccionado, 1);

                        this.contadorCapas--;
                    } //fin - if
                } // fin - e.target.hasAttribute('data-i')
            } // fin - e.target && e.target.matches("span")

            /*
             * Evento que muestra la simbología en un popup informativo
             */
            if (e.target && e.target.matches("i")) {
                var spanBoton = e.target.parentNode;
                var elementoMenu = spanBoton.parentNode;

                var data_index = elementoMenu.getAttribute('data-index');
                var data_texto = elementoMenu.text;

                if(this.file_exists('./images/simbologia/'+data_index+'.png')) {
                    //ruta de simbología ./images/simbologia/image.png
                    //Debe renombrarse acorde al data-index
                    iziToast.show({
                        image: './images/arn_circulo.svg',
                        message: data_texto + '<br/><img src="images/simbologia/'+data_index+'.png">',
                        theme: 'light',
                        timeout: 0
                    });
                }
            } // fin - e.target && e.target.matches("i")
        }); // fin - document.getElementById('selector-capas')


        /**
         * Mueve al contexto seleccionado de acuerdo a los centroides de cada municipio
         */
		document.getElementById('municipios').addEventListener('change', (e) => {
			var elemento = e.target;
            var i = elemento.options[elemento.selectedIndex].value;
            if(elemento.selectedIndex == 0) {
                //Cambia la posición de enfoque a nivel estatal
                this.mapa.flyTo([municipios[i][3],municipios[i][2]], 7);
            }
            else {
                //Cambia la posición de enfoque a nivel municipal
                this.mapa.flyTo([municipios[i][3],municipios[i][2]], 12);
            }
		});
    },
    initCboMunicipal: () => {        
        var cboMunicipios = document.getElementById('municipios');
        var i=0;
        var option;

        //Llenado dinámico de el option con los valores municipales
        municipios.forEach(elemento => {
            option += '<option value="'+i+'">'+elemento[0] +' - ' + elemento[1];+'</option>';
            i++;
        });
        
        cboMunicipios.innerHTML = option;
    },
    file_exists: url => {
        var http = new XMLHttpRequest();
        //console.log(url);
        http.open('HEAD', url, false);
        http.send();
        return http.status!=404;
    },
    init: function() {
        /*
            Asigna el catalogo de municipios para la funcion de enfoque
        */
        this.initCboMunicipal();

		/*
		 Asigna un addEventListener al contenedor del menu para conrolar
		 el agregado, y eliminación del control de capas del gestor de capas
		 de LeaFlet.

		 Asigna addEventListener al catalogo de municipios
		*/
        this.initComponents();

		// Inicializa modulos leaflet y configuraciones adicionales del mapa
        this.mapa = modulos.mapInit;
        this.mapa.invalidateSize();
        this.mapa.doubleClickZoom.disable();

        //Inserta componentes de coordenadas y medidas de escala para zoom
        L.control.mousePosition().addTo(this.mapa);
        L.control.scale().addTo(this.mapa);

        //Incrusta capa base WMS del servicio de mapa digital de INEGI
        modulos.wmsLayer.addTo(this.mapa);

        //Incrusta el control de capas
        this.control.addTo(this.mapa);

        console.log("AppInit");
    }
};

app.init();
