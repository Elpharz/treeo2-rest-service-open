'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Questionnaires', [
      {
        projectID: null,
        type: 'pre_questionnaire',
        configuration: `
        {
          "title": {
            "en": "Land registration",
            "in": "Tanah form",
            "lg": "Okuwandisa ekibanjja kyo"
          },
          "pages": [{
              "pageType": "text_short",
              "questionCode": "farmer_name",
              "mandatory": "false",
              "header": {
                "en": "Name of farmer",
                "in": "Nama petani",
                "lg": "Elinya lyomulimi"
              },
              "description": {
                "en": "What is the name of farmer?",
                "in": "Apa nama petani?",
                "lg": "Omulimi bamuyiita anni?"
              },
              "options": null
            },
            {
              "pageType": "text_short",
              "questionCode": "farmer_age",
              "mandatory": "false",
              "header": {
                "en": "Age of farmer",
                "in": "Usia petani",
                "lg": "Emyaaka gyomulimi"
              },
              "description": {
                "en": "How old is the farmer?",
                "in": "Berapa umur petani?",
                "lg": "Omulimi ayiina emyaaka emeeka?"
              },
              "options": null
            },
            {
              "pageType": "radio",
              "questionCode": "farmer_gender",
              "mandatory": "true",
              "header": {
                "en": "Gender",
                "in": "Jenis kelamin",
                "lg": "Ekikula kyo"
              },
              "description": {
                "en": "What is your gender?",
                "in": "Apa jenis kelaminmu?",
                "lg": "Olimukazi oba musajja?"
              },
              "options": [{
                  "title": {
                    "en": "Male",
                    "in": "Pria",
                    "lg": "Musajja/Mwami"
                  },
                  "code": "male"
                },
                {
                  "title": {
                    "en": "Female",
                    "in": "Perempuan",
                    "lg": "Mukazi/Mukyala"
                  },
                  "code": "female"
                }
              ]
            },
            {
              "pageType": "text_short",
              "questionCode": "seedlings_received",
              "mandatory": "false",
              "header": {
                "en": "Number of seedlings recieved",
                "in": "Jumlah bibit yang diterima",
                "lg": "Enamba zendokwa zotutte"
              },
              "description": {
                "en": "How many trees you got from nursery?",
                "in": "Berapa banyak pohon yang diperoleh dari pembibitan?",
                "lg": "Wafuna endokwa meeka okuva munasare?"
              },
              "options": null
            },
            {
              "pageType": "checkbox",
              "questionCode": "tree_species",
              "header": {
                "en": "Tree species",
                "in": "Spesies pohon",
                "lg": "Ebika byemiiti"
              },
              "description": {
                "en": "What tree species you planted?",
                "in": "Jenis pohon apa yang Anda tanam?",
                "lg": "Wasiimba biika ki ebyemiiti?"
              },
              "options": [{
                  "title": {
                    "en": "Musizi",
                    "in": "Musizi",
                    "lg": "Musizi"
                  },
                  "code": "musizi"
                },
                {
                  "title": {
                    "en": "Grivellea",
                    "in": "Grivellea",
                    "lg": "Grivellea"
                  },
                  "code": "grivellea"
                },
                {
                  "title": {
                    "en": "Mahagany",
                    "in": "Mahagany",
                    "lg": "Mahagany"
                  },
                  "code": "mahagany"
                },
                {
                  "title": {
                    "en": "Terminalia",
                    "in": "Terminalia",
                    "lg": "Terminalia"
                  },
                  "code": "terminalia"
                },
                {
                  "title": {
                    "en": "Others",
                    "in": "Yang lain",
                    "lg": "Siyiina taaka"
                  },
                  "code": "others"
                },
                {
                  "title": {
                    "en": "I don't know",
                    "in": "saya tidak tahu",
                    "lg": "Siyiina taaka"
                  },
                  "code": "dont_know"
                }
              ]
            },
            {
              "pageType": "checkbox",
              "questionCode": "planting_years",
              "header": {
                "en": "Year of planting",
                "in": "Tahun tanam",
                "lg": "Omwaka gwewasimbilamu"
              },
              "description": {
                "en": "When did you planted trees?",
                "in": "Kapan Anda menanam pohon?",
                "lg": "Emiiti wajisimba ddi?"
              },
              "options": [{
                  "title": {
                    "en": "2019",
                    "in": "2019",
                    "lg": "2019"
                  },
                  "code": "2019"
                },
                {
                  "title": {
                    "en": "2020",
                    "in": "2020",
                    "lg": "2020"
                  },
                  "code": "2020"
                },
                {
                  "title": {
                    "en": "2021",
                    "in": "2021",
                    "lg": "2021"
                  },
                  "code": "2021"
                },
                {
                  "title": {
                    "en": "I don't know",
                    "in": "Saya tidak tahu",
                    "lg": "Siyiina taaka"
                  },
                  "code": "dont_know"
                }
              ]
            },
            {
              "pageType": "checkbox",
              "questionCode": "planting_pattern",
              "header": {
                "en": "Type of planting",
                "in": "Jenis penanaman",
                "lg": "Nsiimba ki gyewakozesa?"
              },
              "description": {
                "en": "How did you planted trees?",
                "in": "Bagaimana Anda menanam pohon?",
                "lg": "Emiiti wajisimba otya?"
              },
              "options": [{
                  "title": {
                    "en": "Scattered planting",
                    "in": "Penanaman tersebar",
                    "lg": "Scattered planting"
                  },
                  "code": "scattered"
                },
                {
                  "title": {
                    "en": "Boudary planting",
                    "in": "Penanaman batas",
                    "lg": "Boudary planting"
                  },
                  "code": "boundary"
                },
                {
                  "title": {
                    "en": "Woodlot",
                    "in": "Woodlot",
                    "lg": "Woodlot"
                  },
                  "code": "woodlot"
                },
                {
                  "title": {
                    "en": "Line planting",
                    "in": "Penanaman garis",
                    "lg": "Line planting"
                  },
                  "code": "line"
                },
                {
                  "title": {
                    "en": "I don't know",
                    "in": "Saya tidak tahu",
                    "lg": "Siyiina taaka"
                  },
                  "code": "dont_know"
                }
              ]
            },
            {
              "pageType": "text_short",
              "questionCode": "planting_spacing",
              "mandatory": "false",
              "header": {
                "en": "Spacing used on planting",
                "in": "Jarak tanam yang digunakan",
                "lg": "Amabanga gokozesa ngosiimba emiiti"
              },
              "description": {
                "en": "What spacing have you used when planting trees? (E.g. 2x2 m)",
                "in": "Berapa jarak tanam yang Anda gunakan saat menanam pohon? (Misalnya. 2x2 m)",
                "lg": "Mabanga ki gewakozesa okusimba emiiti? (E.g. 2x2 m)"
              },
              "options": null
            },
            {
              "pageType": "text_long",
              "questionCode": "crops",
              "mandatory": "false",
              "header": {
                "en": "Crops",
                "in": "Tanaman-tanaman",
                "lg": "Crops"
              },
              "description": {
                "en": "Have you planted any other crops with trees?",
                "in": "Apakah Anda menanam tanaman lain dengan pohon?",
                "lg": "Oyiina ebimela ebilala byosimbye wamu ne emiiti?"
              },
              "options": null
            },
            {
              "pageType": "text_short",
              "questionCode": "surviving_trees",
              "mandatory": "false",
              "header": {
                "en": "Number of surviving trees",
                "in": "Jumlah pohon yang masih hidup",
                "lg": "Enamba ye miiti emilamu"
              },
              "description": {
                "en": "How many trees are surviving currently?",
                "in": "Berapa banyak pohon yang masih hidup saat ini?",
                "lg": "Emiiti egiwangadewo/Emilamu kati giri'emeeka?"
              },
              "options": null
            },

            {
              "pageType": "text_long",
              "questionCode": "comment",
              "mandatory": "false",
              "header": {
                "en": "General comment",
                "in": "Komentar Umum",
                "lg": "Ebilowoozobyo"
              },
              "description": {
                "en": "Comments or feedback to Fairventures team",
                "in": "Komentar atau umpan balik kepada tim Fairventures",
                "lg": "Ebilowoozobyo eli tiimu ya fairventures."
              },
              "options": null
            }
          ]
        }
      `,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        activityTemplateID: 6,
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Questionnaires', null, {});
  },
};
