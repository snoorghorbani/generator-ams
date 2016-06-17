angular.module('<%= moduleName.underscored %>', [])
    .value('values', {})
    .constant('constants', {})
    .config(function () { })
    .run(function () { });

// dynamically register module in application (<%= main_module %> module)
angular.module('<%= main_module %>').requires.push('<%= moduleName.underscored %>');