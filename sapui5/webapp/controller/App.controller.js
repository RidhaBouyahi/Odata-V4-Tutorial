sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast"
], (Controller,JSONModel,MessageBox,MessageToast) => {
    "use strict";

    return Controller.extend("odatav4.sapui5.controller.App", {
        onInit() {
            var oJSONData = {
                busy : false 
            };
            var oModel = new JSONModel(oJSONData) ;
            this.getView().setModel(oModel,"appView")
        }
    });
});