import { Component, OnInit } from '@angular/core';
import * as assetsActions from '../store/assets.actions';
import {GetAllAssets} from '../store/assets.actions';
import {Observable} from 'rxjs/Observable';
import {getAllAssets} from '../store/assets.reducer';
import {DataSource} from '@angular/cdk/collections';
import {select, Store} from '@ngrx/store';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-assets',
  templateUrl: './view-assets.component.html',
  styleUrls: ['./view-assets.component.css']
})
export class ViewAssetsComponent implements OnInit {
 assets=[];
 dataSource;
  displayedColumns = ['assetName', 'category', 'item', 'organizationName', 'action'];
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new GetAllAssets());
    this.store.select(getAllAssets).subscribe(assets=>{
          console.log("The assets List");
          console.log(assets);
          this.assets=assets;
      this.dataSource = new MatTableDataSource<any>(assets);

    });


  }
  onEditAsset(asset){
    console.log("From Asset.....");
  }
  onDeleteAsset(id){
    console.log("From Asset.....");
    console.log(id);
    this.store.dispatch(new assetsActions.RemoveAsset(id));
  }

}
