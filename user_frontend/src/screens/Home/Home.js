import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Section1 from '../../sections/Home/Section1'
import Section2 from '../../sections/Home/Section2'
import Section3 from '../../sections/Home/Section3'
import Section4 from '../../sections/Home/Section4'
import React, { useEffect } from 'react';
import { AuthContext } from '../../contexts/auth';


export default function Home() {


    const {user} = React.useContext(AuthContext)

    useEffect(() => {
        console.log(user)
    }, [])
    return (
        <Stack>
            
            <Section1 />

            <Section2 />

            <Section3 />

            <Section4 />

        </Stack>
    )
}