import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map } from "rxjs/operators";

import { Profile } from "../models/Profile";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private pastpapers: Profile[] = [];
  private pastpapers$ = new Subject< Profile []>();
  readonly url = "http://localhost:3000/api/pastpapers";

  constructor(private http: HttpClient) {}

  getPastPapers() {
    this.http
      .get<{ pastpapers: Profile [] }>(this.url)
      .pipe(
        map((pastpaperData) => {
          return pastpaperData.pastpapers;
        })
      )
      .subscribe((pastpapers) => {
        this.pastpapers = pastpapers;
        this.pastpapers$.next(this.pastpapers);
      });
  }

  getPastpaperStream() {
    return this.pastpapers$.asObservable();
  }

  addPastpaper(name: string, pastpaper: Blob): void {
    const pastpaperData = new FormData();
    pastpaperData.append("name", name);
    pastpaperData.append("pastpaper", pastpaper, name);
    this.http
      .post<{ pastpaper: Profile }>(this.url, pastpaperData)
      .subscribe((pastpaperData) => {
        const pastpaper: Profile = {
          _id: pastpaperData.pastpaper._id,
          name: name,
          paperPath: pastpaperData.pastpaper.paperPath
        };
        this.pastpapers.push(pastpaper);
        this.pastpapers$.next(this.pastpapers);
      });

}

private _getUrl = 'http://localhost:3000/api/pastpapers/';



getPapers(){
  return this.http.get<any>(this._getUrl);
}
}
