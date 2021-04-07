export var gestor = {
    capas: (data_index, capa) => {

        var layer = null;

        switch (data_index) {
            case "0": // Capa - marco geoestadístico estatal
            case "1": // Capa - marco geoestadístico regional
                layer = L.geoJson(capa, {
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#1E1E1E',
                            fillOpacity: 0.7
                        }
                    }
                });
                break;
            case "2": // Capa - margo geoestadístico municipal
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' +feature.properties.NOM_MUN + '<br>Distrito:' + feature.properties.DISTRITO +'<br>Región: '+ feature.properties.REGION_1 +'<hr>' +
                            '<p>' +    
                                '<table class="table table-sm table-striped" > '+
                                '<thead class="thead-dark"><tr><th>Indicador</th><th>Total</th><th>Mujeres</th><th>Hombres</th></tr></thead>' +
                                '<tbody>' +
                                '<tr><td>Población total</td><td>'+ feature.properties.TP + '</td><td>' + feature.properties.TPM +'</td><td>' + feature.properties.TPH +'</td></tr>' +
                                '<tr><td>Población de 12 años y más</td><td>' + feature.properties.tp12m  + '</td><td>' + feature.properties.m12m + '</td><td>' + feature.properties.h12m + '</td></tr>' +
                                '<tr><td>Población ocupada de 12 años y más</td><td>' + feature.properties.tpo  + '</td><td>' + feature.properties.pom + '</td><td>' + feature.properties.poh + '</td></tr>' + 
                                '</tbody></table>' +
                            '</p>' +
                            '<p>' +
                                '<table class="table table-sm table-striped thead-dark" >' +
                                '<thead class="thead-dark"><tr><th>Población ocupada por sector de actividad</th><th>Mujeres</th><th>Hombres</th></tr></thead>' +
                                '<tbody>' +
                                '<tr><td>Primario</td><td>' + feature.properties.spm + '%</td><td>' + feature.properties.sph + '%</td></tr>' +
                                '<tr><td>Secundario</td><td>' + feature.properties.ssecm + '%</td><td>' + feature.properties.ssech + '%</td></tr>' +
                                '<tr><td>Comercio</td><td>' + feature.properties.scm + '%</td><td>' + feature.properties.sch + '%</td></tr>' +
                                '<tr><td>Servicios</td><td>' + feature.properties.sserm + '%</td><td>' + feature.properties.sserh + '%</td></tr>' +
                                '<tr><td>No especificado</td><td>' + feature.properties.snem + '%</td><td>' + feature.properties.sneh + '%</td></tr>' +
                                '</tbody></table>'+
                            '</p>'
                            
                        );
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#919191',
                            fillOpacity: 0.7
                        }
                    }
                });
                break;
            case "3": // Capa - Relieve como atractivo natural
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Morfología: ' + feature.properties.MORFOLOGIA + '<br/>' +
                            'Clima: ' + feature.properties.CLIMA + '<br/>' +
                            'Descripción: ' + feature.properties.DESCRIPCIO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVE) {
                            case 1:
                            case 2:
                            case 3:
                                color = '#FFC6AD';
                                break;
                            case 4:
                            case 5:
                            case 6:
                                color = '#DBC900';
                                break;
                            case 8:
                            case 9:
                                color = '#00FF00';
                                break;
                            case 16:
                                color = '#006300';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5
                        }
                    }
                });
                break;
            case "4": //Capa - Hipsometría
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.RANGO + '</strong>');
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVE) {
                            case "21":
                                color = '#C3FFC2';
                                break;
                            case "22":
                                color = '#00FF00';
                                break;
                            case "23":
                                color = '#00DB00';
                                break;
                            case "24":
                                color = '#FCBC0C';
                                break;
                            case "25":
                                color = '#FFBB00';
                                break;
                            case "26":
                                color = '#FFAA00';
                                break;
                            case "27":
                                color = '#E64C00';
                                break;
                            case "28":
                                color = '#BAA100';
                                break;
                            case "29":
                                color = '#783839';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5
                        }
                    }
                });
                break;
            case "5": //Capa - Escurrimiento natural medio superficial
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.RHA + '<br/>Escurrimiento natural (hm<sup>3</sup>/anual): ' + feature.properties.ESCURR_NAT);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.NUM_RHA) {
                            case "IV":
                                color = '#004DA8';
                                break;
                            case "V":
                                color = '#004DA8';
                                break;
                            case "X":
                            case "XI":
                                color = '#002673';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5
                        }
                    }
                });
                break;
            case "6": //Capa - Hidrografía
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Río: ' + feature.properties.NOMBRES);
                    },
                    style: function(feature) {
                        return {
                            fillColor: '#70E3EB',
                            weight: 4,
                            opacity: 1,
                            color: '#70E3EB',
                            stroke: true,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "7": //Capa - Cuencas Hidrológicas (CNA)
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Cuenca: ' + feature.properties.CUENCA +
                            '<br/>Region: ' + feature.properties.REGION +
                            '<br/>Potencial de población beneficiada: ' + feature.properties.POB_POTENC.toLocaleString('la') +
                            '<br/>Hombres: ' + feature.properties.MUJERES.toLocaleString('la') +
                            ' Mujeres: ' + feature.properties.HOMBRES.toLocaleString('la'));
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 3,
                            opacity: 1,
                            color: '#002663',
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "8": //Capa - Regiones hidrológicas administrativas
                layer = L.geoJson(JSON.parse(data), {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Organización de cuenca: ' + feature.properties.ORG_CUENCA);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVE) {
                            case 4:
                                color = '#1E00FF';
                                break;
                            case 5:
                                color = '#4682B4';
                                break;
                            case 10:
                                color = '#AFEEEE';
                                break;
                            case 11:
                                color = '#007982';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "9": //Capa - Subcuencas hidrológicas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Nombre: ' + feature.properties.NOMBRE +
                            '<br/>Tipo: ' + feature.properties.TIPO);
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 1,
                            opacity: 1,
                            color: '#002663',
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "10": //Capa - Subregiones hidrológicas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Nombre: ' + feature.properties.NOMBRE);
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 1,
                            opacity: 1,
                            color: '#002663',
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "11": //Capa - Estaciones hidrométricas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Control de estación: ' + feature.properties.CTRL_DEEST +
                            '<br/>Control de corriente: ' + feature.properties.CTRL_DECOR);
                    },
                    pointToLayer: function(feature, latlng) {
                        var greenIcon = new L.Icon({
                            //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconUrl: './images/iconos/pin/i-medidor_hidro.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        return L.marker(latlng, {
                            icon: greenIcon
                        });
                    }
                });
                break;
            case "12": //Capa - Sitios de monitoreo de calidad del agua superficial
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' + feature.properties.NOM_MUN +
                            '<br/>Sitio: ' + feature.properties.SITIO);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = null;

                        switch (feature.properties.SEMAFORO) {
                            case "Rojo":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                    iconUrl: './images/iconos/pin/i-medidor_calidad_rojo.png',
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "Amarillo":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                                    iconUrl: './images/iconos/pin/i-medidor_calidad_amarillo.png',
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "Verde":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                    iconUrl: './images/iconos/pin/i-medidor_calidad_verde.png',
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            default:
                                break;
                        }

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "13": // Capa - Edafología
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Descripción: ' + feature.properties.DESCRIPCIO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.SUE1) {
                            case "Ah":
                            case "Ao":
                            case "Ap":
                                color = '#A7FFA6';
                                break;
                            case "Bc":
                            case "Bd":
                            case "Be":
                            case "Bg":
                            case "Bh":
                            case "Bk":
                            case "Bv":
                                color = '#FFBB00';
                                break;
                            case "E":
                                color = '#BAA100';
                                break;
                            case "Gv":
                                color = '#FAC2FF';
                                break;
                            case "Hc":
                            case "Hh":
                            case "HI":
                                color = '#F5A27A';
                                break;
                            case "I":
                            case "IC":
                                color = '#787878';
                                break;
                            case "Jc":
                            case "Je":
                                color = '#C2FBFF';
                                break;
                            case "KI":
                                color = '#FFAA00';
                                break;
                            case "Lc":
                            case "Lg":
                            case "Lk":
                            case "Lo":
                            case "Lp":
                            case "Lv":
                                color = '#B3FF00';
                                break;
                            case "Nd":
                                color = '#007982';
                                break;
                            case "Qc":
                                color = '#C900DB';
                                break;
                            case "Rc":
                            case "Rd":
                            case "Re":
                                color = '#D7809E';
                                break;
                            case "Vc":
                            case "Vp":
                                color = '#FFC6AD';
                                break;
                            case "We":
                                color = '#DBC900';
                                break;
                            case "Xh":
                                color = '#FF8C00';
                                break;
                            case "Zg":
                                color = '#FFFAC2';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "14": // Capa - Suelos dominantes
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Suelo: ' + feature.properties.UNIDAD_SUE);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLV) {
                            case 5:
                            case 19:
                            case 25:
                                color = '#EB5BB6';
                                break;
                            case 8:
                                color = '#FFFB00';
                                break;
                            case 4:
                            case 14:
                                color = '#B29A00';
                                break;
                            case 24:
                                color = '#FF00FB';
                                break;
                            case 3:
                                color = '#FFF8A6';
                                break;
                            case 7:
                                color = '#F8A6FF';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "15": // Capa - Degradación del suelo
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Tipo: ' + feature.properties.TIPO +
                            '<br/>Causa:' + feature.properties.CAUSA);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVE) {
                            case 1:
                            case 19:
                            case 25:
                                color = '#FFFF00';
                                break;
                            case 2:
                                color = '#C7D79E';
                                break;
                            case 3:
                            case 14:
                                color = '#FFAA00';
                                break;
                            case 4:
                                color = '#73DFFF';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "16": //Capa - Regimenes de humedad del suelo
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Descripción: ' + feature.properties.DESCRIPCIO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVE) {
                            case 2:
                                color = '#DEB887';
                                break;
                            case 3:
                                color = '#A7FFA6';
                                break;
                            case 4:
                                color = '#00FF00';
                                break;
                            case 5:
                                color = '#C2FBFF';
                                break;
                            case 6:
                                color = '#0080FF';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "17": //Capa - Clima
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Descripción de temperatura: ' + feature.properties.DES_TEM +
                            '<br/>Descripción de precipitación: ' + feature.properties.DESC_PREC);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLIMA_LLAV) {
                            case "10":
                            case "11":
                            case "14":
                            case "15":
                            case "18":
                            case "19":
                                color = '#00FF00';
                                break;
                            case "02":
                            case "03":
                            case "06":
                            case "07":
                            case "38":
                                color = '#C3FFC2';
                                break;
                            case "01":
                                color = '#C40505';
                                break;
                            case "05":
                            case 37:
                                color = '#FF00FB';
                                break;
                            case "09":
                            case "13":
                            case "17":
                                color = '#FAC2FF';
                                break;
                            case "21":
                            case "22":
                            case "23":
                            case "24":
                            case "26":
                                color = '#D6D30A';
                                break;
                            case "29":
                                color = 'FFFB00';
                                break;
                            case "08":
                            case "12":
                            case "16":
                                color = '#009FAB';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "18": // Capa - Estaciones climatológicas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' + feature.properties.NOMBRE);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                            iconUrl: './images/iconos/pin/i-viento.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });
                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "19": //Capa - Rangos de humedad
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Tipo: ' + feature.properties.TIPO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.COV_ID) {
                            case 1:
                                color = '#FFBFBF';
                                break;
                            case 2:
                                color = '#FF0000';
                                break;
                            case 3:
                                color = '#FF00FB';
                                break;
                            case 4:
                                color = '#BF00FF';
                                break;
                            case 5:
                                color = '#FAC2FF';
                                break;
                            case 6:
                                color = '#B3FF00';
                                break;
                            case 7:
                                color = '#FFF8A6';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "20": // Capa - Moda de precipitación anual
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Tipo: ' + feature.properties.MODA_EN_MM);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.COV_ID) {
                            case 9:
                            case 143:
                                color = '#73DFFF';
                                break;
                            case 21:
                            case 144:
                            case 145:
                                color = '#007982';
                                break;
                            case 84:
                            case 122:
                                color = '#0080FF';
                                break;
                            case 133:
                            case 139:
                                color = '#1E00FF';
                                break;
                            case 141:
                                color = '#0D0082';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "21": // Capa - Precipitacion media anual
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Rango de precipitación: ' + feature.properties.RANGOS);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.COV_ID) {
                            case 3:
                                color = '#E64C00';
                                break;
                            case 4:
                                color = '#A7FFA6';
                                break;
                            case 5:
                                color = '#00FF00';
                                break;
                            case 6:
                                color = '#00DB00';
                                break;
                            case 7:
                                color = '#006300';
                                break;
                            case 8:
                                color = '#00FBFF';
                                break;
                            case 9:
                                color = '#00CDDB';
                                break;
                            case 10:
                                color = '#007982';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "22": //Capa - Precipitación anual total
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Rango de precipitación: ' + feature.properties.PRECI_RANG);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.AP1) {
                            case 5:
                                color = '#A7FFA6';
                                break;
                            case 6:
                                color = '#00FF00';
                                break;
                            case 7:
                                color = '#00DB00';
                                break;
                            case 8:
                                color = '#B3FF00';
                                break;
                            case 9:
                                color = '#00FFAA';
                                break;
                            case 10:
                                color = '#A16432';
                                break;
                            case 11:
                                color = '#DBC900';
                                break;
                            case 12:
                                color = '#3B6900';
                                break;
                            case 13:
                                color = '#009FAB';
                                break;
                            case 14:
                                color = '#00CDDB';
                                break;
                            case 15:
                                color = '#7CA698';
                                break;
                            case 16:
                                color = '#C8C2FF';
                                break;
                            case 17:
                                color = '#A6F9FF';
                                break;
                            case 18:
                                color = '#007982';
                                break;
                            case 19:
                                color = '#B0A6FF';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "23": // Capa - Régimenes pluviométricos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Rango de precipitación: ' + feature.properties.REGIMEN);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.COV_ID) {
                            case 5:
                                color = '#FFBB00';
                                break;
                            case 6:
                                color = '#FFF8A6';
                                break;
                            case 3:
                                color = '#FFC2C2';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "24": // Capa - Temperatura mínima absoluta
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Temperatura de la zona: ' + feature.properties.TA_ZONA_T +
                            '<br/>Rango de temperatura absoluta: ' + feature.properties.TA_RANGO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.TA_LLAVE_) {
                            case "02":
                            case "03":
                            case "04":
                                color = '#00FF00';
                                break;
                            case "05":
                            case "06":
                            case "07":
                            case "08":
                                color = '#00FBFF';
                                break;
                            case "09":
                            case "10":
                                color = '#630060';
                                break;
                            case "11":
                            case "12":
                            case "13":
                                color = '#D1D1D1';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "25": //Capa - Temperatura máxima absoluta
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Temperatura de la zona: ' + feature.properties.TA_ZONA_T +
                            '<br/>Rango de temperatura absoluta: ' + feature.properties.TA_RANGO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.TA_LLAVE_) {
                            case "03":
                            case "04":
                            case "05":
                            case "06":
                            case "07":
                            case "08":
                            case "09":
                            case "10":
                            case "11":
                                color = '#FFAA00';
                                break;
                            case "12":
                            case "13":
                                color = '#FFFB00';
                                break;
                            case "14":
                            case "15":
                                color = '#F8A6FF';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "26": //Capa - Temperatura mínima promedio
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Rango de temperatura: ' + feature.properties.TA_ZONA_T +
                            '<br/>Rango de temperatura absoluta: ' + feature.properties.TA_RANGO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.AP1) {
                            case 2:
                            case 3:
                                color = '#F8A6FF';
                                break;
                            case 4:
                            case 5:
                            case 6:
                                color = '#00FF00';
                                break;
                            case 7:
                            case 8:
                            case 9:
                            case 1:
                                color = '#00FBFF';
                                break;
                            case 11:
                            case 12:
                                color = '#630060';
                                break;
                            case 13:
                            case 14:
                            case 15:
                                color = '#D1D1D1';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "27": //Capa - Temperatura máxima promedio
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Rango de temperatura: ' + feature.properties.TA_ZONA_T +
                            '<br/>Rango de temperatura absoluta: ' + feature.properties.TA_RANGO);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.AP1) {
                            case 3:
                            case 4:
                            case 5:
                            case 6:
                            case 7:
                            case 8:
                                color = '#FFAA00';
                                break;
                            case 9:
                            case 10:
                                color = '#FFFB00';
                                break;
                            case 11:
                            case 12:
                                color = '#F8A6FF';
                                break;
                            case 13:
                                color = '#00FF00';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "28": //Capa - tmperatura media anual
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Temperatura media anual: ' + feature.properties.CLAVESTEM);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVESTEM) {
                            case "CALIDA":
                                color = '#FFAA00';
                                break;
                            case "SEMICALIDA":
                                color = '#FFFB00';
                                break;
                            case "SEMIFRIA":
                                color = '#F8A6FF';
                                break;
                            case "TEMPLADA":
                                color = '#00FF00';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "29": //Capa - Vegetación potencial
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Tipo: ' + feature.properties.TIPOS);
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.CLAVES) {
                            case "Bce":
                                color = '#AAFF00';
                                break;
                            case "Be":
                                color = '#FFBEE8';
                                break;
                            case "Bmm":
                                color = '#00A884';
                                break;
                            case "Btc":
                                color = '#FF73DF';
                                break;
                            case "Btp":
                                color = '#A900E6';
                                break;
                            case "Bts":
                                color = '#FF00AE';
                                break;
                            case "Mx":
                                color = '#FFAA00';
                                break;
                            case "P":
                                color = '#D7D79E';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: color,
                            weight: 1,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.5,
                            lineJoin: 'round'
                        }
                    }
                });
                break;
            case "30": // Capa - Tenencia de la tierra
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' +feature.properties.NOM_MUN + '<br>Distrito:' + feature.properties.DISTRITO +'<br>Región: '+ feature.properties.REGION_1 +'<hr>' +
                        '<p>' +
                            '<br/>Total de terrenos: '+ feature.properties.total +
                            '<br/>Superficie total en hectáreas: ' + feature.properties.sup_total +
                            '<table class="table table-sm table-striped" > '+
                            '<thead class="thead-dark"><tr><th>Tipo de terreno</th><th>Total</th><th>Superficie en hectáreas</th></tr></thead>' +
                            '<tbody>' +
                            '<tr><td>Ejidal</td><td>'+ feature.properties.ejidal +'</td><td>'+ feature.properties.sup_ejidal +'</td></tr>' +
                            '<tr><td>Comunal</td><td>'+ feature.properties.comunal +'</td><td>'+ feature.properties.sup_comuna +'</td></tr>' +
                            '<tr><td>Propiedad privada</td><td>'+ feature.properties.privada +'</td><td>'+ feature.properties.sup_privad +'</td></tr>' +
                            '<tr><td>Colonia Agricola</td><td>'+ feature.properties.agricula +'</td><td>'+ feature.properties.sup_agri +'</td></tr>' +
                            '<tr><td>Propiedad Pública</td><td>'+ feature.properties.publica +'</td><td>'+ feature.properties.sup_public +'</td></tr>' +
                            '</tbody></table>' +
                        '</p>' 
                        );
                    },
                    style: function(feature) {
                        var color = null;

                        switch (feature.properties.clave) {
                            case "comunal":
                                color = "#DA934C";
                                break;
                            case "ejidal":
                                color = "#F7CA25"
                                break;
                            case "privado":
                                color = "#FF5E13";
                                break;
                            case "publico":
                                color = "AA3702";
                                break;
                            case "agricola": 
                                color = "#5D9012";
                                break;
                            default:
                                break;
                        }
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.8
                        }
                    }
                });
                break;
            case "31": // Capa - Calabazas cultivadas y silvestres de México
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Estatus de la especie: ' + feature.properties.ESTESPE);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = null;
                        var iconUrl = './images/iconos/pin/i-calabaza.png';
                        switch (feature.properties.ESTESPE) {
                            case "Cultivado":
                                //color = '#55FF00';
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "Silvestre":
                                //color = '#5C963F';
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            default:
                                break;
                        }
                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "32": // Capa - Frijoles domesticados y otras especies silvestres
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Clase: ' + feature.properties.CLASE +
                            '<br/> Orden: ' + feature.properties.ORDEN +
                            '<br/> Familia: ' + feature.properties.FAMILIA +
                            '<br/> Género: ' + feature.properties.GENERO +
                            '<br/> Especie: ' + feature.properties.ESPECIE);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = null;
                        var iconUrl = './images/iconos/pin/i-frijol.png';
                        switch (feature.properties.CLAVE) {
                            case "D":
                                //color = '#55FF00';
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "S":
                                //color = '#5C963F';
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            default:
                                break;
                        }
                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "33": // Capa - Ubicación de laderas suceptibles de deslizamiento
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' + feature.properties.NOM_MUN +
                            '<br/> Ubicación: ' + feature.properties.UBICACION +
                            '<br/> Tipo de riesgo: ' + feature.properties.TIPO_DE_FE);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            iconUrl: './images/iconos/pin/i-riesgo.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "34": // Capa - Aves de corral
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.aves);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-aves.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "35": // Capa - Bovinos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.bovinos);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-bovino.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "36": // Capa - Caprinos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.caprinos);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-caprino.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "37": // Capa - Colmenas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.colmenas);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-abeja.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "38": // Capa - Ovinos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.ovinos);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-ovino.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "39": // Capa - Porcinos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.porcinos);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-porcino.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "40": // Capa - Agostaderos sin aprovechar
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.agostadero);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-agostadero.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "41": // Capa - Chile
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Chile);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-chile.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "42": // Capa - Crisantemo
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Crisantemo);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-crisantemo.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "43": // Capa - Fresa
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Fresa);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-fresa.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "44": // Capa - Jitomate
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Jitomate);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-tomate.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "45": // Capa - Manzana
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Manzana);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-manzana.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "46": // Capa - Nochebuena
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Nochebuena);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-nochebuena.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "47": // Capa - Pepinos
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Pepino);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-pepino.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "48": // Capa - Rosa
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.Rosa);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-rosa.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "49": // Capa - Otras especies de cultivo
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.otras);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-otras_especies.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "50": // Capa - Minas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' +feature.properties.municipio +
                                '<br/> Mineral primario: ' + feature.properties.p_mineral +
                                '<br/>Mineral secundario: '+ feature.properties.s_mineral +
                                '<br/>Mineral terciario: ' + feature.properties.t_mineral);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            iconUrl: './images/iconos/pin/i-minas.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "51": // Capa - Zonas geotérmicas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Ubicación: ' + feature.properties.municipio);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            iconUrl: './images/iconos/pin/i-zonas_geotermicas.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "52":// Capa - ciudades_medianas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.municipios + '</strong>');
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#919191',
                            fillOpacity: 0.7
                        }
                    }
                });
                break;
            case "53":// Capa - ciudades pequeñas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.municipios + '</strong>');
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#919191',
                            fillOpacity: 0.7
                        }
                    }
                });
                break;
            case "54":// Capa - localidades suburbanas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.MUNICIPOS + '</strong>');
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            //iconUrl: './images/iconos/semiurbano.svg',
                            iconUrl: './images/iconos/pin/i-localidades_suburbanas.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "55":// Capa - localidades rurales
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<strong>' + feature.properties.MUNICIPOS + '</strong>');
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = new L.Icon({
                            //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            iconUrl: './images/iconos/pin/i-localidades_rurales.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        });

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "56":// Capa - Areas protegidas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Nombre: ' + feature.properties.NOMBRE + '<br/>'+
                            'Municipio(s): ' + feature.properties.MUNICIPIOS + '<br/>'+
                            'Superficie total: ' + feature.properties.etiqueta + '<br/>'+
                            'cita' + feature.properties.cita);
                    },
                    style: function(feature) {
                        return {
                            fillColor: '#008200',
                            weight: 2,
                            opacity: 1,
                            color: '#008200',
                            fillOpacity: 0.4
                        }
                    }
                });
                break;
            case "57":// Capa - Régimenes de gobierno
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' + feature.properties.Municipio + '<br/>'+
                            'Régimen: ' + feature.properties.regimen + '('+feature.properties.sigla+')<br/>');
                    },
                    style: function(feature) {
                        var color = null;
                        switch (feature.properties.sigla) {
                            case "PP":
                                color= '#FF85D0';
                                break;
                            case "SNI":
                                color= '#912A74';
                                break;
                            default:
                                break;
                        }

                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: color,
                            fillOpacity: 0.7
                        }
                    }
                });
                break;
            case "58":// Capa - Rutas turísticas
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' + feature.properties.nombre + '<br/>' +
                            'Categoría: ' + feature.properties.categoria);
                    },
                    pointToLayer: function(feature, latlng) {
                        var icon = null;
                        var iconUrl = './images/iconos/pin/i-turismo.png';
                        switch(feature.properties.categoria){
                            case "PUEBLO MÁGICO":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "CAMINOS DEL MEZCAL":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            case "RUTA MÁGICA DE LAS ARTESANÍAS":
                                icon = new L.Icon({
                                    //iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                                    iconUrl: iconUrl,
                                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                    iconSize: [25, 41],
                                    iconAnchor: [12, 41],
                                    popupAnchor: [1, -34],
                                    shadowSize: [41, 41]
                                });
                                break;
                            default:
                                break;
                        }

                        return L.marker(latlng, {
                            icon: icon
                        });
                    }
                });
                break;
            case "59":// Capa - Autoadscripción indígena
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' +feature.properties.NOM_MUN + '<br>Distrito:' + feature.properties.DISTRITO +'<br>Región: '+ feature.properties.REGION_1 +'<hr>' +
                        '<p>' +
                            '<table class="table table-sm table-striped" > '+
                            '<thead class="thead-dark"><tr><th>Indicador</th><th>Total</th></tr></thead>' +
                            '<tbody>' +
                            '<tr><td>Total de población</td><td>' + feature.properties.poblacion_ + '</td></tr>' +
                            '<tr><td>Porcentaje de población total con autoadscripción indígena</td><td>' + feature.properties.tai + '%</td></tr>' +
                            '</tbody></table>' +
                        '</p>' +
                        '<p>' +    
                            '<table class="table table-sm table-striped" > '+
                            '<thead class="thead-dark"><tr><th>Indicador</th><th>Total</th><th>Mujeres</th><th>Hombres</th></tr></thead>' +
                            '<tbody>' +
                            '<tr><td>Población de 3 años y más</td><td>'+ feature.properties.p3aymt + '</td><td>' + feature.properties.p3aymm +'</td><td>' + feature.properties.p3aymh +'</td></tr>' +
                            '<tr><td>Población de 3 años y mpas hablante de alguna lengua indígena</td><td>' + feature.properties.hlit  + '%</td><td>' + feature.properties.hlim + '%</td><td>' + feature.properties.hlih + '%</td></tr>' +
                            '<tr><td>Población de 3 años y mpas hablante de alguna lengua indígena y español</td><td>' + feature.properties.hliyet  + '%</td><td>' + feature.properties.hliyem + '%</td><td>' + feature.properties.hliyeh + '%</td></tr>' + 
                            '</tbody></table>' +
                        '</p>'
                        );
                    },
                    style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#69BD3F',
                            fillOpacity: 0.8
                        }
                    }
                });
            break;
            case "60":// Capa - Autoadscripción afrodescendiente
                layer = L.geoJson(capa, {
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('Municipio: ' +feature.properties.NOM_MUN + '<br>Distrito:' + feature.properties.DISTRITO +'<br>Región: '+ feature.properties.REGION_1 +'<hr>' +
                        '<p>' +
                            '<table class="table table-sm table-striped" > '+
                            '<thead class="thead-dark"><tr><th>Indicador</th><th>Total</th><th>Mujeres</th><th>Hombres</th></tr></thead>' +
                            '<tbody>' +
                            '<tr><td>Población total</td><td>' + feature.properties.pt + '</td><td>' + feature.properties.ptm + '</td><td>' + feature.properties.pth + '</td></tr>' +
                            '<tr><td>Población de 0 a 17 años</td><td>' + feature.properties.p0a17t + '</td><td>' + feature.properties.p0a17m + '</td><td>' + feature.properties.p0a17h + '</td></tr>' +
                            '<tr><td>Población de 18 a 64 años</td><td>' + feature.properties.p18a64t + '</td><td>' + feature.properties.p18a64m + '</td><td>' + feature.properties.p18a64h + '</td></tr>' +
                            '<tr><td>Población de 65 años y más</td><td>' + feature.properties.p65ymt + '</td><td>' + feature.properties.p65ymm + '</td><td>' + feature.properties.p65ymh + '</td></tr>' +
                            '<tr><td>Población no especificada</td><td>' + feature.properties.pnet + '</td><td>' + feature.properties.pnem + '</td><td>' + feature.properties.pneh + '</td></tr>' +
                            '</tbody></table>' +
                        '</p>' 
                        );
                    },
                     style: function(feature) {
                        return {
                            fillColor: 'transparent',
                            weight: 2,
                            opacity: 1,
                            color: '#DDA508',
                            fillOpacity: 0.8
                        }
                    }
                });
            break;
            default:
                layer = L.geoJson(capa);
        }

        //Retorna la capa personalizada según el componente "data-index" definido
        //en el cuerpo del HTML
        return layer;
    }
}
