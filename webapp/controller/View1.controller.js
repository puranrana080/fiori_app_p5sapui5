sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/p5sapui5/model/formatter"
], (Controller,formatter) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View1", {
        f:formatter,
        onInit() {
            this.getOwnerComponent().readEmployees()
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
        },
        multiValueForm(){
            var selBoxVal = this.getView().byId('idSel').getSelectedKey();
            var cbValue = this.getView().byId('idCb').getSelectedKey();
            var mcbValue = this.getView().byId('idMCb').getSelectedKeys();
           var selIndex = this.getView().byId('idRBtn').getSelectedIndex();
        },
        onSelFromSelectBox(oEvent){
             var selBoxVal = this.getView().byId('idSel').getSelectedKey();
             //oEvent.getParameter('selectedItem').getKey();
        },
        onSelFromCb(){
             var cbValue = this.getView().byId('idCb').getSelectedKey();
             //oEvent.getParameter('selectedItem').getKey();
        },
        onSelFromMCB(){
             var mcbValue = this.getView().byId('idMCb').getSelectedKeys();
             //oEvent.getParameter('selectedItem').getKeys();
        },
        onSelFromRBtn(){
             var selIndex = this.getView().byId('idRBtn').getSelectedIndex();
        },
        getSelEmpData(){
            // var empId= this.getView().byId('idTable').getSelectedItem().getBindingContext().getProperty('Empid')
            // var selBindingContext = this.getView().byId('idTable).getSelectedContext();
            for(var i =0;i<selBindingContext.length;i++){
                selBindingContext[i].getObject()
            }
        },
        onPressRow(oEvent){
          var empid = oEvent.getSource().getBindingContext().getProperty("Empid")

        }
    });
});