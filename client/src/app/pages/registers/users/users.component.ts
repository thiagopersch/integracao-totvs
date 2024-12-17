import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmService } from 'app/components/confirm/confirm.service';
import { LoadingService } from 'app/components/loading/loading.service';
import { ModalService } from 'app/components/modal/modal.service';
import { NotFoundComponent } from 'app/components/not-found/not-found.component';
import { TableComponent } from 'app/components/table/table.component';
import { MESSAGES } from 'app/components/toast/messages';
import { ToastService } from 'app/components/toast/toast.service';
import { Users } from 'app/model/Users';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: true,
  imports: [TableComponent, NotFoundComponent, CommonModule],
})
export class UsersComponent implements OnInit {
  users: Users[] = [];
  dataSource = new MatTableDataSource<Users>(this.users);
  columnDefinitions = [
    { key: 'status', header: 'Situação', type: 'boolean' },
    { key: 'name', header: 'Nome', type: 'string' },
    { key: 'email', header: 'E-mail', type: 'string' },
    {
      key: 'change_password',
      header: 'Trocar senha no próximo login?',
      type: 'boolean',
    },
    { key: 'updated_at', header: 'Atualizado em', type: 'date' },
  ];
  constructor(
    private modal: ModalService,
    private confirmService: ConfirmService,
    private loading: LoadingService,
    private toast: ToastService,
    private usersService: UsersService,
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  showLoading() {
    this.loading.show();
  }

  hideLoading() {
    this.loading.hide();
  }

  loadUsers() {
    this.showLoading();
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.dataSource.data = [...this.users];
        this.toast.openSuccess(MESSAGES.LOADING_SUCCESS);
      },
      error: () => {
        this.hideLoading();
        this.toast.openError(MESSAGES.LOADING_ERROR);
      },
      complete: () => this.hideLoading(),
    });
  }

  addNewUser = () => {
    const dialogRef = this.modal.openModal(
      `modal-${Math.random()}`,
      UserFormComponent,
      'Adicionar novo usuário',
      true,
      true,
      {},
      '',
      true,
    );

    dialogRef.afterClosed().subscribe((user: Users) => {
      if (user) {
        this.users.push(user);
        this.dataSource.data = [...this.users];
        this.loadUsers();
        this.toast.openSuccess(MESSAGES.CREATE_SUCCESS);
      }
    });
  };

  editUser = (user: Users) => {
    const dialogRef = this.modal.openModal(
      `modal-${Math.random()}`,
      UserFormComponent,
      `Editando o Usuário: ${user.name}`,
      true,
      true,
      { user },
      '',
      true,
    );

    dialogRef.afterClosed().subscribe((user: Users) => {
      if (user) {
        const index = this.users.findIndex((u) => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
          this.dataSource.data = [...this.users];
          this.loadUsers();
          this.toast.openSuccess(MESSAGES.UPDATE_SUCCESS);
        }
      }
    });
  };

  deleteUser = (user: Users) => {
    const confirm = this.confirmService.openConfirm(
      'Exclusão de usuário',
      'Deseja excluir o usuário?',
      'Excluir',
      'Cancelar',
    );

    confirm.afterClosed().subscribe((result) => {
      if (result) {
        this.loading.show();
        this.usersService.deleteUser(user).subscribe({
          next: () => this.toast.openSuccess(MESSAGES.DELETE_SUCCESS),
          error: () => {
            this.loading.hide();
            this.toast.openError(MESSAGES.DELETE_ERROR);
          },
          complete: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.dataSource.data = [...this.users];
            this.toast.openSuccess(MESSAGES.DELETE_SUCCESS);
          },
        });
      }
    });
  };

  toggleStatus = (user: Users) => {
    const updatedStatus = !user.status;
    user.status = updatedStatus;

    this.usersService.updatedStatusUser(user.id, updatedStatus).subscribe({
      next: () => {
        this.toast.openSuccess(
          `Usuário ${updatedStatus ? 'ativado' : 'desativado'} com sucesso!`,
        );
        this.loadUsers();
      },
      error: () =>
        this.toast.openError(`Erro ao atualizar o status do usuário.`),
    });
  };
}
