import { Grid, Box, Button, Container } from '@mui/material'
import { GameCard } from "./GameCard";

export const GameDisplay = ({cards, onClick, scores, moves, resetGame}) => {
    return (
        <Grid container spacing={2.5}>
                {
                    cards.map(card => {
                        return (
                            <Grid item xs={3} key={card.id}>
                                <GameCard card={card} onClick={onClick}/>
                            </Grid>
                        )
                    })
                }
            <Grid item></Grid>
            <Grid item xs={12}>
                <Container
                    sx={{ 
                        padding: 1,
                        border: 1, 
                        borderRadius: 1, 
                        display: 'flex', 
                        flexDirection: 'row', 
                        justifyContent: 'space-around'
                    }}
                >
                <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
                    Moves: {moves}
                </Box>
                <Button onClick={resetGame}>START OVER</Button>
                <Box sx={ { display: 'flex', justifyContent: 'center', alignItems: 'center'} }>
                    Score: {scores}
                </Box>
                </Container>
            </Grid>
        </Grid>
    )
}