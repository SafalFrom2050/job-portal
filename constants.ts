export const DEFAULT_ALERT_DURATION_MS = 3000

export const ALERT_TYPE_SUCCESS = 0
export const ALERT_TYPE_WARNING = 1
export const ALERT_TYPE_DANGER = 2

export const ALERT_TYPES = [
    {type: ALERT_TYPE_SUCCESS, name: "Success", color: "#84cc16"},
    {type: ALERT_TYPE_WARNING, name: "Warning", color: "#facc15"},
    {type: ALERT_TYPE_DANGER, name: "Danger", color: "#ef4444"},
]

export const GENERIC_ALERT = {
    type: 1,
    title: "Something is wrong!",
    message: "",
    duration: DEFAULT_ALERT_DURATION_MS
}

export const authOnlyRoutes = [
    'account',
    'post',
    'profile/me',
    'staff',
    'education'
]

export const organizationOnlyRoutes = [
    'post/create',
    'staff',
]

export const individualOnlyRoutes = [

]