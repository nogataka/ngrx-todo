import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Todo } from '@app/models';
import { State } from './reducers';
import { todoQuery } from './selectors';
import {
  TodoActionTypes,
  LoadTodos,
  LoadTodosSuccess,
  LoadTodosFail,
  CreateTodo,
  CreateTodoSuccess,
  CreateTodoFail,
  UpdateTodo,
  UpdateTodoSuccess,
  UpdateTodoFail,
  DeleteTodo,
  DeleteTodoSuccess,
  DeleteTodoFail,
} from './actions';

@Injectable()
export class TodoFacade {
  loading$           = this.store.pipe(select(todoQuery.getLoading));
  todos$             = this.store.pipe(select(todoQuery.getTodos));
  loadTodosSuccess$  = this.actions$.pipe(ofType<LoadTodosSuccess>(TodoActionTypes.LoadTodosSuccess));
  loadTodosFail$     = this.actions$.pipe(ofType<LoadTodosFail>(TodoActionTypes.LoadTodosFail));
  createTodoSuccess$ = this.actions$.pipe(ofType<CreateTodoSuccess>(TodoActionTypes.CreateTodoSuccess));
  createTodoFail$    = this.actions$.pipe(ofType<CreateTodoFail>(TodoActionTypes.CreateTodoFail));
  updateTodoSuccess$ = this.actions$.pipe(ofType<UpdateTodoSuccess>(TodoActionTypes.UpdateTodoSuccess));
  updateTodoFail$    = this.actions$.pipe(ofType<UpdateTodoFail>(TodoActionTypes.UpdateTodoFail));
  deleteTodoSuccess$ = this.actions$.pipe(ofType<DeleteTodoSuccess>(TodoActionTypes.DeleteTodoSuccess));
  deleteTodoFail$    = this.actions$.pipe(ofType<DeleteTodoFail>(TodoActionTypes.DeleteTodoFail));

  constructor(
    private store: Store<State>,
    private actions$: Actions,
  ) { }

  /**
   * Find all
   * @param {number} offset
   * @param {number} limit
   */
  findAll(offset?: number, limit?: number) {
    this.store.dispatch(new LoadTodos({ offset, limit }));
  }

  /**
   * Create
   * @param {Todo} todo
   */
  create(todo: Todo) {
    this.store.dispatch(new CreateTodo({ todo }));
  }

  /**
   * Update
   * @param {Todo} todo
   */
  update(todo: Todo) {
    this.store.dispatch(new UpdateTodo({
      todo: {
        id: todo.id,
        changes: todo
      }
    }));
  }

  /**
   * Delete
   * @param {string} id
   */
  delete(id: string) {
    this.store.dispatch(new DeleteTodo({ id }));
  }

}