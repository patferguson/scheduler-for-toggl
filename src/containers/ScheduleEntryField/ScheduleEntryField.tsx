import * as React from 'react'
import * as faker from 'faker'
import * as _ from 'lodash'
import { Button, ButtonStyles } from '../../components/Button'
import TextInput from '../../components/TextInput'

import './ScheduleEntryField.css'

export interface ScheduleEntryFieldProps {
  scheduleName?: string,
  onScheduleNameChange?: (evt: React.ChangeEvent<HTMLInputElement>) => void,
  onScheduleEntrySubmit?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
}

/**
 * Presentation component of the ScheduleEntryField,
 * @param props Properties generated from the container component via Redux binding.
 */
export const ScheduleEntryField: React.StatelessComponent<ScheduleEntryFieldProps> = (props) => {
  const hasBlankScheduleName =
    typeof props.scheduleName === 'undefined' || props.scheduleName.length === 0

  return (
    <div className="ScheduleEntryField">
      <div className="input-group">
        <TextInput
          onChange={props.onScheduleNameChange}
          placeholder={`${_.capitalize(faker.company.bsBuzz())} ${faker.company.bsNoun()}...`}
        />
        <span className="input-group-btn">
          <Button
            onClick={props.onScheduleEntrySubmit}
            buttonStyle={ButtonStyles.primary}
            disabled={hasBlankScheduleName}
            buttonText="Submit"
          />
        </span>
      </div>
    </div>
  )
}

export default ScheduleEntryField