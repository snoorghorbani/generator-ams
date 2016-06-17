angular.module('<%= moduleName.underscored %>')
    .run(['main_sidebar_menu.service', function (main_sidebar_menu_service) {
        //main_sidebar_menu_service.registerNewSection({
        //    id: 20,
        //    title: '<%= moduleName.underscored %>.<%= menuLink_underlined %>',
        //    icon: '',
        //    link: 'restricted.<%= menuLink %>'
        //});
    }]);