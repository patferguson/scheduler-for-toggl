import { actionCreator } from './actionCreator'
import { Dispatch } from 'redux'
import * as TogglClient from 'toggl-api'
import { ScheduleEntry } from '../reducers/scheduleEntries'
import { getTogglClient, formatTogglApiErrorMessage } from '../apiClients/TogglClient'
import { scheduleEntryToTogglTimeEntry } from '../lib/dataConverters/scheduleEntries'

/**
 * Action types
 */

const ADD_SCHEDULE_ENTRY = 'ADD_SCHEDULE_ENTRY'
const REMOVE_SCHEDULE_ENTRY = 'REMOVE_SCHEDULE_ENTRY'
const SUBMIT_SCHEDULE_ENTRY = 'SUBMIT_SCHEDULE_ENTRY'
const SUBMIT_SCHEDULE_ENTRY_COMPLETE = 'SUBMIT_SCHEDULE_ENTRY_COMPLETE'
const SUBMIT_SCHEDULE_ENTRY_ERROR = 'SUBMIT_SCHEDULE_ENTRY_ERROR'

/**
 * Action creators
 */

export const addScheduleEntry = actionCreator<{scheduleEntry: ScheduleEntry}>(ADD_SCHEDULE_ENTRY)
export const removeScheduleEntry = actionCreator<{scheduleEntryId: number}>(REMOVE_SCHEDULE_ENTRY)
export const submitScheduleEntryStarted = actionCreator<{scheduleEntryId: number}>(SUBMIT_SCHEDULE_ENTRY)
export const submitScheduleEntryComplete = actionCreator<{scheduleEntryId: number}>(SUBMIT_SCHEDULE_ENTRY_COMPLETE)
export const submitScheduleEntryError = actionCreator<{
  scheduleEntryId?: number,
  submitError: string,
}>(SUBMIT_SCHEDULE_ENTRY_ERROR)

/**
 * Thunks
 */

export function submitScheduleEntry(scheduleEntry: ScheduleEntry) {
  return function (dispatch: Dispatch<{}>) {
    // Stop if an invalid ID was passed
    if (typeof(scheduleEntry.id) === 'undefined') {
      dispatch(submitScheduleEntryError({
        submitError: 'Schedule entry ID not present',
      }))

      return
    }

    // Let the state tree know the request has begun
    const scheduleEntryId = scheduleEntry.id
    dispatch(submitScheduleEntryStarted({ scheduleEntryId }))

    // Submit the time entry
    const togglClient = getTogglClient()
    const timeEntryData = scheduleEntryToTogglTimeEntry(scheduleEntry)
    togglClient.createTimeEntry(
        timeEntryData,
        (err: TogglClient.APIError, timeEntry: TogglClient.TimeEntry) => {
      if (err) {
        // An API error was raised
        dispatch(submitScheduleEntryError({
          scheduleEntryId: scheduleEntryId,
          submitError: formatTogglApiErrorMessage(err),
        }))
      } else {
        // The API request completed successfully
        dispatch(submitScheduleEntryComplete({ scheduleEntryId }))
      }
    })
  }
}

export function submitScheduleEntries(scheduleEntries: ReadonlyArray<ScheduleEntry>) {
  return function (dispatch: Dispatch<{}>) {
    scheduleEntries.forEach((scheduleEntry) => {
      dispatch(submitScheduleEntry(scheduleEntry))
    })
  }
}
