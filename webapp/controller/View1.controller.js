sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View1", {
        onInit() {
        },
        onPress(){
            this.getOwnerComponent().getRouter().navTo("RouteView2")
        },
        onSubmit(){
            var name = this.getView().byId("idIpName").getValue();
            var msg = "Welcome to "+name;
            this.getView().byId("idTxtWelcome").setText(msg);
            this.getView().byId("idBtnSubmit").setType("Accept")
            this.getView().byId('idTxtWelcome').setTextAlign("Left")
            this.getView().byId("l1").setRequired(false)
        }
    });
});