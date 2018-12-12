import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { GitRepoInfo } from './git-repo-info';

@Injectable({
  providedIn: 'root'
})
export class GithubService {   
    baseUrl = "https://k2five.strategycopilot.com/Api/Workflow/Preview/tasks";
    users = null;
    data: any;
    constructor(private httpClient: HttpClient) {
    }

    getUserRepos() {
        //let headers = new HttpHeaders({
        //    'Content-Type': 'application/json',
        //    'Authorization': btoa("Administrador:password")
        //});
        //let headers = new HttpHeaders()
        //    .set("Authorization", "Basic QWRtaWlzdHJhZG9yOlNlcnZpZG9yMjAxOCEh");
        let params = "json=myjson";

        //Establecemos cabeceras
        let headers = new HttpHeaders().set('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("Administrador" + ':' + "Servidor2018!!"))));
        //this.httpClient.get('https://api.github.com/users/Luiggi13/repos', params, { headers: headers }).
        //    pipe(
        //        map((item: any) => item.map(p => <GitRepoInfo>
        //            {
        //                name: p.name,
        //                stars: p.stargazers_count,
        //                htmlUrl: p.html_url,
        //                forks: p.forks,
        //                description: p.description
        //            })));            
    
        return this.httpClient.get('https://reqres.in/api/users/2')
            .subscribe(
            result => {
                
                    console.log(result);
                },
                err => {
                    console.log("Error- something is wrong!")
                });
        
       
    }
}
