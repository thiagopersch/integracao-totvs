import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-column",
  templateUrl: "./column.component.html",
  styleUrl: "./column.component.scss",
  standalone: true,
  imports: [CommonModule],
})
export class ColumnComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
