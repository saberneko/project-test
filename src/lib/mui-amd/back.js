/**
 * mui back
 * @param {type} $
 * @param {type} window
 * @returns {undefined}
 */

 let back = {

 }
/**
 * register back
 * @param {type} back
 * @returns {$.gestures}
 */
$.addBack = function(back) {
	return $.addAction('backs', back);
};
/**
 * default
 */
$.addBack({
	name: 'browser',
	index: 100,
	handle: function() {
		if (window.history.length > 1) {
			window.history.back();
			return true;
		}
		return false;
	}
});
/**
 * 后退
 */
$.back = function() {
	if (typeof $.options.beforeback === 'function') {
		if ($.options.beforeback() === false) {
			return;
		}
	}
	$.doAction('backs');
};
// tap 事件补全
window.addEventListener('tap', function(e) {
	var action = $.targets.action;
	if (action && action.classList.contains($.className('action-back'))) {
		$.back();
		$.targets.action = false;
	}
});
// 右滑动事件补全
window.addEventListener('swiperight', function(e) {
	var detail = e.detail;
	if ($.options.swipeBack === true && Math.abs(detail.angle) < 3) {
		$.back();
	}
});
