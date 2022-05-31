var DataTypes = require("sequelize").DataTypes;
var _Activities = require("./Activities");
var _ActivityTemplates = require("./ActivityTemplates");
var _Devices = require("./Devices");
var _Logs = require("./Logs");
var _Measurements = require("./Measurements");
var _Organizations = require("./Organizations");
var _Permissions = require("./Permissions");
var _PlannedActivities = require("./PlannedActivities");
var _PlotProjects = require("./PlotProjects");
var _Plots = require("./Plots");
var _Projects = require("./Projects");
var _Questionnaires = require("./Questionnaires");
var _RolePermissions = require("./RolePermissions");
var _Roles = require("./Roles");
var _TModules = require("./TModules");
var _TreeSpecies = require("./TreeSpecies");
var _UserProjects = require("./UserProjects");
var _Users = require("./Users");
var _addr = require("./addr");
var _addrfeat = require("./addrfeat");
var _bg = require("./bg");
var _county = require("./county");
var _county_lookup = require("./county_lookup");
var _countysub_lookup = require("./countysub_lookup");
var _cousub = require("./cousub");
var _direction_lookup = require("./direction_lookup");
var _edges = require("./edges");
var _faces = require("./faces");
var _featnames = require("./featnames");
var _geocode_settings = require("./geocode_settings");
var _geocode_settings_default = require("./geocode_settings_default");
var _layer = require("./layer");
var _loader_lookuptables = require("./loader_lookuptables");
var _loader_platform = require("./loader_platform");
var _loader_variables = require("./loader_variables");
var _pagc_gaz = require("./pagc_gaz");
var _pagc_lex = require("./pagc_lex");
var _pagc_rules = require("./pagc_rules");
var _place = require("./place");
var _place_lookup = require("./place_lookup");
var _secondary_unit_lookup = require("./secondary_unit_lookup");
var _state = require("./state");
var _state_lookup = require("./state_lookup");
var _street_type_lookup = require("./street_type_lookup");
var _tabblock = require("./tabblock");
var _topology = require("./topology");
var _tract = require("./tract");
var _zcta5 = require("./zcta5");
var _zip_lookup = require("./zip_lookup");
var _zip_lookup_all = require("./zip_lookup_all");
var _zip_lookup_base = require("./zip_lookup_base");
var _zip_state = require("./zip_state");
var _zip_state_loc = require("./zip_state_loc");

