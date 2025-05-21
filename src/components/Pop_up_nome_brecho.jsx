import React, { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContext';
import './Pop_up_nome_brecho.css';

function Pop_up_nome_brecho() {

    const { nome_do_brecho, set_nome_do_brecho } = useContext(GlobalContext);

  return (
    <div className='contianer_pop_up_nome_brecho'>
    
        <span>{nome_do_brecho}</span>

    </div>
  )
}

export default Pop_up_nome_brecho
