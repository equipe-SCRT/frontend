import { Popover, Whisper } from 'rsuite';
import React from 'react';

const PopOver = ({ mensagem }) => {

    return (



        <Whisper followCursor speaker={<Popover>{mensagem}</Popover>}>

            <span class="material-symbols-outlined" style={{ cursor: "pointer", margin: "5px", marginTop: "0px" }}>
                help
            </span>
        </Whisper>
    );
};



export default PopOver;




