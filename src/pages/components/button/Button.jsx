import { Button, ButtonToolbar } from 'rsuite';
import React from 'react';

const Botao = ({mensagem}) => {


    return (
        <ButtonToolbar>
            <Button color="orange" appearance="primary">
                {mensagem}
            </Button>
        </ButtonToolbar>
    )
}

export default Botao;