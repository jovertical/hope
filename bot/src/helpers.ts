/**
 * A little helper utility to retrieve a user's profile
 *
 * @see https://developers.facebook.com/docs/messenger-platform/identity/user-profile/#optin
 *
 * @param psid The user's Page-scope ID
 * @param fields List of fields that will compose the profile
 */
export const retrieveProfile = (psid: number, fields: Array<string>): Promise<any> => {
    const qs = `fields=${fields.join(',')}&access_token=${process.env.FB_PAGE_TOKEN}`

    return fetch(`https://graph.facebook.com/${psid}?${qs}`).then(res => res.json())
}
