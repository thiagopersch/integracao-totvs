import { Component, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";
import { ImageComponent } from "./image/image.component";

@Component({
  selector: "app-not-found",
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
  standalone: true,
  imports: [MatButtonModule, ImageComponent],
})
export class NotFoundComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(["/"]);
  }

  backToHome() {
    this.router.navigate(["/"]);
  }
}
