sap.ui.define([],function(){
    "use strict";
    return {
        formatName:function(Name){
            return "Mr "+Name;

        },
        colorSkill:function(Skill){
            if(Skill === 'ABAP'){
                return "Success"
            }else if(Skill === 'SAPUI5'){
                return "Error"
            }
        },
        colorStatus:function(Status){
            if(Status === 'PERMANENT'){
                return "Success"
            }else if(Status === 'CONTRACT'){
                return "Error"
            }
        },
        formatDate:function(Doj){
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "dd-MM-yyyy"
            },sap.ui.getCore().getConfiguration().getLocale() );
            return oDateFormat.format(Doj);

        },
        formatDateFilter:function(Doj){
            var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-dd"
            },sap.ui.getCore().getConfiguration().getLocale() );
            return oDateFormat.format(Doj);

        },
        formatDateForCreateNUpdate(Doj){
             var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
                pattern: "yyyy-MM-ddT00:00:00"
            },sap.ui.getCore().getConfiguration().getLocale() );
            return oDateFormat.format(Doj);

        }
    }
})