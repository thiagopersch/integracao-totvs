import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmService } from 'app/components/confirm/confirm.service';
import { LoadingService } from 'app/components/loading/loading.service';
import { ModalService } from 'app/components/modal/modal.service';
import { ToastService } from 'app/components/toast/toast.service';
import { MESSAGES } from 'app/types/messages';
import { Users } from 'app/types/Users';
import { NotFoundRegisterComponent } from '../../../../../components/not-found-register/not-found-register.component';
import {
  ActionsProps,
  TableComponent,
} from '../../../../../components/table/table.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [TableComponent, NotFoundRegisterComponent],
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  rendering: boolean = true;
  dataSourceMat = new MatTableDataSource<Users>(this.users);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  actions: ActionsProps[] = [
    {
      type: 'toggle',
      tooltip: 'Ativa/Desativa o usuário',
      icon: 'toggle_on',
      activeLabel: 'Ativar',
      inactiveLabel: 'Desativar',
      action: (user: Users) => this.toggleStatus(user),
    },
    {
      type: 'edit',
      tooltip: 'Editar',
      icon: 'edit',
      label: 'Editar',
      action: (user: Users) => this.handleEdit(user),
    },
    {
      type: 'delete',
      tooltip: 'Excluir',
      icon: 'delete',
      label: 'Excluir',
      action: (user: Users) => this.handleDelete(user),
    },
  ];
  columnDefinitions = [
    { key: 'status', header: 'Situação', type: 'boolean' },
    { key: 'name', header: 'Nome', type: 'string' },
    { key: 'email', header: 'Email', type: 'string' },
    { key: 'change_password', header: 'Alterar senha', type: 'boolean' },
    { key: 'updated_at', header: 'Última Atualização', type: 'datetime' },
  ];

  constructor(
    private toast: ToastService,
    private loading: LoadingService,
    private confirmService: ConfirmService,
    private modalService: ModalService,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers = () => {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSourceMat.data = this.users;
        this.dataSourceMat.paginator = this.paginator;
        this.dataSourceMat.sort = this.sort;
        this.rendering = false;
      },
      error: () => {
        this.toast.openError(MESSAGES.LOADING_ERROR);
      },
      complete: () => this.loading.hide(),
    });
  };

  handleCreate = () => {
    const modal = this.modalService.openModal(
      `modal-${Math.random()}`,
      UserFormComponent,
      'Adicionando Usuário',
      true,
      true,
    );

    modal.afterClosed().subscribe((user: Users) => {
      if (user) {
        this.loadUsers();
      }
    });
  };

  handleEdit = (user: Users) => {
    const modal = this.modalService.openModal(
      `modal-${Math.random()}`,
      UserFormComponent,
      `Editando o Usuário ${user.name}`,
      true,
      true,
      { user },
    );

    modal.afterClosed().subscribe((user: Users) => {
      if (user) {
        this.loadUsers();
      }
    });
  };

  handleDelete = (user: Users) => {
    const modal = this.confirmService.openConfirm(
      'Atenção',
      'Deseja realmente excluir o usuário?',
      'Confirmar',
      'Cancelar',
    );
    modal.afterClosed().subscribe((result) => {
      if (result) {
        this.loading.show();
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.toast.openSuccess(MESSAGES.DELETE_SUCCESS);
          },
          error: () => {
            this.toast.openError(MESSAGES.DELETE_ERROR);
          },
          complete: () => {
            this.loadUsers();
            this.loading.hide();
          },
        });
      }
    });
  };

  toggleStatus = (user: Users) => {
    this.loading.show();
    const updatedStatus = !user.status;
    user.status = updatedStatus;

    this.userService.updatedStatus(user.id, updatedStatus).subscribe({
      next: () => {
        this.toast.openSuccess(
          `Usuário ${updatedStatus ? 'ativado' : 'desativado'} com sucesso!`,
        );
      },
      error: () => {
        this.loading.hide();
        this.toast.openError(MESSAGES.UPDATE_ERROR);
      },
      complete: () => {
        this.loadUsers();
        this.loading.hide();
      },
    });
  };
}
