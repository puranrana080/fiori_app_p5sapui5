sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View2", {
        onInit() {
            this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this);
            //   this.getView().byId('idSF').bindElement("/EmployeeSet('"+empid+"')")

        },
        onPatternMatched(oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            if (empId === 'newemp') {
                this.mode = 'create';
                this.getView().unbindElement()
                this.handleButtonVisibility(this.mode)
            } else {
                this.mode = 'display';
                this.handleButtonVisibility(this.mode)
                this.getView().bindElement("/EmployeeSet('" + empId + "')");
            }
            this.loadFragment(this.mode)
        },
        loadFragment(mode) {
            this.getView().byId('idPanel').removeAllContent();
            if (mode === 'create' || mode === 'edit') {
                if (!this.editfrag) {
                    this.editfrag = sap.ui.xmlfragment(this.getView().getId(),"com.demo.p5sapui5.view.EmpEdit", this)

                }
                this.getView().byId('idPanel').addContent(this.editfrag)

            }
            else if (mode === 'display') {
                if (!this.displayfrag) {
                    this.displayfrag = sap.ui.xmlfragment(this.getView().getId(), "com.demo.p5sapui5.view.EmpDisplay", this)
                }
                this.getView().byId('idPanel').addContent(this.displayfrag)
            }
        },
        onBackToView1() {
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)

        },
        handleButtonVisibility(mode){
            this.getView().byId('idBtnEdit').setVisible(false)
            this.getView().byId('idBtnDisplay').setVisible(false)
            this.getView().byId('idBtnSave').setVisible(false)
            this.getView().byId('idBtnCancel').setVisible(false)
            this.getView().byId('idBtnDelete').setVisible(false)
            if(mode == 'create'){
                this.getView().byId('idBtnSave').setVisible(true)
                this.getView().byId('idBtnCancel').setVisible(true)
            }
            else if(mode =='display'){
                this.getView().byId('idBtnEdit').setVisible(true)
                this.getView().byId('idBtnDelete').setVisible(true)
            }
        }
    });
});