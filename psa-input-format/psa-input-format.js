angular.module('psaInputFormat', [])
	.directive('psaInputFormat', function ($filter) {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, ngModel) {
				function convertToMoney(val) {
					var str = val.toString().split('.');
					num = str[0].replace(/,/g,'')*1;
					str[0] = (num+".00").replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')[0];
					return str.join('.');
				}

				element.on('keyup', function (e) {
					var newVal = convertToMoney(e.target.value);
					if (newVal !== e.target.value) {
						var oldVal = e.target.value;
						var oldStart = e.target.selectionStart;
						e.target.value = newVal;
						ngModel.$setViewValue(newVal);
						e.target.selectionEnd = e.target.selectionStart = oldStart + (newVal.toString().length - oldVal.toString().length);
					}
				});
			}
		};
	});