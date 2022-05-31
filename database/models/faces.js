const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('faces', {
    gid: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tfid: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    statefp00: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp00: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tractce00: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    blkgrpce00: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    blockce00: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    cousubfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    submcdfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    conctyfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    placefp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    aiannhfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    aiannhce00: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    comptyp00: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    trsubfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    trsubce00: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    anrcfp00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    elsdlea00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    scsdlea00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    unsdlea00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    uace00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    cd108fp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sldust00: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    sldlst00: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    vtdst00: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    zcta5ce00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    tazce00: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    ugace00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    puma5ce00: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    statefp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    countyfp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    tractce: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    blkgrpce: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    blockce: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    cousubfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    submcdfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    conctyfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    placefp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    aiannhfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    aiannhce: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    comptyp: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    trsubfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    trsubce: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    anrcfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    ttractce: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    tblkgpce: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    elsdlea: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    scsdlea: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    unsdlea: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    uace: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    cd111fp: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    sldust: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    sldlst: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    vtdst: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    zcta5ce: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    tazce: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    ugace: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    puma5ce: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    csafp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    cbsafp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    metdivfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    cnectafp: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    nectafp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    nctadvfp: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    lwflag: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    offset: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    atotal: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    intptlat: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    intptlon: {
      type: DataTypes.STRING(12),
      allowNull: true
    },
    the_geom: {
      type: DataTypes.GEOMETRY('MULTIPOLYGON', 4269),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'faces',
    schema: 'tiger',
    timestamps: false,
    indexes: [
      {
        name: "faces_pkey",
        unique: true,
        fields: [
          { name: "gid" },
        ]
      },
      {
        name: "idx_tiger_faces_countyfp",
        fields: [
          { name: "countyfp" },
        ]
      },
      {
        name: "idx_tiger_faces_tfid",
        fields: [
          { name: "tfid" },
        ]
      },
      {
        name: "tiger_faces_the_geom_gist",
        fields: [
          { name: "the_geom" },
        ]
      },
    ]
  });
};
