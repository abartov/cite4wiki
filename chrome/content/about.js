/* Most files in this add-on are released under the GLPL 3, but this one
 * was based on a file provided by Mozilla Foundation under the MPL.
 *
 * ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 * ***** END LICENSE BLOCK *****
*/
/* THIS ALL APPEARS TO BE DEAD CODE, AS THERE IS NO "ABOUT" WINDOW AVAILABLE ANY WAY, ANYWHERE. */
var cite4wiki = Components.classes["@mozilla.org/cite4wiki;1"].createInstance();
while (cite4wiki && !("getString" in cite4wiki))
	cite4wiki = cite4wiki.wrappedJSObject;    // Unwrap component

function fillInVersion() {
	var versionField = document.getElementById("version");
	var version = cite4wiki.getInstalledVersion();
	if (version)
		versionField.setAttribute("value", versionField.getAttribute("value") + " " + version);
	else
		versionField.parentNode.removeChild(versionField);
}
