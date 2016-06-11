angular.module('<%= moduleName %>')
    .run(['main_sidebar_menu.service', function (main_sidebar_menu_service) {
        main_sidebar_menu_service.registerNewSection({
            id: 20,
            title: '<%= moduleName %>.<%= menuLink_underlined %>',
            icon: '',
            link: 'restricted.<%= menuLink %>'
        });
    }]);