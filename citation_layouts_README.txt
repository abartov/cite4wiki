Cite4Wiki citation layous README file
=====================================

Layout choices
--------------

If you prefer a vertical layout to a horizontal one, rename the
chrome/content/cite4wiki.js file to cite4wikiHorizontal.js and rename
cite4wikiVertical.js to cite4wiki.js in the same location, re-ZIP the files
(not the directory too!) into a new cite4wiki.zip, rename it to cite4wiki.xpi,
and restart your browser.

Someday, this will hopefully be a selectable option in the addon's "Options"
menu.

A horizontal layout (the default upon installation) is the format used by at
least a narrow majority of Wikipedians (especially those who focus on prose),
because it makes a paragraph look more like a paragraph.  Example, with fake
prose:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget velit quis purus pharetra facilisis. Pellentesque at elit sit amet orci feugiat placerat suscipit rhoncus erat.<ref>{{cite web |url= http://www.example.com/directory/part1.html |title=The Great Example, Part 1 |first= |last={{err|{{AUTHOR MISSING}}}} |work=example.com |year=2011 [last update] |accessdate=18 January 2011}}</ref> Curabitur tempor lacus et urna luctus egestas nec sit amet metus. Nam nisl ante, euismod rutrum iaculis a, blandit feugiat est.

In Wikipedia editing windows (and many external text editors as well as Web
browsers), this long line auto-wraps:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget velit
quis purus pharetra facilisis. Pellentesque at elit sit amet orci feugiat
placerat suscipit rhoncus erat.<ref>{{cite web |url=
http://www.example.com/directory/part1.html |title=The Great Example, Part 1
|first= |last={{err|{{AUTHOR MISSING}}}} |work=example.com |year=2011 [last
update] |accessdate=18 January 2011}}</ref> Curabitur tempor lacus et urna
luctus egestas nec sit amet metus. Nam nisl ante, euismod rutrum iaculis a,
blandit feugiat est.


The vertical layout is favored by some editors (especially those who do a lot
of sourcing), because it makes the citations easier to read and edit.  This
format is actually preferred when sources are put into the <references> area
instead of entered inline in the prose.  Example:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget velit
quis purus pharetra facilisis. Pellentesque at elit sit amet orci feugiat
placerat suscipit rhoncus erat.<ref>{{cite web
 |url= http://www.example.com/directory/part1.html
 |title=The Great Example, Part 1
 |first=
 |last={{err|{{AUTHOR MISSING}}}}
 |work=example.com
 |year=2011 [last update]
 |accessdate=18 January 2011
}}</ref> Curabitur tempor lacus et urna luctus egestas nec sit amet metus. Nam
nisl ante, euismod rutrum iaculis a, blandit feugiat est.


Cleaning up parameters after pasting
------------------------------------

Note that in both cases, the add-on puts a default error message in place of
author's family name; it will appear as a red error message when rendered. This
is to ensure that users of the add-on check and correct the entries they paste
into real Wikipedia pages.  Either the author's name should be filled in (add
a `|coauthors=` parameter for any second and subsequent coauthors), or
replaced by something like `<!--Staff writer(s); no by-line.-->` so that those
who examine the citation code know that the author was not left blank
accidentally.

The `title=` parameter in particular should be checked for acccuracy.  Often
it will simply default to the site name (which is already used in the `work=`
parameter), or otherwise be unhelpful. Look for a heading in the content that
provides the title of the document. If the title in title bar (provided by
`<title>...</title>` in the HTML, used by default by this add-on) and a
title specified in the content are at odds with each other, usually prefer the
one given in the content, since the one in the title bar may have been left
over from a copy-paste operation or authoring template.  If the title bar gives
navigation, this should generally be removed, e.g. `Articles > 2012 > Movie
Reviews > Aliens vs. Smurfs` should be reduced to simply `Aliens vs. Smurfs` or
perhaps `Movie Reviews > Aliens vs. Smurfs`.

The `year=` parameter should be replaced with a more accurate year, or with an
even more accurate full `date=` parameter, if the document being cited provides
this information.  By default, the add-on simply uses the last-modified date as
reported by the HTTP headers, and notes that this is the type of date being
reported.  This is not the ideal date to use, since any change to any content
on the rendered page (e.g. a banner ad) can produce a last-modified date that
is newer than the publication date of the content.  If the document specifies
no publication date, look for a copyright date or date range (usually at the
page bottom) and use that: `|year=2008&ndash;2011 [copyright date]`.  If the
citation in question has been auto-detected as a journal, book or other type
of item that has a template more specific than {{cite web}}, the add-on may
not attempt to provided an auto-generated date at all, since the date (or
for books, year) will almost certainly be provided in the text of the cited
page and will need to be added to the template code manually.

