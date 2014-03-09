
//http://jsfiddle.net/RJ3Rb/

ko.bindingHandlers["wysihtml5"] = {
    "init" : function (element, valueAccessor, allBindingsAccessor, viewModel) {
        //var control = $(element).wysihtml5({
        //    "events": {
        //        "change": function () {
        //            var observable = valueAccessor();
        //            observable(control.getValue());
        //        }
        //    }
        //}).data("wysihtml5").editor;
        
        var editor = new wysihtml5.Editor(element, { // id of textarea element
            toolbar: $(element).prev()[0], // id of toolbar element
            parserRules: wysihtml5ParserRules // defined in parser rules set 
        });
        
        editor.on("change", function () {
            var observable = valueAccessor();
            observable(editor.getValue());
        });

        $(element).data("wysihtml5", editor);


    },
    "update" : function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var content = valueAccessor();

        if (content != undefined) {
            var editor = $(element).data("wysihtml5");
            editor.setValue(content());
        }
    }
};
