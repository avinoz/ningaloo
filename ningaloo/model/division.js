Divisions = new Mongo.Collection('divisions');
divisions = [
      {
        name:"Cape Range",
        sections:[
          {
            name:"Bungelup",
            subsections:[{
              name:"Bungelup Beach"
            },{
              name:"Neils Beach"
            },{
              name:"Rolly Beach"
            }]
          }
        ]
      },
      {
        name:"Northwest Cape",
        sections:[
          {name:"Graveyards",
          subsections:[
              {name:"Brooke - Graveyards"},
              {name:"Five Mile North - Five Mile Carpark"},
              {name:"Graveyards - Burrows"},
              {name:"Trisel - Five Mile Carpark"}]
          },
          {name:"Hunters",
          subsections:[
              {name:"Hunters - Mauritius"},
              {name:"Jacobz South - Wobiri"},
              {name:"Mauritius - Jacobz South"}]
          },
          {name:"Lighthouse Bay",
          subsections:[
              {name:"Mildura Wreck - North West Carpark"},
              {name:"North West Carpark - Surf Beach"},
              {name:"Surf Beach - Hunters"}]
          },
          {name:"Tandabiddi",
          subsections:[{name:"Burrows - Jurabi Point"}]
          }]
      }
    ]