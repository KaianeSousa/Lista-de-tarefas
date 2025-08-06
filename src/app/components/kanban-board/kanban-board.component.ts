import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { TaskDetailComponent } from '../task-details/task-detail.component';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.css'],
  standalone: true,
  imports: [CommonModule, TaskDetailComponent],
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  tarefasPendentes: Task[] = [];
  tarefasEmProcesso: Task[] = [];
  tarefasFinalizadas: Task[] = [];
  tarefaSelecionada: Task | null = null;
  modalAberto: boolean = false;
  

  private subscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.carregarTarefas();
    this.subscription = this.taskService.getTarefasObservable().subscribe({
      next: () => this.carregarTarefas(),
      error: (err: unknown) => console.error('Erro ao carregar tarefas:', err),
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  carregarTarefas(): void {
    try {
      this.tarefasPendentes = this.taskService.getTarefasPorStatus('pendente');
      this.tarefasEmProcesso = this.taskService.getTarefasPorStatus('em-processo');
      this.tarefasFinalizadas = this.taskService.getTarefasPorStatus('finalizada');
    } catch (error: unknown) {
      console.error('Erro ao carregar tarefas:', error);
    }
  }

  selecionarTarefa(tarefa: Task): void {
    this.tarefaSelecionada = tarefa;
    this.modalAberto = true;
  }

  moverTarefa(tarefa: Task, novoStatus: 'pendente' | 'em-processo' | 'finalizada'): void {
    try {
      if (tarefa.status === 'finalizada' && novoStatus === 'em-processo') {
        alert('Tarefas concluídas não podem voltar para "Em andamento"');
        return;
      }
      this.taskService.atualizarStatus(tarefa.id, novoStatus);
    } catch (error: unknown) {
      console.error('Erro ao mover tarefa:', error);
    }
  }

  removerTarefa(id: number): void {
    const confirmacao: boolean = confirm(
      'Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.'
    );
    if (confirmacao) {
      try {
        this.taskService.remover(id);
      } catch (error: unknown) {
        console.error('Erro ao remover tarefa:', error);
        alert('Ocorreu um erro ao tentar remover a tarefa.');
      }
    }
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.tarefaSelecionada = null;
  }

  getPrioridadeColorClass(prioridade: Task['prioridade']): string {
    return `priority-${prioridade}`;
  }
}
