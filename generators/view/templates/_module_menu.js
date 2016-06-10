// <%= pkg.name %>
angular.module('<%= ModuleName %>')
    .run(['main_sidebar_menu.service', function (main_sidebar_menu_service) {
        main_sidebar_menu_service.registerNewSection({
            id: 20,
            title: '<%= ModuleName %>.<%= ModuleName %>s',
            icon: '',
            link: '<%= ModuleName %>.<%= ModuleName %>.management'
        });
    }]);