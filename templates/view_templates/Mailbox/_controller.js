/*
 *	view template   :   <%= viewTemplate %>
 */
angular
    .module('<%= moduleName %>')
    .controller('<%= fullName %>.controller', [
      '$rootScope',
       '$scope',
       '$timeout',
       'locale',
      function ($rootScope, $scope, $timeout, locale) {
     var $scopeManager = new $scope.$scopeManager($scope);
     $rootScope.sidebar_secondary = true;

     $scope.searchAction = $$$api.<%= moduleName %>.<%= search_action %>.$init(invoke_on_init = true);

     //set required padding for top bar on page
     //$rootScope.toBarActive = false;
     $scope.activeRequest = {};
     $$$api.request.FieldsOfRequest
         .$promise.then(function (res) {
             $scope.activeRequest = res;
             $timeout(function () {
                 $('#sidebar_secondary .uk-tab-grid >li').get(0).click();
             }, 0);
         });

     //#region load history of active request

     $scope.historyOfRequestWorkflow = $$$api.request.HistoryOfRequestWorkflow.$init()
     $scope.loadRequestHistory = function () {
         $$$api.request.HistoryOfRequestWorkflow.$$instance
             .$update({ RequestId: $scope.activeRequest.RequestId })
             .$invoke();
     }

     //#endregion

     //#region load notes of active request

     $scope.notesOfRequest =  $$$api.request.NotesOfRequest.$init();

     $scope.loadNotesOfRequest = function () {
         $$$api.request.NotesOfRequest.$$instance
             .$update({ RequestId: $scope.activeRequest.RequestId })
             .$invoke();
     }

     //#endregion

     //#region load notes of active request

     $scope.attachmentsOfRequest = $$$api.request.AttachmentsOfRequest.$init();

     $scope.loadAttachmentsOfRequest = function () {
         $$$api.request.AttachmentsOfRequest.$$instance
             .$update({ RequestId: $scope.activeRequest.RequestId })
             .$invoke();
     }

     //#endregion
 }
])
;
