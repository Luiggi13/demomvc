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
var GithubService = /** @class */ (function () {
    function GithubService(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = "https://k2five.strategycopilot.com/Api/Workflow/Preview/tasks";
        this.users = null;
    }
    GithubService.prototype.getUserRepos = function () {
        //let headers = new HttpHeaders({
        //    'Content-Type': 'application/json',
        //    'Authorization': btoa("Administrador:password")
        //});
        //let headers = new HttpHeaders()
        //    .set("Authorization", "Basic QWRtaWlzdHJhZG9yOlNlcnZpZG9yMjAxOCEh");
        var params = "json=myjson";
        //Establecemos cabeceras
        var headers = new http_1.HttpHeaders().set('Authorization', 'Basic ' + window.btoa(unescape(encodeURIComponent("Administrador" + ':' + "Servidor2018!!"))));
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
            .subscribe(function (result) {
            console.log(result);
        }, function (err) {
            console.log("Error- something is wrong!");
        });
    };
    GithubService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], GithubService);
    return GithubService;
}());
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map