import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HiddenParamsService {
  private param:any = null;
  constructor() {}

  setParam(param: any){
    this.param = param;
  }

  getParam(): any{
    return this.param;
  }

}
