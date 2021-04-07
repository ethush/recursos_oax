export var modulos = {
    mapInit: L.map('map', {
        center: [17.0669, -96.7203],
        zoom: 7,
        maxZoom: 17
    }),
    wmsLayer: //Put your custom WMS service
   	}),
    catalogoGeoestadistico: [
        './resources/marco_geoestadistico/estatal.json',
        './resources/marco_geoestadistico/regional.json',
        './resources/marco_geoestadistico/municipal.json',
        './resources/topografia/relieve_oaxaca.json',
        './resources/topografia/hipsometria_oaxaca.json',
        './resources/hidrologia/escurrimiento_oaxaca.json',
        './resources/hidrologia/hidrografia_oaxaca.json',
        './resources/hidrologia/cuencas_hidrologicas.json',
        './resources/hidrologia/regiones_hidrologicas_admin.json',
        './resources/hidrologia/subcuencas_hidrologicas.json',
        './resources/hidrologia/subregiones_hidrologicas.json',
        './resources/hidrologia/estaciones_hidrometricas.json',
        './resources/hidrologia/sitios_monitoreo_calidad_agua.json',
        './resources/edafologia/edafologia.json',
        './resources/edafologia/suelos_dominantes.json',
        './resources/edafologia/degradacion_suelo.json',
        './resources/edafologia/regimenes_humedad_suelo.json',
        './resources/climatologia/climas.json',
        './resources/climatologia/estaciones_climatologicas.json',
        './resources/climatologia/rangos_humedad.json',
        './resources/climatologia/moda_precipi_anual.json',
        './resources/climatologia/precip_media_anual.json',
        './resources/climatologia/precip_total_anual.json',
        './resources/climatologia/regimenes_pluviometricos.json',
        './resources/climatologia/temperatura_minima_absoluta.json',
        './resources/climatologia/temperatura_maxima_absoluta.json',
        './resources/climatologia/temperatura_minima_promedio.json',
        './resources/climatologia/temperatura_maxima_promedio.json',
        './resources/climatologia/temperatura_media_anual.json',
        './resources/vegetacion_y_suelo/vegetacion_potencial.json',
        './resources/vegetacion_y_suelo/tenencia_de_tierra.json',
        './resources/biodiversidad/calabazas_cultivadas_y_silvestres.json',
        './resources/biodiversidad/frijol_domesticado.json',
        './resources/riesgo/laderas_deslizamiento.json',
        './resources/produccion/aves_corral.json',
        './resources/produccion/bovino.json',
        './resources/produccion/caprinos.json',
        './resources/produccion/colmenas.json',
        './resources/produccion/ovinos.json',
        './resources/produccion/porcinos.json',
        './resources/produccion/agostaderos_sin_aprovechar.json',
        './resources/produccion/chile.json',
        './resources/produccion/crisantemo.json',
        './resources/produccion/fresa.json',
        './resources/produccion/jitomate.json',
        './resources/produccion/manzana.json',
        './resources/produccion/nochebuena.json',
        './resources/produccion/pepino.json',
        './resources/produccion/rosa.json',
        './resources/produccion/otras_especies_cultivo.json',
        './resources/produccion/minas.json',
        './resources/riesgo/zonas_geotermicas.json',
        './resources/marco_geoestadistico/ciudades_medianas.json',
        './resources/marco_geoestadistico/ciudades_pequenas.json',
        './resources/marco_geoestadistico/localidades_suburbanas.json',
        './resources/marco_geoestadistico/localidades_rurales.json',
        './resources/vegetacion_y_suelo/areas_protegidas.json',
        './resources/toma_decisiones/regimen_gobierno.json',
        './resources/rutas_turisticas/rutas_turisticas.json',
        './resources/demografia/indigena.json',
        './resources/demografia/afrodescendientes.json'
    ],
    getMapaJson: indice => {
        //Manejo asincrono de peticiones http
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open('GET', modulos.catalogoGeoestadistico[indice], true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    resolve(request.responseText);
                } else {
                    reject({
                        status: request.status,
                        statusText: request.statusText
                    });
                }
            };
            request.send();
        }); //end promise
    }
};
