import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface BasicTextFieldsProps {
    filteredPokemon: (nome: string) => void; // Adicione um tipo para a função de filtragem
}

export function BasicTextFields({ filteredPokemon }: BasicTextFieldsProps) {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nome = event.target.value;
        console.log(nome);
        filteredPokemon(nome); // Chame a função de filtragem com o valor digitado
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="filled-basic"
                label="Procure um Pokémon"
                variant="filled"
                onChange={handleInputChange} // Lide com as mudanças no campo de texto
            />
        </Box>
    );
}
