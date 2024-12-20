import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";

@Component({
  selector: "app-loading",
  templateUrl: "./loading.component.html",
  styleUrl: "./loading.component.scss",
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
})
export class LoadingComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.isLoading();
  }
}
