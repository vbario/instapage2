var common = {}

common.isoCountries = {
    'Afghanistan': 'AF',
    'Aland Islands': 'AX',
    'Albania': 'AL',
    'Algeria': 'DZ',
    'American Samoa': 'AS',
    'Andorra': 'AD',
    'Angola': 'AO',
    'Anguilla': 'AI',
    'Antarctica': 'AQ',
    'Antigua And Barbuda': 'AG',
    'Argentina': 'AR',
    'Armenia': 'AM',
    'Aruba': 'AW',
    'Australia': 'AU',
    'Austria': 'AT',
    'Azerbaijan': 'AZ',
    'Bahamas': 'BS',
    'Bahrain': 'BH',
    'Bangladesh': 'BD',
    'Barbados': 'BB',
    'Belarus': 'BY',
    'Belgium': 'BE',
    'Belize': 'BZ',
    'Benin': 'BJ',
    'Bermuda': 'BM',
    'Bhutan': 'BT',
    'Bolivia': 'BO',
    'Bosnia And Herzegovina': 'BA',
    'Botswana': 'BW',
    'Bouvet Island': 'BV',
    'Brazil': 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    'Bulgaria': 'BG',
    'Burkina Faso': 'BF',
    'Burundi': 'BI',
    'Cambodia': 'KH',
    'Cameroon': 'CM',
    'Canada': 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    'Chad': 'TD',
    'Chile': 'CL',
    'China': 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    'Colombia': 'CO',
    'Comoros': 'KM',
    'Congo': 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    'Croatia': 'HR',
    'Cuba': 'CU',
    'Cyprus': 'CY',
    'Czech Republic': 'CZ',
    'Denmark': 'DK',
    'Djibouti': 'DJ',
    'Dominica': 'DM',
    'Dominican Republic': 'DO',
    'Ecuador': 'EC',
    'Egypt': 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    'Eritrea': 'ER',
    'Estonia': 'EE',
    'Ethiopia': 'ET',
    'Falkland Islands (Malvinas)': 'FK',
    'Faroe Islands': 'FO',
    'Fiji': 'FJ',
    'Finland': 'FI',
    'France': 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    'Gabon': 'GA',
    'Gambia': 'GM',
    'Georgia': 'GE',
    'Germany': 'DE',
    'Ghana': 'GH',
    'Gibraltar': 'GI',
    'Greece': 'GR',
    'Greenland': 'GL',
    'Grenada': 'GD',
    'Guadeloupe': 'GP',
    'Guam': 'GU',
    'Guatemala': 'GT',
    'Guernsey': 'GG',
    'Guinea': 'GN',
    'Guinea-Bissau': 'GW',
    'Guyana': 'GY',
    'Haiti': 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    'Honduras': 'HN',
    // 'Hong Kong': 'HK',
    'Hong Kong SAR China': 'HK',
    'Hungary': 'HU',
    'Iceland': 'IS',
    'India': 'IN',
    'Indonesia': 'ID',
    'Iran, Islamic Republic Of': 'IR',
    'Iraq': 'IQ',
    'Ireland': 'IE',
    'Isle Of Man': 'IM',
    'Israel': 'IL',
    'Italy': 'IT',
    'Jamaica': 'JM',
    'Japan': 'JP',
    'Jersey': 'JE',
    'Jordan': 'JO',
    'Kazakhstan': 'KZ',
    'Kenya': 'KE',
    'Kiribati': 'KI',
    'Korea': 'KR',
    'Kuwait': 'KW',
    'Kyrgyzstan': 'KG',
    'Lao People\'s Democratic Republic': 'LA',
    'Latvia': 'LV',
    'Lebanon': 'LB',
    'Lesotho': 'LS',
    'Liberia': 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    'Liechtenstein': 'LI',
    'Lithuania': 'LT',
    'Luxembourg': 'LU',
    'Macao': 'MO',
    'Macedonia': 'MK',
    'Madagascar': 'MG',
    'Malawi': 'MW',
    'Malaysia': 'MY',
    'Maldives': 'MV',
    'Mali': 'ML',
    'Malta': 'MT',
    'Marshall Islands': 'MH',
    'Martinique': 'MQ',
    'Mauritania': 'MR',
    'Mauritius': 'MU',
    'Mayotte': 'YT',
    'Mexico': 'MX',
    'Micronesia, Federated States Of': 'FM',
    'Moldova': 'MD',
    'Monaco': 'MC',
    'Mongolia': 'MN',
    'Montenegro': 'ME',
    'Montserrat': 'MS',
    'Morocco': 'MA',
    'Mozambique': 'MZ',
    'Myanmar': 'MM',
    'Namibia': 'NA',
    'Nauru': 'NR',
    'Nepal': 'NP',
    'Netherlands': 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    'Nicaragua': 'NI',
    'Niger': 'NE',
    'Nigeria': 'NG',
    'Niue': 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    'Norway': 'NO',
    'Oman': 'OM',
    'Pakistan': 'PK',
    'Palau': 'PW',
    'Palestinian Territory, Occupied': 'PS',
    'Panama': 'PA',
    'Papua New Guinea': 'PG',
    'Paraguay': 'PY',
    'Peru': 'PE',
    'Philippines': 'PH',
    'Pitcairn': 'PN',
    'Poland': 'PL',
    'Portugal': 'PT',
    'Puerto Rico': 'PR',
    'Qatar': 'QA',
    'Reunion': 'RE',
    'Romania': 'RO',
    'Russian Federation': 'RU',
    'Rwanda': 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    'Samoa': 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    'Senegal': 'SN',
    'Serbia': 'RS',
    'Seychelles': 'SC',
    'Sierra Leone': 'SL',
    'Singapore': 'SG',
    'Slovakia': 'SK',
    'Slovenia': 'SI',
    'Solomon Islands': 'SB',
    'Somalia': 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    'Spain': 'ES',
    'Sri Lanka': 'LK',
    'Sudan': 'SD',
    'Suriname': 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    'Swaziland': 'SZ',
    'Sweden': 'SE',
    'Switzerland': 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan': 'TW',
    'Tajikistan': 'TJ',
    'Tanzania': 'TZ',
    'Thailand': 'TH',
    'Timor-Leste': 'TL',
    'Togo': 'TG',
    'Tokelau': 'TK',
    'Tonga': 'TO',
    'Trinidad And Tobago': 'TT',
    'Tunisia': 'TN',
    'Turkey': 'TR',
    'Turkmenistan': 'TM',
    'Turks And Caicos Islands': 'TC',
    'Tuvalu': 'TV',
    'Uganda': 'UG',
    'Ukraine': 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    'Uruguay': 'UY',
    'Uzbekistan': 'UZ',
    'Vanuatu': 'VU',
    'Venezuela': 'VE',
    'Viet Nam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    'Yemen': 'YE',
    'Zambia': 'ZM',
    'Zimbabwe': 'ZW'
}

