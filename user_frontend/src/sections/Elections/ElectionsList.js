import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container'
import ElectionListItem from '../../components/ListItem/ElectionListItem';

export default function ElectionsList(props) {

    const { elections } = props


    return (
        <Card style={{ borderRadius: 10, height: 800, overflow: 'auto', border: '1px solid #E4E4E4', boxShadow: 'none' }}>
            <CardContent >

                <Container>

                    {elections.map((election) => {
                        return <>
                            <ElectionListItem 
                                election = {election}
                            />
                            <hr style={{ color: '#7B7B7B', borderWidth: 0.4 }}></hr>
                        </>

                    })}


                </Container>


            </CardContent>
        </Card>
    )
}