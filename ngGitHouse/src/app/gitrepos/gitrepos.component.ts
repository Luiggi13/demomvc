import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GithubService } from '../github.service';

@Component({
    selector: 'app-gitrepos',
    templateUrl: './gitrepos.component.html',
    styleUrls: ['./gitrepos.component.css']
})
export class GitreposComponent implements OnInit {

    users: any;
    public gitRepoList;
    constructor(private githubserv: GithubService, private httpClient: HttpClient) { }

    ngOnInit() {
        //this.loadGithubRepos();
        this.users = [];
        this.tt();
    }

    public loadGithubRepos() {
        this.githubserv.getUserRepos();
    }
    tt() {
       return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe(data => {
            this.users = data;
            console.log('añadido a la variable users -> ' + this.users);
        });    }
}
