export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  status: 'pendente' | 'em-processo' | 'finalizada';
  criadaEm: Date;
  modificadaEm?: Date;
  dataInicio: Date;
  dataFim: Date;
}
