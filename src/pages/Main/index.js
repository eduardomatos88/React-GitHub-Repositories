import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import api from '../../services/api'
import { Container, Form, SubmitButton } from './styles'

class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
  }
  hundleInputChange = e => {
    this.setState({ newRepository: e.target.value })
  }
  hundleSubmit = async e => {
    e.preventDefault()
    this.setState({ loading: true })

    const { newRepository, repositories } = this.state

    const response = await api.get(`/repos/${newRepository}`)
    const data = {
      name: response.data.full_name,
    }
    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
      loading: false,
    })
  }
  render() {
    const { newRepository, loading } = this.state
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.hundleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepository}
            onChange={this.hundleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#ffffff" size={14} />
            ) : (
              <FaPlus color="#ffffff" size={14} />
            )}
          </SubmitButton>
        </Form>
      </Container>
    )
  }
}

export default Main
