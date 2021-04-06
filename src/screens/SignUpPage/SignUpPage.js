import React from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { goToFeedPage, goToLoginPage } from '../../router/Coordinator'
import { useForm } from '../../hooks/UseForm'
import axios from 'axios'
import { useUnprotectedPage } from '../../hooks/UseUnprotectedPage'
import { FormContainer, SignUpPageContainer } from './styles'
import { Button, TextField } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const SignUpPage = () => {
    useUnprotectedPage()

    const history = useHistory()
    const {form, onChange, resetState} = useForm({ name: "", email: "", password: "" })

    const handleInputChange = (event) => {
        const { value, name } = event.target
        onChange(value, name)
    }
  
    const onSubmitForm = (event) => {
        event.preventDefault()
        const body = {
            "email": form.email,
            "password": form.password,
            "username": form.name
        }
        axios.post('https://us-central1-labenu-apis.cloudfunctions.net/labEddit/signup',body)
        .then((res)=> {
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('username',res.data.user.username)
            goToFeedPage(history)
            alert(`Bem-vinde ${res.data.user.username}! Cadastro criado com sucesso.`)
        })
        .catch((err)=> {
            console.log(err)
        })
    }

    return (
        <div>
            <Header />
            <SignUpPageContainer>
                <FormContainer onSubmit={onSubmitForm}>
                    <TextField
                        label="Nome"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='name'
                        value={form.name}
                        type='text'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="E-mail"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='email'
                        value={form.email}
                        type='email'
                        required
                        onChange={handleInputChange}/>
                    <TextField
                        label="Senha"
                        color="primary"
                        style={{ backgroundColor: grey[50] }}
                        variant="outlined"
                        name='password'
                        value={form.password}
                        type='password'
                        required
                        onChange={handleInputChange}/>
                    <Button type='submit' color="primary" variant="contained">Cadastrar</Button>    
                </FormContainer>
                <Button onClick={()=> goToLoginPage(history)}>Voltar para tela de acesso</Button>
            </SignUpPageContainer>
        </div>
    )
}

export default SignUpPage