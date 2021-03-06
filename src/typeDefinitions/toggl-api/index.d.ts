// Typescript type definitions for Toggl node-toggl-api v1.0.1
// Project: https://github.com/7eggs/node-toggl-api
// Definitions by: Patrick Ferguson <https://github.com/patferguson>

// TODO: Build typings for the node-toggl-api package and then remove this file

declare module 'toggl-api' {
  class TogglClient {
    constructor(options: TogglClient.TogglClientOptions)

    getUserData(options: {}, callback: (error: TogglClient.APIError, userData: TogglClient.User) => void): void
    createTimeEntry(data: TogglClient.TimeEntry, callback: (error: TogglClient.APIError, timeEntry: TogglClient.TimeEntry) => void): void
    /**
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/workspaces.md#get-workspace-projects
     * @param wid Workspace ID
     * @param options Additional request options.
     * @param callback Callback to handle the returned data or errors.
     */
    getWorkspaceProjects(wid: number, options: {}, callback: (error: TogglClient.APIError, projects: Array<TogglClient.Project>) => void): void
    getProjectData(projectId: number, callback: (error: TogglClient.APIError, project: TogglClient.Project) => void): void
  }

  namespace TogglClient {
    /**
     * Method options
     */

    export interface TogglClientOptions {
      apiToken?: string,
    }

    /**
     * Callback data structures
     */

    /**
     * Properties within the 'data' field in the API documentation are used.
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/users.md#get-current-user-data
     */
    export interface User {
      /**
       * User ID
       */
      "id": number,
      /**
       * User's API token
       */
      "api_token": string,
      /**
       * Default workspace ID
       */
      "default_wid": number,
      /**
       * User's email
       */
      "email": string,
      /**
       * User's name
       */
      "fullname": string,
      "jquery_timeofday_format": string,
      "jquery_date_format": string,
      "timeofday_format": string,
      /**
       * Date format string (for display?)
       */
      "date_format": string,
      /**
       * Whether start and stop time are saved on time entry
       */
      "store_start_and_stop_time": boolean,
      /**
       * Day index considered the start of the week (integer 0-6, Sunday=0)
       */
      "beginning_of_week": number,
      /**
       * User's language
       */
      "language": string,
      /**
       * URL with the user's profile picture
       */
      "image_url": string,
      /**
       * Should a piechart be shown on the sidebar
       */
      "sidebar_piechart": boolean,
      /**
       * For responses, indicates the time the object was last updated, ISO 8601 date and time format.
       */
      "at"?: string,
      "retention": number,
      "record_timeline": boolean,
      "render_timeline": boolean,
      "timeline_enabled": boolean,
      "timeline_experiment": boolean,
      /**
       * An object with toggl blog post title and link
       */
      "new_blog_post": {},
      "invitation": {},
      /**
       * Toggl can send newsletters over e-mail to the user
       */
      "send_product_emails": boolean,
      /**
       * If user receives weekly report
       */
      "send_weekly_report": boolean,
      /**
       * Email user about long-running (more than 8 hours) tasks
       */
      "send_timer_notifications": boolean,
      /**
       * Whether Google sign-in is enabled
       */
      "openid_enabled": boolean,
      /**
       * Timezone user has set on the "My profile" page [IANA TZ timezones](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
       */
      "timezone": string,
    }

    /**
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/time_entries.md
     */
    export interface TimeEntry {
      /**
       * Entry description (string, strongly suggested to be used)
       */
      "description": string,
      /**
       * Workspace ID (integer, required if pid or tid not supplied)
       */
      "wid"?: number,
      /**
       * Project ID (integer)
       */
      "pid"?: number,
      /**
       * Task ID (integer)
       */
      "tid"?: number,
      /**
       * Whether the entry is billable to the client (boolean, default false, available for pro workspaces)
       */
      "billable"?: boolean,
      /**
       * Time entry start time (string, required, ISO 8601 date and time format)
       */
      "start": string,
      /**
       * Time entry stop time (string, ISO 8601 date and time format)
       */
      "stop"?: string,
      /**
       * Time entry duration in seconds. If the time entry is currently running, the duration attribute contains a negative value, denoting the start of the time entry in seconds since epoch (Jan 1 1970). The correct duration can be calculated as current_time + duration, where current_time is the current time in seconds since epoch. (integer, required)
       */
      "duration": number,
      /**
       * A list of tag names (array of strings)
       */
      "tags"?: Array<string>,
      /**
       * Should Toggl show the start and stop time of this time entry? (boolean)
       */
      "duronly"?: boolean,
      /**
       * For responses, indicates the time the object was last updated, ISO 8601 date and time format.
       */
      "at"?: string,
    }

    /**
     * See: https://github.com/toggl/toggl_api_docs/blob/master/chapters/projects.md#get-project-data
     */
    export interface Project {
      /**
       * Project ID (integer)
       */
      "id"?: number,
      /**
       * Workspace ID (integer)
       */
      "wid": number,
      /**
       * Client ID (integer)
       */
      "cid"?: number,
      /**
       * Project name
       */
      "name": string,
      /**
       * Whether the project is billable to the client
       */
      "billable"?: boolean,
      /**
       * Whether project is accessible for only project users or for all workspace users (by default true)
       */
      "is_private"?: boolean,
      /**
       * Whether the project is archived or not (by default true)
       */
      "active"?: boolean,
      /**
       * For responses, indicates the time the object was last updated, ISO 8601 date and time.
       */
      "at"?: string,
      /**
       * Whether the project can be used as a template
       */
      "template"?: boolean,
      /**
       * ID of the template project used on current project's creation
       */
      "template_id"?: number,
      /**
       * ID of the colour selected for the project, e.g. "5"
       */
      "color": string
      /**
       * Whether the estimated hours are automatically calculated based on task estimations or manually fixed based on the value of 'estimated_hours' (default false, premium functionality)
       */
      "auto_estimates"?: boolean,
      /**
       * If auto_estimates is true then the sum of task estimations is returned, otherwise user inserted hours (integer, premium functionality)
       */
      "estimated_hours"?: number,
      /**
       * Hourly rate of the project (float, premium functionality)
       */
      "rate"?: number,
    }

    /**
     * Classes
     */

    export class APIError {
      /**
       * HTTP status code
       */
      code?: number
      /**
       * Keeps error or other descriptive data if errors array is not specified
       */
      data?: {}
      /**
       * List of errors
       */
      errors?: string[]
      /**
       * RequestJS error, this will be set ONLY if the request itself failed to
       * reach the Toggl server e.g. during maintenance.
       */
      message?: string
    }
  }

  export = TogglClient
}

