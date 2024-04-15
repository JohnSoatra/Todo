import React from 'react';
import Image from 'next/image';
import Edit from '@/assets/icons/edit.webp';
import Delete from '@/assets/icons/delete.webp';
import Mark from '@/assets/icons/check.webp';

const Class = {
    Action: `
        w-[14px] opacity-70
        hover:opacity-100
    `
}

type Props = {
    index: number,
    todo: Todo,
    handleEdit: () => void,
    handleDelete: () => void,
    handleMark: () => void,
}

const Todo = ({
    index,
    todo,
    handleEdit,
    handleDelete,
    handleMark
}: Props) => {
    return (
        <div
            className='
                group w-full flex justify-between items-start gap-x-2 px-2 select-none
                hover:bg-gray-100
            '>
            <div
                className={`
                    ${todo.isCompleted && 'line-through'}
                `}>
                {index + 1}.&nbsp;&nbsp;{todo.todo}
            </div>
            <div
                className='
                    flex items-center gap-x-2 opacity-0 pointer-events-none py-2
                    group-hover:opacity-100 group-hover:pointer-events-auto
                '>
                <div
                    className={Class.Action}
                    onClick={handleDelete}>
                    <Image
                        src={Delete}
                        alt='delete'
                        sizes="100%"
                    />
                </div>
                <div
                    className={Class.Action}
                    onClick={handleEdit}>
                    <Image
                        src={Edit}
                        alt='edit'
                        sizes="100%"
                    />
                </div>
                <div
                    className={Class.Action}
                    onClick={handleMark}>
                    <Image
                        src={Mark}
                        alt='mark'
                        sizes="100%"
                    />
                </div>
            </div>
        </div>
    );
}

export default Todo;