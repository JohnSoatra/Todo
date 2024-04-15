import Todo from '@/components/element/Todo';
import React from 'react'

type Props = {
    todos: Todo[],
    action: Action,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleMark: (id: string) => void,
    handleCreateNew: () => void,
}

const TodoList = ({
    todos,
    action,
    handleEdit,
    handleDelete,
    handleMark,
    handleCreateNew
}: Props) => {
    return (
        <div
            className="
                w-full flex flex-col gap-y-[5px]
            ">
            {
                todos.length === 0 && (
                    action === null ?
                        <p
                            className={`
                                text-center px-2 py-3
                            `}>
                            <span className='opacity-70'>No result.</span> <span
                                className='
                                    underline cursor-pointer
                                '
                                onClick={handleCreateNew}>
                                Create
                            </span> <span className='opacity-70 '>a new one instead!</span>
                        </p> :
                        <p
                            className={`
                                opacity-70 text-center px-2 py-3
                            `}>
                            The list is empty.
                        </p>
                )

            }
            {
                todos.map((todo, index) =>
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                        handleEdit={() => handleEdit(todo.id)}
                        handleDelete={() => handleDelete(todo.id)}
                        handleMark={() => handleMark(todo.id)}
                    />
                )
            }
        </div>
    )
}

export default TodoList;