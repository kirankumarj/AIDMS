export const mockData = {
  orgList : [
    {
      'id' : '0001',
      'name': 'org1',
      'latitude': -0.131049,
      'longitude': 51.498568,
      'info': 'organization1',
      'type': 'Org1'
    },
    {
      'id' : '0002',
      'name': 'HELPPING HANDS',
      'latitude': -0.107049,
      'longitude': 51.498568,
      'info': 'organization2',
      'type': 'Org2'
    },
    {
      'id' : '0003',
      'name': 'TECH',
      'latitude': -0.131049,
      'longitude': 51.490568,
      'info': 'organization3',
      'type': 'Org3'
    },
    {
      'id' : '0004',
      'name': 'OSI',
      'latitude': -0.107049,
      'longitude': 51.490568,
      'info': 'organization4',
      'type': 'Org4'
    }
  ],

  officesList : [
    {
      'id' : '0001',
      'name': 'office',
      'latitude': -0.121049,
      'longitude': 51.498568,
      'info': 'Office_1',
      'type': 'office'
    },
    {
      'id' : '0002',
      'name': 'office',
      'latitude': -0.117049,
      'longitude': 51.498568,
      'info': 'Office_2',
      'type': 'office'
    }
  ],

  incidentsList : [
    {
      'id' : '0001',
      'name': 'Incident1',
      'latitude': -0.12066,
      'longitude': 51.498568,
      'info': 'InfoIncident1',
      'type': 'fire',
      'priority': 'low',
      'status': 'In-Progress'
    },
    {
      'id' : '0002',
      'name': 'Incident2',
      'latitude': -0.14161,
      'longitude': 51.49509,
      'info': 'Floods',
      'type': 'floods',
      'priority': 'High',
      'status': 'open'
    },
    {
      'id' : '0003',
      'name': 'Incident3',
      'latitude': -0.14161,
      'longitude': 51.20509,
      'info': 'InfoIncident3',
      'type': 'accident',
      'priority': 'low',
      'status': 'open'
    },
    {
      'id' : '0004',
      'name': 'Incident4',
      'latitude': -0.14161,
      'longitude': 41.49509,
      'info': 'InfoIncident4',
      'type': 'fire',
      'priority': 'low',
      'status': 'Closed'
    },
    {
      'id' : '0005',
      'name': 'Incident5',
      'latitude': -0.14161,
      'longitude': 51.10509,
      'info': 'earthquake',
      'type': 'earthquake',
      'priority': 'HIgh',
      'status': 'Open'
    },
    {
      'id' : '0006',
      'name': 'Incident6',
      'latitude': -0.13461,
      'longitude': 51.49509,
      'info': 'InfoIncident6',
      'type': 'fire',
      'priority': 'low',
      'status': 'Open'
    },
    {
      'id' : '0007',
      'name': 'Incident7',
      'latitude': -1.14161,
      'longitude': 41.49509,
      'info': 'InfoIncident7',
      'type': 'fire',
      'priority': 'Medium',
      'status': 'Closed'
    },
    {
      'id' : '0008',
      'name': 'Incident8',
      'latitude': -1.24161,
      'longitude': 51.10509,
      'info': 'InfoIncident8',
      'type': 'accident',
      'priority': 'low',
      'status': 'In-Progress'
    },
    {
      'id' : '0009',
      'name': 'Incident9',
      'latitude': -1.25461,
      'longitude': 51.49509,
      'info': 'InfoIncident9',
      'type': 'fire',
      'priority': 'High',
      'status': 'Closed'
    }
  ],

  shelterList : [
    {
      'id' : '0001',
      'name': 'ABC',
      'latitude': -0.131049,
      'longitude': 51.498568,
       'type': 'Permanent',
      'status': 'Open',
      'maxCapacity': '1000',
      'currentOccupancy': '200',
      'contact': 'abc@gmail.com,223444',
      'direction': 'north'
    },
    {
      'id' : '0002',
      'name': 'HELPPING HANDS',
      'latitude': -0.107049,
      'longitude': 51.498568,
      'type': 'Permanent',
      'status': 'Open',
      'maxCapacity': '1000',
      'currentOccupancy': '200',
      'contact': 'abc@gmail.com,223444',
      'direction': 'south'
    },
    {
      'id' : '0003',
      'name': 'TECH',
      'latitude': -0.131049,
      'longitude': 51.490568,
      'type': 'Permanent',
      'status': 'Open',
      'maxCapacity': '1000',
      'currentOccupancy': '200',
      'contact': 'abc@gmail.com,223444',
      'direction': 'north'
    },
    {
      'id' : '0004',
      'name': 'OSI',
      'latitude': -0.107049,
      'longitude': 51.490568,
      'type': 'Permanent',
      'status': 'Open',
      'maxCapacity': '1000',
      'currentOccupancy': '200',
      'contact': 'abc@gmail.com,223444',
      'direction': 'west'
    }
  ],
  resourceList : [
    {
      'id' : '0001',
      'name': 'ABC',
      'latitude': -0.131049,
      'longitude': 51.498568,
      'dept': 'Health',
      'job': 'Manager',
      'email': 'test1@gmail.com',
    },
    {
      'id' : '0002',
      'org': 'Org1',
      'dept': 'Health',
      'job': 'Manager',
      'email': 'test1@gmail.com',
      'name': 'XYZ',
      'latitude': -0.131049,
      'longitude': 51.498568
    }
  ],

  DashboardMapAssets : [
    {
      'id' : '0101',
      'name': 'Yashoda',
      'latitude': -0.12066,
      'longitude': 51.498568,
      'info': 'Yashoda',
      'type': 'hospital'
    },
    {
      'id' : '0102',
      'name': 'Care',
      'latitude': -0.14161,
      'longitude': 51.49509,
      'info': 'Care',
      'type': 'hospital'
    },
    {
      'id' : '0103',
      'name': 'Healing Touch',
      'latitude': -0.14161,
      'longitude': 51.20509,
      'info': 'Healing Touch',
      'type': 'hospital'
    },
    {
      'id' : '0104',
      'name': 'KIMS',
      'latitude': -0.14161,
      'longitude': 41.49509,
      'info': 'KIMS',
      'type': 'hospital'
    },
    {
      'id' : '0105',
      'name': 'Nims',
      'latitude': -0.14161,
      'longitude': 51.10509,
      'info': 'Nims',
      'type': 'hospital'
    },
    {
      'id' : '0301',
      'name': 'airport1',
      'latitude': -0.131049,
      'longitude': 51.498568,
      'info': 'airport1',
      'type': 'airport'
    },
    {
      'id' : '0302',
      'name': 'airport2',
      'latitude': -0.107049,
      'longitude': 51.498568,
      'info': 'airport2',
      'type': 'airport'
    },
    {
      'id' : '0303',
      'name': 'airport3',
      'latitude': -0.131049,
      'longitude': 51.490568,
      'info': 'airport3',
      'type': 'airport'
    },
    {
      'id' : '0201',
      'name': 'FireStation1',
      'latitude': -0.121049,
      'longitude': 51.498568,
      'info': 'FireStation1',
      'type': 'firestation'
    },
    {
      'id' : '0202',
      'name': 'FireStation2',
      'latitude': -0.117049,
      'longitude': 51.498568,
      'info': 'FireStation2',
      'type': 'firestation'
    }
  ],
  fbfeed : [{
    "message" : "Described as one of the worst since 1924 by Chief Minister Pinarayi Vijayan, the rains in Kerala",
    "id" : "122"
    },{
    "message" : "River Jhelum flowing 14 feet above the danger mark",
    "id" : "123"
    },{
    "message" : "Heavy Rainfall in Hyderabad",
    "id" : "124"
    }],

    twfeed : [{
      'message' : '#Nigeria’s disaster agency says 100 people killed in #floods across 10 states',
      'id' : 1221
      },{
      'message' : 'More flooding in Lumberton, North Carolina',
      'id' : 1231
      },{
      'message' : 'Overflowing Nigeria rivers kill 100',
      'id' : 1241
      }]

};
