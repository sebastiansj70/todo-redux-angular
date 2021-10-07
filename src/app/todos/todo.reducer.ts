import { createReducer, on } from '@ngrx/store';
import { Todo } from './Models/todo.model';
import * as action from './todo.actions';


export const initialState: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Comprar traje de Ironman'),
    new Todo('Robar escudo del Capitan'),
];

const _todoReducer = createReducer(
    initialState,
    on(action.crear, (state, { texto }) => [...state, new Todo(texto)]),
    on(action.toggle, (state, { id }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completado: !todo.completado
                }
            } else {
                return todo
            }
        })
    }),

    on(action.editar, (state, { id, texto }) => {
        return state.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    texto
                }
            } else {
                return todo
            }
        })
    }),

    on(action.borrar, (state, { id }) => state.filter(todo => todo.id !== id)),

    on(action.toggleAll, (state, { completado }) => {
        return state.map(todo => {
            return {
                ...todo,
                completado
            }
        })
    }),
    on(action.limpiarTodo, (state) => state.filter(todo => !todo.completado))
);

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action);
}