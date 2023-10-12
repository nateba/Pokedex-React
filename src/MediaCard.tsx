import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface MediaCardProps {
    name: string;
    details: any;
}

export function MediaCard({ name, details }: MediaCardProps) {
    const typeHandler = () => {
        if (details && details.types) {
            if (details.types[1]) {
                return details.types[0].type.name + " / " + details.types[1].type.name
            } else {
                return details.types[0].type.name
            }
        } else {
            return "Desconhecido"; // Ou outra mensagem de fallback
        }
    }

    return (
        <Card sx={{
            minWidth: 270,
            backgroundColor: 'pink',
            '&:hover': {
                backgroundColor: 'yellow',
                opacity: [0.9, 0.8, 0.7],
            },
        }}>
            <CardMedia
                sx={{ minHeight: 225 }}
                image={details?.sprites.front_default}
                title="Imagem do Pokémon"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tipo: {typeHandler()}
                </Typography>
                {details && (
                    <>
                        <Typography variant="body2" color="text.secondary">
                            Altura: {details.height}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Peso: {details.weight}
                        </Typography>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
