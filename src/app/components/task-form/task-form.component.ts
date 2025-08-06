import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

interface TaskForm {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: 'low' | 'medium' | 'high' | 'urgent' | '';
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TaskFormComponent {
  @Output() submitTask = new EventEmitter<{
    title: string;
    description: string;
    priority: 'baixa' | 'media' | 'alta' | 'urgente';
    startDate: Date;
    endDate: Date;
  }>();
  
  @Output() close = new EventEmitter<void>();
  @Input() isOpen = false;

  task: TaskForm = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: '',
  };

  erroTitulo: string | null = null;
  erroDescricao: string | null = null;
  erroData: string | null = null;
  erroPrioridade: string | null = null;

  tituloInvalido = false;
  descricaoInvalida = false;
  dataInvalida = false;
  prioridadeInvalida = false;
  formSubmitted = false;

  constructor(private taskService: TaskService) {}

  private isEmpty(text: string): boolean {
    return text.trim().length === 0;
  }

  onTituloChange(): void {
    if (!this.formSubmitted) return;
    const tituloInput = document.querySelector('#titulo') as HTMLInputElement;
    this.tituloInvalido = this.isEmpty(tituloInput?.value || '');
    this.erroTitulo = this.tituloInvalido ? 'O título é obrigatório.' : null;
    this.toggleInvalidClass(tituloInput, this.tituloInvalido);
  }

  onDescricaoChange(): void {
    if (!this.formSubmitted) return;
    const descricaoInput = document.querySelector('#descricao') as HTMLTextAreaElement;
    this.descricaoInvalida = this.isEmpty(descricaoInput?.value || '');
    this.erroDescricao = this.descricaoInvalida ? 'A descrição é obrigatória.' : null;
    this.toggleInvalidClass(descricaoInput, this.descricaoInvalida);
  }

  onDataChange(): void {
    if (!this.formSubmitted) return;
    
    const startDateInput = document.querySelector('#dataInicio') as HTMLInputElement;
    const endDateInput = document.querySelector('#dataFim') as HTMLInputElement;

    const startDateStr = startDateInput?.value || '';
    const endDateStr = endDateInput?.value || '';

    if (!startDateStr || !endDateStr) {
      this.erroData = 'Ambas as datas são obrigatórias.';
      this.dataInvalida = true;
      this.toggleInvalidClass(startDateInput, !startDateStr);
      this.toggleInvalidClass(endDateInput, !endDateStr);
      return;
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.erroData = 'Datas inválidas.';
      this.dataInvalida = true;
      this.toggleInvalidClass(startDateInput, true);
      this.toggleInvalidClass(endDateInput, true);
      return;
    }

    if (endDate < startDate) {
      this.erroData = 'A data de fim não pode ser anterior à data de início.';
      this.dataInvalida = true;
      this.toggleInvalidClass(endDateInput, true);
    } else {
      this.erroData = null;
      this.dataInvalida = false;
      this.toggleInvalidClass(endDateInput, false);
    }

    this.toggleInvalidClass(startDateInput, false);
  }

  onPrioridadeChange(): void {
    if (!this.formSubmitted) return;
    const prioridadeSelect = document.querySelector('#prioridade') as HTMLSelectElement;
    this.prioridadeInvalida = !prioridadeSelect?.value;
    this.erroPrioridade = this.prioridadeInvalida ? 'Selecione uma prioridade.' : null;
    this.toggleInvalidClass(prioridadeSelect, this.prioridadeInvalida);
  }

  adicionarTarefa(): void {
    this.formSubmitted = true;
    this.onTituloChange();
    this.onDescricaoChange();
    this.onDataChange();
    this.onPrioridadeChange();

    if (!(this.erroTitulo || this.erroDescricao || this.erroData || this.erroPrioridade)) {
      this.submitTask.emit({
        title: this.task.title,
        description: this.task.description,
        priority: this.mapPrioridade(this.task.priority),
        startDate: new Date(this.task.startDate),
        endDate: new Date(this.task.endDate)
      });
      this.limparFormulario();
    }
  }

  cancelar(): void {
    this.close.emit();
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.task = {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: '',
    };
    this.erroTitulo = null;
    this.erroDescricao = null;
    this.erroData = null;
    this.erroPrioridade = null;
    this.tituloInvalido = false;
    this.descricaoInvalida = false;
    this.dataInvalida = false;
    this.prioridadeInvalida = false;
    this.formSubmitted = false;

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => input.classList.remove('invalid'));
  }

  private mapPrioridade(valor: string): 'baixa' | 'media' | 'alta' | 'urgente' {
    const mapa: Record<string, 'baixa' | 'media' | 'alta' | 'urgente'> = {
      low: 'baixa',
      medium: 'media',
      high: 'alta',
      urgent: 'urgente',
    };
    return mapa[valor] ?? 'baixa';
  }

  private toggleInvalidClass(input: HTMLElement, isInvalid: boolean): void {
    if (!input) return;
    if (isInvalid) {
      input.classList.add('invalid');
    } else {
      input.classList.remove('invalid');
    }
  }
}