function initModels(sequelize) {
  var Activities = _Activities(sequelize, DataTypes);
  var ActivityTemplates = _ActivityTemplates(sequelize, DataTypes);
  var Devices = _Devices(sequelize, DataTypes);
  var Logs = _Logs(sequelize, DataTypes);
  var Measurements = _Measurements(sequelize, DataTypes);
  var Organizations = _Organizations(sequelize, DataTypes);
  var Permissions = _Permissions(sequelize, DataTypes);
  var PlannedActivities = _PlannedActivities(sequelize, DataTypes);
  var PlotProjects = _PlotProjects(sequelize, DataTypes);
  var Plots = _Plots(sequelize, DataTypes);
  var Projects = _Projects(sequelize, DataTypes);
  var Questionnaires = _Questionnaires(sequelize, DataTypes);
  var RolePermissions = _RolePermissions(sequelize, DataTypes);
  var Roles = _Roles(sequelize, DataTypes);
  var TModules = _TModules(sequelize, DataTypes);
  var TreeSpecies = _TreeSpecies(sequelize, DataTypes);
  var UserProjects = _UserProjects(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);
  var addr = _addr(sequelize, DataTypes);
  var addrfeat = _addrfeat(sequelize, DataTypes);
  var bg = _bg(sequelize, DataTypes);
  var county = _county(sequelize, DataTypes);
  var county_lookup = _county_lookup(sequelize, DataTypes);
  var countysub_lookup = _countysub_lookup(sequelize, DataTypes);
  var cousub = _cousub(sequelize, DataTypes);
  var direction_lookup = _direction_lookup(sequelize, DataTypes);
  var edges = _edges(sequelize, DataTypes);
  var faces = _faces(sequelize, DataTypes);
  var featnames = _featnames(sequelize, DataTypes);
  var geocode_settings = _geocode_settings(sequelize, DataTypes);
  var geocode_settings_default = _geocode_settings_default(sequelize, DataTypes);
  var layer = _layer(sequelize, DataTypes);
  var loader_lookuptables = _loader_lookuptables(sequelize, DataTypes);
  var loader_platform = _loader_platform(sequelize, DataTypes);
  var loader_variables = _loader_variables(sequelize, DataTypes);
  var pagc_gaz = _pagc_gaz(sequelize, DataTypes);
  var pagc_lex = _pagc_lex(sequelize, DataTypes);
  var pagc_rules = _pagc_rules(sequelize, DataTypes);
  var place = _place(sequelize, DataTypes);
  var place_lookup = _place_lookup(sequelize, DataTypes);
  var secondary_unit_lookup = _secondary_unit_lookup(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var state_lookup = _state_lookup(sequelize, DataTypes);
  var street_type_lookup = _street_type_lookup(sequelize, DataTypes);
  var tabblock = _tabblock(sequelize, DataTypes);
  var topology = _topology(sequelize, DataTypes);
  var tract = _tract(sequelize, DataTypes);
  var zcta5 = _zcta5(sequelize, DataTypes);
  var zip_lookup = _zip_lookup(sequelize, DataTypes);
  var zip_lookup_all = _zip_lookup_all(sequelize, DataTypes);
  var zip_lookup_base = _zip_lookup_base(sequelize, DataTypes);
  var zip_state = _zip_state(sequelize, DataTypes);
  var zip_state_loc = _zip_state_loc(sequelize, DataTypes);

  Permissions.belongsToMany(Roles, { as: 'roleID_Roles', through: RolePermissions, foreignKey: "permissionID", otherKey: "roleID" });
  Roles.belongsToMany(Permissions, { as: 'permissionID_Permissions', through: RolePermissions, foreignKey: "roleID", otherKey: "permissionID" });
  Measurements.belongsTo(Activities, { as: "activity", foreignKey: "activityID"});
  Activities.hasMany(Measurements, { as: "Measurements", foreignKey: "activityID"});
  PlannedActivities.belongsTo(Activities, { as: "activity", foreignKey: "activityID"});
  Activities.hasMany(PlannedActivities, { as: "PlannedActivities", foreignKey: "activityID"});
  Activities.belongsTo(ActivityTemplates, { as: "activityTemplate", foreignKey: "activityTemplateID"});
  ActivityTemplates.hasMany(Activities, { as: "Activities", foreignKey: "activityTemplateID"});
  PlannedActivities.belongsTo(ActivityTemplates, { as: "activityTemplate", foreignKey: "activityTemplateID"});
  ActivityTemplates.hasMany(PlannedActivities, { as: "PlannedActivities", foreignKey: "activityTemplateID"});
  Questionnaires.belongsTo(ActivityTemplates, { as: "activityTemplate", foreignKey: "activityTemplateID"});
  ActivityTemplates.hasMany(Questionnaires, { as: "Questionnaires", foreignKey: "activityTemplateID"});
  Activities.belongsTo(Devices, { as: "deviceInformation", foreignKey: "deviceInformationID"});
  Devices.hasMany(Activities, { as: "Activities", foreignKey: "deviceInformationID"});
  Projects.belongsTo(Organizations, { as: "organization", foreignKey: "organizationID"});
  Organizations.hasMany(Projects, { as: "Projects", foreignKey: "organizationID"});
  Roles.belongsTo(Organizations, { as: "organization", foreignKey: "organizationID"});
  Organizations.hasMany(Roles, { as: "Roles", foreignKey: "organizationID"});
  RolePermissions.belongsTo(Permissions, { as: "permission", foreignKey: "permissionID"});
  Permissions.hasMany(RolePermissions, { as: "RolePermissions", foreignKey: "permissionID"});
  Activities.belongsTo(Plots, { as: "plot", foreignKey: "plotID"});
  Plots.hasMany(Activities, { as: "Activities", foreignKey: "plotID"});
  PlannedActivities.belongsTo(Plots, { as: "plot", foreignKey: "plotID"});
  Plots.hasMany(PlannedActivities, { as: "PlannedActivities", foreignKey: "plotID"});
  PlotProjects.belongsTo(Plots, { as: "plot", foreignKey: "plotID"});
  Plots.hasMany(PlotProjects, { as: "PlotProjects", foreignKey: "plotID"});
  PlotProjects.belongsTo(Projects, { as: "project", foreignKey: "projectID"});
  Projects.hasMany(PlotProjects, { as: "PlotProjects", foreignKey: "projectID"});
  UserProjects.belongsTo(Projects, { as: "project", foreignKey: "projectID"});
  Projects.hasMany(UserProjects, { as: "UserProjects", foreignKey: "projectID"});
  RolePermissions.belongsTo(Roles, { as: "role", foreignKey: "roleID"});
  Roles.hasMany(RolePermissions, { as: "RolePermissions", foreignKey: "roleID"});
  UserProjects.belongsTo(Roles, { as: "role", foreignKey: "roleID"});
  Roles.hasMany(UserProjects, { as: "UserProjects", foreignKey: "roleID"});
  Permissions.belongsTo(TModules, { as: "module", foreignKey: "moduleID"});
  TModules.hasMany(Permissions, { as: "Permissions", foreignKey: "moduleID"});
  Activities.belongsTo(Users, { as: "user", foreignKey: "userID"});
  Users.hasMany(Activities, { as: "Activities", foreignKey: "userID"});
  Devices.belongsTo(Users, { as: "user", foreignKey: "userID"});
  Users.hasMany(Devices, { as: "Devices", foreignKey: "userID"});
  PlannedActivities.belongsTo(Users, { as: "user", foreignKey: "userID"});
  Users.hasMany(PlannedActivities, { as: "PlannedActivities", foreignKey: "userID"});
  Plots.belongsTo(Users, { as: "owner", foreignKey: "ownerID"});
  Users.hasMany(Plots, { as: "Plots", foreignKey: "ownerID"});
  TreeSpecies.belongsTo(Users, { as: "modifiedBy", foreignKey: "modifiedById"});
  Users.hasMany(TreeSpecies, { as: "TreeSpecies", foreignKey: "modifiedById"});
  UserProjects.belongsTo(Users, { as: "user", foreignKey: "userID"});
  Users.hasMany(UserProjects, { as: "UserProjects", foreignKey: "userID"});
  layer.belongsTo(topology, { as: "topology", foreignKey: "topology_id"});
  topology.hasMany(layer, { as: "layers", foreignKey: "topology_id"});

  return {
    Activities,
    ActivityTemplates,
    Devices,
    Logs,
    Measurements,
    Organizations,
    Permissions,
    PlannedActivities,
    PlotProjects,
    Plots,
    Projects,
    Questionnaires,
    RolePermissions,
    Roles,
    TModules,
    TreeSpecies,
    UserProjects,
    Users,
    addr,
    addrfeat,
    bg,
    county,
    county_lookup,
    countysub_lookup,
    cousub,
    direction_lookup,
    edges,
    faces,
    featnames,
    geocode_settings,
    geocode_settings_default,
    layer,
    loader_lookuptables,
    loader_platform,
    loader_variables,
    pagc_gaz,
    pagc_lex,
    pagc_rules,
    place,
    place_lookup,
    secondary_unit_lookup,
    state,
    state_lookup,
    street_type_lookup,
    tabblock,
    topology,
    tract,
    zcta5,
    zip_lookup,
    zip_lookup_all,
    zip_lookup_base,
    zip_state,
    zip_state_loc,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
