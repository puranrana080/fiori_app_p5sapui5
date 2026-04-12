sap.ui.define([
    "sap/ui/core/mvc/Controller",
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View3", {
        onInit() {
        
        },
         onBackToView1() {
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)

        },
        onChangeChartType(){
            var chartType = this.getView().byId('idChartType').getSelectedKey();
            this.getView().byId('idVizFrame').setVizType(chartType)
        }


    })
}
);