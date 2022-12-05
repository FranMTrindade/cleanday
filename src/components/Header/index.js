import React from 'react'
import {Text} from 'react-native'

import { Container, Title, } from './styles'

function Header(){
    return(
        <Container>
        <Title>
           Clean
            <Text style={{fontStyle:'italic', color: '#FFF'}}> Day </Text>
        </Title>
        </Container>
    )
}

export default Header