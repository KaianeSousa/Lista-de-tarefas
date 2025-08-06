import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tarefas: Task[] = [];
  private proximoId = 1;
  private tarefasSubject = new BehaviorSubject<Task[]>([]);

  getTarefas(): Task[] {
    return this.tarefas;
  }

  getTarefasObservable(): Observable<Task[]> {
    return this.tarefasSubject.asObservable();
  }

  getTarefasPorStatus(status: 'pendente' | 'em-processo' | 'finalizada'): Task[] {
    const tarefasFiltradas = this.tarefas.filter(t => t.status === status);
    return this.ordenarPorPrioridade(tarefasFiltradas);
  }

  adicionar(titulo: string, descricao: string, prioridade: 'baixa' | 'media' | 'alta' | 'urgente', dataInicio: Date, dataFim: Date): void {
    console.log('TaskService: adicionar chamado');
    console.log('Parâmetros:', { titulo, descricao, prioridade, dataInicio, dataFim });
    
    const nova: Task = {
      id: this.proximoId++,
      titulo,
      descricao,
      criadaEm: new Date(),
      status: 'pendente',
      prioridade,
      dataInicio,
      dataFim
    };
    
    console.log('Nova tarefa criada:', nova);
    this.tarefas.push(nova);
    console.log('Tarefas após adicionar:', this.tarefas);
    
    this.tarefasSubject.next([...this.tarefas]);
    console.log('Observable atualizado');
  }

  remover(id: number): void {
    this.tarefas = this.tarefas.filter(t => t.id !== id);
    this.tarefasSubject.next([...this.tarefas]);
  }

  atualizarStatus(id: number, novoStatus: 'pendente' | 'em-processo' | 'finalizada'): void {
    const tarefa = this.tarefas.find(t => t.id === id);
    if (tarefa) {
      tarefa.status = novoStatus;
      tarefa.modificadaEm = new Date();
      this.tarefasSubject.next([...this.tarefas]);
    }
  }

  getTarefa(id: number): Task | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  existeTarefaComTitulo(titulo: string): boolean {
    return this.tarefas.some(t => t.titulo.toLowerCase().trim() === titulo.toLowerCase().trim());
  }

  private ordenarPorPrioridade(tarefas: Task[]): Task[] {
    const ordemPrioridade = { 'urgente': 4, 'alta': 3, 'media': 2, 'baixa': 1 };
    return tarefas.sort((a, b) => ordemPrioridade[b.prioridade] - ordemPrioridade[a.prioridade]);
  }
}
