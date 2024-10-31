import { Button, ButtonToolbar } from 'rsuite';
import React from 'react';

const Botao = ({mensagem}) => {


    return (
        <ButtonToolbar>
            <Button color="orange" appearance="primary" className='p-3 mb-2' >
                {mensagem}
            </Button>
        </ButtonToolbar>
    )
}

export default Botao;