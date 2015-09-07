var uiGmapGoogleMapApiProvider = function(){
  this.$get = angular.noop;

  this.configure = function(){

  };
};

angular.module('uiGmapgoogle-maps', [])
        .provider('uiGmapGoogleMapApi', uiGmapGoogleMapApiProvider);


var google = {
    maps : {
        OverlayView : function () {
        },
        Marker : function () {
        },
        InfoWindow : function () {
        }
    }
};