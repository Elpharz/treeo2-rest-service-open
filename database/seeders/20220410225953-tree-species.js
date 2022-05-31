'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert(
      'TreeSpecies',
      [
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 20,
          code: "anthocephalus_cadamba",
          latinName: "Anthocephalus cadamba",
          matureAge: "8 - 5",
          trivialName: '{"en": "White Jabonid","id": "Jabon Putih"}',
          description: '{"en": "Grows best on moist sites, often in secondary forests along riverbanks and in the transitional zone between swampy, permanently flooded and periodically flooded areas. Sensitive to weedcompetition, frost, drought, water logging.", "id": "Tumbuh paling baik di tempat lembab, sering kali di hutan sekunder di sepanjang tepi sungai dan di zona transisi antara daerah rawa, banjir permanen, dan daerah banjir berkala. Peka terhadap kompetisi gulma, embun beku, kekeringan, genangan air."}',
          benefits:'{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est lorem", "id": "Viverra suspendisse potenti nullam ac tortor vitae. Lacus vel facilisis volutpat est velit egestas."}',
          iconURL: faker.image.cats(),
          picturesURL: [faker.image.cats(), "https://example.com"],
          terrestialRegions: ["Banda Sea Islands moist deciduous forests Central Range montane rain forests"],
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 20,
          code: "falcataria_moluccana",
          latinName: "Falcataria moluccana",
          matureAge: "9 - 12",
          trivialName: '{"en": "Sengon","id": "Sengon"}',
          description: '{"en": "Pioneer species in secondary lowland rainforest and in light montane forest, grassy plains. Light demanding, nitrogen fixing tree species that can grow on poor sites and with only moderate water supply. Sensitive to fire, shade, strong winds, water logged soils, longer periods of draught.", "id": "Spesies pionir di hutan hujan dataran rendah sekunder dan di hutan pegunungan ringan, dataran berumput. Spesies pohon pengikat nitrogen yang membutuhkan cahaya yang dapat tumbuh di lokasi yang buruk dan hanya dengan pasokan air sedang. Peka terhadap api, naungan, angin kencang, tanah yang tergenang air, periode kekeringan yang lebih lama."}',
          benefits:'{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est lorem", "id": "Viverra suspendisse potenti nullam ac tortor vitae. Lacus vel facilisis volutpat est velit egestas."}',
          iconURL: "https://example.com",
          terrestialRegions: ["Lord Howe Island subtropical forests"],
          agbBiomassFormula: "Biomass=0.0069*((DBH)^2.565)",
          agbCo2Formula:"CO2=Biomass*0.47*3363623",
          picturesURL: [faker.image.cats(), "https://example.com"],
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
        {
          isActive: true,
          version: 0.1,
          matureDbhCm: 20,
          code: "acacia_mangium",
          latinName: "Acacia mangium",
          matureAge: null,
          trivialName: '{"en": "Brown Salwood","id": "Acacia"}',
          description: '{"en": "Grows behind mangroves in seasonal swamps, along streams and on well drained flats, low ridges and mountain foothills. Light demanding, nitrogen fixing tree species that can grow on dry or partially waterlogged poor sites. Sensitive to shade.", "id": "Tumbuh di belakang hutan bakau di rawa-rawa musiman, di sepanjang sungai dan di dataran yang berdrainase baik, punggung bukit rendah, dan kaki gunung. Spesies pohon pengikat nitrogen yang membutuhkan cahaya yang dapat tumbuh di lokasi yang kering atau sebagian tergenang air. Sensitif terhadap bayangan."}',
          benefits:'{"en": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget est lorem", "id": "Viverra suspendisse potenti nullam ac tortor vitae. Lacus vel facilisis volutpat est velit egestas."}',
          iconURL: "https://example.com",
          terrestialRegions: [""],
          agbBiomassFormula: "Biomass=(-0.727)+(1.131*(log((DBH))))",
          agbCo2Formula:null,
          picturesURL: [faker.image.cats(), "https://example.com"],
          modifiedById: 2,
          createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
          updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('TreeSpecies', null, {});
  }
};
