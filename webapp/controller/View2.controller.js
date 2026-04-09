sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched,this);
            //   this.getView().byId('idSF').bindElement("/EmployeeSet('"+empid+"')")

        },
        onPatternMatched(oEvent){
            var empId = oEvent.getParameter("arguments").key;
            this.getView().bindElement("/EmployeeSet('" + empId + "')");
        },
        onBackToView1(){
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)

        }
    });
});