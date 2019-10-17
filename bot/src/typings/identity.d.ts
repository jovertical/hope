export interface Profile {
    /**
     * The user's Page-scoped ID (PSID)
     */
    id: number

    /**
     * User's combined first & last name
     */
    name: string

    first_name: string

    last_name: string

    /**
     * Locale of the user on Facebook
     *
     * @see https://developers.facebook.com/docs/messenger-platform/messenger-profile/supported-locales
     */
    locale?: string

    /**
     * Timezone, number relative to GMT
     */
    timezone?: number

    gender?: 'male' | 'female'
}
