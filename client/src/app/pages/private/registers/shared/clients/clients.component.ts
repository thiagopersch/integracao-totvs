import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmService } from 'app/components/confirm/confirm.service';
import { LoadingService } from 'app/components/loading/loading.service';
import { ModalService } from 'app/components/modal/modal.service';
import {
  ActionsProps,
  TableComponent,
} from 'app/components/table/table.component';
import { ToastService } from 'app/components/toast/toast.service';
import { Clients } from 'app/types/Clients';
import { MESSAGES } from 'app/types/messages';
import { NotFoundRegisterComponent } from '../../../../../components/not-found-register/not-found-register.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  imports: [TableComponent, NotFoundRegisterComponent],
})
export class ClientsComponent implements OnInit {
  clients: Clients[] = [];
  dataSourceMat = new MatTableDataSource<Clients>(this.clients);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnDefinitions = [
    { key: 'status', header: 'Situação', type: 'boolean' },
    { key: 'name', header: 'Nome', type: 'string' },
    { key: 'crm_domain', header: 'CRM', type: 'string' },
    { key: 'updated_at', header: 'Atualizado em', type: 'date' },
  ];
  actions: ActionsProps[] = [
    {
      type: 'edit',
      label: 'Editar',
      icon: 'edit',
      tooltip: 'Editar',
      action: (client: Clients) => this.handleUpdate(client),
    },
    {
      label: 'Excluir',
      icon: 'delete',
      tooltip: 'Excluir',
      type: 'delete',
      action: (client: Clients) => this.handleDelete(client),
    },
  ];
  constructor(
    private clientService: ClientsService,
    private snackService: ToastService,
    private modal: ModalService,
    private confirmDelete: ConfirmService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit() {
    this.loadClients();
  }
  loadClients() {
    this.loadingService.show();
    this.clientService.findAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.dataSourceMat.data = this.clients;
        this.dataSourceMat.paginator = this.paginator;
        this.dataSourceMat.sort = this.sort;
      },
      error: () => {
        this.loadingService.hide();
        this.snackService.openError(MESSAGES.LOADING_ERROR);
      },
      complete: () => this.loadingService.hide(),
    });
  }
  handleCreate = () => {
    const dialogRef = this.modal.openModal(
      `modal-${Math.random()}`,
      ClientFormComponent,
      'Adicionando cliente',
      true,
      true,
      {},
    );

    dialogRef.afterClosed().subscribe((client: Clients) => {
      if (client) {
        this.loadClients();
      }
    });
  };

  handleUpdate = (client: Clients) => {
    const dialogRef = this.modal.openModal(
      `modal-${Math.random()}`,
      ClientFormComponent,
      'Editar cliente',
      true,
      true,
      { client },
    );

    dialogRef.afterClosed().subscribe((client: Clients) => {
      if (client) {
        this.loadClients();
      }
    });
  };

  handleDelete = (client: Clients) => {
    this.confirmDelete
      .openConfirm(
        'Atenção',
        'Deseja realmente excluir esse cliente?',
        'Excluir',
        'Cancelar',
      )
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.clientService.delete(client).subscribe({
            next: () => this.snackService.openSuccess(MESSAGES.DELETE_SUCCESS),
            error: () => this.snackService.openError(MESSAGES.DELETE_ERROR),
            complete: () => {
              this.loadClients();
              this.loadingService.hide();
            },
          });
        }
      });
  };

  toggleStatus(client: Clients) {
    const updatedStatus = !client.status;
    client.status = updatedStatus;

    this.clientService.updateStatus(client.id, updatedStatus).subscribe({
      next: () => {
        this.snackService.openSuccess(
          `Cliente ${updatedStatus ? 'ativado' : 'desativado'} com sucesso!`,
        );
        this.loadClients();
      },
      error: () => {
        this.snackService.openError('Erro ao atualizar o status do cliente.');
        client.status = !updatedStatus;
      },
    });
  }
}
