import React, { useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import TodoList from "@/components/parts/home/TodoList";
import Vars from "@/constants/vars";
import api from "@/utils/api";

const Content = () => {
    const [allTodos, setAllTodos] = useState([] as Todo[]);
    const [showTodos, setShowTodos] = useState(undefined as Todo[]|undefined);
    const [text, setText] = useState('');
    const [showError, setShowError] = useState(false);
    const [action, setAction] = useState('Add' as Action);
    const [editingId, setEditingId] = useState('');
    const [loadFail, setLoadFail] = useState(false);
    const refInput = useRef(null as HTMLInputElement|null);

    const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();

        const newText = evt.target.value;
        let todoTexts: string[];
        
        setText(newText);

        if (action !== null) {
            if (editingId != '') {
                todoTexts = allTodos
                    .filter((each) => each.id !== editingId)
                    .map(each => each.todo.trim().toLowerCase());
            } else {
                todoTexts = allTodos
                    .map(each => each.todo.trim().toLowerCase());
            }
    
            if (todoTexts.includes(newText.trim().toLowerCase())) {
                setShowError(true);
            } else {
                setShowError(false);
            }
        } else {
            setShowError(false);
            setShowTodos([
                ...allTodos
                    .filter(each =>
                        each.todo
                            .trim()
                            .toLowerCase()
                            .includes(newText.trim().toLowerCase())
                    )
            ]);
        }
    }

    const handleAdd = async (evt: React.MouseEvent|React.KeyboardEvent) => {
        evt.preventDefault();
        
        if (text !== '' && showError === false) {
            if (text.length > Vars.MaxTodoCharacterLength) {
                toast.error(
                    `Todo length cannot be more than ${Vars.MaxTodoCharacterLength} characters.`,
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
                return;
            }

            if (allTodos.length >= Vars.MaxAllTodoLength) {
                toast.error(
                    `You cannot have todos more than ${Vars.MaxAllTodoLength}.`,
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
                return;
            }

            const response = await fetch(api('todo'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo: text
                })
            });
            
            const data: PostStatus = await response.json();
            
            if (data.status === 'fail') {
                toast.error(
                    'There are problem with creating todo.',
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
            } else {
                const newTodo: Todo = {
                    id: data.id,
                    isCompleted: false,
                    createdAt: new Date(),
                    todo: text
                }

                setAllTodos([newTodo, ...allTodos]);
                setShowTodos([newTodo, ...allTodos]);
                setText('');
            }
        }
    }

    const handleEdit = async (evt: React.MouseEvent|React.KeyboardEvent) => {
        evt.preventDefault();

        if (text !== '' && showError === false) {
            if (text.length > Vars.MaxTodoCharacterLength) {
                toast.error(
                    `Todo length cannot be more than ${Vars.MaxTodoCharacterLength} characters.`,
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
                return;
            }

            const response = await fetch(api('todo'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: editingId,
                    todo: text
                })
            });
            
            const data = await response.json();
            
            if (data === false) {
                toast.error(
                    'There are problem with updating todo.',
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
            } else {
                setAllTodos([
                    ...allTodos.map(each => {
                        if (each.id === editingId) {
                            return {...each, todo: text}
                        }

                        return {...each};
                    })
                ]);
                setShowTodos([
                    ...allTodos.map(each => {
                        if (each.id === editingId) {
                            return {...each, todo: text}
                        }

                        return {...each};
                    })
                ]);
                resetAction();
            }
        }
    }

    const handleCreateNew = async () => {
        if (text !== '') {
            if (text.length > Vars.MaxTodoCharacterLength) {
                toast.error(
                    `Todo length cannot be more than ${Vars.MaxTodoCharacterLength} characters.`,
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
                return;
            }

            if (allTodos.length >= Vars.MaxAllTodoLength) {
                toast.error(
                    `You cannot have todos more than ${Vars.MaxAllTodoLength}.`,
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
                return;
            }

            const response = await fetch(api('todo'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    todo: text
                })
            });

            const data: PostStatus = await response.json();

            if (data.status === 'fail') {
                toast.error(
                    'There are problem with creating todo.',
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
            } else {
                const newTodo: Todo = {
                    id: data.id,
                    isCompleted: false,
                    createdAt: new Date(),
                    todo: text
                }

                setAllTodos([newTodo, ...allTodos]);
                setShowTodos([newTodo, ...allTodos]);
                setText('');
                refInput.current?.focus();
            }
        }
    }

    const handleFind = async (evt: React.MouseEvent|React.KeyboardEvent) => {
        evt.preventDefault();

        setShowTodos([
            ...allTodos
                .filter(each =>
                    each.todo
                        .trim()
                        .toLowerCase()
                        .includes(text.trim().toLowerCase())
                )
        ]);
    }

    const handleIconFind = async (evt: React.MouseEvent|React.KeyboardEvent) => {
        evt.preventDefault();
        refInput.current?.focus();

        setAction(null);
        setShowError(false);
        setShowTodos([
            ...allTodos
                .filter(each =>
                    each.todo
                        .trim()
                        .toLowerCase()
                        .includes(text.trim().toLowerCase())
                )
        ]);
    }

    const handleIconDelete = async (id: string) => {
        if (showTodos) {
            if (id === editingId) {
                resetAction();
            }

            const response = await fetch(api('todo'), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            });

            const data: boolean = await response.json();
            
            if (data === false) {
                toast.error(
                    'There are problem with deleting todo.',
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
            } else {
                setAllTodos([...allTodos.filter(each => each.id !== id)]);
                setShowTodos([...showTodos.filter(each => each.id !== id)]);
            }
        }
    }

    const handleIconEdit = (id: string) => {
        const todo = allTodos.find(each => each.id === id);

        if (todo) {
            setEditingId(id);
            setText(todo.todo);
            setAction('Edit');
            refInput.current?.focus();
        }
    }

    const handleIconMark = async (id: string) => {
        const todo = allTodos.find(each => each.id === id);

        if (todo && showTodos) {
            const response = await fetch(api('todo'), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    isCompleted: !todo.isCompleted
                })
            });

            const data: boolean = await response.json();
            
            if (data === false) {
                toast.error(
                    'There are problem with updating todo.',
                    {
                        position: 'top-center',
                        duration: 4000
                    }
                );
            } else {
                setAllTodos([
                    ...allTodos.map(each => {
                        if (each.id === id) {
                            return {...each, isCompleted: !each.isCompleted}
                        }

                        return each;
                    })
                ]);
                setShowTodos([
                    ...showTodos.map((each) => {
                        if (each.id === id) {
                            return {...each, isCompleted: !each.isCompleted}
                        }

                        return each;
                    })
                ]);
            }
        }
    }

    const handleCancel = () => {
        resetAction();
        setShowTodos([...allTodos]);
    }

    const resetAction = () => {
        setEditingId('');
        setText('');
        setAction('Add');
    }


    useEffect(() => {
        const abortController = new AbortController();

        const getData = async () => {
            const response = await fetch(api('todo'), {
                method: 'GET',
                signal: abortController.signal
            });
            const data: GetStatus = await response.json();

            if (data.status === 'fail') {
                setLoadFail(true);
            } else {
                setAllTodos([...data.todos!]);
                setShowTodos([...data.todos!]);
            }
        }

        getData();

        return () => {
            abortController.abort();
        }
    }, []);

    return (
        <div
            className="
                w-full flex justify-center pt-[10px] px-5
                md:pt-[15px] md:px-10
                lg:pt-[20px]
            ">
            <div
                className="
                    w-full h-full max-w-[530px] flex justify-center
                ">
                <div
                    className="
                        w-full flex flex-col
                    ">
                    {
                        loadFail ?
                            <p>Fail to load data.</p> :
                            showTodos === undefined ?
                                <p>Loading...</p> :
                                <div
                                    className="
                                        flex flex-col gap-y-3
                                    ">
                                    <p className="underline underline-offset-2">Todo List:</p>
                                    <div
                                        className="
                                            flex flex-col gap-y-2
                                            md:gap-y-3
                                            lg:gap-y-4
                                        ">
                                        <form
                                            className='
                                                flex flex-col gap-y-1
                                            '>
                                            <p
                                                className={`
                                                    text-red-500 text-[14px] whitespace-nowrap
                                                    ${showError ? 'opacity-100' : 'opacity-0'}
                                                `}>
                                                This todo is already exited.
                                            </p>
                                            <div
                                                className="
                                                    flex items-center gap-x-2
                                                ">
                                                <input
                                                    type="text"
                                                    ref={refInput}
                                                    placeholder='add todo...'
                                                    value={text}
                                                    className={`
                                                        border px-2
                                                        focus:ring-0 focus:outline-none
                                                        ${
                                                            showError ?
                                                                `
                                                                    text-red-500 focus:border-red-400
                                                                ` :
                                                                `
                                                                    focus:border-gray-400
                                                                `
                                                        }
                                                    `}
                                                    onChange={handleTextChange}
                                                    onKeyDown={(evt) => {
                                                        if (evt.key === "Enter") {
                                                            if (action === 'Add') {
                                                                handleAdd(evt);
                                                            } else if (action === 'Edit') {
                                                                handleEdit(evt);
                                                            } else {
                                                                handleFind(evt);
                                                            }
                                                        }
                                                    }}
                                                />
                                                <div
                                                    className="
                                                        flex items-center gap-x-2
                                                        md:gap-x-4
                                                    ">
                                                    {
                                                        (action === 'Add' || action === 'Edit') &&
                                                        <>
                                                            <button
                                                                type='submit'
                                                                className={`
                                                                    underline ring-offset-4 text-[15px]
                                                                    ${
                                                                        (text === '' || showError) &&
                                                                        `
                                                                            opacity-50 pointer-events-none
                                                                        `
                                                                    }
                                                                `}
                                                                onClick={
                                                                    action === 'Add' ?
                                                                        handleAdd :
                                                                        handleEdit
                                                                }>
                                                                {action}
                                                            </button>
                                                            {
                                                                action === 'Add' &&
                                                                    <button
                                                                        type='button'
                                                                        className='
                                                                            text-[15px] opacity-95
                                                                        '
                                                                        onClick={handleIconFind}>
                                                                        Find
                                                                    </button>
                                                            }
                                                        </>
                                                    }
                                                    {
                                                        (action === 'Edit' || action === null) &&
                                                            <button
                                                                type='submit'
                                                                className='
                                                                    text-red-500 text-[15px]
                                                                '
                                                                onClick={handleCancel}>
                                                                Cancel
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                        <TodoList
                                            todos={showTodos}
                                            action={action}
                                            handleEdit={handleIconEdit}
                                            handleDelete={handleIconDelete}
                                            handleMark={handleIconMark}
                                            handleCreateNew={handleCreateNew}
                                        />
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Content;