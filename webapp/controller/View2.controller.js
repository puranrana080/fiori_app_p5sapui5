sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/p5sapui5/model/formatter",
    "sap/m/MessageBox"
], (Controller,formatter,MessageBox) => {
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
            if ( mode === 'edit') {
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
              else if (mode === 'create') {
                if (!this.createfrag) {
                    this.createfrag = sap.ui.xmlfragment(this.getView().getId(), "com.demo.p5sapui5.view.EmpCreate", this)
                }
                this.getView().byId('idPanel').addContent(this.createfrag)
            }
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
            else if(mode =='edit'){
                this.getView().byId('idBtnSave').setVisible(true)
            this.getView().byId('idBtnCancel').setVisible(true)
            }
        },
        onPressCancel(){
            if(this.mode === 'create' ){
                //clear the form and go to first screen

            }else if(this.mode==='edit'){
                this.mode = 'display'
                 this.loadFragment(this.mode)
            this.handleButtonVisibility(this.mode)

            }

        },
        onPressEdit(){
            this.mode = 'edit'
            this.loadFragment(this.mode)
            this.handleButtonVisibility(this.mode)

        },



         onPressSave(){
            if(this.mode === "create"){
            var empId = this.getView().byId("idEmpId2").getValue();
            var name = this.getView().byId("idName2").getValue();
            var designation = this.getView().byId("idDesig2").getValue();
            var skill = this.getView().byId("idSkill2").getValue();
            var email = this.getView().byId("idEmail2").getValue();
            var phone = this.getView().byId("idPhone2").getValue();
            var salary = this.getView().byId("idSalary2").getValue();
            var doj = this.getView().byId("idDoj2").getDateValue();
            doj = formatter.formatDateForCreateNUpdate(doj);
            var status = this.getView().byId("idStatus2").getValue();
            var rating = this.getView().byId("idRating2").getValue();

            var data = {
                Empid:empId,
                Name:name,
                Designation:designation,
                Skill:skill,
                Email:email,
                Phone:phone,
                Salary:salary,
                Doj:doj,
                Status:status,
                Rating:rating
            }
            var oModel = this.getOwnerComponent().getModel();
            oModel.create("/EmployeeSet",data,{
                success:function(req,res){
                    MessageBox.success('New Employee Created Successfully')
                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value)
                }
            })

            }
            else if(this.mode === "edit"){
                 var empId = this.getView().byId("idEmpId1").getValue();
            var name = this.getView().byId("idName1").getValue();
            var designation = this.getView().byId("idDesig1").getValue();
            var skill = this.getView().byId("idSkill1").getValue();
            var email = this.getView().byId("idEmail1").getValue();
            var phone = this.getView().byId("idPhone1").getValue();
            var salary = this.getView().byId("idSalary1").getValue();
            var doj = this.getView().byId("idDoj1").getDateValue();
            doj = formatter.formatDateForCreateNUpdate(doj);
            var status = this.getView().byId("idStatus1").getValue();
            var rating = this.getView().byId("idRating1").getValue();

            var data = {
                Empid:empId,
                Name:name,
                Designation:designation,
                Skill:skill,
                Email:email,
                Phone:phone,
                Salary:salary,
                Doj:doj,
                Status:status,
                Rating:rating
            }
            var oModel = this.getOwnerComponent().getModel();
            oModel.update("/EmployeeSet('"+empId+"')",data,{
                success:function(res){
                    MessageBox.success('Employee Updated Successfully')
                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value)
                }
            })

            

            }
          

            
        },
        onPressDelete(){
            var empId = this.getView().getBindingContext().getProperty('Empid')
             var oModel = this.getOwnerComponent().getModel();
            oModel.remove("/EmployeeSet('"+empId+"')",{
                success:function(res){
                    MessageBox.success('Employee Deleted Successfully');
                    this.getOwnerComponent().getRouter().navTo("RouteView1")
                },
                error:function(oError){
                    MessageBox.error(JSON.parse(oError.responseText).error.message.value)
                }
            })
        },
         onBackToView1() {
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)

        }
       
    });
});