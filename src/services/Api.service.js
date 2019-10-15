import TokenService from "./token-service";
import config from '../config'; 

export default class Api {
  

  static doFetch(endpoint, method='GET', body=null){
    let options = {
      method,
      headers: new Headers({'Content-type' : 'application/json'})
    }

    if(body)
      options.body = JSON.stringify(body);
    if(TokenService.hasAuthToken())
      options.headers  = new Headers({Authorization:`bearer ${TokenService.getAuthToken()}`, 'Content-type':'Application/json'});
    return fetch(config.API_ENDPOINT + '/' + endpoint, options).then(resp=>{
      if(resp.ok){
        return resp.json();
      }
      else
        return resp.json().then(e=>Promise.reject(e));
    })
  }
}