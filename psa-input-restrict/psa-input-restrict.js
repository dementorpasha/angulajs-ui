angular.module('psaInputRestrict', [])
	.directive('psaInputRestrict', function () {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				function getNewValue(e) {
					var el = e.target;
					return el.value.slice(0, e.target.selectionStart) + e.key + el.value.slice(e.target.selectionEnd, el.value.lenght);
				}

				function checkValue(val, type) {
					if (type == 'money') {
						return /^(([1-9,][0-9,]{0,2}(,?[0-9,]{3})*)|0)?\.?[0-9]{0,10}$/.test(val);
					} else if (type == 'percent') {
						return val*1<100 && /^-?(([1-9][0-9]{0,2}([0-9]{3})*)|0)?\.?[0-9]{0,15}$/.test(val);
					} else {
						return false;
					}
				}

				element.on('keydown', function (e) {
					var key = e.which || e.keyCode;
					var skipKey = [8, 9, 35, 36, 37, 38, 39, 40, 46];
					var prohibitChars = [','];

					if (skipKey.indexOf(key) === -1) {
						if (!checkValue(getNewValue(e),attrs.psaInputRestrict) || prohibitChars.indexOf(e.key) !== -1) {
							e.preventDefault();
						}
					}
				});
			}
		}
	});