common.payoutCountries = [
    'Australia',
    'Austria',
    'Belgium',
    'Bulgaria',
    'Canada',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Gibraltar',
    'Greece',
    'Hong Kong SAR China',
    'Hungary',
    'Ireland',
    'Italy',
    'Japan',
    'Latvia',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Mexico',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Spain',
    'Sweden',
    'Switzerland',
    'Thailand',
    'United Arab Emirates',
    'United Kingdom',
    'United States'
]

common.timezones_ = [
    {'time':' (GMT-12:00)', 'country': "International Date Line West","value":"-12"},
    {'time':' (GMT-11:00)', 'country': "Midway Island, Samoa","value":"-11"},
    {'time':' (GMT-10:00)', 'country': "Hawaii","value":"-10"},
    {'time':' (GMT-09:00)', 'country': "Alaska","value":"-9"},
    {'time':' (GMT-08:00)', 'country': "Pacific Time (US & Canada)","value":"-8"},
    {'time':' (GMT-08:00)', 'country': "Tijuana, Baja California","value":"-8"},
    {'time':' (GMT-07:00)', 'country': "Arizona","value":"-7"},
    {'time':' (GMT-07:00)', 'country': "Chihuahua, La Paz, Mazatlan","value":"-7"},
    {'time':' (GMT-07:00)', 'country': "Mountain Time (US & Canada)","value":"-7"},
    {'time':' (GMT-06:00)', 'country': "Central America","value":"-6"},
    {'time':' (GMT-06:00)', 'country': "Central Time (US & Canada)","value":"-6"},
    {'time':' (GMT-05:00)', 'country': "Bogota, Lima, Quito, Rio Branco","value":"-5"},
    {'time':' (GMT-05:00)', 'country': "Eastern Time (US & Canada)","value":"-5"},
    {'time':' (GMT-05:00)', 'country': "Indiana (East)","value":"-5"},
    {'time':' (GMT-04:00)', 'country': "Atlantic Time (Canada)","value":"-4"},
    {'time':' (GMT-04:00)', 'country': "Caracas, La Paz","value":"-4"},
    {'time':' (GMT-04:00)', 'country': "Manaus","value":"-4"},
    {'time':' (GMT-04:00)', 'country': "Santiago","value":"-4"},
    {'time':' (GMT-03:30)', 'country': "Newfoundland","value":"-3.5"},
    {'time':' (GMT-03:00)', 'country': "Brasilia","value":"-3"},
    {'time':' (GMT-03:00)', 'country': "Buenos Aires, Georgetown","value":"-3"},
    {'time':' (GMT-03:00)', 'country': "Greenland","value":"-3"},
    {'time':' (GMT-03:00)', 'country': "Montevideo","value":"-3"},
    {'time':' (GMT-02:00)', 'country': "Mid-Atlantic","value":"-2"},
    {'time':' (GMT-01:00)', 'country': "Cape Verde Is.","value":"-1"},
    {'time':' (GMT-01:00)', 'country': "Azores","value":"-1"},
    {'time':' (GMT+00:00)', 'country': "Casablanca, Monrovia, Reykjavik","value":"0"},
    {'time':' (GMT+00:00)', 'country': "Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London","value":"0"},
    {'time':' (GMT+01:00)', 'country': "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"1"},
    {'time':' (GMT+01:00)', 'country': "Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"1"},
    {'time':' (GMT+01:00)', 'country': "Brussels, Copenhagen, Madrid, Paris","value":"1"},
    {'time':' (GMT+01:00)', 'country': "Sarajevo, Skopje, Warsaw, Zagreb","value":"1"},
    {'time':' (GMT+01:00)', 'country': "West Central Africa","value":"1"},
    {'time':' (GMT+02:00)', 'country': "Amman","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Athens, Bucharest, Istanbul","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Beirut","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Cairo","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Harare, Pretoria","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Jerusalem","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Minsk","value":"2"},
    {'time':' (GMT+02:00)', 'country': "Windhoek","value":"2"},
    {'time':' (GMT+03:00)', 'country': "Kuwait, Riyadh, Baghdad","value":"3"},
    {'time':' (GMT+03:00)', 'country': "Moscow, St. Petersburg, Volgograd","value":"3"},
    {'time':' (GMT+03:00)', 'country': "Nairobi","value":"3"},
    {'time':' (GMT+03:00)', 'country': "Tbilisi","value":"3"},
    {'time':' (GMT+03:30)', 'country': "Tehran","value":"3.5"},
    {'time':' (GMT+04:00)', 'country': "Abu Dhabi, Muscat","value":"4"},
    {'time':' (GMT+04:00)', 'country': "Baku","value":"4"},
    {'time':' (GMT+04:00)', 'country': "Yerevan","value":"4"},
    {'time':' (GMT+04:30)', 'country': "Kabul","value":"4.5"},
    {'time':' (GMT+05:00)', 'country': "Yekaterinburg","value":"5"},
    {'time':' (GMT+05:00)', 'country': "Islamabad, Karachi, Tashkent","value":"5"},
    {'time':' (GMT+05:30)', 'country': "Sri Jayawardenapura","value":"5.5"},
    {'time':' (GMT+05:30)', 'country': "Chennai, Kolkata, Mumbai, New Delhi","value":"5.5"},
    {'time':' (GMT+05:45)', 'country': "Kathmandu","value":"5.75"},
    {'time':' (GMT+06:00)', 'country': "Almaty, Novosibirsk","value":"6"},{"label":"(GMT+06:00) Astana, Dhaka","value":"6"},
    {'time':' (GMT+06:30)', 'country': "Yangon (Rangoon)","value":"6.5"},
    {'time':' (GMT+07:00)', 'country': "Bangkok, Hanoi, Jakarta","value":"7"},
    {'time':' (GMT+07:00)', 'country': "Krasnoyarsk","value":"7"},
    {'time':' (GMT+08:00)', 'country': "Beijing, Chongqing, Hong Kong, Urumqi","value":"8"},
    {'time':' (GMT+08:00)', 'country': "Kuala Lumpur, Singapore","value":"8"},
    {'time':' (GMT+08:00)', 'country': "Irkutsk, Ulaan Bataar","value":"8"},
    {'time':' (GMT+08:00)', 'country': "Perth","value":"8"},
    {'time':' (GMT+08:00)', 'country': "Taipei","value":"8"},
    {'time':' (GMT+09:00)', 'country': "Osaka, Sapporo, Tokyo","value":"9"},
    {'time':' (GMT+09:00)', 'country': "Seoul","value":"9"},
    {'time':' (GMT+09:00)', 'country': "Yakutsk","value":"9"},
    {'time':' (GMT+09:30)', 'country': "Adelaide","value":"9.5"},
    {'time':' (GMT+09:30)', 'country': "Darwin","value":"9.5"},
    {'time':' (GMT+10:00)', 'country': "Brisbane","value":"10"},
    {'time':' (GMT+10:00)', 'country': "Canberra, Melbourne, Sydney","value":"10"},
    {'time':' (GMT+10:00)', 'country': "Hobart","value":"10"},
    {'time':' (GMT+10:00)', 'country': "Guam, Port Moresby","value":"10"},
    {'time':' (GMT+10:00)', 'country': "Vladivostok","value":"10"},
    {'time':' (GMT+11:00)', 'country': "Magadan, Solomon Is., New Caledonia","value":"11"},
    {'time':' (GMT+12:00)', 'country': "Auckland, Wellington","value":"12"},
    {'time':' (GMT+12:00)', 'country': "Fiji, Kamchatka, Marshall Is.","value":"12"},
    {'time':' (GMT+13:00)', 'country': "Nuku'alofa","value":"13"}
]

common.timezones = [
    {"label":"(GMT-12:00) International Date Line West","value":"-12"},
    {"label":"(GMT-11:00) Midway Island, Samoa","value":"-11"},
    {"label":"(GMT-10:00) Hawaii","value":"-10"},
    {"label":"(GMT-09:00) Alaska","value":"-9"},
    {"label":"(GMT-08:00) Pacific Time (US & Canada)","value":"-8"},
    {"label":"(GMT-08:00) Tijuana, Baja California","value":"-8"},
    {"label":"(GMT-07:00) Arizona","value":"-7"},
    {"label":"(GMT-07:00) Chihuahua, La Paz, Mazatlan","value":"-7"},
    {"label":"(GMT-07:00) Mountain Time (US & Canada)","value":"-7"},
    {"label":"(GMT-06:00) Central America","value":"-6"},
    {"label":"(GMT-06:00) Central Time (US & Canada)","value":"-6"},
    {"label":"(GMT-05:00) Bogota, Lima, Quito, Rio Branco","value":"-5"},
    {"label":"(GMT-05:00) Eastern Time (US & Canada)","value":"-5"},
    {"label":"(GMT-05:00) Indiana (East)","value":"-5"},
    {"label":"(GMT-04:00) Atlantic Time (Canada)","value":"-4"},
    {"label":"(GMT-04:00) Caracas, La Paz","value":"-4"},
    {"label":"(GMT-04:00) Manaus","value":"-4"},
    {"label":"(GMT-04:00) Santiago","value":"-4"},
    {"label":"(GMT-03:30) Newfoundland","value":"-3.5"},
    {"label":"(GMT-03:00) Brasilia","value":"-3"},
    {"label":"(GMT-03:00) Buenos Aires, Georgetown","value":"-3"},
    {"label":"(GMT-03:00) Greenland","value":"-3"},
    {"label":"(GMT-03:00) Montevideo","value":"-3"},
    {"label":"(GMT-02:00) Mid-Atlantic","value":"-2"},
    {"label":"(GMT-01:00) Cape Verde Is.","value":"-1"},
    {"label":"(GMT-01:00) Azores","value":"-1"},
    {"label":"(GMT+00:00) Casablanca, Monrovia, Reykjavik","value":"0"},
    {"label":"(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London","value":"0"},
    {"label":"(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","value":"1"},
    {"label":"(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","value":"1"},
    {"label":"(GMT+01:00) Brussels, Copenhagen, Madrid, Paris","value":"1"},
    {"label":"(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb","value":"1"},
    {"label":"(GMT+01:00) West Central Africa","value":"1"},
    {"label":"(GMT+02:00) Amman","value":"2"},
    {"label":"(GMT+02:00) Athens, Bucharest, Istanbul","value":"2"},
    {"label":"(GMT+02:00) Beirut","value":"2"},
    {"label":"(GMT+02:00) Cairo","value":"2"},
    {"label":"(GMT+02:00) Harare, Pretoria","value":"2"},
    {"label":"(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","value":"2"},
    {"label":"(GMT+02:00) Jerusalem","value":"2"},
    {"label":"(GMT+02:00) Minsk","value":"2"},
    {"label":"(GMT+02:00) Windhoek","value":"2"},
    {"label":"(GMT+03:00) Kuwait, Riyadh, Baghdad","value":"3"},
    {"label":"(GMT+03:00) Moscow, St. Petersburg, Volgograd","value":"3"},
    {"label":"(GMT+03:00) Nairobi","value":"3"},
    {"label":"(GMT+03:00) Tbilisi","value":"3"},
    {"label":"(GMT+03:30) Tehran","value":"3.5"},
    {"label":"(GMT+04:00) Abu Dhabi, Muscat","value":"4"},
    {"label":"(GMT+04:00) Baku","value":"4"},
    {"label":"(GMT+04:00) Yerevan","value":"4"},
    {"label":"(GMT+04:30) Kabul","value":"4.5"},
    {"label":"(GMT+05:00) Yekaterinburg","value":"5"},
    {"label":"(GMT+05:00) Islamabad, Karachi, Tashkent","value":"5"},
    {"label":"(GMT+05:30) Sri Jayawardenapura","value":"5.5"},
    {"label":"(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi","value":"5.5"},
    {"label":"(GMT+05:45) Kathmandu","value":"5.75"},
    {"label":"(GMT+06:00) Almaty, Novosibirsk","value":"6"},{"label":"(GMT+06:00) Astana, Dhaka","value":"6"},
    {"label":"(GMT+06:30) Yangon (Rangoon)","value":"6.5"},
    {"label":"(GMT+07:00) Bangkok, Hanoi, Jakarta","value":"7"},
    {"label":"(GMT+07:00) Krasnoyarsk","value":"7"},
    {"label":"(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi","value":"8"},
    {"label":"(GMT+08:00) Kuala Lumpur, Singapore","value":"8"},
    {"label":"(GMT+08:00) Irkutsk, Ulaan Bataar","value":"8"},
    {"label":"(GMT+08:00) Perth","value":"8"},
    {"label":"(GMT+08:00) Taipei","value":"8"},
    {"label":"(GMT+09:00) Osaka, Sapporo, Tokyo","value":"9"},
    {"label":"(GMT+09:00) Seoul","value":"9"},
    {"label":"(GMT+09:00) Yakutsk","value":"9"},
    {"label":"(GMT+09:30) Adelaide","value":"9.5"},
    {"label":"(GMT+09:30) Darwin","value":"9.5"},
    {"label":"(GMT+10:00) Brisbane","value":"10"},
    {"label":"(GMT+10:00) Canberra, Melbourne, Sydney","value":"10"},
    {"label":"(GMT+10:00) Hobart","value":"10"},
    {"label":"(GMT+10:00) Guam, Port Moresby","value":"10"},
    {"label":"(GMT+10:00) Vladivostok","value":"10"},
    {"label":"(GMT+11:00) Magadan, Solomon Is., New Caledonia","value":"11"},
    {"label":"(GMT+12:00) Auckland, Wellington","value":"12"},
    {"label":"(GMT+12:00) Fiji, Kamchatka, Marshall Is.","value":"12"},
    {"label":"(GMT+13:00) Nuku'alofa","value":"13"}
]

common.getCountryName = function (countryCode) {
    if (common.isoCountries[countryCode]) {
        return common.isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

common.timeAgo = function (date) {
    let now = new Date();
    var dt = new Date(date);

    let diff = now.getTime() - dt.getTime()

    let seconds = Math.floor(diff/1000)
    let minutes = Math.round(seconds/60)
    let hours = Math.round(minutes/60)
    let days = Math.round(hours/24)

    if (days) {
        return days + ' days ago'
    } else if (hours) {
        return hours + ' hours ago'
    } else if (minutes) {
        return minutes + ' minutes ago'
    } else {
        return seconds + ' seconds ago'
    }

    // return `${
    //     (dt.getMonth()+1).toString().padStart(2, '0')}/${
    //     dt.getDate().toString().padStart(2, '0')}/${
    //     dt.getFullYear().toString().padStart(4, '0')} ${
    //     dt.getHours().toString().padStart(2, '0')}:${
    //     dt.getMinutes().toString().padStart(2, '0')}:${
    //     dt.getSeconds().toString().padStart(2, '0')}`
    
}

common.formatDate = function (date) {
    var dt = new Date(date);

    return `${
        (dt.getMonth()+1).toString().padStart(2, '0')}/${
        dt.getDate().toString().padStart(2, '0')}/${
        dt.getFullYear().toString().padStart(4, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`
    
}

common.formatDate2 = function (date) {
    var dt = new Date(date);


    let month = function (m) {
      switch (m) {
        case 0:
        return 'January'
          break;
        case 1:
        return 'February'
          break;
        case 2:
        return 'March'
          break;
        case 3:
        return 'April'
          break;
        case 4:
        return 'May'
          break;
        case 5:
        return 'June'
          break;
        case 6:
        return 'July'
          break;
        case 7:
        return 'August'
          break;
        case 8:
        return 'September'
          break;
        case 9:
        return 'October'
          break;
        case 10:
        return 'November'
          break;
        case 11:
        return 'December'
          break;
        default:
          return '';
      }
    }

    return `${month(dt.getMonth())} ${
        dt.getDate().toString().padStart(2, '0')}, ${
        dt.getFullYear().toString().padStart(4, '0')}`
    
}

common.formatDateTimeOnly = function (date) {
    var dt = new Date(date);

    return `${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`
    
}

common.msToTime = function(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " sec";
  else if (minutes < 60) return minutes + " min";
  else if (hours < 24) return hours + " hrs";
  else return days + " days"
}

common.msToHMS = function(ms) {
    // 1- Convert to seconds:
    let seconds = ms / 1000;
    // 2- Extract hours:
    let hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    let minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    seconds = seconds.toFixed(0)

    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    return(hours+":"+minutes+":"+seconds);
}


export default common