sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "com/demo/p5sapui5/model/formatter",
    "sap/m/MessageBox"
], (Controller, formatter, MessageBox) => {
    "use strict";

    return Controller.extend("com.demo.p5sapui5.controller.View4", {
        onInit() {
            var batchModel = this.getOwnerComponent().getModel('batchModel')
            batchModel.setData({
                aEmployees: []
            })

        },
        onBackToView1() {
            // this.getOwnerComponent().getRouter().navTo("RouteView1")
            history.go(-1)

        },
        onSelectFile(oEvent) {
            //read the file and its content and convert that into a json array and bind that to table
            var selFile = oEvent.getParameter('files')[0];
            this.readXLContentIntoJSONArray(selFile)

        },
        readXLContentIntoJSONArray(file) {
            var that = this;
            var aResults = [];
            if (file && window.FileReader) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook = XLSX.read(data, {
                        type: 'binary',
                         cellDates: true
                    })
                    workbook.SheetNames.forEach(function (sheetName) {
                        aResults = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName], { raw: false });

                    })
                    for (var i = 0; i < aResults.length; i++) {
                        aResults[i].Doj = new Date(aResults[i].Doj)
                    }
                    that.getOwnerComponent().getModel('batchModel').getData().aEmployees = aResults;
                    that.getOwnerComponent().getModel('batchModel').refresh(true)

                }
                reader.onerror = function (err) {
                    console.log(err)
                };
                reader.readAsArrayBuffer(file);
            }

        },
        onSubmitBatchReq() {
            var aEmployees = this.getOwnerComponent().getModel('batchModel').getData().aEmployees;
            var oModel = this.getOwnerComponent().getModel()

            var aDeferredGroups = oModel.getDeferredGroups();
            aDeferredGroups = aDeferredGroups.concat(['CreateGrp']);
            oModel.setDeferredGroups(aDeferredGroups)

            for (var i = 0; i < aEmployees.length; i++) {
                aEmployees[i].Doj = formatter.formatDateForCreateNUpdate(aEmployees[i].Doj)
                aEmployees[i].Rating = parseInt(aEmployees[i].Rating)


                oModel.create("/EmployeeSet", aEmployees[i], {
                    groupId: "CreateGrp"
                })
            }
            oModel.submitChanges({
                groupId: "CreateGrp",
                success: function () {
                    MessageBox.success("Batch upload successful!");
                },
                error: function () {
                    MessageBox.error("Batch upload failed!");
                }
            })
        }
    })
}
);