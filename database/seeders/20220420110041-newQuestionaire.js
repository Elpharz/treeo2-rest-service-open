'use strict';

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Questionnaires', [
      {
        projectID: 7,
        type: 'pre_questionnaire',
        configuration: `
      {
        "title": {
          "en": "Land form",
          "in": "Tanah form",
          "lg": "Fomuyebikwaata kutaaka lyo"
        },
        "pages": [
          {
            "pageType": "checkbox",
            "questionCode": "land_use_now",
            "header": {
              "en": "What do you use the land for now?",
              "in": "Untuk apa Anda menggunakan tanah itu sekarang?",
              "lg":"Etaaka lyo Olikolamuki kkati?"
            },
            "description": {
              "en": "choose one or more relevant options",
              "in": "pilih satu atau lebih opsi yang relevan",
              "lg": "Londako kimu oba bingi ebwo’mugaso"
            },
            "options": [
              {
                "title": {
                  "en": "Nothing for now",
                  "in": "Tidak makak",
                  "lg": "Tewali kati,  Etaaka si kozese."
                },
                "code": "nothing"
              },
              {
                "title": {
                  "en": "Foodcrops, vegetable, fruits",
                  "in": "Tanaman pangan, sayur, buah-buahan",
                  "lg":"Emeele nga greens, Bibaala ne bilala"
                },
                "code": "crops"
              },
              {
                "title": {
                  "en": "Farmland for livestock grazing",
                  "in": "Lahan pertanian untuk penggembalaan ternak",
                  "lg": "Faamu/Disizo lye bisolo"
                },
                "code": "livestock"
              },
              {
                "title": {
                  "en": "There are trees growing",
                  "in": "Ada pohon yang tumbuh",
                  "lg": "Mulimu Emitii Egikula"
                },
                "code": "trees"
              }
            ]
          },
          {
            "pageType": "checkbox",
            "questionCode": "land_terrain",
            "header": {
              "en": "How is the land terrain?",
              "in": "Bagaimana medan daratnya?",
              "lg": "Etaaka lyo lyakuula ki?"
            },
            "description": {
              "en": "choose one or more relevant options",
              "in": "pilih satu atau lebih opsi yang relevan",
              "lg": "Londako ekimu oba ebingi ebikugasa"
            },
            "options": [
              {
                "title": {
                  "en": "Flat land",
                  "in": "Tanah Datar",
                  "lg": "Lyabulijjo"
                },
                "code": "flat_land"
              },
              {
                "title": {
                  "en": "Hilly land",
                  "in": "Tanah berbukit",
                  "lg": "Lyakasozi"
                },
                "code": "hilly_land"
              },
              {
                "title": {
                  "en": "Land in the mountains",
                  "in": "Mendarat di pegunungan",
                  "lg": "Lilimunsozi"
                },
                "code": "mountains"
              },
              {
                "title": {
                  "en": "Wetlands, swamps, lowlands",
                  "in": "Lahan basah, rawa, dataran rendah",
                  "lg": "Ntobaaze oba kumpii netobaze"
                },
                "code": "wetlands"
              }
            ]
          },
          {
            "pageType": "radio",
            "questionCode": "land_owner",
            "header": {
              "en": "Who is the land owner?",
              "in": "Siapakah pemilik tanah?",
              "lg": "Anni nyini taaka?"
            },
            "description": {
              "en": "Choose one of the options below",
              "in": "Pilih salah satu opsi di bawah ini",
              "lg": "Londako ekimu wano emmanga"
            },
            "options": [
              {
                "title": {
                  "en": "My land",
                  "in": "Tanah ku",
                  "lg": "Taaka lyange"
                },
                "code": "own_land"
              },
              {
                "title": {
                  "en": "Family land",
                  "in": "Tanah keluarga",
                  "lg": "Lya famiile"
                },
                "code": "family_land"
              },
              {
                "title": {
                  "en": "Communal land",
                  "in": "Tanah komunal",
                  "lg": "Lyabulyomu kukyalo"
                },
                "code": "communal_land"
              },
              {
                "title": {
                  "en": "Government land",
                  "in": "Tanah pemerintah",
                  "lg": "Lya govumenti"
                },
                "code": "goverment_land"
              },
              {
                "title": {
                  "en": "I don't know/Other",
                  "in": "Saya tidak tahu / Lainnya",
                  "lg": "Siyiina taaka"
                },
                "code": "unknown"
              }
            ]
          }
        ]
      }
      `,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        activityTemplateID: 7,
      },

      {
        projectID: 7,
        type: 'post_questionnaire',
        configuration: `
      {
        "title":{
           "en":"Fertilizer form",
           "in":"Bentuk pupuk",
           "lg": "Fertilizer form"
        },
        "pages":[
           {
              "pageType":"checkbox",
              "questionCode":"fertilizer_use",
              "header":{
                 "en":"Have you ever used fertilizer on your land?",
                 "in":"Apakah Anda pernah menggunakan pupuk di lahan Anda?",
                 "lg":"Wali okozesezako ebijimusa mu taaka lyo?"
              },
              "description":{
                 "en":"choose one or more relevant options",
                 "in":"pilih satu atau lebih opsi yang relevan",
                 "lg": "Londako kimu oba bingi ebwo’mugaso"
              },
              "options":[
                 {
                    "title":{
                       "en":"No I have not",
                       "in":"Tidak saya tidak punya",
                       "lg": "Nedda, sinaba"
                    },
                    "code":"fertilizer_use_negative"
                 },
                 {
                    "title":{
                       "en":"Yes, I have",
                       "in":"Ya saya punya",
                       "lg":"Yee"
                    },
                    "code":"fertilizer_use_positive"
                 }
              ]
           }
        ]
     }
      `,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        activityTemplateID: 8,
      },

      {
        projectID: 7,
        type: 'post_questionnaire',
        configuration: `
      {
        "title":{
           "en":"Fertilizer form",
           "in":"Bentuk pupuk",
           "lg": "Fertilizer form"
        },
        "pages":[
           {
              "pageType":"checkbox",
              "questionCode":"fertilizer_use",
              "header":{
                 "en":"Have you ever used fertilizer on your land?",
                 "in":"Apakah Anda pernah menggunakan pupuk di lahan Anda?",
                 "lg":"Wali okozesezako ebijimusa mu taaka lyo?"
              },
              "description":{
                 "en":"choose one or more relevant options",
                 "in":"pilih satu atau lebih opsi yang relevan",
                 "lg": "Londako kimu oba bingi ebwo’mugaso"
              },
              "options":[
                 {
                    "title":{
                       "en":"No I have not",
                       "in":"Tidak saya tidak punya",
                       "lg": "Nedda, sinaba"
                    },
                    "code":"fertilizer_use_negative"
                 },
                 {
                    "title":{
                       "en":"Yes, I have",
                       "in":"Ya saya punya",
                       "lg":"Yee"
                    },
                    "code":"fertilizer_use_positive"
                 }
              ]
           }
        ]
     }
      `,
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        activityTemplateID: 9,
      },
    ]);
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Questionnaires', null, {});
  },
};
