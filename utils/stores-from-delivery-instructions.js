// How to retrieve Delivery Instructions
// 1. Go To: https://next.fugamusic.com/api/docs/#/
// 2. Click on login, fill: `{"name":"florian.saurwein","password":"123456"}` 
//    as body and and hit "Try it out", 200 should be the response code 
// 3. Find an arbitrary product id from that account (same login as above), 
//    either through "GET /products" or in the FUGA dashboard (e.g. "4732909650" from  "https://next.fugamusic.com/product/4732909650")
// 4. click "GET /products/{id}/delivery_instructions", fill in "id" (=product id) and hi "Try it out"
// 5. the "Response body" is filled in below and this script is ran




const responseBody = {
    "delivery_instructions": [
      {
        "contractId": 4682054750,
        "dsp": {
          "name": "Zing MP3",
          "id": 3597720676,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669725,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054747,
        "dsp": {
          "name": "YouTube Music & Content ID",
          "id": 3405271817,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669706,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "PROCESSING"
          }
        ],
        "state": "PROCESSING",
        "action": "DELIVER",
        "actions": [
          "takedown"
        ],
        "delivery_capabilities": [
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054689,
        "dsp": {
          "name": "Yandex Music",
          "id": 1209287754,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669677,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054687,
        "dsp": {
          "name": "United Media Agency (UMA)",
          "id": 1210987244,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669651,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "PRE_ORDER_ONLY",
            "name": "PreOrder Only"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054688,
        "dsp": {
          "name": "Triller",
          "id": 3373969336,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669624,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054686,
        "dsp": {
          "name": "TouchTunes / PlayNetwork",
          "id": 1130831671,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669599,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054684,
        "dsp": {
          "name": "TIM Music",
          "id": 1207204780,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669563,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "PROCESSING"
          }
        ],
        "state": "PROCESSING",
        "action": "DELIVER",
        "actions": [
          "takedown"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054685,
        "dsp": {
          "name": "TikTok",
          "id": 1809226414,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669544,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054619,
        "dsp": {
          "name": "TIDAL",
          "id": 3440259,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669522,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054618,
        "dsp": {
          "name": "Tencent",
          "id": 1461025062,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669493,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "LYRICS",
            "name": "Allow sending lyrics as part of a DDEX delivery"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054617,
        "dsp": {
          "name": "Spotify",
          "id": 746109,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669467,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "ARTIST_IDENTIFIER",
            "name": "Supports artist identifiers"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054616,
        "dsp": {
          "name": "SoundCloud",
          "id": 35299696,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669444,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "ARTIST_IDENTIFIER",
            "name": "Supports artist identifiers"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054615,
        "dsp": {
          "name": "Slacker",
          "id": 16149060,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669415,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054579,
        "dsp": {
          "name": "Shazam",
          "id": 4266325,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669386,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054573,
        "dsp": {
          "name": "Resso",
          "id": 1963181516,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669358,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054572,
        "dsp": {
          "name": "Qobuz",
          "id": 9940949,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669328,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "USER_GENERATED_VIDEO",
            "name": "Usage rights: Allow user generated video"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "USER_GENERATED_AUDIO",
            "name": "Usage rights: Allow user generated audio"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "BURN_CD",
            "name": "Usage right: Allow cd burning"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "PRE_ORDER_ONLY",
            "name": "PreOrder Only"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054581,
        "dsp": {
          "name": "Pretzel Rocks",
          "id": 2406442214,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669282,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054571,
        "dsp": {
          "name": "Peloton",
          "id": 2528780514,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669210,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054580,
        "dsp": {
          "name": "Pandora",
          "id": 7851192,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669133,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054523,
        "dsp": {
          "name": "Nuuday A/S",
          "id": 464139,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669096,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054521,
        "dsp": {
          "name": "NetEase Cloud Music",
          "id": 1382854531,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669049,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054514,
        "dsp": {
          "name": "Napster",
          "id": 103731,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024669008,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054515,
        "dsp": {
          "name": "Muska",
          "id": 3730648038,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668979,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054614,
        "dsp": {
          "name": "Music in 'Ayoba'",
          "id": 78395129,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668954,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054467,
        "dsp": {
          "name": "MonkingMe",
          "id": 3287973537,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668932,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054464,
        "dsp": {
          "name": "MePlaylist",
          "id": 3357532813,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668906,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054458,
        "dsp": {
          "name": "LINE Music",
          "id": 1232212955,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668883,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054457,
        "dsp": {
          "name": "Kuack Media",
          "id": 1226212715,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668859,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "PRE_ORDER_ONLY",
            "name": "PreOrder Only"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054456,
        "dsp": {
          "name": "KkBox",
          "id": 121452605,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668841,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054454,
        "dsp": {
          "name": "Joox",
          "id": 1517454273,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668818,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "PROCESSING"
          }
        ],
        "state": "PROCESSING",
        "action": "DELIVER",
        "actions": [
          "takedown"
        ],
        "delivery_capabilities": [
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054401,
        "dsp": {
          "name": "JioSaavn",
          "id": 316911752,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668803,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054392,
        "dsp": {
          "name": "Jaxsta Music",
          "id": 1186352005,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668782,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "LYRICS",
            "name": "Allow sending lyrics as part of a DDEX delivery"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054404,
        "dsp": {
          "name": "iMusica",
          "id": 103725,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668757,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054403,
        "dsp": {
          "name": "iHeartRadio",
          "id": 3441649,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668727,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054402,
        "dsp": {
          "name": "Hungama",
          "id": 1268816855,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668696,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054390,
        "dsp": {
          "name": "Gracenote",
          "id": 9538495,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668639,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054330,
        "dsp": {
          "name": "Genie Music",
          "id": 2697871022,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668595,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "USER_GENERATED_RINGTONE",
            "name": "Usage rights: Allow user generated ringtone"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054325,
        "dsp": {
          "name": "fizy",
          "id": 1988507361,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668549,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054326,
        "dsp": {
          "name": "Facebook Fingerprinting",
          "id": 1415672002,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668522,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "PROCESSING"
          }
        ],
        "state": "PROCESSING",
        "action": "DELIVER",
        "actions": [
          "takedown"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054328,
        "dsp": {
          "name": "Facebook Audio Library",
          "id": 1499657856,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668495,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "PROCESSING"
          }
        ],
        "state": "PROCESSING",
        "action": "DELIVER",
        "actions": [
          "takedown"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054324,
        "dsp": {
          "name": "Dreamus Company (FLO)",
          "id": 2215088010,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668474,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054327,
        "dsp": {
          "name": "Deezer",
          "id": 2100357,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668443,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054272,
        "dsp": {
          "name": "Boomplay",
          "id": 1514168496,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668422,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054269,
        "dsp": {
          "name": "Bmat",
          "id": 1158892521,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668392,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054271,
        "dsp": {
          "name": "AWA",
          "id": 847103579,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668344,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054268,
        "dsp": {
          "name": "Anghami",
          "id": 20799134,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668317,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "LYRICS",
            "name": "Allow sending lyrics as part of a DDEX delivery"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054266,
        "dsp": {
          "name": "Ami Entertainment",
          "id": 104465305,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668299,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682107424,
        "dsp": {
          "name": "Amazon",
          "id": 99268,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668277,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "REQUIRE_CP_DPID",
            "name": "Require DPID"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "AD_SUPPORTED_STREAMING",
            "name": "Usage rights: Allow ad supported streaming"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "PRIME_ON_DEMAND_STREAMING",
            "name": "Usage rights: Allow prime on demand streaming"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682107420,
        "dsp": {
          "name": "7Digital",
          "id": 247916,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [
          {
            "id": 5024668252,
            "user": {
              "id": 4724601594,
              "name": "simonmueller"
            },
            "action": "DELIVER",
            "state": "DELIVERED"
          }
        ],
        "state": "DELIVERED",
        "action": "DELIVER",
        "actions": [
          "edit",
          "takedown",
          "redeliver"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054270,
        "dsp": {
          "name": "Apple Music",
          "id": 1330598,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [],
        "state": "NOT_ADDED",
        "action": null,
        "actions": [
          "edit",
          "block"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "ASSET_LEVEL_RELEASE_DATES",
            "name": "Asset level release dates"
          },
          {
            "id": "LABEL_IDENTIFIERS",
            "name": "Supports label identifiers"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "INSTANT_GRATIFICATION",
            "name": "Instant gratification"
          },
          {
            "id": "METADATA_LOCALIZATION",
            "name": "Supports metadata localizations"
          },
          {
            "id": "ARTIST_IDENTIFIER",
            "name": "Supports artist identifiers"
          },
          {
            "id": "TRACK_TERRITORIES",
            "name": "Track Territories"
          },
          {
            "id": "LYRICS",
            "name": "Allow sending lyrics as part of a DDEX delivery"
          },
          {
            "id": "BOOKLET_ATTACHMENTS",
            "name": "Only booklet Attachments"
          },
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "PRE_ORDER_ONLY",
            "name": "PreOrder Only"
          },
          {
            "id": "ATTACHMENTS",
            "name": "All attachment types"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4781018494,
        "dsp": {
          "name": "Beatport",
          "id": 89882,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [],
        "state": "NOT_ADDED",
        "action": null,
        "actions": [
          "edit",
          "block"
        ],
        "delivery_capabilities": [
          {
            "id": "PERMANENT_DOWNLOAD",
            "name": "Usage rights: Allow permanent download"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      },
      {
        "contractId": 4682054516,
        "dsp": {
          "name": "Music Worx",
          "id": 2624834449,
          "is_iip_dds": true,
          "is_ssf_dds": false
        },
        "lead_date": "2022-01-31T00:00:00",
        "lead_time": "IMMEDIATELY",
        "release_date": "2022-01-31T00:00:00",
        "release_time": null,
        "enable_asset_release_dates": true,
        "enable_asset_territories": true,
        "instruction_list": [],
        "state": "NOT_ADDED",
        "action": null,
        "actions": [
          "edit",
          "block"
        ],
        "delivery_capabilities": [
          {
            "id": "TERRITORY_BASED_RELEASE_DATES",
            "name": "Territory based release dates"
          },
          {
            "id": "SUBSCRIPTION_DOWNLOAD",
            "name": "Usage rights: Allow subscription download"
          },
          {
            "id": "GLOBAL_RELEASE_TIME",
            "name": "Time of day for global release date"
          },
          {
            "id": "MIXED_MEDIA",
            "name": "Deliver both video and audio tracks"
          },
          {
            "id": "SUBSCRIPTION_STREAMING",
            "name": "Usage rights: Allow subscription streaming"
          },
          {
            "id": "PRE_ORDER",
            "name": "PreOrder"
          }
        ],
        "exclude_territories": [],
        "include_territories": []
      }
    ],
    "exclusive": false
  }


const deliveryInstructions = responseBody.delivery_instructions;
const dspNames = deliveryInstructions.map(d=>d.dsp.name);
console.log(dspNames)