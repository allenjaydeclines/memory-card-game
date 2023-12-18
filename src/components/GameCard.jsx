import React from "react";
import { Box, Paper } from '@mui/material'
import ReactCardFlip from "react-card-flip";

export const GameCard = ({card, onClick}) => {
    return (
        <ReactCardFlip isFlipped={card.open} >
            <Paper>
                <Box
                    sx={ {height: 100, cursor: 'pointer', background: 'grey'}}
                    onClick={onClick(card.id)}
                ></Box>
            </Paper>
            <Paper>
                <Box
                    sx={ {height: 100, cursor: 'pointer', background: 'white', fontSize: 72}}
                    display='flex'
                    justifyContent='space-around'
                >{card.type}</Box>
            </Paper>
        </ReactCardFlip>
    )
}