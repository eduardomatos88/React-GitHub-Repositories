import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loading } from './styles'
import Container from '../../components/Container'
import api from '../../services/api'

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  }

  state = {
    repository: {},
    issues: [],
    loading: true,
  }

  async componentDidMount() {
    const { match } = this.props
    const repositoryName = decodeURIComponent(match.params.repository)
    const [repository, issues] = await Promise.all([
      api.get(`repos/${repositoryName}`),
      api.get(`repos/${repositoryName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ])
    this.setState({
      loading: false,
      repository: repository.data,
      issues: issues.data,
    })
  }

  render() {
    const { repository, issues, loading } = this.state
    if (loading) {
      return <Loading>Carregando</Loading>
    }
    return <Container>Repository: </Container>
  }
}
export default Repository
