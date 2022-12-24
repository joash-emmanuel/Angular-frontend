import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component(
    {
        templateUrl: './IndexComponent.html',
        styleUrls: ['./IndexComponent.css']
    }
)
export class IndexComponent  implements OnInit{

    constructor(private router:Router){

    }
    ngOnInit(): void {
        // this.router.navigate(['home'])
    }

}