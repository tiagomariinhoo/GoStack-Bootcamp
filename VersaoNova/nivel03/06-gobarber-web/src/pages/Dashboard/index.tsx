import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { Container, Header, HeaderContent, Profile, Content, Schedule, Calendar, NextAppointment, Section, Appointment } from './styles'

import logoImg from '../../assets/logo.svg'
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

const Dashboard: React.FC = () => {
    const { signOut, user } = useAuth()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

    // Usar o useCallback sempre que for chamar uma função dentro de um useEffect
    // o useCallback só deixa que a função seja recarregada, quando uma das variáveis mudar
    // como não tem nada no [], então essa função vai ser executada uma única vez, não importa o que mude dentro
    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day)
        }
    }, [])

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month)
    }, [])

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1
            }
        }).then(response => { // then 'quando tiver uma resposta'
            setMonthAvailability(response.data)
        })
    }, [currentMonth, user.id])

    // O useMemo serve para memorizar um valor específico ou uma formatação e diz para ele quando o 
    // valor tem que ser recarregado
    const disabledDays = useMemo(() => {
        const dates = monthAvailability
        .filter(monthDay => monthDay.available === false)
        .map(monthDay => {
            const year = currentMonth.getFullYear()
            const month = currentMonth.getMonth()

            return new Date(year, month, monthDay.day)
        })
        
        return dates;
    }, [currentMonth, monthAvailability]) // São as duas informações utilizadas para compor essas variável disabledDays

    return (
        <Container>
            <Header>
                <HeaderContent>
                    <img src={logoImg} alt="GoBarber" />

                    <Profile>
                        <img src={user.avatar_url} alt={user.name} />

                        <div>
                            <span>Bem-vindo,</span>
                            <strong>{user.name}</strong>
                        </div>
                    </Profile>

                    <button type="button" onClick={signOut}>
                        <FiPower />
                    </button>
                </HeaderContent>
            </Header>

            <Content>
                <Schedule>
                    <h1>Horários agendados</h1>
                    <p>
                        <span>Hoje</span>
                        <span>Dia 06</span>
                        <span>Segunda-Feira</span>
                    </p>

                    <NextAppointment>
                        <strong>Atendimento a seguir</strong>
                        <div>
                            <img src="https://avatars3.githubusercontent.com/u/17099024?s=460&u=60330021ecd8ad83465d5a001fdd643747f10f5d&v=4" alt="Tiago Marinho" />
                            <strong>Tiago Marinho</strong>
                            <span>
                                <FiClock />
                                08:00
                            </span>
                        </div>
                    </NextAppointment>

                    <Section>
                        <strong>Manhã</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/17099024?s=460&u=60330021ecd8ad83465d5a001fdd643747f10f5d&v=4" alt="Tiago Marinho" />
                                <strong>Tiago Marinho</strong>
                            </div>
                        </Appointment>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/17099024?s=460&u=60330021ecd8ad83465d5a001fdd643747f10f5d&v=4" alt="Tiago Marinho" />
                                <strong>Tiago Marinho</strong>
                            </div>
                        </Appointment>
                    </Section>

                    <Section>
                        <strong>Tarde</strong>
                        <Appointment>
                            <span>
                                <FiClock />
                                08:00
                            </span>

                            <div>
                                <img src="https://avatars3.githubusercontent.com/u/17099024?s=460&u=60330021ecd8ad83465d5a001fdd643747f10f5d&v=4" alt="Tiago Marinho" />
                                <strong>Tiago Marinho</strong>
                            </div>
                        </Appointment>
                    </Section>
                </Schedule>
                <Calendar>
                    <DayPicker
                        weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                        fromMonth={new Date()}
                        disabledDays={[
                            { daysOfWeek: [0, 6] },
                            ...disabledDays
                        ]}
                        modifiers={{
                            available: { daysOfWeek: [1, 2, 3, 4, 5] }
                        }}
                        onMonthChange={handleMonthChange}
                        selectedDays={selectedDate}
                        onDayClick={handleDateChange}
                        months={[
                            'Janeiro',
                            'Fevereiro',
                            'Março',
                            'Abril',
                            'Maio',
                            'Junho',
                            'Julho',
                            'Agosto',
                            'Setembro',
                            'Outubro',
                            'Novembro',
                            'Dezembro',
                        ]}
                    />
                </Calendar>
            </Content>
        </Container>
    )
}

export default Dashboard;