# -*- coding: utf-8 -*-
#
# Copyright © 2007-2009  Red Hat, Inc. All rights reserved.
#
# This copyrighted material is made available to anyone wishing to use, modify,
# copy, or redistribute it subject to the terms and conditions of the GNU
# General Public License v.2.  This program is distributed in the hope that it
# will be useful, but WITHOUT ANY WARRANTY expressed or implied, including the
# implied warranties of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the GNU General Public License for more details.  You should have
# received a copy of the GNU General Public License along with this program;
# if not, write to the Free Software Foundation, Inc., 51 Franklin Street,
# Fifth Floor, Boston, MA 02110-1301, USA. Any Red Hat trademarks that are
# incorporated in the source code or documentation are not subject to the GNU
# General Public License and may only be used or replicated with the express
# permission of Red Hat, Inc.
#
# Fedora Project Author(s): Ionuț Arțăriși <mapleoin@fedoraproject.org>
#
'''
Mapping of tag related database tables to python classes.
'''

from sqlalchemy import Table
from sqlalchemy.orm import relation, backref
from sqlalchemy.ext.associationproxy import association_proxy

from turbogears.database import metadata, mapper

from fedora.tg.json import SABase

#
# Tables
#

TagsTable = Table('tags', metadata, autoload=True)

#
# Mapped Classes
#

class Tag(SABase):
    '''Package Tags.

    These belong to a Package object. They are entered through the pkgdb
    interface and also belong to a language.

    Table -- Tags
    '''

    def __init__(self, name, language):
        super(Tag, self).__init__()
        self.name = name
        self.language = language

    def __repr__(self):
        return 'Tag(%r, language=%r)' % (
            self.name, self.language)

    # Link to builds, through PackageBuildName
    builds = association_proxy('buildnames', 'builds')
#
# Mappers
#
mapper(Tag, TagsTable)