"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var github_service_1 = require("../github.service");
var GitreposComponent = /** @class */ (function () {
    function GitreposComponent(githubserv, httpClient) {
        this.githubserv = githubserv;
        this.httpClient = httpClient;
    }
    GitreposComponent.prototype.ngOnInit = function () {
        //this.loadGithubRepos();
        this.users = [];
        this.tt();
    };
    GitreposComponent.prototype.loadGithubRepos = function () {
        this.githubserv.getUserRepos();
    };
    GitreposComponent.prototype.tt = function () {
        var _this = this;
        return this.httpClient.get('https://jsonplaceholder.typicode.com/posts').subscribe(function (data) {
            _this.users = data;
            console.log('añadido a la variable users -> ' + _this.users);
        });
    };
    GitreposComponent = __decorate([
        core_1.Component({
            selector: 'app-gitrepos',
            templateUrl: './gitrepos.component.html',
            styleUrls: ['./gitrepos.component.css']
        }),
        __metadata("design:paramtypes", [github_service_1.GithubService, http_1.HttpClient])
    ], GitreposComponent);
    return GitreposComponent;
}());
exports.GitreposComponent = GitreposComponent;
//# sourceMappingURL=gitrepos.component.js.map