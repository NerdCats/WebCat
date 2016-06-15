import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppSettings } from '../../shared/app.settings';
// import { LocalStorage } from 'angular2-local-storage/local_storage';


@Injectable()
export class LoginService{

    private loggedIn = false;
    private loginUrl = AppSettings.TASKCAT_BASE + "token";

    constructor(private http:Http){
        this.loggedIn = false;
    }

    login(formValue){
        let headers = new Headers();
        let urlEncodedParam = "grant_type="+ formValue.grant_type +
                            "&username="+ formValue.username +
                            "&password="+ formValue.password +
                            "&client_id=" + formValue.client_id;

        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        console.log(formValue);
        return this.http.post(
                this.loginUrl,
                urlEncodedParam,
                { headers }
            )
            .map(res=>res.json())
                .map((res)=> {
                    console.log(res);
                    if (res) {
                        this.loggedIn = true;
                    }
                    return res;
                }
            )
        }


    printMeh(){
        // console.log(LocalStorage);
    }
}