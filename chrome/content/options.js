/* This code is subject to the GNU Lesser Public License, Version 3. */
function onPrefChange() {
	document.getElementById("disabledWarning").hidden = prefs.enabled;
}
function openAbout() {
	openDialog("about.xul", "_blank", "chrome,centerscreen,modal");
}
