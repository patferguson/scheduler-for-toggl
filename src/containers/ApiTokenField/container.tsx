import * as React from 'react'
import { connect } from 'react-redux'
import { SchedulerForTogglAppState } from '../../reducers'
import { changeApiToken, submitApiToken } from '../../actions/user'
import ApiTokenField from './ApiTokenField'

/**
 * Prop type definitions
 */

export interface ApiTokenFieldContainerStateDispatches {
  onApiTokenChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onApiTokenSubmit?: (apiToken: string) => void,
}

export interface ApiTokenFieldContainerStateProps {
  apiToken?: string,
  isValidating?: boolean,
  error?: string,
}

// Combine props from mapStateToProps and mapDispatchToProps for container props
export type ApiTokenFieldContainerProps =
  ApiTokenFieldContainerStateProps & ApiTokenFieldContainerStateDispatches

/**
 * Component definition
 */

class ApiTokenFieldContainer extends React.Component<ApiTokenFieldContainerProps, {}> {
  constructor(props: ApiTokenFieldContainerProps) {
    super(props)

    // Bind context for handlers
    this.onApiTokenSubmitClicked = this.onApiTokenSubmitClicked.bind(this)
  }

  onApiTokenSubmitClicked() {
    if (this.props.onApiTokenSubmit) {
      this.props.onApiTokenSubmit(this.props.apiToken || '')
    }
  }

  render() {
    return (
      <ApiTokenField
        apiToken={this.props.apiToken}
        error={this.props.error}
        isValidating={this.props.isValidating}
        onApiTokenChange={this.props.onApiTokenChange}
        onApiTokenSubmit={this.onApiTokenSubmitClicked}
      />
    )
  }
}

/**
 * Redux bindings
 */

/**
 * Makes the desired properties from state available on this.props for the class.
 * @param state Full store state tree.
 */
const mapStateToProps = (state: SchedulerForTogglAppState): ApiTokenFieldContainerStateProps => {
  // Extract the desired properties out of the state tree
  const { user } = state
  return {
    apiToken: user.apiToken,
    isValidating: user.isApiTokenValidating,
    error: user.error,
  }
}

/**
 * Exposes the Redux dispatchers for certain actions to this.props.
 * @param dispatch Handle to the Redux Dispatch method.
 */
const mapDispatchToProps = (dispatch: Function): ApiTokenFieldContainerStateDispatches => {
  return {
    onApiTokenChange: (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(changeApiToken({apiToken: evt.target.value}))
    },
    onApiTokenSubmit: (apiToken: string | undefined) => {
      dispatch(submitApiToken(apiToken))
    },
  }
}

const EnhancedApiTokenField = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApiTokenFieldContainer)

export default EnhancedApiTokenField
