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
        onSubmit1(){
            var name = this.getView().byId("idIpName").getValue();
            var msg = "Welcome to "+name;
            this.getView().byId("idTxtWelcome").setText(msg);
            this.getView().byId("idBtnSubmit").setType("Accept")
            this.getView().byId("l1").setRequired(false)
        },
        onSubmit2(){
          
            var empId = this.getView().byId('idEmpId').getValue();
            if(empId === ""){
                
                this.getView().byId('idEmpId').setValueState("Error");
                this.getView().byId('idEmpId').setValueStateText("Employee Id is mandatory please fill it");
            }
            else{
                this.getView().byId('idEmpId').setValueState("None");

                // Data format validation
                var regExp = /^[a-zA-Z]+$/
                if(!empId.match(regExp)){
                    this.getView().byId('idEmpId').setValueState("Error");
                    this.getView().byId('idEmpId').setValueStateText("Employee ID must be only alphabet");

                }
                // data format validation
                // if(empId.length !==10){
                //     this.getView().byId('idEmpId').setValueState("Error");
                // this.getView().byId('idEmpId').setValueStateText("Employee Id should atleast be 10 digits");  
                // }
            }
        }
    });
});