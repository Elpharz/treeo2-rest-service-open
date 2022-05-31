export const permissions_map = {
  create_user: 99000,
  list_all_users: 99001,
  list_all_users_organization: 99002,
  update_any_user: 99003,
  update_user_organization: 99004,
  view_any_user: 99005,
  view_user_organization: 99006,
  delete_any_user: 99007,
  delete_user_organization: 99008,
  view_own_profile: 99009,
  invite_user: 99010,
  view_user_info: 99011,
  edit_user_profile: 99012,
  reset_user_password: 99013,
  data_browse_all_activities: 99014,
  plots_browse_unassigned_plots: 99015,
  plots_browse_plots_in_project: 99016,
  update_activity_fields: 99017,
  edit_plot: 99018,
  approve_user_request_on_user_project: 99019,
  update_user_planned_activity: 99020,
  update_tree_species: 99021,
};

export const base_user = {
  base_permissions: [
    permissions_map.view_own_profile,
    permissions_map.edit_user_profile,
  ],
};

export const admin_user = {
  base_permissions: [
    permissions_map.create_user,
    permissions_map.list_all_users,
    permissions_map.list_all_users_organization,
    permissions_map.view_any_user,
    permissions_map.edit_user_profile,
    permissions_map.update_user_organization,
    permissions_map.view_user_info,
    permissions_map.view_user_organization,
    permissions_map.view_own_profile,
    permissions_map.invite_user,
    permissions_map.plots_browse_unassigned_plots,
    permissions_map.reset_user_password,
    permissions_map.plots_browse_plots_in_project,
    permissions_map.update_activity_fields,
    permissions_map.edit_plot,
    permissions_map.approve_user_request_on_user_project,
    permissions_map.update_user_planned_activity,
    permissions_map.update_tree_species,
    permissions_map.data_browse_all_activities,
  ],
};

export const super_admin_user = {
  base_permissions: [...Object.values(permissions_map)],
};

export const permission_names = { base_user, admin_user, super_admin_user };
