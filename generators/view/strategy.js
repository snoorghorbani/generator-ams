var JavaStrategy = function () {

    var strategyfolder = '/';

    /**
	 * Execute comands pertinet to cofee script.
	 *
	 * @yo generator: Must contains 'generator.ModuleName' with current component name.
	 */
    this.execute = function (generator) {
        //generator.template(strategyfolder + '_bower-component-tests.js', 'test/' + generator.ModuleName + '-tests.js');
        //generator.template(strategyfolder + '_Gruntfile.js', 'Gruntfile.js');
        if (generator.files.module.selected)
            generator.template(strategyfolder + '_module_module.js', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.module.js');
        if (generator.files.menu.selected)
            generator.template(strategyfolder + '_module_menu.js', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.menu.js');
        if (generator.files.state.selected)
            generator.template(strategyfolder + '_module_state.js', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.state.js');
        if (generator.files.service.selected)
            generator.template(strategyfolder + '_module_service.js', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.service.js');
        if (generator.files.controller.selected)
            generator.template(strategyfolder + '_module_controller.js', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.controller.js');
        if (generator.files.template.selected)
            generator.template(strategyfolder + '_module_template.html', 'Client/' + generator.ModuleName + '/' + generator.ModuleName + '.template.html');
    }

};

module.exports = new JavaStrategy();