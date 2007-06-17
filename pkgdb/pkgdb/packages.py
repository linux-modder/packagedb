import sqlalchemy
from sqlalchemy.ext.selectresults import SelectResults
import sqlalchemy.mods.selectresults

from turbogears import controllers, expose, paginate, config, redirect
from turbogears.database import session

from pkgdb import model
from dispatcher import PackageDispatcher

class Packages(controllers.Controller):
    '''Display information related to individual packages.
    '''
    dispatcher = PackageDispatcher()

    def __init__(self, fas=None, appTitle=None):
        '''Create a Packages Controller.

        :fas: Fedora Account System object.
        :appTitle: Title of the web app.
        '''
        self.fas = fas
        self.appTitle = appTitle

    @expose(template='pkgdb.templates.pkgoverview')
    @paginate('packages', default_order='name', limit=100,
            allow_limit_override=True, max_pages=13)
    def index(self):
        # Retrieve the complete list of packages
        packages = SelectResults(session.query(model.Package))
        return dict(title=self.appTitle + ' -- Package Overview',
                packages=packages)

    @expose(template='pkgdb.templates.pkgpage')
    def name(self, packageName):
        pkg = model.Package.get_by(name=packageName)
        if not pkg:
            raise redirect(config.get('base_url_filter.base_url') +
                    '/packages/not_packagename', redirect_params={'packageName' : packageName})
        return self.id(pkg.id)

    @expose(template='pkgdb.templates.pkgpage')
    def id(self, packageId):
        try:
            packageId = int(packageId)
        except ValueError:
            raise redirect(config.get('base_url_filter.base_url') + '/packages/not_id')
        # Return the information about a package.
        pkgRow = sqlalchemy.select((model.PackageTable.c.name,
            model.PackageTable.c.summary, model.PackageTable.c.description,
            model.StatusTranslationTable.c.statusname),
            sqlalchemy.and_(
                model.PackageTable.c.statuscode ==
                    model.StatusTranslationTable.c.statuscodeid,
                model.StatusTranslationTable.c.language=='C',
                model.PackageTable.c.id==packageId), limit=1).execute()
        if pkgRow.rowcount <= 0:
            raise redirect(config.get('base_url_filter.base_url') + '/packages/unknown',
                redirect_params={'packageId' : packageId})
        package = pkgRow.fetchone()

        # Possible ACLs
        aclNames = ('watchbugzilla', 'watchcommits', 'commit', 'approveacls')
        # Possible statuses for acls:
        aclStatus = SelectResults(session.query(model.PackageAclStatus))
        aclStatusTranslations=['']
        for status in aclStatus:
            ### FIXME: At some point, we have to pull other translations out,
            # not just C
            if aclStatusTranslations != 'Obsolete':
                aclStatusTranslations.append(status.translations[0].statusname)

        # Fetch information about all the packageListings for this package
        pkgListings = SelectResults(session.query(model.PackageListing)).select(
                model.PackageListingTable.c.packageid==packageId
                )

        for pkg in pkgListings:
            # Get real ownership information from the fas
            (user, group) = self.fas.get_user_info(pkg.owner)
            ### FIXME: Handle the case where the owner is unknown
            pkg.ownername = '%s (%s)' % (user['human_name'], user['username'])
            pkg.ownerid = user['id']
            if pkg.qacontact:
                (user, groups) = self.fas.get_user_info(pkg.qacontact)
                pkg.qacontactname = '%s (%s)' % (user['human_name'],
                        user['username'])
            else:
                pkg.qacontactname = ''

            for person in pkg.people:
                # Retrieve info from the FAS about the people watching the pkg
                (fasPerson, groups) = self.fas.get_user_info(person.userid)
                person.name = '%s (%s)' % (fasPerson['human_name'],
                        fasPerson['username'])
                # Setup acls to be accessible via aclName
                person.aclOrder = {}
                for acl in aclNames:
                    person.aclOrder[acl] = None
                for acl in person.acls:
                    if acl.status.translations[0].statusname != 'Obsolete':
                        person.aclOrder[acl.acl] = acl

            for group in pkg.groups:
                # Retrieve info from the FAS about a group
                fasGroup = self.fas.get_group_info(group.groupid)
                group.name = fasGroup['name']
                # Setup acls to be accessible via aclName
                group.aclOrder = {}
                for acl in aclNames:
                    group.aclOrder[acl] = None
                for acl in group.acls:
                    group.aclOrder[acl.acl] = acl

        return dict(title='%s -- %s' % (self.appTitle, package.name),
                package=package, packageid=packageId,
                packageListings=pkgListings, aclNames=aclNames,
                aclStatus=aclStatusTranslations)

    @expose(template='pkgdb.templates.errors')
    def unknown(self, packageId):
        msg = 'The packageId you were linked to, %s, does not exist.' \
                ' If you received this error from a link on the' \
                ' fedoraproject.org website, please report it.' % packageId
        return dict(title=self.appTitle + ' -- Unknown Package', msg=msg)

    @expose(template='pkgdb.templates.errors')
    def not_packagename(self, packageName):
        msg = 'The packagename you were linked to (%s) does not appear' \
                ' in the Package Database.' \
                ' If you received this error from a link on the' \
                ' fedoraproject.org website, please report it.' % packageName
        return dict(title=self.appTitle + ' -- Invalid Package Name', msg=msg)

    @expose(template='pkgdb.templates.errors')
    def not_id(self):
        msg = 'The packageId you were linked to is not a valid id.' \
                ' If you received this error from a link on the' \
                ' fedoraproject.org website, please report it.'
        return dict(title=self.appTitle + ' -- Invalid Package Id', msg=msg)
