import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {}

  /**
   * Modal para ser usado em toda a aplicação
   * @param id Identificador do modal
   * @param customContent Componente ou dados para renderizar dentro do modal
   * @param title Título para o cabeçalho do modal
   * @param isHandleClose Ativa/Desativa o botão de fechar no cabeçalho
   * @param disableClose Impede o fechamento ao clicar fora do modal
   * @param data Dados adicionais a serem passados para o modal
   * @param customClassContainer Classe CSS extra para personalizar o container
   * @param enableFullscreen Habilita o botão de tela cheia no modal
   * @returns Referência do modal aberto
   */
  public openModal<T>(
    id?: string,
    customContent?: T,
    title: string = '',
    isHandleClose: boolean = false,
    disableClose: boolean = true,
    data?: {
      [key: string]: any;
    },
    customClassContainer?: string | string[],
    enableFullscreen: boolean = false,
  ) {
    const isMobile = window.innerWidth <= 768;

    const defaultConfig: MatDialogConfig = {
      minWidth: isMobile ? '95vw' : '50dvw',
      maxWidth: isMobile ? '95vw' : '50dvw',
      role: 'dialog',
      autoFocus: false,
      disableClose: disableClose,
      panelClass: customClassContainer || 'modal',
    };

    return this.dialog.open<ModalComponent>(ModalComponent, {
      ...defaultConfig,
      data: {
        id,
        customContent,
        title,
        isHandleClose,
        enableFullscreen,
        ...(data || {}),
      },
    });
  }
}
