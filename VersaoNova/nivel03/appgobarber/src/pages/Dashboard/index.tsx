import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useAuth } from '../../hooks/auth'

import {
    Container,
    Header,
    HeaderTitle,
    ProfileButton,
    ProvidersList,
    UserAvatar,
    UserName,
    ProviderContainer,
    ProviderAvatar,
    ProviderInfo,
    ProviderName,
    ProviderMeta,
    ProviderMetaText,
    ProvidersListTitle
} from './styles'
import ProfileImg from '../../assets/persona.png' //Trocar por user.avatar_url
import api from '../../services/api'

export interface Provider {
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()
    const [providers, setProviders] = useState<Provider[]>([])

    useEffect(() => {
        api.get('providers').then(res => {
            setProviders(res.data)
        })
    }, [])

    const { navigate } = useNavigation()
    const navigateToProfile = useCallback(() => {
        navigate('Profile')
    }, [navigate])

    const navigateToCreateAppointment = useCallback((providerId: string) => {
        navigate('CreateAppointment', { providerId })
    }, [navigate])

    return (
        <Container>
            <Header>
                <HeaderTitle>
                    Bem vindo, {"\n"}
                    <UserName>{user.name}</UserName>
                </HeaderTitle>

                <ProfileButton onPress={navigateToProfile}>
                    <UserAvatar source={ProfileImg} />

                </ProfileButton>
            </Header>

            <ProvidersList
                data={providers}
                keyExtractor={provider => provider.id}
                ListHeaderComponent={
                    <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
                }
                renderItem={({ item }) => (
                    <ProviderContainer onPress={() => navigateToCreateAppointment(item.id)}>
                        <ProviderAvatar source={item.avatar_url ? { uri: item.avatar_url } : ProfileImg} />
                        <ProviderInfo>
                            <ProviderName>{item.name}</ProviderName>
                            <ProviderMeta>
                                <Icon name="calendar" size={14} color="#ff9000" />
                                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
            />
        </Container>
    )
}

export default Dashboard