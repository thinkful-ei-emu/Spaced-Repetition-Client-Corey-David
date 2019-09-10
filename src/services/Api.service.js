import TokenService from "./token-service";

export default class Api {
  constructor(){
    this.url = 'localhost:8000/api';
  }

  static doFetch(endpoint, method='GET', body=null){
    let url = 'http://localhost:8000/api/';
    let options = {
      method,
      headers: new Headers({'Content-type' : 'application/json'})
    }

    if(body)
      options.body = body;
    console.log(options);
    if(TokenService.hasAuthToken())
      options.headers  = new Headers({Authorization:`bearer ${TokenService.getAuthToken()}`, 'Content-type':'Application/json'});
    return fetch(url + endpoint, options).then(resp=>{
      if(resp.ok){
        return resp.json();
      }
      else
        return resp.json().then(e=>Promise.reject(e));
    })
  }
}