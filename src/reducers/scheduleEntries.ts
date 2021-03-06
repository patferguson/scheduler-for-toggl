import { isType } from '../actions/actionCreator'
import { Action as ReduxAction } from 'redux'
import { Project } from './projects'

/**
 * Action creators
 */

import {
  addScheduleEntry,
  removeScheduleEntry,
  submitScheduleEntryStarted,
  submitScheduleEntryComplete,
  submitScheduleEntryError,
} from '../actions/scheduleEntries'

/**
 * Represents a schedule item with a start and end time.
 */
export interface ScheduleEntry {
  id?: number,
  scheduleName: string,
  // ISO string formatted Moment strings
  startTime: string,
  endTime: string,
  project: Project,
  isSubmitting?: boolean,
}

/**
 * Partial state type signature
 */
export interface ScheduleEntriesState {
  entries: Array<ScheduleEntry>,
  submitError?: string,
}

/**
 * Initial state of this reducer.
 */
export const initialScheduleEntriesState = {
  entries: Array<ScheduleEntry>(),
  submitError: undefined,
} as ScheduleEntriesState

/**
 * Returns the partial state that has been altered by the input action.
 * @param scheduleEntries Existing partial state chunk for this reducer.
 * @param action Action to be handled by this reducer.
 */
export function scheduleEntries(
    scheduleEntriesState: ScheduleEntriesState = initialScheduleEntriesState,
    action: ReduxAction): ScheduleEntriesState {
  if (isType(action, addScheduleEntry)) {
    // Append the new schedule entry to the end of existing entries
    return Object.assign({}, scheduleEntriesState, {
      entries: [
        ...scheduleEntriesState.entries,
        Object.assign({}, action.payload.scheduleEntry, {
          id: 1 + getMaxScheduleEntryId(scheduleEntriesState.entries),
        }),
      ],
    })
  } else if (isType(action, removeScheduleEntry)) {
    // Filter out the entry to be removed
    return Object.assign({}, scheduleEntriesState, {
      entries: scheduleEntriesState.entries.filter((scheduleEntry) => {
        return scheduleEntry.id !== action.payload.scheduleEntryId
      }),
    })
  } else if (isType(action, submitScheduleEntryStarted)) {
    // Mark the input entry as 'submitting'
    return Object.assign({}, scheduleEntriesState, {
      entries: scheduleEntriesState.entries.map((scheduleEntry) => {
        if (scheduleEntry.id === action.payload.scheduleEntryId) {
          scheduleEntry.isSubmitting = true
        }
        return scheduleEntry
      }),
      submitError: null,
    })
  } else if (isType(action, submitScheduleEntryComplete)) {
    // Mark the completed entry as no longer 'submitting'
    return Object.assign({}, scheduleEntriesState, {
      entries: scheduleEntriesState.entries.map((scheduleEntry) => {
        if (scheduleEntry.id === action.payload.scheduleEntryId) {
          scheduleEntry.isSubmitting = false
        }
        return scheduleEntry
      }),
    })
  } else if (isType(action, submitScheduleEntryError)) {
    // Store the provided error
    return Object.assign({}, scheduleEntriesState, {
      submitError: action.payload.submitError,
    })
  } else {
    return scheduleEntriesState
  }
}

/**
 * This is a relatively naive way of finding the maximum ID, if several schedule
 * entries are deleted off the end, IDs may be recycled. Due to the program
 * being all client side at this time and the IDs integrity not being essential
 * to maintain state, this is acceptable for now.
 * @param scheduleEntriesList List of schedule entries to find the maximum ID for.
 */
function getMaxScheduleEntryId(scheduleEntriesList: ReadonlyArray<ScheduleEntry>) {
  return scheduleEntriesList.reduce(
    (maxId, scheduleEntry) => Math.max(typeof(scheduleEntry.id) !== 'undefined' ? scheduleEntry.id : -1, maxId),
    -1,
  )
}
