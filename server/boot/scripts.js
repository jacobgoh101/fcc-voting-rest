'use strict';

module.exports = (app) => {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  let adminUsers = [{
    username: 'admin',
    email: 'admin@gmail.com',
    password: '123456',
  }];
  User.create(adminUsers, (err, users) => {
    if (err) throw err;
    Role.create({
      name: 'admin',
    }, (err, role) => {
      if (err) throw (err);

      users.forEach((admin) => {
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: admin.id,
        }, (err, principal) => {
          if (err) throw (err);
        });
      });
    });
  });

};
