interface Recipient {
    /**
     * Facebook users' id
     */
    id: number
}

interface Sender {
    /**
     * Facebook page's id
     */
    id: number
}

export enum QuickReplyTypes {
    text = 'text',
    userEmail = 'user_email',
    userPhoneNumber = 'user_phone_number'
}

interface QuickReply {
    /**
     * How the quick reply button will be displayed
     */
    content_type: QuickReplyTypes

    /**
     * The text that will be displayed in the Quick Reply button
     */
    title: string

    /**
     * The postback payload
     */
    payload?: string

    /**
     * The image url that will be prefixed in the Quick Reply button's title
     */
    image_url?: string
}

interface Message {
    /**
     * The body of the message.
     */
    text: string

    /**
     * A list of Quick Reply objects.
     */
    quick_replies?: Array<QuickReply>
}
