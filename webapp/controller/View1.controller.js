sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/p5sapui5/model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/export/Spreadsheet"
], (Controller,formatter,Filter,Sorter,Spreadsheet) => {
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
            var selBindingContext = this.getView().byId('idTable').getSelectedContext();
            for(var i =0;i<selBindingContext.length;i++){
                selBindingContext[i].getObject()
            }
        },
        onPressRow(oEvent){
          var empid = oEvent.getSource().getBindingContext().getProperty("Empid")

        },
        onPressRowFromF4HelpTable(oEvent){
        var empid = oEvent.getSource().getBindingContext().getProperty("Empid");
        this.getView().byId('idEmpID').setValue(empid);
        this.oDialog.close();
        },
        onPressValueHelp(){
            //load the fragment
            if(!this.oDialog){
                  this.oDialog = sap.ui.xmlfragment(this.getView().getId(),"com.demo.p5sapui5.view.EmpidF4Help",this);
                  this.getView().addDependent(this.oDialog);
            }
            
            this.oDialog.open()
        },
        onCloseDialog(){
            this.oDialog.close()
        },
        onPressGo(){
            var aFilters =[];
            var aSorters=[];
            var empId = this.getView().byId('idEmpID').getValue();
             var name = this.getView().byId('idName').getValue();
              var desig = this.getView().byId('idDesig').getSelectedKey();
               var skill = this.getView().byId('idSkill').getSelectedKey();
               var salOpr = this.getView().byId('idSalOpr').getSelectedKey();
               var salary = this.getView().byId('idSalary').getValue();
            //    var doj = this.getView().byId('idDoj').getDateValue();
            //    doj = formatter.formatDateFilter(doj)
            if(empId!==""){
               aFilters.push(new Filter("Empid","EQ",empId));
            }
            if(name!==""){
               aFilters.push(new Filter("Name","EQ",name));
            }
            if(desig!==""){
               aFilters.push(new Filter("Designation","EQ",desig));
            }
            if(skill!==""){
               aFilters.push(new Filter("Skill","EQ",skill));
            }
            if(salary!==""){
                aFilters.push(new Filter("Salary",salOpr,salary))
            }
            // if(doj!==""){
            //     aFilters.push(new Filter("Doj",'EQ',doj) )
            // }
            this.getView().byId("idTable").getBinding('items').filter(aFilters);

            // Sorting
            var sortField = this.getView().byId('idSortField').getSelectedKey();
            var sortOrder = this.getView().byId('idSortOrder').getSelectedIndex();
           
            if(sortField!=="" && sortOrder!== ""){
                aSorters.push(new Sorter(sortField,(sortOrder === 0)? false:true))
            }   
            this.getView().byId("idTable").getBinding('items').sort(aSorters);
        },
        onPressReset(){
            this.getView().byId('idEmpID').setValue("");
            this.getView().byId('idName').setValue("");
            this.getView().byId('idDesig').setSelectedKey("");
            this.getView().byId('idSkill').setSelectedKey("");
            this.getView().byId('idSalOpr').setSelectedKey("EQ");
            this.getView().byId('idSalary').setValue("");
            // this.getView().byId('idDoj').setDateValue(null);
            this.getView().byId('idSortField').setSelectedKey("");
            this.getView().byId('idSortOrder').setSelectedIndex(-1);
            this.getView().byId("idTable").getBinding('items').filter([]);
            this.getView().byId("idTable").getBinding('items').sort([]);
        },
        onPressExportToXL(){
            var aCols,oRowBinding,oSettings,oSheet;
            oRowBinding = this.getView().byId('idTable').getBinding('items')
            //place your table columns and odata properties
            aCols = [{
                label:'Employee Id',
                property: 'Empid'
            },{
                label:'Name',
                property: 'Name'
            },{
                label:'Designation',
                property: 'Designation'
            },{
                label:'Skill',
                property: 'Skill'
            },{
                label:'Email',
                property: 'Email'
            },{
                label:'Phone.No',
                property: 'Phone'
            },{
                label:'Status',
                property: 'Status'
            },{
                label:'Rating',
                property: 'Rating'
            },{
                label:'Date of Joining',
                property: 'Doj',
                type:'Date',
                format:'dd-MM-yyyy'
            },{
                label:'Salary',
                property: 'Salary',
                type:'Number',
                delimiter:true,
                scale:2
            }];

            oSettings={
                workbook:{
                    columns:aCols
                },
                dataSource: oRowBinding,
                fileName:'Employees.xlsx',
                worker:true
            };
            oSheet = new Spreadsheet(oSettings);
            oSheet.build().finally(function(){
                oSheet.destroy();
            })
        }
    });
});