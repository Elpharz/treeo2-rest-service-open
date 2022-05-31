const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('loader_lookuptables', {
    process_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1000
    },
    lookup_name: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "This is the table name to inherit from and suffix of resulting output table -- how the table will be named --  edges here would mean -- ma_edges , pa_edges etc. except in the case of national tables. national level tables have no prefix",
      primaryKey: true
    },
    table_name: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "suffix of the tables to load e.g.  edges would load all tables like *edges.dbf(shp)  -- so tl_2010_42129_edges.dbf .  "
    },
    single_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    load: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      comment: "Whether or not to load the table.  For states and zcta5 (you may just want to download states10, zcta510 nationwide file manually) load your own into a single table that inherits from tiger.states, tiger.zcta5.  You'll get improved performance for some geocoding cases."
    },
    level_county: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    level_state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    level_nation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "These are tables that contain all data for the whole US so there is just a single file"
    },
    post_load_process: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    single_geom_mode: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    insert_mode: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "c"
    },
    pre_load_process: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    columns_exclude: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      comment: "List of columns to exclude as an array. This is excluded from both input table and output table and rest of columns remaining are assumed to be in same order in both tables. gid, geoid,cpi,suffix1ce are excluded if no columns are specified."
    },
    website_root_override: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "Path to use for wget instead of that specified in year table.  Needed currently for zcta where they release that only for 2000 and 2010"
    }
  }, {
    sequelize,
    tableName: 'loader_lookuptables',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "loader_lookuptables_pkey",
        unique: true,
        fields: [
          { name: "lookup_name" },
        ]
      },
    ]
  });
};
