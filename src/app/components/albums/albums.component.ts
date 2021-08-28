import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/services/api-service.service';
import { UtilityService } from 'src/app/services/utilities/utility.service';
import { WaitingLoaderService } from 'src/app/services/waiting-loader/waiting-loader.service';
import * as CONST from '../../shared/app.constants';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums: Array<any> = [];
  photos: Array<any> = [];
  albumPhotos: Array<any> = [];
  page: number = 1;
  photoPage: number = 1;
  showModal: boolean = false;

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private waitingLoader: WaitingLoaderService,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {
     this.fetchAlbumsAndPhotos();
  }

  /********************************************
   *  Fetch Albums
   *******************************************/
  fetchAlbumsAndPhotos(){
    this.waitingLoader.display(true);
    forkJoin([this.apiService.get(CONST.GET_ALBUMS), this.apiService.get(CONST.GET_PHOTOS)]).subscribe(result=>{
       this.albums = [...result[0]]; // albums result
       this.photos = [...result[1]]; // photos result
       
       // process count
       let temp = this.utility.findOcc(result[1], "albumId");
       this.albums.forEach((obj, i)=>{
           obj.id == temp[i]['albumId']  ? obj['photoCount'] = temp[i]['occurrence'] : obj['photoCount'] = 0;
       })

       console.log("Updated Album >>>> ", this.albums);
       this.waitingLoader.display(false);
    }, err=>{})
  }

  /**********************************************
   * Extract photos from Album
   **********************************************/
  extractPhotosFromAlbum(albumId){
    console.log("Album ID >>> ", albumId);
    this.albumPhotos = this.photos.filter(obj=> obj['albumId'] == albumId);
    console.log("Filtered Photos >>> ", this.albumPhotos);
    this.showModal = true;
  }

  /***************************************************
   * Bootstrap Modal Open event
   ***************************************************/
  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }

}
