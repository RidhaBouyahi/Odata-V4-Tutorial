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
        },
        _getText : function (sTextId,aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId,aArgs);
        },
        onRefresh : function () {
            var oBinding = this.byId("peopleList").getBinding("items");
            if (oBinding.hasPendingChanges())
            {
                MessageBox.error(this._getText("refreshNotPossibleMessage"));
            }
            oBinding.refresh();
            MessageToast.show(this._getText("refreshSuccessMessage"))
            }
    });
});