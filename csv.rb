require 'csv'

places = {
"Cape Range":
  {
    "Bungelup":
    {
      "Neils Beach":{},
      "Rolly Beach":{},
      "Bungelup Beach":{}
    }
  },
"North West Cape":
  {
  "Graveyards":
    {
      "Brooke - Graveyards":{},
      "Five Mile North - Five Mile Carpark":{},
      "Graveyards - Burrows":{},
      "Trisel - Five Mile Carpark":{}
    },
    "Hunters":
    {
      "Hunters - Mauritius":{},
      "Jacobz South - Wobiri":{},
      "Mauritius - Jacobz South":{}
    },
    "Lighthouse Bay":
    {
      "Mildura Wreck - North West Carpark":{},
      "North West Carpark - Surf Beach":{},
      "Surf Beach - Hunters":{}
    },
    "Tandabiddi":
    {
      "Burrows - Jurabi Point":{}
    }
  },
  "Coral Bay":{}
  }
# n=10
# divisions = {}
# CSV.foreach("../../NTP_dummy_data_for_Stacie_Clere-Enoka_07QryNewNestLatLong.csv") do |row|
#   div = row[1]
#   sec = row[2]
#   sub = row[3]
#   unless(divisions.keys.include?(row[1]))
#     divisions[div]={}
#   else
#     unless(divisions[div].keys.include?(sec))
#       divisions[div][sec]={}
#     else
#       unless(divisions[div][sec].keys.include?(sub))
#         divisions[div][sec][sub] = {}
#       end
#     end
#   end

# end
# p divisions
p places