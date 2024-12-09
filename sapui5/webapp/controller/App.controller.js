sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType"
], (Controller, JSONModel, MessageBox, MessageToast, Sorter, Filter, FilterOperator, FilterType) => {
    "use strict";

    return Controller.extend("odatav4.sapui5.controller.App", {
        onInit() {
            var oJSONData = {
                busy: false,
                order : 0
            };
            var oModel = new JSONModel(oJSONData);
            this.getView().setModel(oModel, "appView")
        },
        _getText: function (sTextId, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sTextId, aArgs);
        },
        onRefresh: function () {
            var oBinding = this.byId("peopleList").getBinding("items");
            if (oBinding.hasPendingChanges()) {
                MessageBox.error(this._getText("refreshNotPossibleMessage"));
            }
            oBinding.refresh();
            MessageToast.show(this._getText("refreshSuccessMessage"))
        },
        onSearch: function () {
            var oView = this.getView(),
            sValue = oView.byId("searchField").getValue(),
            oFilter = new Filter ("LastName", FilterOperator.Contains, sValue);
            var oBinding = oView.byId("peopleList").getBinding("items");
            oBinding.filter(oFilter,FilterType.Application);
        },
        onSort: function () {
            var oView = this.getView(),
            aStates = [undefined,"asc","desc"],
            aStateTextIds = ["sortNone","sortAscending","sortDescending"],
            sMessage,
            iOrder = oView.getModel("appView").getProperty("/order");
            
            iOrder = (iOrder + 1) % aStates.length ; 
            var sOrder = aStates[iOrder]; 

            oView.getModel("appView").setProperty("/order",iOrder) ;
            oView.byId("peopleList").getBinding("items").sort(sOrder && new Sorter ("LastName", sOrder === "desc"))

            sMessage = this._getText("sortMessage", this._getText(aStateTextIds[iOrder]));
            MessageToast.show(sMessage);
        }
    });
});
