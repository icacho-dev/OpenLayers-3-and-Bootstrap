// BEGIN : ON-LOAD
(function ($, window, document) {
    try {
        console.log('openlayers->');
        // SET MAP LAYERS
        var ml = setMapLayers();
        var mapOSM = ml.mapOSM;
        // MAIN INITIALSETUP
        var initialSetup = $(function () {
            console.log("initialSetup");
            mapOl = new ol.Map({
                target: 'map-ol',
                layers: [mapOSM],
                view: new ol.View({
                    center: ol.proj.transform([-99.0860, 19.4248], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 10
                })
            });
            // MAP OL CONTROLS
            mapOl.addControl(new ol.control.FullScreen());
            mapOl.addControl(new ol.control.ScaleLine());
            // CONFIRM MAP IS RENDERED
            mapOl.once('postrender', function () {
                console.log('initialSetup>postrender-obj');
            });
        });
    } catch (err) {
        console.error('main.err', err);
    }
}(window.jQuery, window, document));
// END : ON-LOAD
var mapOl;
function setMapLayers() {
    try {
        var mapOSM = new ol.layer.Tile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new ol.source.OSM()
        });
        return {
            mapOSM: mapOSM
        };
    } catch (err) {
        console.error('setMapLayers.err', err);
    }
};
