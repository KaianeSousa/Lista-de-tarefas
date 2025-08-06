import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, SidebarComponent, TaskFormComponent, KanbanBoardComponent],
  standalone: true
})
export class AppComponent {
  isModalOpen = false;

  constructor(private taskService: TaskService) {}

  openModal() {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  addTask(taskData: {
    title: string, 
    description: string, 
    priority: 'baixa' | 'media' | 'alta' | 'urgente',
    startDate: Date,
    endDate: Date
  }) {
    this.taskService.adicionar(
      taskData.title,
      taskData.description,
      taskData.priority,
      taskData.startDate,
      taskData.endDate
    );
    this.closeModal();
  }
}