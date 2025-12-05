import React from 'react';


const CardPerson = ({ image }) => {
    return (
        <>
            <div className='flex-1 justify-end items-center'>
                <img src={image} className='h-[200px] w-[200px]' />
            </div>
        </>
    );
};

export default CardPerson;