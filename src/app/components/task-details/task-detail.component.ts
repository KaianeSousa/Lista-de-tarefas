import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class TaskDetailComponent implements AfterViewInit {
  @Input() task: Task | null = null;
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Task>();

  editando: boolean = false;
  taskEditado: Task | null = null;
  dataFimInvalida: boolean = false;
  dataInicioString: string = '';
  dataFimString: string = '';

  ngAfterViewInit(): void {
    if (this.editando) {
      const descricaoInput = document.querySelector(
        '#descricao'
      ) as HTMLTextAreaElement;
      if (descricaoInput) {
        descricaoInput.focus();
      }
      this.updateInputValidity();
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'pendente':
        return 'Pendente';
      case 'em-processo':
        return 'Em andamento';
      case 'finalizada':
        return 'Finalizada';
      default:
        return status;
    }
  }

  closeModal(): void {
    this.cancelarEdicao();
    this.close.emit();
  }

  iniciarEdicao(): void {
    if (this.task) {
      this.taskEditado = {
        ...this.task,
        dataInicio: new Date(this.task.dataInicio),
        dataFim: new Date(this.task.dataFim),
        descricao: this.task.descricao || '',
      };
      this.dataInicioString = this.formatDate(this.taskEditado.dataInicio);
      this.dataFimString = this.formatDate(this.taskEditado.dataFim);
      this.editando = true;
    }
  }

  private parseDateLocal(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  salvarEdicao(): void {
    if (this.taskEditado && this.formValido()) {
      const dataFim = this.parseDateLocal(this.dataFimString);
      const dataInicio = this.parseDateLocal(this.dataInicioString);

      if (isNaN(dataFim.getTime()) || dataFim < dataInicio) {
        this.dataFimInvalida = true;
        this.updateInputValidity();
        return;
      }

      this.dataFimInvalida = false;
      this.taskEditado.dataFim = dataFim;
      this.taskEditado.dataInicio = dataInicio;

      // Emitir a tarefa editada para o componente pai
      this.edit.emit({ ...this.taskEditado });

      this.editando = false;
      this.taskEditado = null;
      this.dataInicioString = '';
      this.dataFimString = '';
    }
  }

  cancelarEdicao(): void {
    this.editando = false;
    this.taskEditado = null;
    this.dataFimInvalida = false;
    this.dataInicioString = '';
    this.dataFimString = '';
    this.updateInputValidity();
  }

  onDataInicioChange(): void {
    this.validarDatas();
  }

  onDataFimChange(): void {
    this.validarDatas();
  }

  private validarDatas(): void {
    if (!this.dataInicioString || !this.dataFimString) {
      this.dataFimInvalida = false;
      return;
    }

    const dataInicio = new Date(this.dataInicioString);
    const dataFim = new Date(this.dataFimString);

    if (isNaN(dataInicio.getTime()) || isNaN(dataFim.getTime())) {
      this.dataFimInvalida = false;
      return;
    }

    this.dataFimInvalida = dataFim < dataInicio;
  }

  private formValido(): boolean {
    if (!this.taskEditado) return false;

    const { titulo, descricao, prioridade } = this.taskEditado;
    const isValid =
      !!titulo.trim() &&
      !!descricao.trim() &&
      !!prioridade &&
      !!this.dataInicioString &&
      !!this.dataFimString;

    const inputs = document.querySelectorAll(
      '.form-group input, .form-group textarea, .form-group select'
    );
    inputs.forEach((input) => {
      const value = (input as HTMLInputElement).value.trim();
      if (!value) {
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    return isValid;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private updateInputValidity(): void {
    const inputs = document.querySelectorAll(
      '.form-group input, .form-group textarea, .form-group select'
    );
    inputs.forEach((input) => {
      const value = (input as HTMLInputElement).value.trim();
      if (value) {
        input.classList.remove('invalid');
      }
    });
  }
}
