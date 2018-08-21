import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as maptalks from 'maptalks';
import { Store } from '@ngrx/store';
import { State } from '../store/assets.reducer';
import * as AssetActions from '../store/assets.actions';
import { InfoService } from '../../info.service';
import { AssetsService } from '../../services/assets/assets.service';
import {AddAsset} from '../store/assets.actions';



@Component({
  selector: 'app-create-assets',
  templateUrl: './create-assets.component.html',
  styleUrls: ['./create-assets.component.css']
})
export class CreateAssetsComponent implements OnInit,AfterViewInit {
  assets:FormGroup;
  map;
  searchAddress;
  addressInfo;
  center;
  address;
  displayItems=[];
  categoriesList:any=[];
  // items=[];


  step = 0;
  newOrg = {
    name: '',
    latitude: 0,
    longitude: 0,
    type: '',
    info: '',
    address: {
      city: '',
      country: '',
      postcode: '',
      state: '',
      state_district: ''
    }
  };
  organizationList=[
    {
      id:1,
      name:'Org1'
    },
    {
      id:2,
      name:'Org2'
    },
    {
      id:3,
      name:'Org3'
    }];
    // categories=[
    //   {
    //     id:1,
    //     name:'Category1'
    //   },
    //   {
    //     id:2,
    //     name:'Category2'

    //   },
    //   {
    //     id:3,
    //     name:'Category3'
    //   }
    // ];
    items=[
      {
        id:1,
        name:'subcategory1_1',
        categoryId:1
      },
      {
        id:2,
        name:'subcategory1_2',
        categoryId:1
      },
      {
        id:3,
        name:'subcategory1_3',
        categoryId:1
      },
      {
        id:4,
        name:'subcategory2_1',
        categoryId:2
      },
      {
        id:5,
        name:'subcategory2_2',
        categoryId:2
      },
      {
        id:6,
        name:'subcategory2_3',
        categoryId:2
      },
      {
        id:7,
        name:'subcategory3_1',
        categoryId:3
      },
      {
        id:8,
        name:'subcategory3_2',
        categoryId:3
      },
      {
        id:9,
        name:'subcategory3_3',
        categoryId:3
      },
    ];

    supliersList=[
      {
        id:1,
        name:'Supplier1'
      },
      {
        id:2,
        name:'Supplier2'
      },
      {
        id:3,
        name:'Supplier3'
      }
    ];
  constructor(private store:Store<any>,private service:InfoService,private assetsService:AssetsService) { 
    
  }

  ngOnInit() {
    console.log("From Assets ngOnInIt()....");
        this.createAssetForm();
        this.newOrg.latitude = 78.498;
        this.newOrg.longitude = 17.476;
        this.assetsService.getCategories()
        .subscribe((assetsResponse)=>{
          console.log("From the Assets.....");
          console.log(assetsResponse);
          this.categoriesList=assetsResponse;
          console.log(this.categoriesList);
        });
  }
  onChangeCategory(category){
    console.log(category);
    this.displayItems=category.items;
  }
  createAssetForm(){
    this.assets=new FormGroup({
      // id:new FormControl('1'),
      assetName:new FormControl(),
      category:new FormControl(''),
      item:new FormControl(),
      facility:new FormControl(),
     // supplier:new FormControl(),
      assetType:new FormControl(),
      // name:new FormControl('Sample Assets..'),
      organizationName:new FormControl('Sample Organization Name'),
      cityname:new FormControl(),
      state_district:new FormControl(),
      state:new FormControl(),
      country:new FormControl(),
      postcode:new FormControl()
    });
  }
  ngAfterViewInit(){
    window.navigator.geolocation.getCurrentPosition((location) => {
      this.newOrg.latitude = location.coords.longitude;
      this.newOrg.longitude  = location.coords.latitude;
      this.loadMap();
      }
  );
  }
  loadMap() {
    this.map = new maptalks.Map('map', {
      center: [this.newOrg.latitude, this.newOrg.longitude],
      zoom: 12,
      centerCross: true,
      zoomControl: {
        'position'  : 'top-right'
      },
      baseLayer: new maptalks.TileLayer('base', {
        // urlTemplate: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        // subdomains: ['a', 'b' , 'c' , 'd'],
        // attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
      urlTemplate: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      subdomains: ['a', 'b' , 'c'],
      attribution: '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
    })
    });
    this.map.on('zoomend moveend', () => {
      console.log("Map Moved....");
      this.getStatus();
});
  }
  getStatus() {
    this.addressInfo = '';
    // this.step = 2;
    this.searchAddress = '';
    this.newOrg.address.city = '';
    this.newOrg.address.state = '';
    this.newOrg.address.postcode = '';
    this.newOrg.address.country = '';
    this.newOrg.address.state_district = '';
    this.center = this.map.getCenter();
    this.newOrg.latitude =  parseFloat(this.center.x.toFixed(5));
    this.newOrg.longitude = parseFloat(this.center.y.toFixed(5));
    this.service.getMapLocationDataByLL(this.newOrg.latitude, this.newOrg.longitude).
      subscribe((res) => {
        this.addressInfo = res;
        this.mapValues(this.addressInfo, this.newOrg.address);
      });
  }
  
  mapValues(fromAddress, toAddress) {
    console.log("From the address Details ....");
    console.log(fromAddress);
    this.assets.patchValue({cityname:fromAddress.address.city});
    this.assets.patchValue({state_district:fromAddress.address.state_district});
    this.assets.patchValue({state:fromAddress.address.state});
    this.assets.patchValue({country:fromAddress.address.country});
    this.assets.patchValue({postcode:fromAddress.address.postcode});

      this.searchAddress = fromAddress.display_name;
      // toAddress.city = fromAddress.address.city;
      // toAddress.state = fromAddress.address.state;
      // toAddress.postcode = fromAddress.address.postcode;
      // toAddress.country = fromAddress.address.country;
      // toAddress.state_district = fromAddress.address.state_district;
      // this.step = 2;
  }
    moveMap(addresDetails) {

      this.newOrg.latitude =  parseFloat(addresDetails.lon);
      this.newOrg.longitude = parseFloat(addresDetails.lat);
      this.map.remove();
      this.loadMap();
      this.mapValues(addresDetails, this.newOrg.address);
      this.address = [];
    }
createAsset(){
  console.log("From the create asset button.....");
  console.log(this.assets);
  let payload={
    assetName:this.assets.value.assetName,
    facility:this.assets.value.facility,
    category:{
      id:this.assets.value.category.id,
      categorName:this.assets.value.category.categorName,
    },
    item:{
      id:this.assets.value.item.id,
      itemName:this.assets.value.item.itemName
    },
    organizationName:this.assets.value.organizationName,
    state_district:this.assets.value.state_district,
    state:this.assets.value.state,
    postcode:this.assets.value.postcode

  };
  // payload.category.id=this.assets.value.category.id;

  this.store.dispatch(new AddAsset(payload));
}
searchMapLocationBySearchData() {
  this.service.getMapLocationData(this.searchAddress).subscribe((res) => {
    this.address = res;
  });
}
}
