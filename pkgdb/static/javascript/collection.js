/*
 * Copyright (c) 2007-2011  Red Hat, Inc.
 *
 * This copyrighted material is made available to anyone wishing to use,
 * modify, copy, or redistribute it subject to the terms and conditions of the
 * GNU General Public License v.2, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY expressed or implied, including the implied warranties of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General
 * Public License for more details.  You should have received a copy of the
 * GNU General Public License along with this program; if not, write to the
 * Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301, USA. Any Red Hat trademarks that are incorporated in the source
 * code or documentation are not subject to the GNU General Public License and
 * may only be used or replicated with the express permission of Red Hat, Inc.
 *
 * Author(s):         Frank Chiulli <fchiulli@fedoraproject.org>
 */

function check_fields() {
    var empty_fields = new Array();
    if (document.new_collection.cname.value == '') {
        empty_fields.push("Collection name");
    }

    if (document.new_collection.cversion.value == '') {
        empty_fields.push("Collection version");
    }

    if (document.new_collection.kname.value == '') {
        empty_fields.push("Koji name");
    }

    if (document.new_collection.bname.value == '') {
        empty_fields.push("Branch name");
    }

    if (document.new_collection.disttag.value == '') {
        empty_fields.push("Distribution tag name");
    }

    if (empty_fields.length > 0) {
        alert("The following fields need to be specified: " + empty_fields.join(", "));
        return false;
    }

    return true;
}
